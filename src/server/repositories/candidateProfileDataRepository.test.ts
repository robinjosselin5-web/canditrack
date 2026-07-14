import { beforeEach, describe, expect, it, vi } from 'vitest'

const prismaMock = vi.hoisted(() => ({
  cvExperience: {
    create: vi.fn(),
    deleteMany: vi.fn(),
    findFirst: vi.fn(),
    updateMany: vi.fn(),
  },
  cvTraining: {
    create: vi.fn(), deleteMany: vi.fn(), findFirst: vi.fn(), updateMany: vi.fn(),
  },
  cvSkill: { create: vi.fn(), deleteMany: vi.fn() },
}))

vi.mock('../config/prisma.js', () => ({ prisma: prismaMock }))

describe('candidateProfileDataRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates a manual experience with profile ownership and no CV', async () => {
    prismaMock.cvExperience.create.mockResolvedValueOnce({ id: 'experience-1' })
    const { createCandidateExperience } = await import('./candidateProfileDataRepository.js')

    await createCandidateExperience('profile-1', { jobTitle: 'Developpeur' })

    expect(prismaMock.cvExperience.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          candidateProfileId: 'profile-1',
          candidateCvId: null,
          source: 'MANUAL',
          jobTitle: 'Developpeur',
        },
      }),
    )
  })

  it('updates only an experience scoped by id and profile', async () => {
    prismaMock.cvExperience.updateMany.mockResolvedValueOnce({ count: 1 })
    prismaMock.cvExperience.findFirst.mockResolvedValueOnce({ id: 'experience-1' })
    const { updateCandidateExperienceByIdForProfile } = await import('./candidateProfileDataRepository.js')

    await updateCandidateExperienceByIdForProfile('experience-1', 'profile-1', {
      jobTitle: 'Senior developpeur',
      source: 'MANUAL',
    })

    expect(prismaMock.cvExperience.updateMany).toHaveBeenCalledWith({
      where: { id: 'experience-1', candidateProfileId: 'profile-1' },
      data: { jobTitle: 'Senior developpeur', source: 'MANUAL' },
    })
  })

  it('does not read an updated experience when the scoped update matches nothing', async () => {
    prismaMock.cvExperience.updateMany.mockResolvedValueOnce({ count: 0 })
    const { updateCandidateExperienceByIdForProfile } = await import('./candidateProfileDataRepository.js')

    await expect(
      updateCandidateExperienceByIdForProfile('experience-1', 'profile-1', {
        source: 'MANUAL',
      }),
    ).resolves.toBeNull()
    expect(prismaMock.cvExperience.findFirst).not.toHaveBeenCalled()
  })

  it('deletes only an experience scoped by id and profile', async () => {
    prismaMock.cvExperience.deleteMany.mockResolvedValueOnce({ count: 1 })
    const { deleteCandidateExperienceByIdForProfile } = await import('./candidateProfileDataRepository.js')

    await expect(
      deleteCandidateExperienceByIdForProfile('experience-1', 'profile-1'),
    ).resolves.toBe(true)

    expect(prismaMock.cvExperience.deleteMany).toHaveBeenCalledWith({
      where: { id: 'experience-1', candidateProfileId: 'profile-1' },
    })
  })

  it('creates, finds, updates, and deletes a training within the profile scope', async () => {
    prismaMock.cvTraining.create.mockResolvedValueOnce({ id: 'training-1' })
    prismaMock.cvTraining.findFirst.mockResolvedValueOnce({ id: 'training-1' })
    prismaMock.cvTraining.updateMany.mockResolvedValueOnce({ count: 1 })
    prismaMock.cvTraining.deleteMany.mockResolvedValueOnce({ count: 1 })
    const repository = await import('./candidateProfileDataRepository.js')
    const data = { title: 'Formation web', isCertification: true }

    await repository.createCandidateTraining('profile-1', data)
    await repository.findCandidateTrainingByIdForProfile('training-1', 'profile-1')
    await repository.updateCandidateTrainingByIdForProfile('training-1', 'profile-1', { degree: 'Master', source: 'MANUAL' })
    await expect(repository.deleteCandidateTrainingByIdForProfile('training-1', 'profile-1')).resolves.toBe(true)

    expect(prismaMock.cvTraining.create).toHaveBeenCalledWith(expect.objectContaining({ data: { ...data, candidateProfileId: 'profile-1', candidateCvId: null, source: 'MANUAL' } }))
    expect(prismaMock.cvTraining.findFirst).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 'training-1', candidateProfileId: 'profile-1' } }))
    expect(prismaMock.cvTraining.updateMany).toHaveBeenCalledWith({ where: { id: 'training-1', candidateProfileId: 'profile-1' }, data: { degree: 'Master', source: 'MANUAL' } })
    expect(prismaMock.cvTraining.deleteMany).toHaveBeenCalledWith({ where: { id: 'training-1', candidateProfileId: 'profile-1' } })
  })

  it('returns null or false for a missing training', async () => {
    prismaMock.cvTraining.updateMany.mockResolvedValueOnce({ count: 0 })
    prismaMock.cvTraining.deleteMany.mockResolvedValueOnce({ count: 0 })
    const repository = await import('./candidateProfileDataRepository.js')
    await expect(repository.updateCandidateTrainingByIdForProfile('training-1', 'profile-1', { title: 'Autre', source: 'MANUAL' })).resolves.toBeNull()
    await expect(repository.deleteCandidateTrainingByIdForProfile('training-1', 'profile-1')).resolves.toBe(false)
  })

  it('creates and deletes a manual skill within the profile scope', async () => {
    prismaMock.cvSkill.create.mockResolvedValueOnce({ id: 'skill-1' })
    prismaMock.cvSkill.deleteMany.mockResolvedValueOnce({ count: 1 })
    const repository = await import('./candidateProfileDataRepository.js')

    await repository.createCandidateSkill('profile-1', { name: 'TypeScript', category: 'LANGUAGES' })
    await expect(repository.deleteCandidateSkillByIdForProfile('skill-1', 'profile-1')).resolves.toBe(true)

    expect(prismaMock.cvSkill.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ candidateProfileId: 'profile-1', candidateCvId: null, dataSource: 'MANUAL', confidence: null, source: null }),
    }))
    expect(prismaMock.cvSkill.deleteMany).toHaveBeenCalledWith({ where: { id: 'skill-1', candidateProfileId: 'profile-1' } })
  })
})
