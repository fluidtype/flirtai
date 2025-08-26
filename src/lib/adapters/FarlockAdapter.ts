import { ChatAdapter, ChatPayload } from './ChatAdapter'

export class FarlockAdapter implements ChatAdapter {
  async streamChat(payload: ChatPayload): Promise<ReadableStream<Uint8Array>> {
    const url = process.env.FARLOCK_API_URL
    const key = process.env.FARLOCK_API_KEY
    if (!url || !key) {
      const encoder = new TextEncoder()
      return new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode('Simulazione risposta'))
          controller.close()
        },
      })
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: process.env.FARLOCK_MODEL || 'farlock-mini',
        ...payload,
        stream: true,
      }),
    })
    if (!res.body) throw new Error('no body')
    return res.body
  }

  async health() {
    return Boolean(process.env.FARLOCK_API_KEY)
  }
}
