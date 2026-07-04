export interface ICandidateCv {
  id: string
  label: string
  originalFilename: string
  storageKey: string
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

export interface ICvExperience {
  jobTitle: string
  companyName: string | null
  startDate: string | null
  endDate: string | null
  isCurrent: boolean
  location: string | null
  description: string | null
}

export interface ICvSkill {
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

export interface ICvTraining {
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

export interface ICandidateCvExtractedDataCvSummary {
  id: string
  label: string
  originalFilename: string
  analysisStatus: 'NOT_ANALYZED' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  lastAnalyzedAt: string | null
}

export interface ICandidateCvExtractedDataResponse {
  cvId: string
  cv: ICandidateCvExtractedDataCvSummary
  experiences: ICvExperience[]
  skills: ICvSkill[]
  trainings: ICvTraining[]
}
