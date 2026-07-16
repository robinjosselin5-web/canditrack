// Attention: le modèle Prisma `Resume` et la feature frontend `candidateCv`
// représentent deux concepts différents. Ici, la feature métier manipule les
// CV candidats importés, tandis que `Resume` côté base est un modèle distinct.
export { ExtractedDataPage } from './pages/ExtractedDataPage'
export { ExperiencesPage } from './pages/ExperiencesPage'
export { MyResumesPage as MyCVsPage } from './pages/MyResumesPage'
export { SkillsPage } from './pages/SkillsPage'
export { TrainingPage } from './pages/TrainingPage'
export { GeneratedCvPublicPage } from './pages/GeneratedCvPublicPage'
export {
  analyzeCandidateCv,
  createCandidateCv,
  deleteCandidateCv,
  getCandidateCvs,
  getProfileExtractedData,
  type ICreateCandidateCvPayload,
} from './services/candidateResumeService'
export {
  createGeneratedCv,
  getGeneratedCv,
  getGeneratedCvs,
  getGeneratedCvAvatar,
  getPublicGeneratedCv,
} from './services/generatedCvService'
export type {
  ICandidateCv,
  ICandidateCvExperience,
  ICandidateCvSkill,
  ICandidateCvTraining,
  ICandidateCvListItem,
  ICandidateCvListResponse,
  IProfileExtractedDataResponse,
} from './types/candidateResume.types'
export type {
  ICreateGeneratedCvPayload,
  IGeneratedCvDetail,
  IGeneratedCvListItem,
  IGeneratedCvRenderData,
} from './types/generatedCv.types'
