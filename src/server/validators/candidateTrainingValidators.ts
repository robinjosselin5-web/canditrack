import { z } from 'zod'
import {
  DATE_PARTIAL_ERROR_MESSAGE,
  DATE_PARTIAL_REGEX,
} from './validationConstants.js'

const nullableText = (maxLength: number) =>
  z.preprocess(
    (value) => {
      if (typeof value !== 'string') return value
      const trimmed = value.trim()
      return trimmed.length === 0 ? null : trimmed
    },
    z.string().max(maxLength).nullable().optional(),
  )

const nullableDate = z.preprocess(
  (value) => {
    if (typeof value !== 'string') return value
    const trimmed = value.trim()
    return trimmed.length === 0 ? null : trimmed
  },
  z.string().regex(DATE_PARTIAL_REGEX, DATE_PARTIAL_ERROR_MESSAGE).nullable().optional(),
)

const title = z.string().trim().min(1).max(255)

const candidateTrainingFields = {
  certificationType: nullableText(255),
  degree: nullableText(255),
  description: nullableText(5000),
  endDate: nullableDate,
  fieldOfStudy: nullableText(255),
  isCertification: z.boolean().optional(),
  location: nullableText(100),
  organizationName: nullableText(255),
  startDate: nullableDate,
  title,
}

export const createCandidateTrainingBodySchema = z
  .object(candidateTrainingFields)
  .strict()

export const updateCandidateTrainingBodySchema = z
  .object({ ...candidateTrainingFields, title: title.optional() })
  .strict()
  .refine((training) => Object.keys(training).length > 0, {
    message: 'Le body ne peut pas etre vide.',
  })

export type CreateCandidateTrainingBody = z.infer<
  typeof createCandidateTrainingBodySchema
>
export type UpdateCandidateTrainingBody = z.infer<
  typeof updateCandidateTrainingBodySchema
>
