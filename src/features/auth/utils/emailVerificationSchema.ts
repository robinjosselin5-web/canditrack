import { z } from 'zod'

export const emailVerificationSchema = z.object({
  code: z
    .string()
    .trim()
    .length(5, 'Le code doit contenir 5 caracteres.')
    .regex(/^[a-zA-Z0-9]+$/, 'Le code doit etre alphanumerique.'),
  email: z
    .string()
    .trim()
    .min(1, "L'adresse e-mail est obligatoire.")
    .email("L'adresse e-mail doit etre valide."),
})
