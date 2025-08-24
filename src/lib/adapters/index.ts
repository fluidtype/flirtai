import { ChatAdapter } from './ChatAdapter'
import { FarlockAdapter } from './FarlockAdapter'
import { OpenAIAdapter } from './OpenAIAdapter'

export function getAdapter(): ChatAdapter {
  if (process.env.FARLOCK_API_KEY) return new FarlockAdapter()
  return new OpenAIAdapter()
}
