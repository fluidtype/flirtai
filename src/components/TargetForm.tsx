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
      className="space-y-4 max-h-[80vh] overflow-y-auto"
    >
      <h2 className="text-xl font-semibold">
        {initial ? 'Modifica Target' : 'Nuovo Target'}
      </h2>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Nome *</label>
        <input
          {...register('name')}
          placeholder="Cecilia"
          className="bg-white text-brand rounded-xl px-3 py-2"
        />
        <p className="text-xs text-white/80">Come vuoi chiamare questa persona.</p>
        {errors.name && (
          <p className="text-xs text-white">Nome invalido</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Età *</label>
        <input
          type="number"
          {...register('age', { valueAsNumber: true })}
          placeholder="25"
          className="bg-white text-brand rounded-xl px-3 py-2"
        />
        <p className="text-xs text-white/80">Età stimata (anni interi).</p>
        {errors.age && (
          <p className="text-xs text-white">Età invalida</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Follower *</label>
        <input
          type="number"
          {...register('followers', { valueAsNumber: true })}
          placeholder="12000"
          className="bg-white text-brand rounded-xl px-3 py-2"
        />
        <p className="text-xs text-white/80">Numero totale follower (stima).</p>
        {errors.followers && (
          <p className="text-xs text-white">Numero invalido</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Lavoro *</label>
        <input
          {...register('job')}
          placeholder="Designer"
          className="bg-white text-brand rounded-xl px-3 py-2"
        />
        <p className="text-xs text-white/80">Professione o ruolo.</p>
        {errors.job && (
          <p className="text-xs text-white">Lavoro invalido</p>
        )}
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="border border-white rounded-xl px-4 py-2"
        >
          Annulla
        </button>
        <button
          type="submit"
          className="bg-white text-brand rounded-xl px-4 py-2"
        >
          {initial ? 'Salva' : 'Crea Target'}
        </button>
      </div>
    </form>
  )
}
