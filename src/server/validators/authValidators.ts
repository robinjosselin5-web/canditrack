import { z } from 'zod'

const strongPasswordSchema = z
  .string()
  .min(8, 'Le mot de passe doit contenir au moins 8 caracteres.')
  .regex(/[A-Z]/, 'Le mot de passe doit contenir une majuscule.')
  .regex(/[a-z]/, 'Le mot de passe doit contenir une minuscule.')
  .regex(/[0-9]/, 'Le mot de passe doit contenir un chiffre.')
  .regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir un caractere special.')

export const forgotPasswordBodySchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "L'adresse e-mail est obligatoire.")
    .email("L'adresse e-mail doit etre valide.")
    .transform((email) => email.toLowerCase()),
})

export const registerBodySchema = z.object({
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
  password: strongPasswordSchema,
})

export const loginBodySchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "L'adresse e-mail est obligatoire.")
    .email("L'adresse e-mail doit etre valide.")
    .transform((email) => email.toLowerCase()),
  password: z.string().min(1, 'Le mot de passe est obligatoire.'),
})

export const resetPasswordBodySchema = z.object({
  token: z.string().min(1, 'Le token est obligatoire.'),
  password: strongPasswordSchema,
})

export type ForgotPasswordBody = z.infer<typeof forgotPasswordBodySchema>
export type LoginBody = z.infer<typeof loginBodySchema>
export type RegisterBody = z.infer<typeof registerBodySchema>
export type ResetPasswordBody = z.infer<typeof resetPasswordBodySchema>
