import { AppError } from '../errors/appError.js'
import {
  createGeneratedCvSnapshot,
  findExperiencesForProfile,
  findGeneratedCvByIdForOwner,
  findGeneratedCvByPublicId,
  findGeneratedCvsForProfile,
  findSkillsForProfile,
  findTrainingsForProfile,
  findUserPersonalDataForGeneratedCv,
} from '../repositories/candidateGeneratedCvRepository.js'
import type {
  ICreateCandidateGeneratedCvInput,
  IGeneratedCvDetail,
  IGeneratedCvRenderData,
  IGeneratedCvListItem,
} from '../types/candidateGeneratedCv.types.js'

export async function createGeneratedCvForUser(
  userId: string,
  input: ICreateCandidateGeneratedCvInput,
): Promise<IGeneratedCvDetail> {
  const user = await findUserPersonalDataForGeneratedCv(userId)
  if (!user) throw new AppError('Utilisateur introuvable.', 404)
  if (!user.candidateProfile) throw new AppError('Profil candidat introuvable.', 404)

  const { candidateProfileId } = { candidateProfileId: user.candidateProfile.id }
  const [experiences, skills, trainings] = await Promise.all([
    findExperiencesForProfile(input.experienceIds, candidateProfileId),
    findSkillsForProfile(input.skillIds, candidateProfileId),
    findTrainingsForProfile(input.trainingIds, candidateProfileId),
  ])

  if (
    experiences.length !== input.experienceIds.length ||
    skills.length !== input.skillIds.length ||
    trainings.length !== input.trainingIds.length
  ) {
    throw new AppError('Une donnée sélectionnée est introuvable.', 404)
  }

  const snapshot = await createGeneratedCvSnapshot(
    {
      candidateProfile: { connect: { id: candidateProfileId } },
      title: input.title,
      visibility: 'LINK_ONLY',
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      age: user.age,
      phone: user.phone,
      address: user.address,
      linkedin: user.linkedin,
      github: user.github,
      avatarStorageKey: user.avatarStorageKey,
      avatarMimeType: user.avatarMimeType,
    },
    experiences.map((experience, position) => ({
      sourceExperienceId: experience.id,
      jobTitle: experience.jobTitle,
      companyName: experience.companyName,
      startDate: experience.startDate,
      endDate: experience.endDate,
      isCurrent: experience.isCurrent,
      location: experience.location,
      description: experience.description,
      position,
    })),
    skills.filter((skill) => skill.category !== 'SPOKEN_LANGUAGES').map((skill, position) => ({
      sourceSkillId: skill.id,
      name: skill.name,
      category: skill.category,
      position,
    })),
    skills.filter((skill) => skill.category === 'SPOKEN_LANGUAGES').map((skill, position) => ({
      sourceSkillId: skill.id,
      name: skill.name,
      position,
    })),
    trainings.map((training, position) => ({
      sourceTrainingId: training.id,
      title: training.title,
      organizationName: training.organizationName,
      degree: training.degree,
      fieldOfStudy: training.fieldOfStudy,
      startDate: training.startDate,
      endDate: training.endDate,
      description: training.description,
      location: training.location,
      isCertification: training.isCertification,
      certificationType: training.certificationType,
      position,
    })),
  )

  return mapGeneratedCvToDetail(snapshot)
}

export async function getGeneratedCvsForUser(userId: string): Promise<IGeneratedCvListItem[]> {
  const user = await findUserPersonalDataForGeneratedCv(userId)
  if (!user?.candidateProfile) return []
  const cvs = await findGeneratedCvsForProfile(user.candidateProfile.id)
  return cvs.map((cv) => ({
    id: cv.id,
    publicId: cv.publicId,
    title: cv.title,
    visibility: cv.visibility,
    createdAt: cv.createdAt.toISOString(),
    experienceCount: cv._count.experiences,
    skillCount: cv._count.skills,
    trainingCount: cv._count.trainings,
    languageCount: cv._count.languages,
  }))
}

export async function getGeneratedCvForUser(userId: string, id: string): Promise<IGeneratedCvDetail> {
  const user = await findUserPersonalDataForGeneratedCv(userId)
  if (!user?.candidateProfile) throw new AppError('CV généré introuvable.', 404)
  const cv = await findGeneratedCvByIdForOwner(id, user.candidateProfile.id)
  if (!cv) throw new AppError('CV généré introuvable.', 404)
  return mapGeneratedCvToDetail(cv)
}

export async function getPublicGeneratedCv(publicId: string): Promise<IGeneratedCvRenderData> {
  const cv = await findGeneratedCvByPublicId(publicId)
  if (!cv) throw new AppError('CV généré introuvable.', 404)
  return mapGeneratedCvToRenderData(cv)
}

export function slugifyCandidateName(lastname: string, firstname: string): string {
  return `${lastname}-${firstname}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
}

export function mapGeneratedCvToRenderData(
  cv: Awaited<ReturnType<typeof findGeneratedCvByPublicId>>,
): IGeneratedCvRenderData {
  if (!cv) throw new AppError('CV généré introuvable.', 404)
  const detail = mapGeneratedCvToDetail(cv)
  return {
    publicId: detail.publicId,
    title: detail.title,
    firstname: detail.firstname,
    lastname: detail.lastname,
    email: detail.email,
    phone: detail.phone,
    address: detail.address,
    age: detail.age,
    linkedin: detail.linkedin,
    github: detail.github,
    hasAvatar: Boolean(detail.avatarStorageKey),
    slug: slugifyCandidateName(detail.lastname, detail.firstname),
    createdAt: detail.createdAt,
    experiences: detail.experiences.map((experience) =>
      omitInternalFields(experience, ['id', 'sourceExperienceId']),
    ) as IGeneratedCvRenderData['experiences'],
    skills: detail.skills.map((skill) =>
      omitInternalFields(skill, ['id', 'sourceSkillId']),
    ) as IGeneratedCvRenderData['skills'],
    trainings: detail.trainings.map((training) =>
      omitInternalFields(training, ['id', 'sourceTrainingId']),
    ) as IGeneratedCvRenderData['trainings'],
    languages: detail.languages.map((language) =>
      omitInternalFields(language, ['id', 'sourceSkillId']),
    ) as IGeneratedCvRenderData['languages'],
  }
}

function omitInternalFields<T extends object>(value: T, fields: string[]): Partial<T> {
  const result = { ...value } as Record<string, unknown>
  for (const field of fields) {
    delete result[field]
  }
  return result as Partial<T>
}

function mapGeneratedCvToDetail(
  cv: NonNullable<Awaited<ReturnType<typeof findGeneratedCvByIdForOwner>>>,
): IGeneratedCvDetail {
  return {
    id: cv.id,
    publicId: cv.publicId,
    candidateProfileId: cv.candidateProfileId,
    title: cv.title,
    visibility: cv.visibility,
    firstname: cv.firstname,
    lastname: cv.lastname,
    email: cv.email,
    phone: cv.phone,
    address: cv.address,
    age: cv.age,
    linkedin: cv.linkedin,
    github: cv.github,
    avatarStorageKey: cv.avatarStorageKey,
    avatarMimeType: cv.avatarMimeType,
    createdAt: cv.createdAt.toISOString(),
    updatedAt: cv.updatedAt.toISOString(),
    experiences: cv.experiences,
    skills: cv.skills,
    trainings: cv.trainings,
    languages: cv.languages,
  }
}
