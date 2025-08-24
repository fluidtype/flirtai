'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { createParser } from 'eventsource-parser'
import { useStore } from '@/lib/store'
import { Header } from '@/components/Header'
import { ChatPanel } from '@/components/ChatPanel'
import { EmptyState } from '@/components/EmptyState'
import { ChatMessage } from '@/types'

export default function ChatPage() {
  const { id } = useParams<{ id: string }>()
  const { user, targets, messages, addMessage } = useStore()
  const [streaming, setStreaming] = useState(false)
  const [apiStatus, setApiStatus] = useState<'ok' | 'no-key' | 'rate-limited'>('ok')
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
    setStreaming(true)
    setApiStatus('ok')
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
    if (res.headers.get('content-type')?.includes('application/json')) {
      const data = await res.json()
      setApiStatus(data.status || 'error')
      setStreaming(false)
      return
    }
    const reader = res.body?.getReader()
    const decoder = new TextDecoder()
    let acc = ''
    if (reader) {
      const parser = createParser({
        onEvent: (event) => {
          if (event.data === '[DONE]') return
          try {
            const json = JSON.parse(event.data)
            const delta = json.choices?.[0]?.delta?.content
            if (delta) acc += delta
          } catch {
            // ignore malformed events
          }
        },
      })
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        parser.feed(decoder.decode(value))
      }
    }
    addMessage({
      id: crypto.randomUUID(),
      role: 'assistant',
      content: acc,
      ts: Date.now(),
      targetId: target.id,
    })
    setStreaming(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header userInitials={user.name.slice(0, 2)} />
      <div className="flex-1">
        <ChatPanel
          target={target}
          messages={messages[target.id] || []}
          onSend={handleSend}
          streaming={streaming}
          apiStatus={apiStatus}
        />
      </div>
    </div>
  )
}
