import type { CvSkillCategory } from './candidateResume.types'

export type GeneratedCvVisibility = 'PRIVATE' | 'LINK_ONLY'

export interface ICreateGeneratedCvPayload {
  title: string
  experienceIds: string[]
  skillIds: string[]
  trainingIds: string[]
}

export interface IGeneratedCvListItem {
  id: string
  publicId: string
  title: string
  visibility: GeneratedCvVisibility
  createdAt: string
  experienceCount: number
  skillCount: number
  trainingCount: number
  languageCount: number
}

export interface IGeneratedCvExperience {
  id: string
  sourceExperienceId: string | null
  jobTitle: string
  companyName: string | null
  startDate: string | null
  endDate: string | null
  isCurrent: boolean
  location: string | null
  description: string | null
  position: number
}

export interface IGeneratedCvSkill {
  id: string
  sourceSkillId: string | null
  name: string
  category: CvSkillCategory
  position: number
}

export interface IGeneratedCvLanguage {
  id: string
  sourceSkillId: string | null
  name: string
  position: number
}

export interface IGeneratedCvTraining {
  id: string
  sourceTrainingId: string | null
  title: string
  organizationName: string | null
  degree: string | null
  fieldOfStudy: string | null
  startDate: string | null
  endDate: string | null
  description: string | null
  location: string | null
  isCertification: boolean
  certificationType: string | null
  position: number
}

export interface IGeneratedCvDetail {
  id: string
  publicId: string
  candidateProfileId: string
  title: string
  visibility: GeneratedCvVisibility
  firstname: string
  lastname: string
  email: string
  phone: string | null
  address: string | null
  age: number | null
  linkedin: string | null
  github: string | null
  avatarStorageKey: string | null
  avatarMimeType: string | null
  createdAt: string
  updatedAt: string
  experiences: IGeneratedCvExperience[]
  skills: IGeneratedCvSkill[]
  trainings: IGeneratedCvTraining[]
  languages: IGeneratedCvLanguage[]
}

export interface IGeneratedCvRenderData {
  publicId: string
  title: string
  firstname: string
  lastname: string
  email: string
  phone: string | null
  address: string | null
  age: number | null
  linkedin: string | null
  github: string | null
  hasAvatar: boolean
  slug: string
  createdAt: string
  experiences: Array<Omit<IGeneratedCvExperience, 'id' | 'sourceExperienceId'>>
  skills: Array<Omit<IGeneratedCvSkill, 'id' | 'sourceSkillId'>>
  trainings: Array<Omit<IGeneratedCvTraining, 'id' | 'sourceTrainingId'>>
  languages: Array<Omit<IGeneratedCvLanguage, 'id' | 'sourceSkillId'>>
}
