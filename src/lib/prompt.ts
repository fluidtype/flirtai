import { z } from 'zod'
import { targetSchema } from './schemas'

export const systemPrompt = `Sei "FlirtAI", coach relazionale etico e inclusivo. Dai consigli pratici e rispettosi per interazioni tra persone di qualunque orientamento. Evita manipolazioni, contenuti espliciti o illegali. Tono concreto, empatico. Struttura sempre la risposta con: Strategia; Messaggi suggeriti (3); Rischi/Red flags; Prossimo micro-step.`

type Target = z.infer<typeof targetSchema> & { id: string; createdAt: number }

export function targetToContext(t: Target) {
  const parts: string[] = [`Nome: ${t.name}`]
  if (t.age) parts.push(`Età: ${t.age}`)
  parts.push(`Incontro: ${t.meetingContext}`)
  parts.push(`Stadio: ${t.relationshipStage}`)
  parts.push(`Obiettivo: ${t.currentGoal}`)
  parts.push(`Canale preferito: ${t.preferredChannel}`)
  if (t.job) parts.push(`Lavoro: ${t.job}`)
  if (t.interests?.length) parts.push(`Interessi: ${t.interests.join(', ')}`)
  if (t.traits?.length) parts.push(`Tratti: ${t.traits.join(', ')}`)
  if (t.greenFlags?.length) parts.push(`Green flags: ${t.greenFlags.join(', ')}`)
  if (t.dealBreakers?.length) parts.push(`Deal breakers: ${t.dealBreakers.join(', ')}`)
  if (t.boundaries?.length) parts.push(`Confini: ${t.boundaries.join(', ')}`)
  if (t.description) parts.push(`Note: ${t.description}`)
  return parts.join('\n')
}
