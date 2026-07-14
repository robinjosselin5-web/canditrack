import { z } from 'zod'
import { AppError } from '../errors/appError.js'
import type { ICandidateCvAnalysisResponse } from '../types/candidateCv.types.js'
import {
  DATE_PARTIAL_ERROR_MESSAGE,
  DATE_PARTIAL_REGEX,
} from './validationConstants.js'

export const cvSkillCategorySchema = z.enum([
  'SPOKEN_LANGUAGES',
  'PROGRAMMING_LANGUAGES',
  'FRAMEWORKS_LIBRARIES',
  'TOOLS_TECHNOLOGIES',
  'METHODOLOGIES',
  'SOFT_SKILLS',
  'OTHER',
])

const nullableTextSchema = z.string().trim().min(1).nullable()
const nullableDatePartialSchema = z
  .string()
  .trim()
  .regex(DATE_PARTIAL_REGEX, DATE_PARTIAL_ERROR_MESSAGE)
  .nullable()

const cvExperienceSchema = z
  .object({
    jobTitle: z.string().trim().min(1),
    companyName: nullableTextSchema,
    startDate: nullableDatePartialSchema,
    endDate: nullableDatePartialSchema,
    isCurrent: z.boolean(),
    location: nullableTextSchema,
    description: nullableTextSchema,
  })
  .strict()
  .refine(
    (experience) => !experience.isCurrent || experience.endDate === null,
    {
      message: 'Une experience en cours ne peut pas avoir de date de fin.',
      path: ['endDate'],
    },
  )

const cvSkillSchema = z
  .object({
    name: z.string().trim().min(1),
    category: cvSkillCategorySchema,
    confidence: z.number().min(0).max(1).nullable(),
    source: nullableTextSchema,
  })
  .strict()

const cvTrainingSchema = z
  .object({
    title: z.string().trim().min(1),
    organizationName: nullableTextSchema,
    degree: nullableTextSchema,
    fieldOfStudy: nullableTextSchema,
    startDate: nullableDatePartialSchema,
    endDate: nullableDatePartialSchema,
    description: nullableTextSchema,
    location: nullableTextSchema,
    isCertification: z.boolean(),
    certificationType: nullableTextSchema,
  })
  .strict()

export const candidateCvAnalysisResponseSchema = z
  .object({
    experiences: z.array(cvExperienceSchema),
    skills: z.array(cvSkillSchema),
    trainings: z.array(cvTrainingSchema),
  })
  .strict()
  .refine(
    (value) =>
      value.experiences.length > 0 ||
      value.skills.length > 0 ||
      value.trainings.length > 0,
    {
      message: 'Aucune donnée exploitable n\'a pu être extraite du CV.',
    },
  )

export function parseCandidateCvAnalysisResponse(
  rawResponse: string,
): ICandidateCvAnalysisResponse {
  const normalizedRawResponse = rawResponse.trim()

  if (!normalizedRawResponse) {
    throw new AppError('La réponse IA est vide ou inutilisable.', 502)
  }

  const jsonResponse = extractJsonPayload(normalizedRawResponse)

  let parsedResponse: unknown

  try {
    parsedResponse = JSON.parse(jsonResponse) as unknown
  } catch {
    throw new AppError("La réponse IA n'est pas un JSON valide.", 502)
  }

  const validationResult = candidateCvAnalysisResponseSchema.safeParse(
    parsedResponse,
  )

  if (!validationResult.success) {
    const hasEmptyBusinessContent =
      validationResult.error.issues.length === 1 &&
      validationResult.error.issues[0]?.message ===
        'Aucune donnée exploitable n\'a pu être extraite du CV.'

    if (hasEmptyBusinessContent) {
      throw new AppError(
        "Aucune donnée exploitable n'a pu être extraite du CV.",
        422,
      )
    }

    throw new AppError(
      "La réponse IA ne respecte pas le format attendu.",
      502,
    )
  }

  return validationResult.data
}

function extractJsonPayload(rawResponse: string): string {
  const fencedMatch = rawResponse.match(
    /^```(?:json)?\s*([\s\S]*?)\s*```$/i,
  )

  if (fencedMatch?.[1]) {
    return fencedMatch[1].trim()
  }

  const firstObjectIndex = rawResponse.indexOf('{')
  const lastObjectIndex = rawResponse.lastIndexOf('}')

  if (firstObjectIndex !== -1 && lastObjectIndex !== -1) {
    return rawResponse.slice(firstObjectIndex, lastObjectIndex + 1).trim()
  }

  return rawResponse
}

export type { ICandidateCvAnalysisResponse } from '../types/candidateCv.types.js'
