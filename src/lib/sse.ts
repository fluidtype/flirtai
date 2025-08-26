import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'

export async function parseSSE(res: Response, onToken: (t: string) => void) {
  const reader = res.body?.getReader()
  if (!reader) return
  const decoder = new TextDecoder()

  const parser = createParser({
    onEvent(event: ParsedEvent | ReconnectInterval) {
      if ('data' in event) {
        const data = event.data
        if (data === '[DONE]') return
        try {
          const json = JSON.parse(data)
          const delta = json.choices?.[0]?.delta?.content
          if (delta) onToken(delta)
        } catch {
          // ignore malformed JSON
        }
      }
    },
  })

  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      parser.feed(decoder.decode(value, { stream: true }))
    }
  } catch (err) {
    console.error('SSE parse error', err)
    throw err
  }
}
