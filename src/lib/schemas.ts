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
  name: z.string().min(1),
  age: z.number().min(16).max(100).optional(),
  followers: z.number().min(0).optional(),
  job: z.string().max(60).optional(),
  interests: z.array(z.string()).max(10).optional(),
  contextNotes: z.string().max(300).optional(),
})
