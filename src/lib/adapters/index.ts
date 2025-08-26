import { ChatAdapter } from './ChatAdapter'
import { OpenAIAdapter } from './OpenAIAdapter'

export function getAdapter(): ChatAdapter {
  return new OpenAIAdapter()
}
