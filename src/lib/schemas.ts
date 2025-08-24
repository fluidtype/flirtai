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
  age: z.number().int().min(16).max(100),
  followers: z.number().int().min(0),
  job: z.string().min(1).max(60),
})
