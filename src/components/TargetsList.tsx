'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TargetForm, TargetFormData } from './TargetForm'

interface Target extends TargetFormData {
  id: string
  createdAt: number
}

interface Props {
  items: Target[]
  selectedId?: string
  onSelect: (id: string) => void
}

function formatFollowers(n: number) {
  if (n >= 1000) return `${Math.round(n / 100) / 10}k`
  return String(n)
}

export function TargetsList({ items, selectedId, onSelect }: Props) {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const filtered = items.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.job.toLowerCase().includes(search.toLowerCase())
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
        {filtered.map((t) => (
          <li
            key={t.id}
            className={cn(
              'rounded-xl p-3 cursor-pointer border border-black/30',
              selectedId === t.id ? 'bg-white text-brand' : 'bg-brand/20 text-white'
            )}
            onClick={() => onSelect(t.id)}
          >
            <p className="font-semibold">
              {t.name}, {t.age} • {t.job}
            </p>
            <div className="mt-1">
              <span className="bg-white text-brand rounded-xl px-2 py-0.5 text-xs">
                {formatFollowers(t.followers)}
              </span>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-white/80">Nessun target.</p>
        )}
      </ul>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4"
          tabIndex={-1}
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-brand p-4 rounded-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <TargetForm onCancel={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
