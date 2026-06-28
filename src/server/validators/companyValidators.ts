import { z } from 'zod'

const optionalText = (maxLength: number) =>
  z
    .string()
    .trim()
    .transform((value) => (value.length === 0 ? undefined : value))
    .pipe(z.string().max(maxLength).optional())

export const createCompanyBodySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Le nom de lentreprise est obligatoire.')
    .max(255, 'Le nom de lentreprise ne peut pas depasser 255 caracteres.'),
  website: optionalText(255).refine(
    (value) => !value || /^https?:\/\/.+/i.test(value),
    'Le site web doit etre une URL valide.',
  ),
  email: optionalText(255).refine(
    (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    'Ladresse e-mail doit etre valide.',
  ),
  phone: optionalText(50),
  city: optionalText(100),
  country: optionalText(100),
  categoryId: optionalText(36).refine(
    (value) => !value || /^[0-9a-fA-F-]{36}$/.test(value),
    'La categorie doit etre un UUID valide.',
  ),
  recruiterName: optionalText(150),
})

export type CreateCompanyBody = z.infer<typeof createCompanyBodySchema>

