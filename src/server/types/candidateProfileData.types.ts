import type { CvSkillCategory, ICandidateCvExperience } from './candidateCv.types.js'

export type CandidateExperience = ICandidateCvExperience

export interface ICreateCandidateSkillInput {
  name: string
  category: CvSkillCategory
}

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

export interface ICreateCandidateTrainingInput {
  certificationType?: string | null
  degree?: string | null
  description?: string | null
  endDate?: string | null
  fieldOfStudy?: string | null
  isCertification?: boolean
  location?: string | null
  organizationName?: string | null
  startDate?: string | null
  title: string
}

export interface IUpdateCandidateTrainingInput {
  certificationType?: string | null
  degree?: string | null
  description?: string | null
  endDate?: string | null
  fieldOfStudy?: string | null
  isCertification?: boolean
  location?: string | null
  organizationName?: string | null
  startDate?: string | null
  title?: string
}

export interface IUpdateCandidateTrainingRepositoryInput
  extends IUpdateCandidateTrainingInput {
  source: 'MANUAL'
}
