export type UserProfile = {
  id: 'user'
  name: string
  age: number
  socialStatus: 'studente' | 'impiegato' | 'imprenditore' | 'freelance' | 'altro'
  education: string
  bio?: string
  goals?: string[]
}

export type TargetProfile = {
  id: string
  name: string
  age?: number
  followers?: number
  job?: string
  interests?: string[]
  contextNotes?: string
  images?: string[]
  createdAt: number
}

export type Attachment = { name: string; type: 'image'; url: string }

export type ChatMessage = {
  id: string
  role: 'system' | 'user' | 'assistant'
  content: string
  attachments?: Attachment[]
  ts: number
  targetId: string
}
