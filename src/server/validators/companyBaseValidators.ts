import { z } from 'zod'

export const companyNameSchema = requiredText(255, "Le nom de l'entreprise est obligatoire.")
export const companyWebsiteSchema = requiredText(255, 'Le site web est obligatoire.').refine(
  (value) => /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i.test(value),
  'Le site web doit etre une URL valide.',
)
export const companyEmailSchema = z.preprocess(
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
)
export const companyPhoneSchema = optionalText(50)
export const companyCitySchema = optionalText(100)
export const companyCountrySchema = optionalText(100)
export const companyCategoryIdSchema = optionalText(36).refine(
  (value) => !value || /^[0-9a-fA-F-]{36}$/.test(value),
  'La categorie doit etre un UUID valide.',
)
export const companyRecruiterNameSchema = optionalText(150)

function optionalText(maxLength: number) {
  return z.preprocess(
    (value) => {
      if (typeof value !== 'string') {
        return undefined
      }

      const trimmed = value.trim()
      return trimmed.length === 0 ? undefined : trimmed
    },
    z.string().max(maxLength).optional(),
  )
}

function requiredText(maxLength: number, requiredMessage: string) {
  return z.preprocess(
    (value) => {
      if (typeof value !== 'string') {
        return undefined
      }

      const trimmed = value.trim()
      return trimmed.length === 0 ? undefined : trimmed
    },
    z.string({ error: requiredMessage }).max(maxLength, requiredMessage),
  )
}
