import { z } from 'zod'

const strongPasswordSchema = z
  .string()
  .min(8, 'Le mot de passe doit contenir au moins 8 caracteres.')
  .regex(/[A-Z]/, 'Le mot de passe doit contenir une majuscule.')
  .regex(/[a-z]/, 'Le mot de passe doit contenir une minuscule.')
  .regex(/[0-9]/, 'Le mot de passe doit contenir un chiffre.')
  .regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir un caractere special.')

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "L'adresse e-mail est obligatoire.")
    .email("L'adresse e-mail doit etre valide."),
})

export const resetPasswordSchema = z
  .object({
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1, 'La confirmation est obligatoire.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Les deux mots de passe doivent correspondre.',
    path: ['confirmPassword'],
  })
