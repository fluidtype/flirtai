import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserProfile, ChatMessage } from '@/types'
import { targetSchema } from './schemas'
import { z } from 'zod'

type Target = z.infer<typeof targetSchema> & { id: string; createdAt: number }

type State = {
  user: UserProfile | null
  targets: Target[]
  messages: Record<string, ChatMessage[]>
  ui: { selectedTargetId?: string }
}

type Actions = {
  setUser: (u: UserProfile) => void
  addTarget: (t: any) => void
  updateTarget: (t: Target) => void
  removeTarget: (id: string) => void
  selectTarget: (id?: string) => void
  addMessage: (m: ChatMessage) => void
  seedDemo: () => void
}

export const useStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      user: null,
      targets: [],
      messages: {},
      ui: {},
      setUser: (u) => set({ user: { ...u, id: 'user' } }),
      addTarget: (t) =>
        set({
          targets: [...get().targets, t].sort((a, b) => a.name.localeCompare(b.name)),
          ui: { selectedTargetId: t.id },
        }),
      updateTarget: (t) =>
        set({
          targets: get()
            .targets.map((x) => (x.id === t.id ? t : x))
            .sort((a, b) => a.name.localeCompare(b.name)),
        }),
      removeTarget: (id) =>
        set({
          targets: get().targets.filter((t) => t.id !== id),
          messages: { ...get().messages, [id]: [] },
          ui: get().ui.selectedTargetId === id ? {} : get().ui,
        }),
      selectTarget: (id) => set({ ui: { selectedTargetId: id } }),
      addMessage: (m) =>
        set({
          messages: {
            ...get().messages,
            [m.targetId]: [...(get().messages[m.targetId] || []), m],
          },
        }),
      seedDemo: () =>
        set({
          targets: [
            {
              id: 'demo',
              name: 'Demo Target',
              createdAt: Date.now(),
              meetingContext: 'online',
              relationshipStage: 'chat',
              currentGoal: 'rompere_ghiaccio',
              preferredChannel: 'ig_dm',
              socialPresence: 'bassa',
            },
          ],
        }),
    }),
    { name: 'flirtai_v1' }
  )
)
