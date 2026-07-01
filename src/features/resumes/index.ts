export { ExtractedDataPage } from './pages/ExtractedDataPage'
export { MyCVsPage } from './pages/MyCVsPage'
export { ResumesPage } from './pages/ResumesPage'
export { TrainingPage } from './pages/TrainingPage'
export {
  analyzeCandidateCv,
  createCandidateCv,
  deleteCandidateCv,
  getCandidateCvs,
  type ICreateCandidateCvPayload,
} from './services/candidateCvService'
export type {
  ICandidateCv,
  ICandidateCvListItem,
  ICandidateCvListResponse,
} from './types/candidateCv.types'
