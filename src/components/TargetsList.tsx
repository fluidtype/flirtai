import { TargetProfile } from '@/types'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  items: TargetProfile[]
  selectedId?: string
  onSelect: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onCreate: () => void
}

export function TargetsList({ items, selectedId, onSelect, onEdit, onDelete, onCreate }: Props) {
  const [search, setSearch] = useState('')
  const filtered = items.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cerca"
          className="flex-1 bg-white text-brand rounded-xl px-3 py-2"
        />
        <button onClick={onCreate} className="bg-white text-brand rounded-xl px-3 py-2 flex items-center gap-1">
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
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{t.name}</p>
                {t.job && <p className="text-sm opacity-80">{t.job}</p>}
              </div>
              <div className="flex gap-2 text-xs">
                <button onClick={(e) => { e.stopPropagation(); onEdit(t.id) }} className="underline">
                  Modifica
                </button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(t.id) }} className="underline">
                  Elimina
                </button>
              </div>
            </div>
          </li>
        ))}
        {filtered.length === 0 && <p className="text-sm text-white/80">Nessun target.</p>}
      </ul>
    </div>
  )
}
