'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useStore } from '@/lib/store'
import { Header } from '@/components/Header'
import { ChatPanel } from '@/components/ChatPanel'
import { EmptyState } from '@/components/EmptyState'
import { ChatMessage } from '@/types'

export default function ChatPage() {
  const { id } = useParams<{ id: string }>()
  const { user, targets, messages, addMessage } = useStore()
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<{ message: string; status?: number; code?: string } | null>(
    null
  )
  const target = targets.find((t) => t.id === id)
  if (!target || !user) return <EmptyState message="Target non trovato" />

  async function handleSend(text: string, _files: File[]) {
    if (!target || !text.trim()) return
    const history = messages[target.id] || []
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      ts: Date.now(),
      targetId: target.id,
    }
    addMessage(userMsg)
    setSending(true)
    setError(null)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile: user,
          targetProfile: target,
          recentMessages: history,
          userMessage: text,
        }),
      })
      const data = await res.json()
      if (data.ok) {
        addMessage({
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.content,
          ts: Date.now(),
          targetId: target.id,
        })
      } else {
        setError({ message: data.message, status: data.status, code: data.code })
      }
    } catch (err: any) {
      setError({ message: err.message })
    }
    setSending(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header userInitials={user.name.slice(0, 2)} />
      <div className="flex-1">
        <ChatPanel
          target={target}
          messages={messages[target.id] || []}
          onSend={handleSend}
          sending={sending}
          error={error || undefined}
        />
      </div>
    </div>
  )
}
