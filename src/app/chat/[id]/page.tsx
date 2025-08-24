'use client'
import { useParams, useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { Header } from '@/components/Header'
import { ChatPanel } from '@/components/ChatPanel'
import { EmptyState } from '@/components/EmptyState'
import { ChatMessage } from '@/types'

export default function ChatPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { user, targets, messages, addMessage } = useStore()
  const target = targets.find((t) => t.id === id)
  if (!target || !user) return <EmptyState message="Target non trovato" />

  async function handleSend(text: string) {
    if (!target) return
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      ts: Date.now(),
      targetId: target.id,
    }
    addMessage(userMsg)
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ userProfile: user, targetProfile: target, recentMessages: messages[target.id] || [], userMessage: text }),
    })
    if (res.headers.get('content-type')?.includes('application/json')) return
    const reader = res.body?.getReader()
    const decoder = new TextDecoder()
    let acc = ''
    while (reader) {
      const { value, done } = await reader.read()
      if (done) break
      acc += decoder.decode(value)
    }
    addMessage({ id: crypto.randomUUID(), role: 'assistant', content: acc, ts: Date.now(), targetId: target.id })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header userInitials={user.name.slice(0, 2)} />
      <div className="flex-1">
        <ChatPanel
          target={target}
          messages={messages[target.id] || []}
          onSend={handleSend}
          onStop={() => {}}
          streaming={false}
          apiStatus={process.env.FARLOCK_API_KEY ? 'ok' : 'no-key'}
        />
      </div>
    </div>
  )
}
