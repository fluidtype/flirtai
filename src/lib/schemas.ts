import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(2).max(40),
  age: z.number().min(16).max(100),
  socialStatus: z.enum(['studente', 'impiegato', 'imprenditore', 'freelance', 'altro']),
  education: z.string().max(80),
  bio: z.string().max(200).optional(),
  goals: z.array(z.string()).max(5).optional(),
})

export const targetSchema = z.object({
  name: z.string().min(2).max(40),
  age: z.number().int().min(16).max(100).optional(),
  meetingContext: z.enum(['online', 'evento', 'amici', 'lavoro', 'palestra', 'viaggio', 'altro']),
  relationshipStage: z.enum(['sconosciuti', 'conoscenti', 'chat', 'primo_appuntamento', 'frequentazione']),
  currentGoal: z.enum(['rompere_ghiaccio', 'ottenere_risposta', 'proporre_appuntamento', 'follow_up', 'chiarire_aspettative']),
  socialPresence: z.enum(['bassa', 'media', 'alta']),
  platforms: z.array(z.enum(['Instagram', 'TikTok', 'LinkedIn', 'X', 'Facebook'])).max(3).optional(),
  preferredChannel: z.enum(['ig_dm', 'whatsapp', 'imessage', 'dal_vivo', 'linkedin', 'altro']),
  job: z.string().max(60).optional(),
  interests: z.array(z.string()).max(5).optional(),
  commStyle: z.enum(['diretto', 'playful', 'slow_burn', 'formale', 'empatico', 'ironico']).optional(),
  traits: z
    .array(
      z.enum([
        'Diretto/a',
        'Ironico/a',
        'Riflessivo/a',
        'Energico/a',
        'Rassicurante',
        'Competitivo/a',
        'Empatico/a',
        'High-texter',
        'Slow replies',
        'Riserbo social',
      ])
    )
    .max(3)
    .optional(),
  greenFlags: z.array(z.string()).max(3).optional(),
  dealBreakers: z.array(z.string()).max(3).optional(),
  boundaries: z.array(z.string()).optional(),
  availability: z
    .array(z.enum(['Mattina', 'Pausa pranzo', 'Pomeriggio', 'Sera', 'Weekend']))
    .max(3)
    .optional(),
  lastInteraction: z
    .object({
      dateISO: z.string(),
      note140: z.string().max(140),
    })
    .optional(),
  description: z.string().max(300).optional(),
  confidenceScore: z.number().min(0).max(10).optional(),
  ghostRisk: z.enum(['basso', 'medio', 'alto']).optional(),
})
