import { ChatAdapter, ChatPayload } from './ChatAdapter'

export class OpenAIAdapter implements ChatAdapter {
  async streamChat(_payload: ChatPayload): Promise<ReadableStream<Uint8Array>> {
    throw new Error('Not implemented')
  }
  async health() {
    return false
  }
}
