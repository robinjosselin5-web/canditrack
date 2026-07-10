import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AppError } from '../errors/appError.js'

const candidateCvRepositoryMock = vi.hoisted(() => ({
  createCandidateCv: vi.fn(),
  createCandidateProfile: vi.fn(),
  deleteCandidateCvAndReassignDefault: vi.fn(),
  findCandidateCvById: vi.fn(),
  findCandidateCvsByProfileId: vi.fn(),
  findCandidateProfileByUserId: vi.fn(),
  getCandidateCvExtractedData: vi.fn(),
  saveCandidateCvAnalysis: vi.fn(),
  updateCandidateCvAnalysisStatus: vi.fn(),
}))

const aiServiceMock = vi.hoisted(() => ({
  generateCandidateCvAnalysis: vi.fn(),
}))

const parserMock = vi.hoisted(() => ({
  parseCandidateCvAnalysisResponse: vi.fn(),
}))

const pdfParseMock = vi.hoisted(() => ({
  getText: vi.fn(),
}))

const cryptoMock = vi.hoisted(() => ({
  randomUUID: vi.fn(),
}))

const fsMock = vi.hoisted(() => ({
  mkdir: vi.fn(),
  writeFile: vi.fn(),
  readFile: vi.fn(),
  unlink: vi.fn(),
}))

vi.mock('../repositories/candidateCvRepository.js', () => candidateCvRepositoryMock)
vi.mock('./aiService.js', () => aiServiceMock)
vi.mock('../validators/index.js', () => parserMock)
vi.mock('pdf-parse', () => ({
  PDFParse: class {
    constructor(private readonly options: { data: Buffer }) {
      void options
    }

    async getText() {
      return pdfParseMock.getText()
    }
  },
}))
vi.mock('node:crypto', () => cryptoMock)
vi.mock('node:fs/promises', () => fsMock)

async function importCandidateCvService() {
  vi.resetModules()
  return import('./candidateCvService.js')
}

function buildPdfFile(overrides: Partial<Express.Multer.File> = {}): Express.Multer.File {
  return {
    fieldname: 'file',
    originalname: 'candidate.docx',
    encoding: '7bit',
    mimetype: 'application/octet-stream',
    size: 1024,
    buffer: Buffer.from('%PDF-1.4'),
    destination: '',
    filename: 'candidate.docx',
    path: '',
    stream: undefined as never,
    ...overrides,
  }
}

