'use client'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { targetSchema } from '@/lib/schemas'
import { z } from 'zod'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'

export type TargetFormData = z.infer<typeof targetSchema>

interface Props {
  onCancel: () => void
  initial?: TargetFormData & { id: string; createdAt: number }
}

export function TargetForm({ onCancel, initial }: Props) {
  const addTarget = useStore((s) => s.addTarget)
  const updateTarget = useStore((s) => s.updateTarget)
  const selectTarget = useStore((s) => s.selectTarget)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<TargetFormData>({
    resolver: zodResolver(targetSchema),
    defaultValues: initial,
  })

  useEffect(() => {
    setFocus('name')
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setFocus, onCancel])

  function onSubmit(data: TargetFormData) {
    if (initial) {
      updateTarget({ ...initial, ...data })
      onCancel()
      return
    }
    const id = crypto.randomUUID()
    const createdAt = Date.now()
    addTarget({ ...data, id, createdAt })
    selectTarget(id)
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      router.push(`/chat/${id}`)
    }
    window.alert('Target creato')
    onCancel()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-h-[80vh] overflow-y-auto text-secondary"
    >
      <div className="bg-[#0B0B0B] border border-brand rounded-md p-2 mb-2">
        <span className="text-sm text-white">
          {initial ? 'Modifica Target' : 'Nuovo Target'}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-white">Nome *</label>
        <input
          {...register('name')}
          placeholder="Cecilia"
          className="bg-transparent border border-brand text-brand rounded-lg px-3 py-2"
        />
        <p className="text-xs text-secondary">Come vuoi chiamare questa persona.</p>
        {errors.name && (
          <p className="text-xs text-white">Nome invalido</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-white">Età *</label>
        <input
          type="number"
          {...register('age', { valueAsNumber: true })}
          placeholder="25"
          className="bg-transparent border border-brand text-brand rounded-lg px-3 py-2"
        />
        <p className="text-xs text-secondary">Età stimata (anni interi).</p>
        {errors.age && (
          <p className="text-xs text-white">Età invalida</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-white">Follower *</label>
        <input
          type="number"
          {...register('followers', { valueAsNumber: true })}
          placeholder="12000"
          className="bg-transparent border border-brand text-brand rounded-lg px-3 py-2"
        />
        <p className="text-xs text-secondary">Numero totale follower (stima).</p>
        {errors.followers && (
          <p className="text-xs text-white">Numero invalido</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-white">Lavoro *</label>
        <input
          {...register('job')}
          placeholder="Designer"
          className="bg-transparent border border-brand text-brand rounded-lg px-3 py-2"
        />
        <p className="text-xs text-secondary">Professione o ruolo.</p>
        {errors.job && (
          <p className="text-xs text-white">Lavoro invalido</p>
        )}
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="border border-brand text-brand rounded-lg px-4 py-2 hover:shadow-[0_0_10px_rgba(229,9,20,0.5)]"
        >
          Annulla
        </button>
        <button
          type="submit"
          className="border border-brand text-brand rounded-lg px-4 py-2 hover:shadow-[0_0_10px_rgba(229,9,20,0.5)]"
        >
          {initial ? 'Salva' : 'Crea Target'}
        </button>
      </div>
    </form>
  )
}
