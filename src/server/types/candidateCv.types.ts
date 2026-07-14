export interface ICandidateCvPublic {
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

export interface ICandidateCvAnalysisExperience {
  jobTitle: string
  companyName: string | null
  startDate: string | null
  endDate: string | null
  isCurrent: boolean
  location: string | null
  description: string | null
}

export interface ICandidateCvAnalysisSkill {
  name: string
  category:
    | 'LANGUAGES'
    | 'FRAMEWORKS_LIBRARIES'
    | 'TOOLS_TECHNOLOGIES'
    | 'METHODOLOGIES'
    | 'SOFT_SKILLS'
    | 'OTHER'
  confidence: number | null
  source: string | null
}

export interface ICandidateCvAnalysisTraining {
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
}

export interface ICandidateCvExperience extends ICandidateCvAnalysisExperience {
  id: string
  candidateCvId: string | null
  source: CandidateDataSource
}

export interface ICandidateCvSkill {
  id: string
  candidateCvId: string | null
  name: string
  category:
    | 'LANGUAGES'
    | 'FRAMEWORKS_LIBRARIES'
    | 'TOOLS_TECHNOLOGIES'
    | 'METHODOLOGIES'
    | 'SOFT_SKILLS'
    | 'OTHER'
  confidence: number | null
  source: string | null
  dataSource: CandidateDataSource
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

export interface ICandidateCvAnalysisResponse {
  experiences: ICandidateCvAnalysisExperience[]
  skills: ICandidateCvAnalysisSkill[]
  trainings: ICandidateCvAnalysisTraining[]
}

export interface IProfileExtractedDataResponse {
  experiences: ICandidateCvExperience[]
  skills: ICandidateCvSkill[]
  trainings: ICandidateCvTraining[]
}
