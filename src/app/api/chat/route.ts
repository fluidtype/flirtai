import { NextRequest } from 'next/server'
import { getAdapter } from '@/lib/adapters'
import { rateLimit } from '@/lib/rateLimit'
import { ChatPayload } from '@/lib/adapters/ChatAdapter'

export async function POST(req: NextRequest) {
  const ip = req.ip ?? 'unknown'
  if (!rateLimit(ip)) {
    return Response.json({ status: 'rate-limited' }, { status: 429 })
  }
  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ status: 'no-key' })
  }
  const payload = (await req.json()) as ChatPayload
  try {
    const adapter = getAdapter()
    const stream = await adapter.streamChat(payload)
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (e: any) {
    return Response.json({ status: 'error', message: e.message }, { status: 500 })
  }
}
