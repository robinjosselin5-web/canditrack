export { ExtractedData } from './pages/ExtractedData'
export { MyCVs } from './pages/MyCVs'
export { Resumes } from './pages/Resumes'
export { Training } from './pages/Training'
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
