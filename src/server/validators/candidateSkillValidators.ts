import { z } from 'zod'
import { cvSkillCategorySchema } from './candidateCvValidators.js'

export const createCandidateSkillBodySchema = z.object({
  name: z.string().trim().min(1).max(255),
  category: cvSkillCategorySchema,
}).strict()

export type CreateCandidateSkillBody = z.infer<typeof createCandidateSkillBodySchema>
