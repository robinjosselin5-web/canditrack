import { prisma } from '../config/prisma.js'
import {
  Prisma,
  type CandidateCv,
  type CandidateProfile,
} from '@prisma/client'
import type { ICandidateCvAnalysisResponse } from '../types/candidateCv.types.js'

export async function findCandidateProfileByUserId(
  userId: string,
): Promise<CandidateProfile | null> {
  return prisma.candidateProfile.findUnique({
    where: { userId },
  })
}

export async function createCandidateProfile(
  userId: string,
): Promise<CandidateProfile> {
  return prisma.candidateProfile.create({
    data: { userId },
  })
}

export async function findCandidateCvsByProfileId(candidateProfileId: string) {
  return prisma.candidateCv.findMany({
    where: { candidateProfileId },
    orderBy: { uploadedAt: 'desc' },
    select: {
      id: true,
      label: true,
      originalFilename: true,
      mimeType: true,
      fileSize: true,
      uploadedAt: true,
      isDefault: true,
      analysisStatus: true,
      lastAnalyzedAt: true,
    },
  })
}

export async function findCandidateCvById(candidateCvId: string) {
  return prisma.candidateCv.findUnique({
    where: { id: candidateCvId },
    select: {
      id: true,
      candidateProfileId: true,
      storageKey: true,
      label: true,
      originalFilename: true,
      analysisStatus: true,
      lastAnalyzedAt: true,
      updatedAt: true,
      isDefault: true,
      uploadedAt: true,
    },
  })
}

export async function getProfileExtractedData(candidateProfileId: string) {
  const [experiences, skills, trainings] = await Promise.all([
    prisma.cvExperience.findMany({
      where: { candidateProfileId },
      orderBy: [{ startDate: 'desc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        candidateCvId: true,
        jobTitle: true,
        companyName: true,
        startDate: true,
        endDate: true,
        isCurrent: true,
        location: true,
        description: true,
        source: true,
      },
    }),
    prisma.cvSkill.findMany({
      where: { candidateProfileId },
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
      select: {
        id: true,
        candidateCvId: true,
        name: true,
        category: true,
        confidence: true,
        source: true,
        dataSource: true,
      },
    }),
    prisma.cvTraining.findMany({
      where: { candidateProfileId },
      orderBy: [{ startDate: 'desc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        candidateCvId: true,
        title: true,
        organizationName: true,
        degree: true,
        fieldOfStudy: true,
        startDate: true,
        endDate: true,
        description: true,
        location: true,
         isCertification: true,
         certificationType: true,
         source: true,
      },
    }),
  ])

  return { experiences, skills, trainings }
}

export async function deleteCandidateCvAndReassignDefault(
  candidateCvId: string,
  candidateProfileId: string,
): Promise<void> {
  await prisma.$transaction(async (tx) => {
    const candidateCv = await tx.candidateCv.delete({
      where: { id: candidateCvId },
    })

    if (!candidateCv.isDefault) {
      return
    }

    const latestRemainingCandidateCv = await tx.candidateCv.findFirst({
      where: { candidateProfileId },
      orderBy: { uploadedAt: 'desc' },
      select: {
        id: true,
      },
    })

    if (!latestRemainingCandidateCv) {
      return
    }

    await tx.candidateCv.update({
      where: { id: latestRemainingCandidateCv.id },
      data: { isDefault: true },
    })
  })
}

export async function updateCandidateCvAnalysisStatus(
  candidateCvId: string,
  data: {
    analysisStatus: 'NOT_ANALYZED' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
    extractedText?: string | null
    lastAnalyzedAt?: Date | null
  },
) {
  return prisma.candidateCv.update({
    where: { id: candidateCvId },
    data,
  })
}

export async function saveCandidateCvAnalysis(
  candidateCvId: string,
  candidateProfileId: string,
  analysis: ICandidateCvAnalysisResponse,
  extractedText: string,
): Promise<void> {
  await prisma.$transaction(async (tx) => {
    await tx.cvExperience.deleteMany({
      where: { candidateCvId, source: 'AI' },
    })

    await tx.cvSkill.deleteMany({
      where: { candidateCvId, dataSource: 'AI' },
    })

    await tx.cvTraining.deleteMany({
      where: { candidateCvId, source: 'AI' },
    })

    if (analysis.experiences.length > 0) {
      await tx.cvExperience.createMany({
        data: analysis.experiences.map((experience) => ({
          candidateProfileId,
          candidateCvId,
          source: 'AI',
          jobTitle: experience.jobTitle,
          companyName: experience.companyName,
          startDate: experience.startDate,
          endDate: experience.endDate,
          isCurrent: experience.isCurrent,
          location: experience.location,
          description: experience.description,
        })),
      })
    }

    if (analysis.skills.length > 0) {
      await tx.cvSkill.createMany({
        data: analysis.skills.map((skill) => ({
          candidateProfileId,
          candidateCvId,
          dataSource: 'AI',
          name: skill.name,
          category: skill.category,
          confidence: skill.confidence,
          source: skill.source,
        })),
      })
    }

    if (analysis.trainings.length > 0) {
      await tx.cvTraining.createMany({
        data: analysis.trainings.map((training) => ({
          candidateProfileId,
           candidateCvId,
           source: 'AI',
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
        })),
      })
    }

    await tx.candidateCv.update({
      where: { id: candidateCvId },
      data: {
        extractedText,
        lastAnalyzedAt: new Date(),
        analysisStatus: 'COMPLETED',
      },
    })
  })
}

export async function createCandidateCv(data: {
  candidateProfileId: string
  fileSize: number
  label: string
  mimeType: string
  originalFilename: string
  storageFilename: string
  storageKey: string
}): Promise<CandidateCv> {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      return await prisma.$transaction(
        async (tx) => {
          const existingCandidateCv = await tx.candidateCv.findFirst({
            where: { candidateProfileId: data.candidateProfileId },
            select: { id: true },
          })

          return tx.candidateCv.create({
            data: {
              ...data,
              isDefault: !existingCandidateCv,
            },
          })
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      )
    } catch (error) {
      if (attempt === 0 && isTransactionConflictError(error)) {
        continue
      }

      throw error
    }
  }

  throw new Error('Candidate CV creation failed.')
}

function isTransactionConflictError(error: unknown): boolean {
  return (
    error !== null &&
    typeof error === 'object' &&
    'code' in error &&
    (error as { code?: string }).code === 'P2034'
  )
}
