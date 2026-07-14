import { beforeEach, describe, expect, it, vi } from 'vitest'

const transactionModels = vi.hoisted(() => ({
  cvExperience: {
    createMany: vi.fn(),
    deleteMany: vi.fn(),
    findMany: vi.fn(),
  },
  cvSkill: {
    createMany: vi.fn(),
    deleteMany: vi.fn(),
    findMany: vi.fn(),
  },
  cvTraining: {
    createMany: vi.fn(),
    deleteMany: vi.fn(),
    findMany: vi.fn(),
  },
  candidateCv: {
    update: vi.fn(),
  },
}))

const prismaMock = vi.hoisted(() => ({
  cvExperience: transactionModels.cvExperience,
  cvSkill: transactionModels.cvSkill,
  cvTraining: transactionModels.cvTraining,
  $transaction: vi.fn(async (callback: (transaction: typeof transactionModels) => unknown) =>
    callback(transactionModels),
  ),
}))

vi.mock('../config/prisma.js', () => ({ prisma: prismaMock }))

describe('candidateCvRepository.saveCandidateCvAnalysis', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deletes only the analyzed CV data and persists both ownership identifiers', async () => {
    const { saveCandidateCvAnalysis } = await import('./candidateCvRepository.js')
    const analysis = {
      experiences: [
        {
          jobTitle: 'Developpeur',
          companyName: 'Acme',
          startDate: '2024',
          endDate: null,
          isCurrent: true,
          location: 'Paris',
          description: 'Produit web',
        },
      ],
      skills: [
        {
          name: 'TypeScript',
          category: 'PROGRAMMING_LANGUAGES' as const,
          confidence: 0.9,
          source: 'Projet',
        },
      ],
      trainings: [
        {
          title: 'Formation web',
          organizationName: 'Acme Academy',
          degree: null,
          fieldOfStudy: 'Web',
          startDate: '2023',
          endDate: '2024',
          description: null,
          location: 'Paris',
          isCertification: false,
          certificationType: null,
        },
      ],
    }

    await saveCandidateCvAnalysis('cv-a', 'profile-1', analysis, 'CV text')

    expect(transactionModels.cvExperience.deleteMany).toHaveBeenCalledWith({
      where: { candidateCvId: 'cv-a', source: 'AI' },
    })
    expect(transactionModels.cvSkill.deleteMany).toHaveBeenCalledWith({
      where: { candidateCvId: 'cv-a', dataSource: 'AI' },
    })
    expect(transactionModels.cvTraining.deleteMany).toHaveBeenCalledWith({
      where: { candidateCvId: 'cv-a', source: 'AI' },
    })

    expect(transactionModels.cvExperience.createMany).toHaveBeenCalledWith({
      data: [expect.objectContaining({ candidateProfileId: 'profile-1', candidateCvId: 'cv-a', source: 'AI' })],
    })
    expect(transactionModels.cvSkill.createMany).toHaveBeenCalledWith({
      data: [expect.objectContaining({ candidateProfileId: 'profile-1', candidateCvId: 'cv-a', dataSource: 'AI' })],
    })
    expect(transactionModels.cvTraining.createMany).toHaveBeenCalledWith({
      data: [expect.objectContaining({ candidateProfileId: 'profile-1', candidateCvId: 'cv-a', source: 'AI' })],
    })
  })
})

describe('candidateCvRepository.getProfileExtractedData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('queries all extracted data directly by profile and preserves null CV provenance', async () => {
    transactionModels.cvExperience.findMany.mockResolvedValueOnce([
      { id: 'experience-1', jobTitle: 'Developpeur', candidateCvId: null, source: 'MANUAL' },
    ])
    transactionModels.cvSkill.findMany.mockResolvedValueOnce([
      { id: 'skill-1', name: 'TypeScript', candidateCvId: null, dataSource: 'MANUAL' },
    ])
    transactionModels.cvTraining.findMany.mockResolvedValueOnce([
      { id: 'training-1', title: 'Formation web', candidateCvId: null, source: 'MANUAL' },
    ])

    const { getProfileExtractedData } = await import('./candidateCvRepository.js')

    await expect(getProfileExtractedData('profile-1')).resolves.toEqual({
      experiences: [{ id: 'experience-1', jobTitle: 'Developpeur', candidateCvId: null, source: 'MANUAL' }],
      skills: [{ id: 'skill-1', name: 'TypeScript', candidateCvId: null, dataSource: 'MANUAL' }],
      trainings: [{ id: 'training-1', title: 'Formation web', candidateCvId: null, source: 'MANUAL' }],
    })

    expect(transactionModels.cvExperience.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { candidateProfileId: 'profile-1' },
        orderBy: [{ startDate: 'desc' }, { createdAt: 'desc' }],
      }),
    )
    expect(transactionModels.cvSkill.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { candidateProfileId: 'profile-1' },
        orderBy: [{ category: 'asc' }, { name: 'asc' }],
      }),
    )
    expect(transactionModels.cvTraining.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { candidateProfileId: 'profile-1' },
        orderBy: [{ startDate: 'desc' }, { createdAt: 'desc' }],
        select: expect.objectContaining({
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
        }),
      }),
    )
  })
})
