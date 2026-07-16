import { z } from 'zod'

const uuidArray = z
  .array(z.string().uuid())
  .refine((values) => new Set(values).size === values.length, {
    message: 'Les identifiants ne doivent pas être dupliqués.',
  })

export const createCandidateGeneratedCvBodySchema = z
  .object({
    title: z.string().trim().min(1).max(150),
    experienceIds: uuidArray,
    skillIds: uuidArray,
    trainingIds: uuidArray,
  })
  .strict()

export type CreateCandidateGeneratedCvBody = z.infer<
  typeof createCandidateGeneratedCvBodySchema
>
