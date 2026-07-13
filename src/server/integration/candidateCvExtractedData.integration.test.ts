import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { prisma } from '../config/prisma.js'
import {
  deleteCandidateCvAndReassignDefault,
  saveCandidateCvAnalysis,
} from '../repositories/candidateCvRepository.js'
import { getProfileExtractedData } from '../services/candidateCvService.js'

const runRealDbIntegrationTests = process.env.RUN_REAL_DB_INTEGRATION_TESTS === 'true'

type Fixture = {
  userId: string
  profileId: string
  cvAId: string
  cvBId: string
}

async function createFixture(): Promise<Fixture> {
  const user = await prisma.user.create({
    data: {
      firstname: 'Integration',
      lastname: 'Test',
      email: `cv-extracted-${Date.now()}-${Math.random()}@example.test`,
      passwordHash: 'not-a-real-password',
    },
  })
  const profile = await prisma.candidateProfile.create({
    data: { userId: user.id },
  })
  const cvData = {
    candidateProfileId: profile.id,
    originalFilename: 'test.pdf',
    storageFilename: 'test.pdf',
    storageKey: `integration/${profile.id}/test.pdf`,
    mimeType: 'application/pdf',
    fileSize: 1,
  }
  const cvA = await prisma.candidateCv.create({
    data: { ...cvData, label: 'CV A', isDefault: true },
  })
  const cvB = await prisma.candidateCv.create({
    data: { ...cvData, label: 'CV B', storageKey: `integration/${profile.id}/test-b.pdf` },
  })

  return { userId: user.id, profileId: profile.id, cvAId: cvA.id, cvBId: cvB.id }
}

async function createExtractedRows(profileId: string, cvId: string, suffix: string) {
  await prisma.cvExperience.create({
    data: { candidateProfileId: profileId, candidateCvId: cvId, jobTitle: `Experience ${suffix}` },
  })
  await prisma.cvSkill.create({
    data: { candidateProfileId: profileId, candidateCvId: cvId, name: `Skill ${suffix}`, category: 'OTHER' },
  })
  await prisma.cvTraining.create({
    data: { candidateProfileId: profileId, candidateCvId: cvId, title: `Training ${suffix}` },
  })
}

describe.skipIf(!runRealDbIntegrationTests)('candidate CV extracted data PostgreSQL integration', () => {
  let fixture: Fixture

  beforeEach(async () => {
    fixture = await createFixture()
  })

  afterEach(async () => {
    if (fixture) {
      await prisma.user.delete({ where: { id: fixture.userId } }).catch(() => undefined)
    }
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('aggregates extracted data from multiple CVs', async () => {
    await createExtractedRows(fixture.profileId, fixture.cvAId, 'A')
    await createExtractedRows(fixture.profileId, fixture.cvBId, 'B')

    const data = await getProfileExtractedData(fixture.userId)

    expect(data.experiences).toHaveLength(2)
    expect(data.skills).toHaveLength(2)
    expect(data.trainings).toHaveLength(2)
  })

  it('reanalyzes one CV without deleting another CV data', async () => {
    await createExtractedRows(fixture.profileId, fixture.cvAId, 'old')
    await createExtractedRows(fixture.profileId, fixture.cvBId, 'B')

    await saveCandidateCvAnalysis(fixture.cvAId, fixture.profileId, {
      experiences: [{ jobTitle: 'Experience new', companyName: null, startDate: null, endDate: null, isCurrent: false, location: null, description: null }],
      skills: [{ name: 'Skill new', category: 'OTHER', confidence: null, source: null }],
      trainings: [{ title: 'Training new', organizationName: null, degree: null, fieldOfStudy: null, startDate: null, endDate: null, description: null, location: null, isCertification: false, certificationType: null }],
    }, 'updated text')

    const data = await getProfileExtractedData(fixture.userId)
    expect(data.experiences.map((row) => row.jobTitle).sort()).toEqual(['Experience B', 'Experience new'].sort())
    expect(data.skills.map((row) => row.name).sort()).toEqual(['Skill B', 'Skill new'].sort())
    expect(data.trainings.map((row) => row.title).sort()).toEqual(['Training B', 'Training new'].sort())
  })

  it('keeps extracted data and nulls CV provenance after CV deletion', async () => {
    await createExtractedRows(fixture.profileId, fixture.cvAId, 'A')

    await deleteCandidateCvAndReassignDefault(fixture.cvAId, fixture.profileId)

    const data = await getProfileExtractedData(fixture.userId)
    expect(data.experiences).toHaveLength(1)
    expect(data.skills).toHaveLength(1)
    expect(data.trainings).toHaveLength(1)
    expect(await prisma.candidateCv.findUnique({ where: { id: fixture.cvAId } })).toBeNull()
    expect(await prisma.cvExperience.findFirst({ where: { candidateProfileId: fixture.profileId } })).toMatchObject({ candidateCvId: null })
    expect(await prisma.cvSkill.findFirst({ where: { candidateProfileId: fixture.profileId } })).toMatchObject({ candidateCvId: null })
    expect(await prisma.cvTraining.findFirst({ where: { candidateProfileId: fixture.profileId } })).toMatchObject({ candidateCvId: null })
  })

  it('cascades extracted data when the candidate profile is deleted', async () => {
    await createExtractedRows(fixture.profileId, fixture.cvAId, 'A')

    await prisma.candidateProfile.delete({ where: { id: fixture.profileId } })

    expect(await prisma.candidateCv.findMany({ where: { candidateProfileId: fixture.profileId } })).toHaveLength(0)
    expect(await prisma.cvExperience.findMany({ where: { candidateProfileId: fixture.profileId } })).toHaveLength(0)
    expect(await prisma.cvSkill.findMany({ where: { candidateProfileId: fixture.profileId } })).toHaveLength(0)
    expect(await prisma.cvTraining.findMany({ where: { candidateProfileId: fixture.profileId } })).toHaveLength(0)
  })
})
