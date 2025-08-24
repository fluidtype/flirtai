import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserProfile, TargetProfile, ChatMessage } from '@/types'

type State = {
  user: UserProfile | null
  targets: TargetProfile[]
  messages: Record<string, ChatMessage[]>
  ui: { selectedTargetId?: string }
}

type Actions = {
  setUser: (u: UserProfile) => void
  addTarget: (t: TargetProfile) => void
  updateTarget: (t: TargetProfile) => void
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
      addTarget: (t) => set({ targets: [...get().targets, t] }),
      updateTarget: (t) =>
        set({ targets: get().targets.map((x) => (x.id === t.id ? t : x)) }),
      removeTarget: (id) =>
        set({
          targets: get().targets.filter((t) => t.id !== id),
          messages: { ...get().messages, [id]: [] },
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
              interests: ['arte'],
            },
          ],
        }),
    }),
    { name: 'flirtai_v1' }
  )
)
