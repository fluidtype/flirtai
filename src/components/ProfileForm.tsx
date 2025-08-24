import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from '@/lib/schemas'
import { UserProfile } from '@/types'

type Props = {
  defaultValues?: UserProfile
  onSubmit: (data: UserProfile) => void
}

type FormData = Omit<UserProfile, 'id'>

export function ProfileForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(userSchema), defaultValues })

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit({ ...data, id: 'user' })
      })}
      className="flex flex-col gap-4"
    >
      <input placeholder="Nome" className="bg-white text-brand rounded-xl px-3 py-2" {...register('name')} />
      {errors.name && <span className="text-xs">{errors.name.message}</span>}
      <input type="number" placeholder="Età" className="bg-white text-brand rounded-xl px-3 py-2" {...register('age', { valueAsNumber: true })} />
      <select className="bg-white text-brand rounded-xl px-3 py-2" {...register('socialStatus')}>
        <option value="studente">Studente</option>
        <option value="impiegato">Impiegato</option>
        <option value="imprenditore">Imprenditore</option>
        <option value="freelance">Freelance</option>
        <option value="altro">Altro</option>
      </select>
      <input placeholder="Studi" className="bg-white text-brand rounded-xl px-3 py-2" {...register('education')} />
      <textarea placeholder="Bio" className="bg-white text-brand rounded-xl px-3 py-2" {...register('bio')} />
      <input placeholder="Obiettivi (comma)" className="bg-white text-brand rounded-xl px-3 py-2" {...register('goals', { setValueAs: (v) => v.split(',').map((s: string) => s.trim()).filter(Boolean) })} />
      <button type="submit" className="bg-white text-brand rounded-xl px-4 py-2">Salva e continua</button>
    </form>
  )
}
