import { z } from 'zod'

const optionalTrimmedString = (maxLength: number, message: string) =>
  z
    .string()
    .trim()
    .max(maxLength, message)
    .transform((value) => (value ? value : null))

const optionalUrlString = (maxLength: number, message: string) =>
  z
    .string()
    .trim()
    .max(maxLength, message)
    .transform((value) => (value ? value : null))
    .refine((value) => value === null || z.string().url().safeParse(value).success, {
      message: "L'URL doit etre valide.",
    })

const ageString = z
  .string()
  .transform((value) => {
    const trimmed = value.trim()
    return trimmed.length === 0 ? null : Number(trimmed)
  })
  .refine((value) => value === null || Number.isInteger(value), {
    message: "L'age doit etre un nombre entier.",
  })
  .refine((value) => value === null || value >= 16, {
    message: "L'age doit etre superieur ou egal a 16.",
  })
  .refine((value) => value === null || value <= 120, {
    message: "L'age doit etre inferieur ou egal a 120.",
  })

export const profileSchema = z.object({
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
  age: ageString,
  phone: optionalTrimmedString(30, 'Le telephone ne peut pas depasser 30 caracteres.'),
  address: optionalTrimmedString(255, "L'adresse ne peut pas depasser 255 caracteres."),
  linkedin: optionalUrlString(255, 'Le lien LinkedIn ne peut pas depasser 255 caracteres.'),
  github: optionalUrlString(255, 'Le lien GitHub ne peut pas depasser 255 caracteres.'),
})
