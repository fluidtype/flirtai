import { ChatMessage, TargetProfile, UserProfile } from '@/types'

export interface ChatPayload {
  userProfile: UserProfile
  targetProfile: TargetProfile
  recentMessages: ChatMessage[]
  userMessage: string
  attachmentsText?: string
}

export interface ChatAdapter {
  streamChat(payload: ChatPayload): Promise<ReadableStream<Uint8Array>>
  health(): Promise<boolean>
}
