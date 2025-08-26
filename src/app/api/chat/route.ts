import { rateLimit } from '@/lib/rateLimit'

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY
  const apiBase = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1'
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'

  if (!apiKey) {
    return Response.json(
      {
        ok: false,
        source: 'config',
        message: 'OPENAI_API_KEY mancante (definiscila in .env.local e riavvia)',
      },
      { status: 400 }
    )
  }

  const ip = req.headers.get('x-forwarded-for') || '0.0.0.0'
  if (!rateLimit(ip)) {
    return Response.json(
      { ok: false, source: 'rate-limit', message: 'Rate limit superato' },
      { status: 429 }
    )
  }

  let body
  try {
    body = await req.json()
  } catch {
    return Response.json(
      { ok: false, source: 'client', message: 'JSON non valido' },
      { status: 400 }
    )
  }

  let { messages, text } = body || {}
  if ((!messages || !Array.isArray(messages) || messages.length === 0) && typeof text === 'string') {
    messages = [{ role: 'user', content: text }]
  }
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return Response.json(
      { ok: false, source: 'client', message: 'messages mancante' },
      { status: 400 }
    )
  }

  const body = {
    model,
    messages,
    temperature: 0.7,
    top_p: 1,
  }

  const lastUser = messages
    .filter((m: any) => m.role === 'user')
    .slice(-1)[0]?.content || ''
  const start = Date.now()

  try {
    const res = await fetch(`${apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    })

    const duration = Date.now() - start
    console.log(
      `model=${model} userMsg="${lastUser.slice(0, 60)}" status=${res.status} ${duration}ms`
    )

    if (!res.ok) {
      let err: any = {}
      try {
        err = await res.json()
      } catch {
        err.message = await res.text()
      }
      return Response.json(
        {
          ok: false,
          source: 'openai',
          status: res.status,
          message: err.error?.message || err.message || 'Errore OpenAI',
          code: err.error?.code,
        },
        { status: 502 }
      )
    }

    const json = await res.json()
    const content = json.choices?.[0]?.message?.content || ''
    return Response.json({ ok: true, content })
  } catch (err: any) {
    console.error('API error', err)
    return Response.json(
      { ok: false, source: 'network', message: err.message },
      { status: 504 }
    )
  }
}
