import http from 'node:http'
import jwt from 'jsonwebtoken'
import type { SignOptions } from 'jsonwebtoken'
import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { env } from '../config/env.js'
import { prisma } from '../config/prisma.js'
import { saveCandidateCvAnalysis } from '../repositories/candidateCvRepository.js'

const runRealDbIntegrationTests = process.env.RUN_REAL_DB_INTEGRATION_TESTS === 'true'

type Fixture = {
  userId: string
  secondUserId: string
  profileId: string
  cvId: string
}

type JsonResponseBody = {
  data: Record<string, unknown>
}

let server: http.Server | undefined
let baseUrl = ''

async function startApp() {
  const { app } = await import('../app.js')
  const instance = app.listen(0)
  await new Promise<void>((resolve) => instance.once('listening', resolve))
  server = instance

  const address = instance.address()
  if (!address || typeof address === 'string') {
    throw new Error('Impossible de demarrer le serveur de test')
  }

  baseUrl = `http://127.0.0.1:${address.port}`
}

async function stopApp() {
  if (!server) {
    return
  }

  await new Promise<void>((resolve, reject) => {
    server?.close((error) => (error ? reject(error) : resolve()))
  })
  server = undefined
}

function createToken(userId: string, expiresIn: SignOptions['expiresIn'] = '1h') {
  return jwt.sign({ sub: userId, email: `${userId}@example.test` }, env.JWT_SECRET, {
    expiresIn,
  })
}

async function requestJson(
  path: string,
  token: string,
  options: RequestInit = {},
): Promise<{ body: JsonResponseBody; status: number }> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  return { body: (await response.json()) as JsonResponseBody, status: response.status }
}

async function createUser(prefix: string): Promise<string> {
  const user = await prisma.user.create({
    data: {
      firstname: 'Integration',
      lastname: 'Experience',
      email: `${prefix}-${Date.now()}-${Math.random()}@example.test`,
      passwordHash: 'not-a-real-password',
    },
  })

  return user.id
}

async function createCandidateCv(profileId: string) {
  return prisma.candidateCv.create({
    data: {
      candidateProfileId: profileId,
      label: 'CV integration',
      originalFilename: 'integration.pdf',
      storageFilename: 'integration.pdf',
      storageKey: `integration/${profileId}/integration.pdf`,
      mimeType: 'application/pdf',
      fileSize: 1,
      isDefault: true,
    },
  })
}

