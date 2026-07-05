import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "L'adresse e-mail est obligatoire.")
    .email("L'adresse e-mail doit etre valide."),
  password: z
    .string()
    .min(1, 'Le mot de passe est obligatoire.')
    .min(8, 'Le mot de passe doit contenir au moins 8 caracteres.'),
  rememberMe: z.boolean(),
})
