import { beforeEach, describe, expect, it, vi } from 'vitest'

const prismaMock = vi.hoisted(() => ({
  cvExperience: {
    create: vi.fn(),
    deleteMany: vi.fn(),
    findFirst: vi.fn(),
    updateMany: vi.fn(),
  },
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
})
