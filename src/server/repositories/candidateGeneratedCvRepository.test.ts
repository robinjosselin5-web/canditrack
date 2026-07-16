import { beforeEach, describe, expect, it, vi } from 'vitest'

const prismaMock = vi.hoisted(() => ({
  $transaction: vi.fn(),
  candidateGeneratedCv: {
    create: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    findUniqueOrThrow: vi.fn(),
  },
  candidateGeneratedCvExperience: { createMany: vi.fn() },
  candidateGeneratedCvSkill: { createMany: vi.fn() },
  candidateGeneratedCvLanguage: { createMany: vi.fn() },
  candidateGeneratedCvTraining: { createMany: vi.fn() },
  cvExperience: { findMany: vi.fn() },
  cvSkill: { findMany: vi.fn() },
  cvTraining: { findMany: vi.fn() },
  user: { findUnique: vi.fn() },
}))

vi.mock('../config/prisma.js', () => ({ prisma: prismaMock }))

describe('candidateGeneratedCvRepository', () => {
  beforeEach(() => vi.clearAllMocks())

  it('scopes every source lookup to the candidate profile', async () => {
    const repository = await import('./candidateGeneratedCvRepository.js')
    await repository.findExperiencesForProfile(['experience-1'], 'profile-1')
    await repository.findSkillsForProfile(['skill-1'], 'profile-1')
    await repository.findTrainingsForProfile(['training-1'], 'profile-1')

    expect(prismaMock.cvExperience.findMany).toHaveBeenCalledWith({ where: { id: { in: ['experience-1'] }, candidateProfileId: 'profile-1' } })
    expect(prismaMock.cvSkill.findMany).toHaveBeenCalledWith({ where: { id: { in: ['skill-1'] }, candidateProfileId: 'profile-1' } })
    expect(prismaMock.cvTraining.findMany).toHaveBeenCalledWith({ where: { id: { in: ['training-1'] }, candidateProfileId: 'profile-1' } })
  })

  it('creates all snapshot tables in one transaction and returns the aggregate', async () => {
    const tx = {
      candidateGeneratedCv: {
        create: vi.fn().mockResolvedValue({ id: 'generated-1' }),
        findUniqueOrThrow: vi.fn().mockResolvedValue({ id: 'generated-1' }),
      },
      candidateGeneratedCvExperience: { createMany: vi.fn() },
      candidateGeneratedCvSkill: { createMany: vi.fn() },
      candidateGeneratedCvLanguage: { createMany: vi.fn() },
      candidateGeneratedCvTraining: { createMany: vi.fn() },
    }
    prismaMock.$transaction.mockImplementationOnce(async (callback) => callback(tx))
    const repository = await import('./candidateGeneratedCvRepository.js')

    await repository.createGeneratedCvSnapshot(
      { title: 'CV', visibility: 'LINK_ONLY', firstname: 'Jean', lastname: 'Dupont', email: 'jean@example.test', candidateProfile: { connect: { id: 'profile-1' } } },
      [{ sourceExperienceId: 'experience-1', jobTitle: 'Dev', position: 0 }],
      [{ sourceSkillId: 'skill-1', name: 'TypeScript', category: 'PROGRAMMING_LANGUAGES', position: 0 }],
      [{ sourceSkillId: 'skill-2', name: 'Anglais', position: 0 }],
      [{ sourceTrainingId: 'training-1', title: 'Master', position: 0 }],
    )

    expect(tx.candidateGeneratedCvExperience.createMany).toHaveBeenCalledWith({ data: [{ sourceExperienceId: 'experience-1', jobTitle: 'Dev', position: 0, candidateGeneratedCvId: 'generated-1' }] })
    expect(tx.candidateGeneratedCvSkill.createMany).toHaveBeenCalled()
    expect(tx.candidateGeneratedCvLanguage.createMany).toHaveBeenCalled()
    expect(tx.candidateGeneratedCvTraining.createMany).toHaveBeenCalled()
    expect(tx.candidateGeneratedCv.findUniqueOrThrow).toHaveBeenCalled()
  })
})
