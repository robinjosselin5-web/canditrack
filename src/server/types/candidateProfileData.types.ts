import type { ICandidateCvExperience } from './candidateCv.types.js'

export type CandidateExperience = ICandidateCvExperience

export interface ICreateCandidateExperienceInput {
  companyName?: string | null
  description?: string | null
  endDate?: string | null
  isCurrent?: boolean
  jobTitle: string
  location?: string | null
  startDate?: string | null
}

export interface IUpdateCandidateExperienceInput {
  companyName?: string | null
  description?: string | null
  endDate?: string | null
  isCurrent?: boolean
  jobTitle?: string
  location?: string | null
  startDate?: string | null
}

export interface IUpdateCandidateExperienceRepositoryInput
  extends IUpdateCandidateExperienceInput {
  source: 'MANUAL'
}
