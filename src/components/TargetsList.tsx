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
    <div className="flex flex-col gap-4 p-0">
      <div className="hidden lg:flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cerca"
          className="flex-1 bg-transparent border border-brand text-brand rounded-lg px-3 py-2 placeholder-brand/60"
        />
        <button
          onClick={() => setOpen(true)}
          className="border border-brand text-brand rounded-lg px-3 py-2 flex items-center gap-1 hover:shadow-[0_0_10px_rgba(229,9,20,0.5)]"
        >
          <Plus size={16} /> Aggiungi Target
        </button>
      </div>
      <div className="flex lg:hidden justify-center">
        <button
          onClick={() => setOpen(true)}
          aria-label="aggiungi target"
          className="border border-brand text-brand rounded-lg p-2 hover:shadow-[0_0_10px_rgba(229,9,20,0.5)]"
        >
          <Plus size={16} />
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {filtered.map((t) => (
          <li
            key={t.id}
            className={cn(
              'min-h-[64px] px-3 py-2.5 cursor-pointer border border-brand/40 rounded-md',
              selectedId === t.id ? 'bg-[#0B0B0B] text-white' : 'bg-transparent text-white'
            )}
            onClick={() => onSelect(t.id)}
          >
            <p className="font-semibold text-sm leading-5 max-w-[72px] lg:max-w-none lg:text-base lg:leading-6 lg:block md:hidden">
              {t.name}, {t.age} • {t.job}
            </p>
            <div className="mt-1 lg:block md:hidden">
              <span className="border border-brand text-brand rounded px-2 py-0.5 text-xs">
                {formatFollowers(t.followers)}
              </span>
            </div>
            <span className="hidden md:flex lg:hidden items-center justify-center h-full text-lg font-semibold">
              {t.name.charAt(0)}
            </span>
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