describe('candidateCvService', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    cryptoMock.randomUUID.mockReturnValue('cv-uuid-1')
    candidateCvRepositoryMock.findCandidateProfileByUserId.mockResolvedValue({
      id: 'profile-1',
    })
    candidateCvRepositoryMock.createCandidateCv.mockResolvedValue({
      id: 'cv-1',
      candidateProfileId: 'profile-1',
      fileSize: 1024,
      isDefault: true,
      label: 'candidate',
      mimeType: 'application/pdf',
      originalFilename: 'candidate.docx',
      storageFilename: 'cv-uuid-1.pdf',
      storageKey: 'users/user-1/cvs/cv-uuid-1.pdf',
      uploadedAt: new Date('2026-01-01T00:00:00.000Z'),
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    })
    candidateCvRepositoryMock.findCandidateCvById.mockResolvedValue({
      id: 'cv-1',
      candidateProfileId: 'profile-1',
      storageKey: 'users/user-1/cvs/cv-uuid-1.pdf',
      analysisStatus: 'NOT_ANALYZED',
      updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    })
    parserMock.parseCandidateCvAnalysisResponse.mockReturnValue({
      experiences: [],
      skills: [],
      trainings: [],
    })
    pdfParseMock.getText.mockResolvedValue({ text: 'CV text' })
  })

  it('rejects an undefined file', async () => {
    const { importCandidateCv } = await importCandidateCvService()

    await expect(importCandidateCv('user-1', undefined)).rejects.toMatchObject({
      message: 'Un fichier PDF est requis.',
      statusCode: 400,
    })
  })

  it('rejects an empty file', async () => {
    const { importCandidateCv } = await importCandidateCvService()

    await expect(
      importCandidateCv('user-1', buildPdfFile({ size: 0 })),
    ).rejects.toMatchObject({
      message: 'Le fichier importé est vide.',
      statusCode: 400,
    })
  })

  it('rejects a file larger than 10 MB', async () => {
    const { importCandidateCv } = await importCandidateCvService()

    await expect(
      importCandidateCv('user-1', buildPdfFile({ size: 10 * 1024 * 1024 + 1 })),
    ).rejects.toMatchObject({
      message: 'Le fichier dépasse la limite de 10 Mo.',
      statusCode: 413,
    })
  })

  it('rejects a non-PDF file when neither the mimetype nor the name matches', async () => {
    const { importCandidateCv } = await importCandidateCvService()

    await expect(
      importCandidateCv(
        'user-1',
        buildPdfFile({
          mimetype: 'application/msword',
          originalname: 'candidate.txt',
        }),
      ),
    ).rejects.toMatchObject({
      message: 'Seuls les fichiers PDF sont autorisés.',
      statusCode: 400,
    })
  })

  it('accepts a PDF mimetype even if the extension differs', async () => {
    const { importCandidateCv } = await importCandidateCvService()

    const result = await importCandidateCv(
      'user-1',
      buildPdfFile({
        mimetype: 'application/pdf',
        originalname: 'candidate.docx',
      }),
    )

    expect(fsMock.mkdir).toHaveBeenCalled()
    expect(fsMock.writeFile).toHaveBeenCalled()
    expect(candidateCvRepositoryMock.createCandidateCv).toHaveBeenCalledWith(
      expect.objectContaining({
        mimeType: 'application/pdf',
        originalFilename: 'candidate.docx',
      }),
    )
    expect(result).toMatchObject({
      id: 'cv-1',
      label: 'candidate',
    })
  })

  it('accepts a .pdf filename even if the mimetype is incorrect', async () => {
    const { importCandidateCv } = await importCandidateCvService()

    const result = await importCandidateCv(
      'user-1',
      buildPdfFile({
        mimetype: 'application/octet-stream',
        originalname: 'candidate.pdf',
      }),
    )

    expect(fsMock.mkdir).toHaveBeenCalled()
    expect(fsMock.writeFile).toHaveBeenCalled()
    expect(candidateCvRepositoryMock.createCandidateCv).toHaveBeenCalledWith(
      expect.objectContaining({
        mimeType: 'application/octet-stream',
        originalFilename: 'candidate.pdf',
      }),
    )
    expect(result).toMatchObject({
      id: 'cv-1',
      label: 'candidate',
    })
  })

  it('rejects a label whose normalized length exceeds 50 characters', async () => {
    const { importCandidateCv } = await importCandidateCvService()

    await expect(
      importCandidateCv(
        'user-1',
        buildPdfFile({ originalname: 'candidate.pdf' }),
        ' '.repeat(1) + 'a'.repeat(51) + ' '.repeat(1),
      ),
    ).rejects.toMatchObject({
      message: 'Le label ne doit pas dépasser 50 caractères.',
      statusCode: 400,
    })

    expect(candidateCvRepositoryMock.createCandidateCv).not.toHaveBeenCalled()
  })

  it('creates the candidate profile automatically when it does not exist', async () => {
    candidateCvRepositoryMock.findCandidateProfileByUserId.mockResolvedValueOnce(
      null,
    )
    candidateCvRepositoryMock.createCandidateProfile.mockResolvedValueOnce({
      id: 'profile-2',
    })

    const { importCandidateCv } = await importCandidateCvService()

    await importCandidateCv('user-1', buildPdfFile({ originalname: 'candidate.pdf' }))

    expect(candidateCvRepositoryMock.createCandidateProfile).toHaveBeenCalledWith(
      'user-1',
    )
    expect(candidateCvRepositoryMock.createCandidateCv).toHaveBeenCalledWith(
      expect.objectContaining({
        candidateProfileId: 'profile-2',
      }),
    )
  })

  it('rolls back the stored file when database insertion fails', async () => {
    const dbError = new Error('database unavailable')
    candidateCvRepositoryMock.createCandidateCv.mockRejectedValueOnce(dbError)

    const { importCandidateCv } = await importCandidateCvService()

    await expect(
      importCandidateCv('user-1', buildPdfFile({ originalname: 'candidate.pdf' })),
    ).rejects.toBe(dbError)

    expect(fsMock.unlink).toHaveBeenCalledTimes(1)
    expect(fsMock.unlink).toHaveBeenCalledWith(
      expect.stringContaining('uploads\\users\\user-1\\cvs\\cv-uuid-1.pdf'),
    )
  })

  it('does not try to rollback when mkdir fails before the database step', async () => {
    const ioError = new Error('disk full')
    fsMock.mkdir.mockRejectedValueOnce(ioError)

    const { importCandidateCv } = await importCandidateCvService()

    await expect(
      importCandidateCv('user-1', buildPdfFile({ originalname: 'candidate.pdf' })),
    ).rejects.toBe(ioError)

    expect(candidateCvRepositoryMock.createCandidateCv).not.toHaveBeenCalled()
    expect(fsMock.unlink).not.toHaveBeenCalled()
  })

  it('stores the file under users/{userId}/cvs/{uuid}.pdf on success', async () => {
    const { importCandidateCv } = await importCandidateCvService()

    await importCandidateCv('user-1', buildPdfFile({ originalname: 'candidate.pdf' }))

    expect(fsMock.mkdir).toHaveBeenCalledWith(
      expect.stringContaining('uploads\\users\\user-1\\cvs'),
      { recursive: true },
    )
    expect(fsMock.writeFile).toHaveBeenCalledWith(
      expect.stringContaining('uploads\\users\\user-1\\cvs\\cv-uuid-1.pdf'),
      expect.any(Buffer),
    )
    expect(candidateCvRepositoryMock.createCandidateCv).toHaveBeenCalledTimes(1)
  })

  it('returns an empty list when the candidate profile does not exist', async () => {
    candidateCvRepositoryMock.findCandidateProfileByUserId.mockResolvedValueOnce(
      null,
    )

    const { getCandidateCvs } = await importCandidateCvService()

    await expect(getCandidateCvs('user-1')).resolves.toEqual({ cvs: [] })

    expect(candidateCvRepositoryMock.findCandidateCvsByProfileId).not.toHaveBeenCalled()
  })

  it('returns an empty list when the candidate profile has no CVs', async () => {
    candidateCvRepositoryMock.findCandidateCvsByProfileId.mockResolvedValueOnce([])

    const { getCandidateCvs } = await importCandidateCvService()

    await expect(getCandidateCvs('user-1')).resolves.toEqual({ cvs: [] })

    expect(candidateCvRepositoryMock.findCandidateCvsByProfileId).toHaveBeenCalledWith(
      'profile-1',
    )
  })

  it('returns the mapped CV list when the profile has CVs', async () => {
    candidateCvRepositoryMock.findCandidateCvsByProfileId.mockResolvedValueOnce([
      {
        id: 'cv-1',
        label: 'CV 1',
        originalFilename: 'cv-1.pdf',
        mimeType: 'application/pdf',
        fileSize: 2048,
        uploadedAt: new Date('2026-01-01T00:00:00.000Z'),
        isDefault: true,
        analysisStatus: 'COMPLETED',
        lastAnalyzedAt: new Date('2026-01-02T00:00:00.000Z'),
      },
    ])

    const { getCandidateCvs } = await importCandidateCvService()

    await expect(getCandidateCvs('user-1')).resolves.toEqual({
      cvs: [
        {
          id: 'cv-1',
          label: 'CV 1',
          originalFilename: 'cv-1.pdf',
          mimeType: 'application/pdf',
          fileSize: 2048,
          uploadedAt: '2026-01-01T00:00:00.000Z',
          isDefault: true,
          analysisStatus: 'COMPLETED',
          lastAnalyzedAt: '2026-01-02T00:00:00.000Z',
        },
      ],
    })
  })

  it('throws a 404 when deleting a missing CV', async () => {
    candidateCvRepositoryMock.findCandidateCvById.mockResolvedValueOnce(null)

    const { deleteCandidateCv } = await importCandidateCvService()

    await expect(deleteCandidateCv('user-1', 'cv-1')).rejects.toMatchObject({
      message: 'CV introuvable.',
      statusCode: 404,
    })
  })

  it('throws a 403 when deleting a CV owned by another profile', async () => {
    candidateCvRepositoryMock.findCandidateCvById.mockResolvedValueOnce({
      id: 'cv-1',
      candidateProfileId: 'profile-2',
      storageKey: 'users/user-1/cvs/cv-uuid-1.pdf',
      analysisStatus: 'NOT_ANALYZED',
      updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    })

    const { deleteCandidateCv } = await importCandidateCvService()

    await expect(deleteCandidateCv('user-1', 'cv-1')).rejects.toMatchObject({
      message: 'Accès refusé.',
      statusCode: 403,
    })
  })

  it('deletes the CV and then removes the stored file', async () => {
    const { deleteCandidateCv } = await importCandidateCvService()

    await deleteCandidateCv('user-1', 'cv-1')

    expect(candidateCvRepositoryMock.deleteCandidateCvAndReassignDefault).toHaveBeenCalledWith(
      'cv-1',
      'profile-1',
    )
    expect(fsMock.unlink).toHaveBeenCalledWith(
      expect.stringContaining('uploads\\users\\user-1\\cvs\\cv-uuid-1.pdf'),
    )
    expect(candidateCvRepositoryMock.deleteCandidateCvAndReassignDefault.mock.invocationCallOrder[0]).toBeLessThan(
      fsMock.unlink.mock.invocationCallOrder[0],
    )
  })

  it('reassigns the default CV when deleting the current default and others remain', async () => {
    const { deleteCandidateCv } = await importCandidateCvService()

    await deleteCandidateCv('user-1', 'cv-1')

    expect(candidateCvRepositoryMock.deleteCandidateCvAndReassignDefault).toHaveBeenCalledWith(
      'cv-1',
      'profile-1',
    )
  })

  it('does not fail when the stored file is already missing', async () => {
    fsMock.unlink.mockRejectedValueOnce(Object.assign(new Error('missing'), { code: 'ENOENT' }))

    const { deleteCandidateCv } = await importCandidateCvService()

    await expect(deleteCandidateCv('user-1', 'cv-1')).resolves.toBeUndefined()
  })

  it('swallows unexpected filesystem errors during cleanup', async () => {
    fsMock.unlink.mockRejectedValueOnce(new Error('permission denied'))

    const { deleteCandidateCv } = await importCandidateCvService()

    await expect(deleteCandidateCv('user-1', 'cv-1')).resolves.toBeUndefined()
  })

  it('throws a 404 when the CV is missing', async () => {
    candidateCvRepositoryMock.findCandidateCvById.mockResolvedValueOnce(null)

    const { analyzeCandidateCv } = await importCandidateCvService()

    await expect(analyzeCandidateCv('user-1', 'cv-1')).rejects.toMatchObject({
      message: 'CV introuvable.',
      statusCode: 404,
    })
  })

  it('throws a 403 when the CV belongs to another user', async () => {
    candidateCvRepositoryMock.findCandidateCvById.mockResolvedValueOnce({
      id: 'cv-1',
      candidateProfileId: 'profile-2',
      storageKey: 'users/user-1/cvs/cv-uuid-1.pdf',
      analysisStatus: 'NOT_ANALYZED',
      updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    })

    const { analyzeCandidateCv } = await importCandidateCvService()

    await expect(analyzeCandidateCv('user-1', 'cv-1')).rejects.toMatchObject({
      message: 'Accès refusé.',
      statusCode: 403,
    })
  })

  it('throws a 403 when the candidate profile does not exist', async () => {
    candidateCvRepositoryMock.findCandidateProfileByUserId.mockResolvedValueOnce(
      null,
    )

    const { analyzeCandidateCv } = await importCandidateCvService()

    await expect(analyzeCandidateCv('user-1', 'cv-1')).rejects.toMatchObject({
      message: 'Accès refusé.',
      statusCode: 403,
    })
  })

  it('blocks recent PROCESSING analyses', async () => {
    candidateCvRepositoryMock.findCandidateCvById.mockResolvedValueOnce({
      id: 'cv-1',
      candidateProfileId: 'profile-1',
      storageKey: 'users/user-1/cvs/cv-uuid-1.pdf',
      analysisStatus: 'PROCESSING',
      updatedAt: new Date(Date.now() - 60 * 1000),
    })

    const { analyzeCandidateCv } = await importCandidateCvService()

    await expect(analyzeCandidateCv('user-1', 'cv-1')).rejects.toMatchObject({
      message: 'Une analyse est deja en cours.',
      statusCode: 409,
    })

    expect(candidateCvRepositoryMock.updateCandidateCvAnalysisStatus).not.toHaveBeenCalled()
    expect(aiServiceMock.generateCandidateCvAnalysis).not.toHaveBeenCalled()
  })

  it('treats PROCESSING updated just over two minutes ago as stale', async () => {
    const now = 1_700_000_000_000
    vi.spyOn(Date, 'now').mockReturnValue(now)

    candidateCvRepositoryMock.findCandidateCvById.mockResolvedValueOnce({
      id: 'cv-1',
      candidateProfileId: 'profile-1',
      storageKey: 'users/user-1/cvs/cv-uuid-1.pdf',
      analysisStatus: 'PROCESSING',
      updatedAt: new Date(now - 2 * 60 * 1000 - 1),
    })
    aiServiceMock.generateCandidateCvAnalysis.mockResolvedValueOnce(
      '{"experiences":[],"skills":[],"trainings":[]}',
    )

    const { analyzeCandidateCv } = await importCandidateCvService()

    await analyzeCandidateCv('user-1', 'cv-1')

    expect(candidateCvRepositoryMock.updateCandidateCvAnalysisStatus).toHaveBeenNthCalledWith(
      1,
      'cv-1',
      {
        analysisStatus: 'FAILED',
        extractedText: null,
        lastAnalyzedAt: null,
      },
    )
    vi.restoreAllMocks()
  })

  it('continues after stale PROCESSING by marking the CV failed first', async () => {
    const now = Date.now()
    vi.setSystemTime(now)

    candidateCvRepositoryMock.findCandidateCvById.mockResolvedValueOnce({
      id: 'cv-1',
      candidateProfileId: 'profile-1',
      storageKey: 'users/user-1/cvs/cv-uuid-1.pdf',
      analysisStatus: 'PROCESSING',
      updatedAt: new Date(now - 3 * 60 * 1000),
    })
    aiServiceMock.generateCandidateCvAnalysis.mockResolvedValueOnce(
      '{"experiences":[],"skills":[],"trainings":[]}',
    )

    const { analyzeCandidateCv } = await importCandidateCvService()

    await analyzeCandidateCv('user-1', 'cv-1')

    expect(candidateCvRepositoryMock.updateCandidateCvAnalysisStatus).toHaveBeenNthCalledWith(
      1,
      'cv-1',
      {
        analysisStatus: 'FAILED',
        extractedText: null,
        lastAnalyzedAt: null,
      },
    )
    expect(candidateCvRepositoryMock.updateCandidateCvAnalysisStatus).toHaveBeenNthCalledWith(
      2,
      'cv-1',
      {
        analysisStatus: 'PROCESSING',
        extractedText: null,
        lastAnalyzedAt: null,
      },
    )
    vi.useRealTimers()
  })

  it.each([
    ['readFile missing file', Object.assign(new Error('missing'), { code: 'ENOENT' })],
    ['pdf parsing failure', new Error('pdf broken')],
  ])('wraps unexpected failures into a 500 for %s', async (_, failure) => {
    if (failure instanceof Error && 'code' in failure) {
      fsMock.readFile.mockRejectedValueOnce(failure)
    } else {
      fsMock.readFile.mockResolvedValueOnce(Buffer.from('%PDF'))
      pdfParseMock.getText.mockRejectedValueOnce(failure)
    }

    const { analyzeCandidateCv } = await importCandidateCvService()

    await expect(analyzeCandidateCv('user-1', 'cv-1')).rejects.toMatchObject({
      message: "L'analyse du CV a échoué.",
      statusCode: 500,
    })

    expect(candidateCvRepositoryMock.updateCandidateCvAnalysisStatus).toHaveBeenCalledWith(
      'cv-1',
      expect.objectContaining({ analysisStatus: 'FAILED' }),
    )
  })

  it('propagates AppError failures from the AI service unchanged', async () => {
    aiServiceMock.generateCandidateCvAnalysis.mockRejectedValueOnce(
      new Error('service unavailable'),
    )

    const { analyzeCandidateCv } = await importCandidateCvService()

    await expect(analyzeCandidateCv('user-1', 'cv-1')).rejects.toMatchObject({
      message: "L'analyse du CV a échoué.",
      statusCode: 500,
    })
  })

  it('fails with a generic 500 when saving the analysis throws unexpectedly', async () => {
    aiServiceMock.generateCandidateCvAnalysis.mockResolvedValueOnce(
      '{"experiences":[],"skills":[],"trainings":[]}',
    )
    candidateCvRepositoryMock.saveCandidateCvAnalysis.mockRejectedValueOnce(
      new Error('db write failed'),
    )

    const { analyzeCandidateCv } = await importCandidateCvService()

    await expect(analyzeCandidateCv('user-1', 'cv-1')).rejects.toMatchObject({
      message: "L'analyse du CV a échoué.",
      statusCode: 500,
    })
  })

  it('throws a 404 when the candidate profile does not exist for extracted data', async () => {
    candidateCvRepositoryMock.findCandidateProfileByUserId.mockResolvedValueOnce(
      null,
    )

    const { getCandidateCvExtractedData } = await importCandidateCvService()

    await expect(
      getCandidateCvExtractedData('user-1', 'cv-1'),
    ).rejects.toMatchObject({
      message: 'Profil candidat introuvable.',
      statusCode: 404,
    })

    expect(candidateCvRepositoryMock.getCandidateCvExtractedData).not.toHaveBeenCalled()
  })

  it('throws a 404 when the CV is not found for the current profile scope', async () => {
    candidateCvRepositoryMock.getCandidateCvExtractedData.mockResolvedValueOnce(
      null,
    )

    const { getCandidateCvExtractedData } = await importCandidateCvService()

    await expect(
      getCandidateCvExtractedData('user-1', 'cv-1'),
    ).rejects.toMatchObject({
      message: 'CV introuvable.',
      statusCode: 404,
    })

    expect(candidateCvRepositoryMock.getCandidateCvExtractedData).toHaveBeenCalledWith(
      'cv-1',
      'profile-1',
    )
  })

  it.each(['NOT_ANALYZED', 'PROCESSING', 'FAILED'] as const)(
    'throws the same 409 when analysis status is %s',
    async (analysisStatus) => {
      candidateCvRepositoryMock.getCandidateCvExtractedData.mockResolvedValueOnce({
        id: 'cv-1',
        label: 'CV 1',
        originalFilename: 'cv-1.pdf',
        analysisStatus,
        lastAnalyzedAt: null,
        cvExperiences: [],
        cvSkills: [],
        cvTrainings: [],
      })

      const { getCandidateCvExtractedData } = await importCandidateCvService()

      await expect(
        getCandidateCvExtractedData('user-1', 'cv-1'),
      ).rejects.toMatchObject({
        message: "Le CV n'a pas encore ete analyse.",
        statusCode: 409,
      })
    },
  )

  it('returns extracted data when the analysis is completed', async () => {
    candidateCvRepositoryMock.getCandidateCvExtractedData.mockResolvedValueOnce({
      id: 'cv-1',
      label: 'CV 1',
      originalFilename: 'cv-1.pdf',
      analysisStatus: 'COMPLETED',
      lastAnalyzedAt: new Date('2026-01-03T00:00:00.000Z'),
      cvExperiences: [{ id: 'exp-1' }],
      cvSkills: [{ id: 'skill-1' }],
      cvTrainings: [{ id: 'training-1' }],
    })

    const { getCandidateCvExtractedData } = await importCandidateCvService()

    await expect(getCandidateCvExtractedData('user-1', 'cv-1')).resolves.toEqual({
      cvId: 'cv-1',
      cv: {
        id: 'cv-1',
        label: 'CV 1',
        originalFilename: 'cv-1.pdf',
        analysisStatus: 'COMPLETED',
        lastAnalyzedAt: '2026-01-03T00:00:00.000Z',
      },
      experiences: [{ id: 'exp-1' }],
      skills: [{ id: 'skill-1' }],
      trainings: [{ id: 'training-1' }],
    })
  })

  it('throws when the extracted text is empty after trim', async () => {
    const { buildCandidateCvAnalysisPrompt } = await importCandidateCvService()

    expect(() => buildCandidateCvAnalysisPrompt('')).toThrowError(
      expect.objectContaining({
        message: 'Le texte extrait du CV est vide ou inutilisable.',
        statusCode: 400,
      }),
    )
  })

  it('throws when the extracted text contains only whitespace', async () => {
    const { buildCandidateCvAnalysisPrompt } = await importCandidateCvService()

    expect(() => buildCandidateCvAnalysisPrompt('   \n\t  ')).toThrowError(
      expect.objectContaining({
        message: 'Le texte extrait du CV est vide ou inutilisable.',
        statusCode: 400,
      }),
    )
  })

  it('builds a prompt that contains the output contract and the extracted text', async () => {
    const { buildCandidateCvAnalysisPrompt } = await importCandidateCvService()

    const prompt = buildCandidateCvAnalysisPrompt('Experience React')

    expect(prompt).toContain('Respecte exactement ce contrat JSON:')
    expect(prompt).toContain('--- DEBUT DU TEXTE CV NON FIABLE ---')
    expect(prompt).toContain('Experience React')
    expect(prompt).toContain('--- FIN DU TEXTE CV NON FIABLE ---')
  })
})
