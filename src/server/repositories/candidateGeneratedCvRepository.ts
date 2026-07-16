import type { Prisma } from '@prisma/client'
import { prisma } from '../config/prisma.js'

const generatedCvInclude = {
  experiences: { orderBy: { position: 'asc' as const } },
  skills: { orderBy: { position: 'asc' as const } },
  trainings: { orderBy: { position: 'asc' as const } },
  languages: { orderBy: { position: 'asc' as const } },
} as const

export async function findUserPersonalDataForGeneratedCv(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      firstname: true,
      lastname: true,
      email: true,
      age: true,
      phone: true,
      address: true,
      linkedin: true,
      github: true,
      avatarStorageKey: true,
      avatarMimeType: true,
      candidateProfile: { select: { id: true } },
    },
  })
}

export async function findExperiencesForProfile(
  experienceIds: string[],
  candidateProfileId: string,
) {
  return prisma.cvExperience.findMany({
    where: { id: { in: experienceIds }, candidateProfileId },
  })
}

export async function findSkillsForProfile(
  skillIds: string[],
  candidateProfileId: string,
) {
  return prisma.cvSkill.findMany({
    where: { id: { in: skillIds }, candidateProfileId },
  })
}

export async function findTrainingsForProfile(
  trainingIds: string[],
  candidateProfileId: string,
) {
  return prisma.cvTraining.findMany({
    where: { id: { in: trainingIds }, candidateProfileId },
  })
}

export async function createGeneratedCvSnapshot(
  data: Prisma.CandidateGeneratedCvCreateInput,
  experiences: Omit<Prisma.CandidateGeneratedCvExperienceCreateManyInput, 'candidateGeneratedCvId'>[],
  skills: Omit<Prisma.CandidateGeneratedCvSkillCreateManyInput, 'candidateGeneratedCvId'>[],
  languages: Omit<Prisma.CandidateGeneratedCvLanguageCreateManyInput, 'candidateGeneratedCvId'>[],
  trainings: Omit<Prisma.CandidateGeneratedCvTrainingCreateManyInput, 'candidateGeneratedCvId'>[],
) {
  return prisma.$transaction(async (tx) => {
    const generatedCv = await tx.candidateGeneratedCv.create({ data })

    if (experiences.length > 0) {
      await tx.candidateGeneratedCvExperience.createMany({
        data: experiences.map((experience) => ({ ...experience, candidateGeneratedCvId: generatedCv.id })),
      })
    }
    if (skills.length > 0) {
      await tx.candidateGeneratedCvSkill.createMany({
        data: skills.map((skill) => ({ ...skill, candidateGeneratedCvId: generatedCv.id })),
      })
    }
    if (languages.length > 0) {
      await tx.candidateGeneratedCvLanguage.createMany({
        data: languages.map((language) => ({ ...language, candidateGeneratedCvId: generatedCv.id })),
      })
    }
    if (trainings.length > 0) {
      await tx.candidateGeneratedCvTraining.createMany({
        data: trainings.map((training) => ({ ...training, candidateGeneratedCvId: generatedCv.id })),
      })
    }

    return tx.candidateGeneratedCv.findUniqueOrThrow({
      where: { id: generatedCv.id },
      include: generatedCvInclude,
    })
  })
}

export async function findGeneratedCvByIdForOwner(
  id: string,
  candidateProfileId: string,
) {
  return prisma.candidateGeneratedCv.findFirst({
    where: { id, candidateProfileId },
    include: generatedCvInclude,
  })
}

export async function findGeneratedCvsForProfile(candidateProfileId: string) {
  return prisma.candidateGeneratedCv.findMany({
    where: { candidateProfileId },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: {
          experiences: true,
          skills: true,
          trainings: true,
          languages: true,
        },
      },
    },
  })
}

export async function findGeneratedCvByPublicId(publicId: string) {
  return prisma.candidateGeneratedCv.findFirst({
    where: { publicId, visibility: 'LINK_ONLY' },
    include: generatedCvInclude,
  })
}
