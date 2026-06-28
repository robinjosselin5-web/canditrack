import { z } from 'zod'

const optionalText = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength, `La valeur ne peut pas depasser ${maxLength} caracteres.`)
    .refine((value) => value.length === 0 || value.length <= maxLength)

export const companySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Le nom de lentreprise est obligatoire.')
    .max(255, 'Le nom de lentreprise ne peut pas depasser 255 caracteres.'),
  website: z
    .string()
    .trim()
    .max(255, 'Le site web ne peut pas depasser 255 caracteres.')
    .refine(
      (value) => value.length === 0 || /^https?:\/\/.+/i.test(value),
      'Le site web doit etre une URL valide.',
    ),
  email: z
    .string()
    .trim()
    .max(255, "Lemail ne peut pas depasser 255 caracteres.")
    .refine(
      (value) => value.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "Ladresse e-mail doit etre valide.",
    ),
  phone: optionalText(50),
  city: optionalText(100),
  country: optionalText(100),
  categoryId: z
    .string()
    .trim()
    .max(36, 'La categorie ne peut pas depasser 36 caracteres.')
    .refine(
      (value) => value.length === 0 || /^[0-9a-fA-F-]{36}$/.test(value),
      'La categorie doit etre un UUID valide.',
    ),
  recruiterName: optionalText(150),
})
