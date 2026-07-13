// Attention: le modèle Prisma `Resume` et la feature frontend `candidateCv`
// représentent deux concepts différents. Ici, la feature métier manipule les
// CV candidats importés, tandis que `Resume` côté base est un modèle distinct.
export { ExtractedDataPage } from './pages/ExtractedDataPage'
export { ExperiencesPage } from './pages/ExperiencesPage'
export { MyResumesPage as MyCVsPage } from './pages/MyResumesPage'
export { SkillsPage } from './pages/SkillsPage'
export { TrainingPage } from './pages/TrainingPage'
export {
  analyzeCandidateCv,
  createCandidateCv,
  deleteCandidateCv,
  getCandidateCvExtractedData,
  getCandidateCvs,
  type ICreateCandidateCvPayload,
} from './services/candidateResumeService'
export type {
  ICandidateCv,
  ICandidateCvExperience,
  ICandidateCvSkill,
  ICandidateCvTraining,
  ICandidateCvExtractedDataResponse,
  ICandidateCvExtractedDataCvSummary,
  ICandidateCvListItem,
  ICandidateCvListResponse,
} from './types/candidateResume.types'
