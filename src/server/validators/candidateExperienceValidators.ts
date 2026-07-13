import { z } from 'zod'
import {
  DATE_PARTIAL_ERROR_MESSAGE,
  DATE_PARTIAL_REGEX,
} from './validationConstants.js'

const nullableText = (maxLength: number) =>
  z.preprocess(
    (value) => {
      if (typeof value !== 'string') {
        return value
      }

      const trimmed = value.trim()
      return trimmed.length === 0 ? null : trimmed
    },
    z.string().max(maxLength).nullable().optional(),
  )

const nullableDate = z.preprocess(
  (value) => {
    if (typeof value !== 'string') {
      return value
    }

    const trimmed = value.trim()
    return trimmed.length === 0 ? null : trimmed
  },
  z
    .string()
    .regex(DATE_PARTIAL_REGEX, DATE_PARTIAL_ERROR_MESSAGE)
    .nullable()
    .optional(),
)

const jobTitle = z.string().trim().min(1).max(255)

const candidateExperienceFields = {
  companyName: nullableText(255),
  description: nullableText(5000),
  endDate: nullableDate,
  isCurrent: z.boolean().optional(),
  jobTitle,
  location: nullableText(100),
  startDate: nullableDate,
}

export const createCandidateExperienceBodySchema = z
  .object(candidateExperienceFields)
  .strict()
  .refine(
    (experience) => !experience.isCurrent || experience.endDate == null,
    {
      message: 'Une experience en cours ne peut pas avoir de date de fin.',
      path: ['endDate'],
    },
  )

export const updateCandidateExperienceBodySchema = z
  .object({
    ...candidateExperienceFields,
    jobTitle: jobTitle.optional(),
  })
  .strict()
  .refine((experience) => Object.keys(experience).length > 0, {
    message: 'Le body ne peut pas etre vide.',
  })
  .refine(
    (experience) =>
      !(experience.isCurrent === true &&
        experience.endDate !== undefined &&
        experience.endDate !== null),
    {
      message: 'Une experience en cours ne peut pas avoir de date de fin.',
      path: ['endDate'],
    },
  )

export type CreateCandidateExperienceBody = z.infer<
  typeof createCandidateExperienceBodySchema
>
export type UpdateCandidateExperienceBody = z.infer<
  typeof updateCandidateExperienceBodySchema
>
