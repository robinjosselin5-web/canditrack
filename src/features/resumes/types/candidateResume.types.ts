export interface ICandidateCv {
  id: string
  label: string
  originalFilename: string
  mimeType: string
  fileSize: number
  isDefault: boolean
  uploadedAt: string
  createdAt: string
  updatedAt: string
}

export interface ICandidateCvListItem {
  id: string
  label: string
  originalFilename: string
  mimeType: string
  fileSize: number
  uploadedAt: string
  isDefault: boolean
  analysisStatus: 'NOT_ANALYZED' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  lastAnalyzedAt: string | null
}

export interface ICandidateCvListResponse {
  cvs: ICandidateCvListItem[]
}

export type CandidateDataSource = 'AI' | 'MANUAL'
export type CvSkillCategory = 'LANGUAGES' | 'FRAMEWORKS_LIBRARIES' | 'TOOLS_TECHNOLOGIES' | 'METHODOLOGIES' | 'SOFT_SKILLS' | 'OTHER'

export interface ICandidateCvExperience {
  id: string
  candidateCvId: string | null
  source: CandidateDataSource
  jobTitle: string
  companyName: string | null
  startDate: string | null
  endDate: string | null
  isCurrent: boolean
  location: string | null
  description: string | null
}

export interface ICreateCandidateExperiencePayload {
  jobTitle: string
  companyName?: string | null
  startDate?: string | null
  endDate?: string | null
  location?: string | null
}

export interface IUpdateCandidateExperiencePayload {
  jobTitle?: string
  companyName?: string | null
  startDate?: string | null
  endDate?: string | null
  location?: string | null
}

export interface ICandidateCvSkill {
  id: string
  candidateCvId: string | null
  dataSource: CandidateDataSource
  name: string
  category: CvSkillCategory
  confidence: number | null
  source: string | null
}

export interface ICreateCandidateSkillPayload {
  name: string
  category: CvSkillCategory
}

export interface ICandidateCvTraining {
  id: string
  candidateCvId: string | null
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
  source: CandidateDataSource
}

export interface ICreateCandidateTrainingPayload {
  title: string
  organizationName?: string | null
  degree?: string | null
  fieldOfStudy?: string | null
  startDate?: string | null
  endDate?: string | null
  description?: string | null
  location?: string | null
  isCertification?: boolean
  certificationType?: string | null
}

export interface IUpdateCandidateTrainingPayload {
  title?: string
  organizationName?: string | null
  degree?: string | null
  fieldOfStudy?: string | null
  startDate?: string | null
  endDate?: string | null
  description?: string | null
  location?: string | null
  isCertification?: boolean
  certificationType?: string | null
}

export interface IProfileExtractedDataResponse {
  experiences: ICandidateCvExperience[]
  skills: ICandidateCvSkill[]
  trainings: ICandidateCvTraining[]
}
