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
      <div className="flex p-4">
        <aside className="hidden md:flex md:flex-col md:w-[72px] lg:w-[260px] flex-shrink-0 overflow-y-auto max-h-[calc(100vh-64px)] gap-4 border-r-4 border-brand pr-4 mr-4">
          {user && (
            <div className="hidden lg:block">
              <ProfileCard
                profile={user}
                onEdit={() => router.push('/setup')}
                onSeedDemo={() => useStore.getState().seedDemo()}
              />
            </div>
          )}
          <TargetsList
            items={targets}
            selectedId={ui.selectedTargetId}
            onSelect={selectTarget}
          />
        </aside>
        <main className="flex-1 flex">
          {selected ? (
            <ChatPanel
              target={selected}
              messages={messages[selected.id] || []}
              onSend={handleSend}
              streaming={false}
              apiStatus="ok"
            />
          ) : (
            <div className="flex-1"><EmptyState message="Seleziona un target per aprire la chat." /></div>
          )}
        </main>
      </div>
    </div>
  )
}
