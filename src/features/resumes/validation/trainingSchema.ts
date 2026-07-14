import { z } from 'zod'

const DATE_PARTIAL_REGEX = /^\d{4}(?:-\d{2}(?:-\d{2})?)?$/

const optionalText = (maxLength: number) =>
  z.preprocess(
    (value) => {
      if (typeof value !== 'string') return value
      const trimmed = value.trim()
      return trimmed.length === 0 ? null : trimmed
    },
    z.string().max(maxLength, 'Ce champ ne peut pas depasser la longueur autorisee.').nullable(),
  )

const optionalDate = z.preprocess(
  (value) => {
    if (typeof value !== 'string') return value
    const trimmed = value.trim()
    return trimmed.length === 0 ? null : trimmed
  },
  z.string().regex(DATE_PARTIAL_REGEX, 'La date doit respecter le format YYYY, YYYY-MM ou YYYY-MM-DD.').nullable(),
)

export const trainingSchema = z.object({
  certificationType: optionalText(255),
  degree: optionalText(255),
  description: optionalText(5000),
  endDate: optionalDate,
  fieldOfStudy: optionalText(255),
  isCertification: z.boolean(),
  location: optionalText(100),
  organizationName: optionalText(255),
  startDate: optionalDate,
  title: z.string().trim().min(1, 'La formation est obligatoire.').max(255, 'La formation ne peut pas depasser 255 caracteres.'),
})

export type TrainingFormValues = z.output<typeof trainingSchema>
export type TrainingFormInput = z.input<typeof trainingSchema>
