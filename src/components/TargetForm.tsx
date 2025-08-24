import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { targetSchema } from '@/lib/schemas'
import { z } from 'zod'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'

const platforms = ['Instagram', 'TikTok', 'LinkedIn', 'X', 'Facebook'] as const
const interestsHint = 'Interessi separati da virgola'

const step1Fields = [
  'name',
  'age',
  'meetingContext',
  'relationshipStage',
  'currentGoal',
  'preferredChannel',
  'socialPresence',
  'platforms',
] as const

export type TargetFormData = z.infer<typeof targetSchema>

type Props = { onCancel: () => void }

export function TargetForm({ onCancel }: Props) {
  const [step, setStep] = useState<1 | 2>(1)
  const router = useRouter()
  const addTarget = useStore((s) => s.addTarget)
  const selectTarget = useStore((s) => s.selectTarget)
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<TargetFormData>({ resolver: zodResolver(targetSchema), defaultValues: { socialPresence: 'bassa' } })

  async function handleContinue() {
    const valid = await trigger(step1Fields as any)
    if (valid) setStep(2)
  }

  function submit(data: TargetFormData) {
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

  const socialPresence = watch('socialPresence')

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
      {step === 1 && (
        <>
          <input
            {...register('name')}
            placeholder="Nome"
            className="bg-white text-brand rounded-xl px-3 py-2"
          />
          {errors.name && <p className="text-xs text-white">Nome invalido</p>}
          <input
            type="number"
            {...register('age', { valueAsNumber: true })}
            placeholder="Età"
            className="bg-white text-brand rounded-xl px-3 py-2"
          />
          <select {...register('meetingContext')} className="bg-white text-brand rounded-xl px-3 py-2">
            <option value="online">Online</option>
            <option value="evento">Evento</option>
            <option value="amici">Amici</option>
            <option value="lavoro">Lavoro</option>
            <option value="palestra">Palestra</option>
            <option value="viaggio">Viaggio</option>
            <option value="altro">Altro</option>
          </select>
          <select {...register('relationshipStage')} className="bg-white text-brand rounded-xl px-3 py-2">
            <option value="sconosciuti">Sconosciuti</option>
            <option value="conoscenti">Conoscenti</option>
            <option value="chat">Chat</option>
            <option value="primo_appuntamento">Primo appuntamento</option>
            <option value="frequentazione">Frequentazione</option>
          </select>
          <select {...register('currentGoal')} className="bg-white text-brand rounded-xl px-3 py-2">
            <option value="rompere_ghiaccio">Rompere il ghiaccio</option>
            <option value="ottenere_risposta">Ottenere risposta</option>
            <option value="proporre_appuntamento">Proporre appuntamento</option>
            <option value="follow_up">Follow up</option>
            <option value="chiarire_aspettative">Chiarire aspettative</option>
          </select>
          <select {...register('preferredChannel')} className="bg-white text-brand rounded-xl px-3 py-2">
            <option value="ig_dm">Instagram DM</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="imessage">iMessage</option>
            <option value="dal_vivo">Dal vivo</option>
            <option value="linkedin">LinkedIn</option>
            <option value="altro">Altro</option>
          </select>
          <select {...register('socialPresence')} className="bg-white text-brand rounded-xl px-3 py-2">
            <option value="bassa">Social bassa</option>
            <option value="media">Social media</option>
            <option value="alta">Social alta</option>
          </select>
          {socialPresence !== 'bassa' && (
            <div className="flex flex-col gap-2">
              {platforms.map((p) => (
                <label key={p} className="flex items-center gap-2 text-white text-sm">
                  <input type="checkbox" value={p} {...register('platforms')} /> {p}
                </label>
              ))}
            </div>
          )}
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={handleContinue}
              className="bg-white text-brand rounded-xl px-4 py-2 disabled:opacity-50"
            >
              Continua
            </button>
            <button type="button" onClick={onCancel} className="border border-white rounded-xl px-4 py-2">
              Annulla
            </button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <input
            {...register('job')}
            placeholder="Lavoro"
            className="bg-white text-brand rounded-xl px-3 py-2"
          />
          <input
            {...register('interests', {
              setValueAs: (v) =>
                String(v)
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
            })}
            placeholder={interestsHint}
            className="bg-white text-brand rounded-xl px-3 py-2"
          />
          <select {...register('commStyle')} className="bg-white text-brand rounded-xl px-3 py-2">
            <option value="">Stile comunicazione</option>
            <option value="diretto">Diretto</option>
            <option value="playful">Playful</option>
            <option value="slow_burn">Slow burn</option>
            <option value="formale">Formale</option>
            <option value="empatico">Empatico</option>
            <option value="ironico">Ironico</option>
          </select>
          <input
            {...register('traits', {
              setValueAs: (v) =>
                String(v)
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
            })}
            placeholder="Tratti (max 3, virgola)"
            className="bg-white text-brand rounded-xl px-3 py-2"
          />
          <input
            {...register('greenFlags', {
              setValueAs: (v) =>
                String(v)
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
            })}
            placeholder="Green flags"
            className="bg-white text-brand rounded-xl px-3 py-2"
          />
          <input
            {...register('dealBreakers', {
              setValueAs: (v) =>
                String(v)
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
            })}
            placeholder="Deal breakers"
            className="bg-white text-brand rounded-xl px-3 py-2"
          />
          <input
            {...register('boundaries', {
              setValueAs: (v) =>
                String(v)
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
            })}
            placeholder="Boundaries"
            className="bg-white text-brand rounded-xl px-3 py-2"
          />
          <input
            {...register('availability', {
              setValueAs: (v) =>
                String(v)
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
            })}
            placeholder="Availability"
            className="bg-white text-brand rounded-xl px-3 py-2"
          />
          <input
            type="date"
            {...register('lastInteraction.dateISO')}
            className="bg-white text-brand rounded-xl px-3 py-2"
          />
          <input
            {...register('lastInteraction.note140')}
            placeholder="Nota ultimo contatto"
            className="bg-white text-brand rounded-xl px-3 py-2"
          />
          <textarea
            {...register('description')}
            placeholder="Descrizione"
            className="bg-white text-brand rounded-xl px-3 py-2"
          />
          <input
            type="number"
            {...register('confidenceScore', { valueAsNumber: true })}
            placeholder="Confidence 0-10"
            className="bg-white text-brand rounded-xl px-3 py-2"
          />
          <select {...register('ghostRisk')} className="bg-white text-brand rounded-xl px-3 py-2">
            <option value="">Ghost risk</option>
            <option value="basso">Basso</option>
            <option value="medio">Medio</option>
            <option value="alto">Alto</option>
          </select>
          <div className="flex flex-wrap gap-2 mt-2">
            <button type="submit" className="bg-white text-brand rounded-xl px-4 py-2">
              Crea Target
            </button>
            <button
              type="submit"
              className="border border-white rounded-xl px-4 py-2"
            >
              Salta e crea con i dati rapidi
            </button>
            <button type="button" onClick={onCancel} className="border border-white rounded-xl px-4 py-2">
              Annulla
            </button>
          </div>
        </>
      )}
    </form>
  )
}

