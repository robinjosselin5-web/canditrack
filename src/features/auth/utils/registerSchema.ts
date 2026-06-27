import { z } from 'zod'

export const registerSchema = z
  .object({
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
      .email("L'adresse e-mail doit etre valide."),
    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caracteres.')
      .regex(/[A-Z]/, 'Le mot de passe doit contenir une majuscule.')
      .regex(/[a-z]/, 'Le mot de passe doit contenir une minuscule.')
      .regex(/[0-9]/, 'Le mot de passe doit contenir un chiffre.')
      .regex(
        /[^A-Za-z0-9]/,
        'Le mot de passe doit contenir un caractere special.',
      ),
    confirmPassword: z.string().min(1, 'La confirmation est obligatoire.'),
    acceptTerms: z
      .boolean()
      .refine(
        (acceptedTerms) => acceptedTerms,
        'Vous devez accepter les conditions pour creer un compte.',
      ),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Les deux mots de passe doivent correspondre.',
    path: ['confirmPassword'],
  })
