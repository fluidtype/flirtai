'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { Header } from '@/components/Header'
import { ProfileCard } from '@/components/ProfileCard'
import { TargetsList } from '@/components/TargetsList'
import { ChatPanel } from '@/components/ChatPanel'
import { EmptyState } from '@/components/EmptyState'
import { ChatMessage } from '@/types'

export default function Dashboard() {
  const router = useRouter()
  const {
    user,
    targets,
    messages,
    ui,
    setUser,
    addTarget,
    removeTarget,
    selectTarget,
    addMessage,
  } = useStore()

  useEffect(() => {
    if (!user) router.push('/setup')
  }, [user, router])

  const selected = targets.find((t) => t.id === ui.selectedTargetId)

  async function handleSend(text: string) {
    if (!selected || !user) return
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      ts: Date.now(),
      targetId: selected.id,
    }
    addMessage(userMsg)
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
      return
    }
    const reader = res.body?.getReader()
    const decoder = new TextDecoder()
    let acc = ''
    while (reader) {
      const { value, done } = await reader.read()
      if (done) break
      acc += decoder.decode(value)
    }
    const assistantMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: acc,
      ts: Date.now(),
      targetId: selected.id,
    }
    addMessage(assistantMsg)
  }

  return (
    <div className="min-h-screen">
      <Header userInitials={user?.name?.slice(0, 2) ?? '??'} />
      <div className="grid grid-cols-12 gap-6 p-4">
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {user && (
            <ProfileCard profile={user} onEdit={() => router.push('/setup')} onSeedDemo={() => useStore.getState().seedDemo()} />
          )}
          <TargetsList
            items={targets}
            selectedId={ui.selectedTargetId}
            onSelect={selectTarget}
            onEdit={() => {}}
            onDelete={removeTarget}
            onCreate={() => {
              const id = crypto.randomUUID()
              addTarget({ id, name: 'Nuovo Target', createdAt: Date.now() })
            }}
          />
        </div>
        <div className="col-span-12 lg:col-span-8 h-[calc(100vh-64px-32px)]">
          {selected ? (
            <ChatPanel
              target={selected}
              messages={messages[selected.id] || []}
              onSend={handleSend}
              onStop={() => {}}
              streaming={false}
              apiStatus={process.env.FARLOCK_API_KEY ? 'ok' : 'no-key'}
            />
          ) : (
            <EmptyState message="Seleziona un target per aprire la chat." />
          )}
        </div>
      </div>
    </div>
  )
}
