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

const websiteSchema = z.preprocess(
  (value) => {
    if (typeof value !== 'string') {
      return undefined
    }

    const trimmed = value.trim()
    return trimmed.length === 0 ? undefined : trimmed
  },
  z
    .string({ error: 'Le site web est obligatoire.' })
    .max(255, 'Le site web ne peut pas depasser 255 caracteres.')
    .refine(
      (value) =>
        /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i.test(value),
      'Le site web doit etre une URL valide.',
    ),
)

const emailSchema = z.preprocess(
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

export const companySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Le nom de l'entreprise est obligatoire.")
    .max(255, 'Le nom de lentreprise ne peut pas depasser 255 caracteres.'),

  website: websiteSchema,

  email: emailSchema,
  phone: optionalText(50),
  city: optionalText(100),
  country: optionalText(100),
  recruiterName: optionalText(150),
})
