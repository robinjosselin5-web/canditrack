import { z } from 'zod'

const optionalTrimmedString = (maxLength: number, message: string) =>
  z
    .string()
    .trim()
    .max(maxLength, message)
    .nullable()
    .optional()
    .transform((value) => (value ? value : null))

const optionalUrlString = (maxLength: number, message: string) =>
  z
    .string()
    .trim()
    .max(maxLength, message)
    .nullable()
    .optional()
    .transform((value) => (value ? value : null))
    .refine((value) => value === null || z.string().url().safeParse(value).success, {
      message: 'L\'URL doit etre valide.',
    })

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
  age: z
    .preprocess(
      (value) => (value === '' ? null : value),
      z.coerce
        .number()
        .int("L'age doit etre un nombre entier.")
        .min(16, "L'age doit etre superieur ou egal a 16.")
        .max(120, "L'age doit etre inferieur ou egal a 120.")
        .nullable()
        .optional(),
    )
    .transform((value) => value ?? null),
  phone: optionalTrimmedString(30, 'Le telephone ne peut pas depasser 30 caracteres.'),
  address: optionalTrimmedString(255, "L'adresse ne peut pas depasser 255 caracteres."),
  linkedin: optionalUrlString(255, 'Le lien LinkedIn ne peut pas depasser 255 caracteres.'),
  github: optionalUrlString(255, 'Le lien GitHub ne peut pas depasser 255 caracteres.'),
})

export type UpdateUserProfileBody = z.infer<typeof updateUserProfileBodySchema>
