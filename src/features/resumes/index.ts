export { ExtractedDataPage } from './pages/ExtractedDataPage'
export { MyResumesPage as MyCVsPage } from './pages/MyResumesPage'
export { TrainingPage } from './pages/TrainingPage'
export {
  analyzeCandidateCv,
  createCandidateCv,
  deleteCandidateCv,
  getCandidateCvs,
  type ICreateCandidateCvPayload,
} from './services/candidateResumeService'
export type {
  ICandidateCv,
  ICandidateCvListItem,
  ICandidateCvListResponse,
} from './types/candidateResume.types'
