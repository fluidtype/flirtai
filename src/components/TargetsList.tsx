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
    <div className="rounded-2xl bg-white text-brand p-4 flex flex-col gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      <div className="hidden lg:flex flex-col gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cerca"
          className="flex-1 bg-white border border-black/35 text-brand rounded-xl px-3 py-2 placeholder-brand/60"
        />
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-white text-brand font-bold rounded-full px-3 py-2 border border-black/35 hover:bg-black/10"
        >
          <Plus size={14} /> Aggiungi Target
        </button>
      </div>
      <div className="flex lg:hidden justify-center">
        <button
          onClick={() => setOpen(true)}
          aria-label="aggiungi target"
          className="bg-white text-brand rounded-full p-2 border border-black/35 hover:bg-black/10"
        >
          <Plus size={14} />
        </button>
      </div>
      <ul className="flex flex-col divide-y divide-black/35">
        {filtered.map((t) => (
          <li
            key={t.id}
            className={cn(
              'py-3 min-h-[88px] cursor-pointer',
              selectedId === t.id ? 'bg-black/10' : 'bg-white'
            )}
            onClick={() => onSelect(t.id)}
          >
            <p className="font-semibold text-sm leading-5">{t.name}, {t.age} • {t.job}</p>
            <div className="mt-1">
              <span className="bg-white border border-black/35 text-brand rounded px-2 py-0.5 text-xs">
                {formatFollowers(t.followers)}
              </span>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-center py-4">Nessun target.</p>
        )}
      </ul>
      {open && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4"
          tabIndex={-1}
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white text-brand p-4 rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <TargetForm onCancel={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
