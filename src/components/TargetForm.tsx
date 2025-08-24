import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { targetSchema } from '@/lib/schemas'
import { TargetProfile } from '@/types'

type Props = {
  initial?: TargetProfile
  onSubmit: (data: TargetProfile) => void
  onCancel: () => void
}

type FormData = Omit<TargetProfile, 'id' | 'createdAt'>

export function TargetForm({ initial, onSubmit, onCancel }: Props) {
  const { register, handleSubmit } = useForm<FormData>({ resolver: zodResolver(targetSchema), defaultValues: initial })
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit({ ...data, id: initial?.id || Date.now().toString(), createdAt: initial?.createdAt || Date.now() })
      })}
      className="flex flex-col gap-4"
    >
      <input placeholder="Nome" className="bg-white text-brand rounded-xl px-3 py-2" {...register('name')} />
      <input type="number" placeholder="Età" className="bg-white text-brand rounded-xl px-3 py-2" {...register('age', { valueAsNumber: true })} />
      <input type="number" placeholder="Followers" className="bg-white text-brand rounded-xl px-3 py-2" {...register('followers', { valueAsNumber: true })} />
      <input placeholder="Lavoro" className="bg-white text-brand rounded-xl px-3 py-2" {...register('job')} />
      <input placeholder="Interessi (comma)" className="bg-white text-brand rounded-xl px-3 py-2" {...register('interests', { setValueAs: (v) => v.split(',').map((s: string) => s.trim()).filter(Boolean) })} />
      <textarea placeholder="Note" className="bg-white text-brand rounded-xl px-3 py-2" {...register('contextNotes')} />
      <div className="flex gap-2">
        <button type="submit" className="bg-white text-brand rounded-xl px-4 py-2">Salva</button>
        <button type="button" onClick={onCancel} className="border border-white rounded-xl px-4 py-2">Annulla</button>
      </div>
    </form>
  )
}