describe.skipIf(!runRealDbIntegrationTests)('candidate profile data API PostgreSQL integration', () => {
  let fixture: Fixture

  beforeEach(async () => {
    fixture = {
      userId: await createUser('experience-owner'),
      secondUserId: await createUser('experience-other'),
      profileId: '',
      cvId: '',
    }

    await startApp()
  })

  afterEach(async () => {
    await stopApp()
    await prisma.user.delete({ where: { id: fixture.userId } }).catch(() => undefined)
    await prisma.user.delete({ where: { id: fixture.secondUserId } }).catch(() => undefined)
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('creates, partially updates and deletes a manual experience with ownership protection', async () => {
    const ownerToken = createToken(fixture.userId)
    const otherToken = createToken(fixture.secondUserId)

    const createResult = await requestJson('/api/v1/profile/experiences', ownerToken, {
      method: 'POST',
      body: JSON.stringify({
        jobTitle: 'Developpeur',
        companyName: 'Acme',
        startDate: '2024',
      }),
    })

    expect(createResult.status).toBe(201)
    expect(createResult.body.data).toMatchObject({
      candidateCvId: null,
      source: 'MANUAL',
      jobTitle: 'Developpeur',
      companyName: 'Acme',
    })

    const experienceId = createResult.body.data.id as string
    const profile = await prisma.candidateProfile.findUnique({
      where: { userId: fixture.userId },
    })
    expect(profile).not.toBeNull()
    fixture.profileId = profile?.id ?? ''

    const storedAfterCreate = await prisma.cvExperience.findUnique({
      where: { id: experienceId },
    })
    expect(storedAfterCreate).toMatchObject({
      candidateProfileId: fixture.profileId,
      candidateCvId: null,
      source: 'MANUAL',
    })

    const updateResult = await requestJson(
      `/api/v1/profile/experiences/${experienceId}`,
      ownerToken,
      {
        method: 'PATCH',
        body: JSON.stringify({ jobTitle: 'Senior developpeur' }),
      },
    )
    expect(updateResult.status).toBe(200)

    const storedAfterUpdate = await prisma.cvExperience.findUnique({
      where: { id: experienceId },
    })
    expect(storedAfterUpdate).toMatchObject({
      jobTitle: 'Senior developpeur',
      companyName: 'Acme',
      startDate: '2024',
      source: 'MANUAL',
    })

    const otherUpdate = await requestJson(
      `/api/v1/profile/experiences/${experienceId}`,
      otherToken,
      {
        method: 'PATCH',
        body: JSON.stringify({ jobTitle: 'Intrusion' }),
      },
    )
    expect(otherUpdate.status).toBe(404)

    const otherDelete = await requestJson(
      `/api/v1/profile/experiences/${experienceId}`,
      otherToken,
      { method: 'DELETE' },
    )
    expect(otherDelete.status).toBe(404)

    const deleteResult = await requestJson(
      `/api/v1/profile/experiences/${experienceId}`,
      ownerToken,
      { method: 'DELETE' },
    )
    expect(deleteResult.status).toBe(200)
    expect(await prisma.cvExperience.findUnique({ where: { id: experienceId } })).toBeNull()
  })

  it('preserves the CV provenance when an AI experience becomes manual', async () => {
    const ownerToken = createToken(fixture.userId)
    const profile = await prisma.candidateProfile.create({
      data: { userId: fixture.userId },
    })
    const cv = await createCandidateCv(profile.id)
    fixture.profileId = profile.id
    fixture.cvId = cv.id

    const aiExperience = await prisma.cvExperience.create({
      data: {
        candidateProfileId: profile.id,
        candidateCvId: cv.id,
        source: 'AI',
        jobTitle: 'Developpeur IA',
      },
    })

    const updateResult = await requestJson(
      `/api/v1/profile/experiences/${aiExperience.id}`,
      ownerToken,
      {
        method: 'PATCH',
        body: JSON.stringify({ jobTitle: 'Developpeur modifie' }),
      },
    )
    expect(updateResult.status).toBe(200)

    const updated = await prisma.cvExperience.findUnique({
      where: { id: aiExperience.id },
    })
    expect(updated).toMatchObject({
      candidateCvId: cv.id,
      source: 'MANUAL',
      jobTitle: 'Developpeur modifie',
    })

    await saveCandidateCvAnalysis(cv.id, profile.id, {
      experiences: [
        {
          jobTitle: 'Nouvelle experience IA',
          companyName: null,
          startDate: null,
          endDate: null,
          isCurrent: false,
          location: null,
          description: null,
        },
      ],
      skills: [],
      trainings: [],
    }, 'updated text')

    const experiences = await prisma.cvExperience.findMany({
      where: { candidateProfileId: profile.id },
      orderBy: { jobTitle: 'asc' },
    })
    expect(experiences).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: aiExperience.id,
          source: 'MANUAL',
          candidateCvId: cv.id,
        }),
        expect.objectContaining({
          jobTitle: 'Nouvelle experience IA',
          source: 'AI',
        }),
      ]),
    )
  })

  it('creates, updates and deletes a manual training with ownership protection', async () => {
    const ownerToken = createToken(fixture.userId)
    const otherToken = createToken(fixture.secondUserId)

    const createResult = await requestJson('/api/v1/profile/trainings', ownerToken, {
      method: 'POST',
      body: JSON.stringify({
        title: 'Formation web',
        organizationName: 'Acme',
        degree: 'Master',
        startDate: '2022',
      }),
    })

    expect(createResult.status).toBe(201)
    expect(createResult.body.data).toMatchObject({
      title: 'Formation web',
      organizationName: 'Acme',
      candidateCvId: null,
      source: 'MANUAL',
    })

    const trainingId = createResult.body.data.id as string
    const profile = await prisma.candidateProfile.findUnique({ where: { userId: fixture.userId } })
    expect(profile).not.toBeNull()
    fixture.profileId = profile?.id ?? ''

    expect(await prisma.cvTraining.findUnique({ where: { id: trainingId } })).toMatchObject({
      candidateProfileId: fixture.profileId,
      candidateCvId: null,
      source: 'MANUAL',
    })

    const updateResult = await requestJson(`/api/v1/profile/trainings/${trainingId}`, ownerToken, {
      method: 'PATCH',
      body: JSON.stringify({ degree: 'Master specialise', certificationType: 'Ancienne valeur' }),
    })
    expect(updateResult.status).toBe(200)
    expect(updateResult.body.data).toMatchObject({ degree: 'Master specialise', source: 'MANUAL' })
    expect(await prisma.cvTraining.findUnique({ where: { id: trainingId } })).toMatchObject({
      degree: 'Master specialise',
      source: 'MANUAL',
    })

    expect((await requestJson(`/api/v1/profile/trainings/${trainingId}`, otherToken, {
      method: 'PATCH',
      body: JSON.stringify({ title: 'Intrusion' }),
    })).status).toBe(404)
    expect((await requestJson(`/api/v1/profile/trainings/${trainingId}`, otherToken, { method: 'DELETE' })).status).toBe(404)
    expect((await requestJson('/api/v1/profile/trainings/not-a-training', ownerToken, { method: 'DELETE' })).status).toBe(400)

    expect((await requestJson(`/api/v1/profile/trainings/${trainingId}`, ownerToken, { method: 'DELETE' })).status).toBe(200)
    expect(await prisma.cvTraining.findUnique({ where: { id: trainingId } })).toBeNull()
  })

  it('keeps manual trainings and corrected AI trainings during re-analysis', async () => {
    const ownerToken = createToken(fixture.userId)
    const profile = await prisma.candidateProfile.create({ data: { userId: fixture.userId } })
    const cv = await createCandidateCv(profile.id)
    fixture.profileId = profile.id
    fixture.cvId = cv.id

    const correctedAiTraining = await prisma.cvTraining.create({
      data: {
        candidateProfileId: profile.id,
        candidateCvId: cv.id,
        source: 'AI',
        title: 'Formation IA corrigee',
        organizationName: 'Ancien organisme',
      },
    })
    await prisma.cvTraining.create({
      data: {
        candidateProfileId: profile.id,
        candidateCvId: cv.id,
        source: 'AI',
        title: 'Formation IA obsolete',
      },
    })
    const manualTraining = await prisma.cvTraining.create({
      data: {
        candidateProfileId: profile.id,
        candidateCvId: null,
        source: 'MANUAL',
        title: 'Formation ajoutee manuellement',
      },
    })

    const updateResult = await requestJson(`/api/v1/profile/trainings/${correctedAiTraining.id}`, ownerToken, {
      method: 'PATCH',
      body: JSON.stringify({ title: 'Formation IA corrigee par utilisateur', organizationName: 'Nouvel organisme' }),
    })
    expect(updateResult.status).toBe(200)

    await saveCandidateCvAnalysis(cv.id, profile.id, {
      experiences: [],
      skills: [],
      trainings: [{
        title: 'Formation IA nouvelle',
        organizationName: 'Nouvelle source',
        degree: null,
        fieldOfStudy: null,
        startDate: null,
        endDate: null,
        description: null,
        location: null,
        isCertification: false,
        certificationType: null,
      }],
    }, 're-analyzed text')

    const trainings = await prisma.cvTraining.findMany({ where: { candidateProfileId: profile.id } })
    expect(trainings).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: correctedAiTraining.id,
        title: 'Formation IA corrigee par utilisateur',
        organizationName: 'Nouvel organisme',
        candidateCvId: cv.id,
        source: 'MANUAL',
      }),
      expect.objectContaining({
        id: manualTraining.id,
        title: 'Formation ajoutee manuellement',
        candidateCvId: null,
        source: 'MANUAL',
      }),
      expect.objectContaining({
        title: 'Formation IA nouvelle',
        candidateCvId: cv.id,
        source: 'AI',
      }),
    ]))
    expect(trainings.some((training) => training.title === 'Formation IA obsolete')).toBe(false)
  })

  it('creates and deletes a manual skill with profile ownership protection', async () => {
    const ownerToken = createToken(fixture.userId)
    const otherToken = createToken(fixture.secondUserId)
    const createResult = await requestJson('/api/v1/profile/skills', ownerToken, {
      method: 'POST',
      body: JSON.stringify({ name: 'TypeScript', category: 'LANGUAGES' }),
    })
    expect(createResult.status).toBe(201)
    expect(createResult.body.data).toMatchObject({ candidateCvId: null, dataSource: 'MANUAL', source: null, name: 'TypeScript' })
    const skillId = createResult.body.data.id as string
    expect((await requestJson(`/api/v1/profile/skills/${skillId}`, otherToken, { method: 'DELETE' })).status).toBe(404)
    expect((await requestJson('/api/v1/profile/skills/not-a-skill', ownerToken, { method: 'DELETE' })).status).toBe(400)
    expect((await requestJson(`/api/v1/profile/skills/${skillId}`, ownerToken, { method: 'DELETE' })).status).toBe(200)
  })
})
