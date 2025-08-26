'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { Header } from '@/components/Header'
import { ProfileCard } from '@/components/ProfileCard'
import { TargetsList } from '@/components/TargetsList'
import { ChatPanel } from '@/components/ChatPanel'
import { EmptyState } from '@/components/EmptyState'
import { ChatMessage } from '@/types'
import { parseSSE } from '@/lib/sse'

export default function Dashboard() {
  const router = useRouter()
  const {
    user,
    targets,
    messages,
    ui,
    selectTarget,
    addMessage,
    appendMessage,
  } = useStore()

  const [streaming, setStreaming] = useState(false)
  const [apiStatus, setApiStatus] = useState<'ok' | 'no-key' | 'rate-limited'>('ok')

  useEffect(() => {
    if (!user) router.push('/setup')
  }, [user, router])

  const selected = targets.find((t) => t.id === ui.selectedTargetId)
  const initials = user?.name
    ? user.name
        .split(' ') 
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '??'

  async function handleSend(text: string, _files: File[]) {
    if (!selected || !user) return
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      ts: Date.now(),
      targetId: selected.id,
    }
    addMessage(userMsg)
    const placeholder: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      ts: Date.now(),
      targetId: selected.id,
    }
    addMessage(placeholder)
    setApiStatus('ok')
    setStreaming(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          userProfile: user,
          targetProfile: selected,
          recentMessages: messages[selected.id] || [],
          userMessage: text,
        }),
      })
      if (res.headers.get('content-type')?.includes('application/json')) {
        const data = await res.json()
        setApiStatus(data.error === 'no-key' ? 'no-key' : 'rate-limited')
        return
      }
      await parseSSE(res, (t) => appendMessage(selected.id, placeholder.id, t))
    } catch (err) {
      console.error(err)
    } finally {
      setStreaming(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header userInitials={initials} />
      <div className="pt-16 flex w-full space-x-6">
        <aside className="w-[260px] hidden md:flex flex-col gap-6 h-[calc(100vh-64px)] overflow-y-auto z-10 shrink-0">
            {user && (
              <ProfileCard
                profile={user}
                onEdit={() => router.push('/setup')}
                onSeedDemo={() => useStore.getState().seedDemo()}
              />
            )}
            <TargetsList
              items={targets}
              selectedId={ui.selectedTargetId}
              onSelect={selectTarget}
            />
        </aside>
        <main className="flex-1 z-10 flex justify-center">
            {selected ? (
              <ChatPanel
                target={selected}
                messages={messages[selected.id] || []}
                onSend={handleSend}
                streaming={streaming}
                apiStatus={apiStatus}
              />
            ) : (
              <div className="flex-1"><EmptyState message="Seleziona un target per aprire la chat." /></div>
            )}
        </main>
      </div>
    </div>
  )
}
