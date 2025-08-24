import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TargetForm } from './TargetForm'
import type { TargetFormData } from './TargetForm'

function timeAgo(dateISO: string) {
  const diff = Date.now() - new Date(dateISO).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days > 0) return `${days}g fa`
  const hours = Math.floor(diff / (1000 * 60 * 60))
  if (hours > 0) return `${hours}h fa`
  const mins = Math.floor(diff / (1000 * 60))
  return `${mins}m fa`
}

type Target = TargetFormData & { id: string; createdAt: number }

type Props = {
  items: Target[]
  selectedId?: string
  onSelect: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onCreate?: () => void
}

export function TargetsList({ items, selectedId, onSelect, onEdit, onDelete }: Props) {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const filtered = items.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.job?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cerca"
          className="flex-1 bg-white text-brand rounded-xl px-3 py-2"
        />
        <button
          onClick={() => setOpen(true)}
          className="bg-white text-brand rounded-xl px-3 py-2 flex items-center gap-1"
        >
          <Plus size={16} /> Aggiungi Target
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {filtered.map((t) => {
          const chips = [...(t.traits || []), ...(t.interests || [])].slice(0, 3)
          return (
            <li
              key={t.id}
              className={cn(
                'rounded-xl p-3 cursor-pointer border border-black/30',
                selectedId === t.id ? 'bg-white text-brand' : 'bg-brand/20 text-white'
              )}
              onClick={() => onSelect(t.id)}
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <p className="font-semibold">
                    {t.name}
                    {t.age && <span className="ml-1 text-sm">{t.age}</span>}
                  </p>
                  <p className="text-xs opacity-80">
                    {t.relationshipStage} · {t.preferredChannel} · {t.currentGoal}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {chips.map((c) => (
                      <span
                        key={c}
                        className="bg-white text-brand rounded-xl px-2 py-0.5 text-xs"
                      >
                        {c}
                      </span>
                    ))}
                    {t.platforms?.map((p) => (
                      <span key={p} className="text-xs opacity-80">
                        {p[0]}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end text-xs gap-1">
                  {t.confidenceScore !== undefined && (
                    <div className="w-8 h-1 bg-black/30">
                      <div
                        className="h-full bg-white"
                        style={{ width: `${(t.confidenceScore / 10) * 100}%` }}
                      />
                    </div>
                  )}
                  {t.lastInteraction && (
                    <span>{timeAgo(t.lastInteraction.dateISO)}</span>
                  )}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onEdit(t.id)
                      }}
                      className="underline"
                    >
                      Modifica
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(t.id)
                      }}
                      className="underline"
                    >
                      Elimina
                    </button>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
        {filtered.length === 0 && <p className="text-sm text-white/80">Nessun target.</p>}
      </ul>
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-brand p-4 rounded-2xl w-full max-w-md">
            <TargetForm onCancel={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

