import { rateLimit } from '@/lib/rateLimit'
import { systemPrompt, targetToContext } from '@/lib/prompt'

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ error: 'no-key' }, { status: 401 })
  }

  const ip = req.headers.get('x-forwarded-for') || '0.0.0.0'
  if (!rateLimit(ip)) {
    return Response.json({ error: 'rate-limited' }, { status: 429 })
  }

  const { userProfile, targetProfile, recentMessages, userMessage } = await req.json()

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'system', content: `Target:\n${targetToContext(targetProfile)}` },
    ...recentMessages.map((m: any) => ({ role: m.role, content: m.content })),
    { role: 'user', content: userMessage },
  ]

  const body = {
    model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
    stream: true,
    messages,
  }

  try {
    const res = await fetch(`${process.env.OPENAI_API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(body),
    })

    if (!res.ok || !res.body) {
      const err = await res.text()
      return new Response(err, { status: res.status })
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = res.body!.getReader()
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          controller.enqueue(value)
        }
        controller.close()
      },
    })

    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream' },
    })
  } catch (err: any) {
    console.error('API error', err)
    return Response.json({ error: 'server-error' }, { status: 500 })
  }
}
