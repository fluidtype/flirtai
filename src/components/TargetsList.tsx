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
    <div className="rounded-2xl bg-[#0B0B0B] text-[#E50914] p-4 flex flex-col gap-4 shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
      <div className="text-[11px] uppercase tracking-wide text-white/50 mb-2 hidden lg:block">Targets</div>
      <div className="hidden lg:flex flex-col gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cerca"
          className="flex-1 bg-[#0B0B0B] border border-white/10 text-[#E50914] rounded-xl px-3 py-2 placeholder-[#E50914]/70"
        />
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-[#0B0B0B] text-[#E50914] font-bold rounded-full px-3 py-2 border border-white/10 hover:bg-white/10 transition"
        >
          <Plus size={14} /> Aggiungi Target
        </button>
      </div>
      <div className="flex lg:hidden justify-center">
        <button
          onClick={() => setOpen(true)}
          aria-label="aggiungi target"
          className="bg-[#0B0B0B] text-[#E50914] rounded-full p-2 border border-white/10 hover:bg-white/10 transition"
        >
          <Plus size={14} />
        </button>
      </div>
      <ul className="flex flex-col divide-y divide-white/10">
        {filtered.map((t) => (
          <li
            key={t.id}
            className={cn(
              'py-3 min-h-[88px] cursor-pointer rounded-xl bg-[#0B0B0B] p-3 shadow-sm hover:bg-white/10 hover:scale-[1.02] hover:shadow-md transition',
              selectedId === t.id ? 'bg-white/10' : ''
            )}
            onClick={() => onSelect(t.id)}
          >
            <p className="font-medium text-base">
              {t.name}, <span className="font-mono text-[13px]">{t.age}</span> • {t.job}
            </p>
            <div className="mt-1">
              <span className="bg-white text-[#E50914] rounded px-2 py-0.5 text-xs font-mono">
                {formatFollowers(t.followers)}
              </span>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-center py-4 text-white/70">Nessun target.</p>
        )}
      </ul>
      {open && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center p-4"
          tabIndex={-1}
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[#0B0B0B] text-[#E50914] p-4 rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <TargetForm onCancel={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
