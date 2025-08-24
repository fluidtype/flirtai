import { ChatAdapter, ChatPayload } from './ChatAdapter'
import { systemPrompt, targetToContext } from '../prompt'

export class OpenAIAdapter implements ChatAdapter {
  async streamChat(payload: ChatPayload): Promise<ReadableStream<Uint8Array>> {
    const key = process.env.OPENAI_API_KEY
    const base = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1'
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'

    const messages = [
      { role: 'system', content: systemPrompt },
      ...payload.recentMessages.map((m) => ({ role: m.role, content: m.content })),
      {
        role: 'user',
        content:
          targetToContext(payload.targetProfile) +
          '\n\n' +
          payload.userMessage +
          (payload.attachmentsText ? `\n${payload.attachmentsText}` : ''),
      },
    ]

    const res = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({ model, messages, stream: true }),
    })
    if (!res.body) throw new Error('no body')
    return res.body
  }

  async health() {
    return Boolean(process.env.OPENAI_API_KEY)
  }
}
