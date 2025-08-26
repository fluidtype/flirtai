import { describe, it, expect } from 'vitest'
import { parseSSE } from '../src/lib/sse'

function createResponseFromString(data: string) {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(data))
      controller.close()
    },
  })
  return new Response(stream)
}

describe('parseSSE', () => {
  it('parses tokens', async () => {
    const sse =
      'data: {"choices":[{"delta":{"content":"Hello"}}]}\n\n' +
      'data: {"choices":[{"delta":{"content":"!"}}]}\n\n' +
      'data: [DONE]\n\n'
    const res = createResponseFromString(sse)
    const tokens: string[] = []
    await parseSSE(res, (t) => tokens.push(t))
    expect(tokens.join('')).toBe('Hello!')
  })
})
