export interface ICandidateCvPublic {
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
