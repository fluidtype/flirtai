export async function parseSSE(res: Response, onToken: (t: string) => void) {
  const reader = res.body?.getReader()
  if (!reader) return
  const decoder = new TextDecoder()
  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    const chunk = decoder.decode(value)
    for (const line of chunk.split('\n')) {
      const trim = line.trim()
      if (!trim) continue
      if (trim === 'data: [DONE]' || trim === '[DONE]') return
      const data = trim.startsWith('data: ') ? trim.slice(6) : trim
      try {
        const json = JSON.parse(data)
        const delta = json.choices?.[0]?.delta?.content
        if (delta) onToken(delta)
      } catch {
        // ignore
      }
    }
  }
}
