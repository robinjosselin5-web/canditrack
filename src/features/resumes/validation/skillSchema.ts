import { z } from 'zod'
import type { CvSkillCategory } from '../types/candidateResume.types'

export const CV_SKILL_CATEGORIES = [
  'SPOKEN_LANGUAGES',
  'PROGRAMMING_LANGUAGES',
  'FRAMEWORKS_LIBRARIES',
  'TOOLS_TECHNOLOGIES',
  'METHODOLOGIES',
  'SOFT_SKILLS',
  'OTHER',
] as const

export const skillSchema = z.object({
  name: z.string().trim().min(1, 'La competence est obligatoire.').max(255, 'La competence ne peut pas depasser 255 caracteres.'),
  category: z.enum(CV_SKILL_CATEGORIES),
})

export type SkillFormValues = z.output<typeof skillSchema>
export type SkillFormInput = z.input<typeof skillSchema>
export type SkillCategory = CvSkillCategory
