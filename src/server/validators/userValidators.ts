import { z } from 'zod'

export const updateUserProfileBodySchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(1, 'Le prenom est obligatoire.')
    .max(100, 'Le prenom ne peut pas depasser 100 caracteres.'),
  lastname: z
    .string()
    .trim()
    .min(1, 'Le nom est obligatoire.')
    .max(100, 'Le nom ne peut pas depasser 100 caracteres.'),
  email: z
    .string()
    .trim()
    .min(1, "L'adresse e-mail est obligatoire.")
    .email("L'adresse e-mail doit etre valide.")
    .transform((email) => email.toLowerCase()),
})

export type UpdateUserProfileBody = z.infer<typeof updateUserProfileBodySchema>
