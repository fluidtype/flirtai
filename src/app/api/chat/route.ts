import { NextRequest } from 'next/server'
import { getAdapter } from '@/lib/adapters'
import { rateLimit } from '@/lib/rateLimit'
import { ChatPayload } from '@/lib/adapters/ChatAdapter'

export async function POST(req: NextRequest) {
  const ip = req.ip ?? 'unknown'
  if (!rateLimit(ip)) {
    return Response.json({ status: 'rate-limited' }, { status: 429 })
  }
  const payload = (await req.json()) as ChatPayload
  if (!process.env.FARLOCK_API_KEY) {
    return Response.json({ status: 'no-key' })
  }
  try {
    const adapter = getAdapter()
    const stream = await adapter.streamChat(payload)
    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch (e: any) {
    return Response.json({ status: 'error', message: e.message }, { status: 500 })
  }
}
