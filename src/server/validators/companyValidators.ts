import { z } from 'zod'

const optionalText = (maxLength: number) =>
  z.preprocess(
    (value) => {
      if (typeof value !== 'string') {
        return undefined
      }

      const trimmed = value.trim()
      return trimmed.length === 0 ? undefined : trimmed
    },
    z.string().max(maxLength).optional(),
  )

const requiredText = (maxLength: number, requiredMessage: string) =>
  z.preprocess(
    (value) => {
      if (typeof value !== 'string') {
        return undefined
      }

      const trimmed = value.trim()
      return trimmed.length === 0 ? undefined : trimmed
    },
    z.string({
      error: requiredMessage,
    }).max(maxLength, requiredMessage),
  )

export const createCompanyBodySchema = z.object({
  name: requiredText(255, "Le nom de l'entreprise est obligatoire."),
  website: requiredText(255, 'Le site web est obligatoire').refine(
    (value) =>
      /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i.test(value),
    'Le site web doit etre une URL valide.',
  ),
  email: z.preprocess(
    (value) => {
      if (typeof value !== 'string') {
        return undefined
      }

      const trimmed = value.trim()
      return trimmed.length === 0 ? undefined : trimmed
    },
    z
      .string({ error: "L'adresse e-mail est obligatoire." })
      .max(255, "L'adresse e-mail ne peut pas depasser 255 caracteres.")
      .refine(
        (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        "L'adresse e-mail doit etre valide.",
      ),
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

