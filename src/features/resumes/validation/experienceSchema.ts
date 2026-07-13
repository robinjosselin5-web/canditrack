import { z } from 'zod'

const DATE_PARTIAL_REGEX = /^\d{4}(?:-\d{2}(?:-\d{2})?)?$/

const optionalText = (maxLength: number) =>
  z.preprocess(
    (value) => {
      if (typeof value !== 'string') {
        return value
      }

      const trimmed = value.trim()
      return trimmed.length === 0 ? null : trimmed
    },
    z
      .string()
      .max(maxLength, 'Ce champ ne peut pas depasser la longueur autorisee.')
      .nullable(),
  )

const optionalDate = z.preprocess(
  (value) => {
    if (typeof value !== 'string') {
      return value
    }

    const trimmed = value.trim()
    return trimmed.length === 0 ? null : trimmed
  },
  z
    .string()
    .regex(
      DATE_PARTIAL_REGEX,
      'La date doit respecter le format YYYY, YYYY-MM ou YYYY-MM-DD.',
    )
    .nullable(),
)

export const experienceSchema = z.object({
  companyName: optionalText(255),
  endDate: optionalDate,
  jobTitle: z
    .string()
    .trim()
    .min(1, 'Le poste est obligatoire.')
    .max(255, 'Le poste ne peut pas depasser 255 caracteres.'),
  location: optionalText(100),
  startDate: optionalDate,
})

export type ExperienceFormValues = z.output<typeof experienceSchema>
export type ExperienceFormInput = z.input<typeof experienceSchema>
