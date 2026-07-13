import { beforeEach, describe, expect, it, vi } from 'vitest'

const repositoryMock = vi.hoisted(() => ({
  createUser: vi.fn(),
  findUserByEmail: vi.fn(),
  findUserByValidPasswordResetToken: vi.fn(),
  findUserForEmailVerificationByEmail: vi.fn(),
  findUserForPasswordResetByEmail: vi.fn(),
  markUserEmailAsVerified: vi.fn(),
  saveEmailVerificationCode: vi.fn(),
  savePasswordResetToken: vi.fn(),
  updatePasswordAndClearResetToken: vi.fn(),
}))

const emailServiceMock = vi.hoisted(() => ({
  sendEmailVerificationCode: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
}))

const bcryptMock = vi.hoisted(() => ({
  hash: vi.fn(),
  compare: vi.fn(),
}))

const jwtMock = vi.hoisted(() => ({
  sign: vi.fn(),
}))

const cryptoState = vi.hoisted(() => ({
  randomInt: vi.fn(),
  randomBytes: vi.fn(),
  createHash: vi.fn(),
}))

const envMock = vi.hoisted(() => ({
  env: {
    EMAIL_VERIFICATION_EXPIRES_MINUTES: 30,
    FRONTEND_URL: 'http://localhost:5173',
    JWT_EXPIRES_IN: '24h',
    JWT_SECRET: 'development-secret-change-me-32-chars',
    PASSWORD_RESET_EXPIRES_MINUTES: 30,
  },
}))

vi.mock('../repositories/index.js', () => repositoryMock)
vi.mock('../services/emailService.js', () => emailServiceMock)
vi.mock('bcrypt', () => ({ default: bcryptMock }))
vi.mock('jsonwebtoken', () => ({ default: jwtMock }))
vi.mock('node:crypto', () => ({
  default: {
    randomInt: cryptoState.randomInt,
    randomBytes: cryptoState.randomBytes,
    createHash: cryptoState.createHash,
  },
}))
vi.mock('../config/env.js', () => envMock)

function mockSha256Digest(value: string): void {
  cryptoState.createHash.mockReturnValue({
    update: () => ({
      digest: () => value,
    }),
  })
}

async function importAuthService() {
  vi.resetModules()
  return import('./authService.js')
}

beforeEach(() => {
  vi.clearAllMocks()
  cryptoState.randomInt.mockReset()
  cryptoState.randomBytes.mockReset()
  cryptoState.createHash.mockReset()
  bcryptMock.hash.mockReset()
  bcryptMock.compare.mockReset()
  jwtMock.sign.mockReset()
  envMock.env.EMAIL_VERIFICATION_EXPIRES_MINUTES = 30
  envMock.env.FRONTEND_URL = 'http://localhost:5173'
  envMock.env.JWT_EXPIRES_IN = '24h'
  envMock.env.JWT_SECRET = 'development-secret-change-me-32-chars'
  envMock.env.PASSWORD_RESET_EXPIRES_MINUTES = 30
  mockSha256Digest('default-hash')
})

describe('authService', () => {
  describe('registerUser', () => {
    it('creates a user, hashes the password and sends the verification email', async () => {
      const pendingVerification = { email: 'test@example.com' }

      repositoryMock.findUserByEmail.mockResolvedValue(null)
      bcryptMock.hash.mockResolvedValue('hashed-password')
      repositoryMock.createUser.mockResolvedValue(pendingVerification)
      cryptoState.randomInt.mockReturnValueOnce(0)
      cryptoState.randomInt.mockReturnValueOnce(1)
      cryptoState.randomInt.mockReturnValueOnce(2)
      cryptoState.randomInt.mockReturnValueOnce(3)
      cryptoState.randomInt.mockReturnValueOnce(4)
      mockSha256Digest('verification-code-hash')

      const { registerUser } = await importAuthService()
      const result = await registerUser(
        'Jane',
        'Doe',
        'test@example.com',
        'Valid@123',
      )

      expect(result).toBe(pendingVerification)
      expect(repositoryMock.findUserByEmail).toHaveBeenCalledWith(
        'test@example.com',
      )
      expect(bcryptMock.hash).toHaveBeenCalledWith('Valid@123', 12)
      expect(repositoryMock.createUser).toHaveBeenCalledWith(
        'Jane',
        'Doe',
        'test@example.com',
        'hashed-password',
        'verification-code-hash',
        expect.any(Date),
      )
      expect(emailServiceMock.sendEmailVerificationCode).toHaveBeenCalledWith({
        code: 'ABCDE',
        email: 'test@example.com',
      })
    })

    it('throws when the email is already used', async () => {
      repositoryMock.findUserByEmail.mockResolvedValue({ id: 'user-1' })
      const { registerUser } = await importAuthService()

      await expect(
        registerUser('Jane', 'Doe', 'test@example.com', 'Valid@123'),
      ).rejects.toThrow("L'adresse e-mail est d\u00e9j\u00e0 utilis\u00e9e.")
      await expect(
        registerUser('Jane', 'Doe', 'test@example.com', 'Valid@123'),
      ).rejects.toMatchObject({
        statusCode: 409,
        errors: [
          {
            field: 'email',
            message: "L'adresse e-mail est d\u00e9j\u00e0 utilis\u00e9e.",
          },
        ],
      })
    })
  })

  describe('loginUser', () => {
    it('throws the same generic error when the user is missing or the password is wrong', async () => {
      const { loginUser } = await importAuthService()

      repositoryMock.findUserByEmail.mockResolvedValueOnce(null)
      await expect(loginUser('test@example.com', 'abc')).rejects.toMatchObject({
        message: 'Adresse e-mail ou mot de passe incorrect.',
        statusCode: 401,
      })

      repositoryMock.findUserByEmail.mockResolvedValueOnce({
        id: 'user-1',
        email: 'test@example.com',
        emailVerifiedAt: '2025-01-01T00:00:00.000Z',
        firstname: 'Jane',
        lastname: 'Doe',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
        passwordHash: 'hashed',
      })
      bcryptMock.compare.mockResolvedValue(false)
      await expect(loginUser('test@example.com', 'wrong')).rejects.toMatchObject({
        message: 'Adresse e-mail ou mot de passe incorrect.',
        statusCode: 401,
      })
    })

    it('throws when the email is not verified', async () => {
      const { loginUser } = await importAuthService()

      repositoryMock.findUserByEmail.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        emailVerifiedAt: null,
        firstname: 'Jane',
        lastname: 'Doe',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
        passwordHash: 'hashed',
      })
      bcryptMock.compare.mockResolvedValue(true)

      await expect(loginUser('test@example.com', 'Valid@123')).rejects.toThrow(
        'Votre adresse e-mail doit \u00eatre valid\u00e9e avant de vous connecter.',
      )
      await expect(loginUser('test@example.com', 'Valid@123')).rejects.toMatchObject(
        {
          statusCode: 403,
          errors: [
            {
              field: 'emailVerification',
              message: 'EMAIL_NOT_VERIFIED',
            },
          ],
        },
      )
    })

    it('returns a session with a JWT token on success', async () => {
      const { loginUser } = await importAuthService()

      repositoryMock.findUserByEmail.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        emailVerifiedAt: '2025-01-01T00:00:00.000Z',
        firstname: 'Jane',
        lastname: 'Doe',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
        passwordHash: 'hashed',
      })
      bcryptMock.compare.mockResolvedValue(true)
      jwtMock.sign.mockReturnValue('jwt-token')

      const session = await loginUser('test@example.com', 'Valid@123')

      expect(jwtMock.sign).toHaveBeenCalledWith(
        {
          email: 'test@example.com',
          sub: 'user-1',
        },
        envMock.env.JWT_SECRET,
        {
          expiresIn: envMock.env.JWT_EXPIRES_IN,
        },
      )
      expect(session).toEqual({
        token: 'jwt-token',
        user: {
          id: 'user-1',
          email: 'test@example.com',
          firstname: 'Jane',
          lastname: 'Doe',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z',
        },
      })
    })
  })

  describe('logoutUser', () => {
    it('is a no-op', async () => {
      const { logoutUser } = await importAuthService()

      expect(logoutUser()).toBeNull()
    })
  })

  describe('requestEmailVerificationCode', () => {
    it('throws when the user does not exist', async () => {
      const { requestEmailVerificationCode } = await importAuthService()

      repositoryMock.findUserForEmailVerificationByEmail.mockResolvedValue(null)

      await expect(
        requestEmailVerificationCode('test@example.com'),
      ).rejects.toThrow(
        "Aucun compte n'est associ\u00e9 \u00e0 cette adresse e-mail.",
      )
    })

    it('throws when the user is already verified', async () => {
      const { requestEmailVerificationCode } = await importAuthService()

      repositoryMock.findUserForEmailVerificationByEmail.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        emailVerificationCode: null,
        emailVerificationExpiresAt: null,
      })

      await expect(
        requestEmailVerificationCode('test@example.com'),
      ).rejects.toThrow('Cette adresse e-mail est d\u00e9j\u00e0 valid\u00e9e.')
    })

    it('regenerates a code, updates expiration and sends the email', async () => {
      const { requestEmailVerificationCode } = await importAuthService()

      repositoryMock.findUserForEmailVerificationByEmail.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        emailVerificationCode: 'old-hash',
        emailVerificationExpiresAt: new Date('2027-01-01T00:00:00.000Z'),
      })
      cryptoState.randomInt.mockReturnValueOnce(0)
      cryptoState.randomInt.mockReturnValueOnce(1)
      cryptoState.randomInt.mockReturnValueOnce(2)
      cryptoState.randomInt.mockReturnValueOnce(3)
      cryptoState.randomInt.mockReturnValueOnce(4)
      mockSha256Digest('new-code-hash')

      const result = await requestEmailVerificationCode('test@example.com')

      expect(result).toEqual({ email: 'test@example.com' })
      expect(repositoryMock.saveEmailVerificationCode).toHaveBeenCalledWith(
        'user-1',
        'new-code-hash',
        expect.any(Date),
      )
      expect(emailServiceMock.sendEmailVerificationCode).toHaveBeenCalledWith({
        code: 'ABCDE',
        email: 'test@example.com',
      })
    })
  })

  describe('verifyEmail', () => {
    it.each([
      'missing user',
      'missing code',
      'missing expiry',
      'mismatched hash',
      'expired code',
    ])('throws the same generic error for %s', async (caseName) => {
      const { verifyEmail } = await importAuthService()
      const baseUser = {
        id: 'user-1',
        email: 'test@example.com',
        emailVerificationCode: 'valid-hash',
        emailVerificationExpiresAt: new Date('2027-12-31T23:59:59.000Z'),
      }

      if (caseName === 'missing user') {
        repositoryMock.findUserForEmailVerificationByEmail.mockResolvedValue(
          null,
        )
      } else if (caseName === 'missing code') {
        repositoryMock.findUserForEmailVerificationByEmail.mockResolvedValue({
          ...baseUser,
          emailVerificationCode: null,
        })
      } else if (caseName === 'missing expiry') {
        repositoryMock.findUserForEmailVerificationByEmail.mockResolvedValue({
          ...baseUser,
          emailVerificationExpiresAt: null,
        })
      } else if (caseName === 'mismatched hash') {
        repositoryMock.findUserForEmailVerificationByEmail.mockResolvedValue({
          ...baseUser,
        })
        mockSha256Digest('other-hash')
      } else {
        repositoryMock.findUserForEmailVerificationByEmail.mockResolvedValue({
          ...baseUser,
          emailVerificationExpiresAt: new Date('2000-01-01T00:00:00.000Z'),
        })
        mockSha256Digest('valid-hash')
      }

      await expect(verifyEmail('test@example.com', 'abcde')).rejects.toThrow(
        'Le code de validation est invalide ou expir\u00e9.',
      )
    })

    it('marks the account verified and returns a session on success', async () => {
      const { verifyEmail } = await importAuthService()

      repositoryMock.findUserForEmailVerificationByEmail.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        emailVerificationCode: 'valid-hash',
        emailVerificationExpiresAt: new Date('2027-12-31T23:59:59.000Z'),
      })
      mockSha256Digest('valid-hash')
      repositoryMock.markUserEmailAsVerified.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        firstname: 'Jane',
        lastname: 'Doe',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
      })
      jwtMock.sign.mockReturnValue('jwt-token')

      const session = await verifyEmail('test@example.com', 'abcde')

      expect(repositoryMock.markUserEmailAsVerified).toHaveBeenCalledWith(
        'user-1',
      )
      expect(jwtMock.sign).toHaveBeenCalledWith(
        {
          email: 'test@example.com',
          sub: 'user-1',
        },
        envMock.env.JWT_SECRET,
        {
          expiresIn: envMock.env.JWT_EXPIRES_IN,
        },
      )
      expect(session).toEqual({
        token: 'jwt-token',
        user: {
          id: 'user-1',
          email: 'test@example.com',
          firstname: 'Jane',
          lastname: 'Doe',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z',
        },
      })
    })
  })

  describe('requestPasswordReset', () => {
    it('returns null silently when the user does not exist', async () => {
      const { requestPasswordReset } = await importAuthService()

      repositoryMock.findUserForPasswordResetByEmail.mockResolvedValue(null)

      await expect(requestPasswordReset('test@example.com')).resolves.toBeNull()
      expect(emailServiceMock.sendPasswordResetEmail).not.toHaveBeenCalled()
    })

    it('stores a hashed token and sends the reset email', async () => {
      const { requestPasswordReset } = await importAuthService()

      repositoryMock.findUserForPasswordResetByEmail.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
      })
      cryptoState.randomBytes.mockReturnValue({
        toString: () => 'reset-token',
      })
      mockSha256Digest('reset-token-hash')

      await expect(requestPasswordReset('test@example.com')).resolves.toBeNull()

      expect(repositoryMock.savePasswordResetToken).toHaveBeenCalledWith(
        'user-1',
        'reset-token-hash',
        expect.any(Date),
      )
      expect(emailServiceMock.sendPasswordResetEmail).toHaveBeenCalledWith({
        email: 'test@example.com',
        resetUrl: 'http://localhost:5173/reset-password/reset-token',
      })
    })
  })

  describe('resetPassword', () => {
    it('throws when the token is invalid or expired', async () => {
      const { resetPassword } = await importAuthService()

      mockSha256Digest('token-hash')
      repositoryMock.findUserByValidPasswordResetToken.mockResolvedValue(null)

      await expect(resetPassword('token', 'Valid@123')).rejects.toThrow(
        'Le lien de r\u00e9initialisation est invalide ou expir\u00e9.',
      )
    })

    it('hashes the new password and clears the reset token on success', async () => {
      const { resetPassword } = await importAuthService()

      mockSha256Digest('token-hash')
      repositoryMock.findUserByValidPasswordResetToken.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
      })
      bcryptMock.hash.mockResolvedValue('new-password-hash')

      await expect(resetPassword('token', 'Valid@123')).resolves.toBeNull()

      expect(bcryptMock.hash).toHaveBeenCalledWith('Valid@123', 12)
      expect(repositoryMock.updatePasswordAndClearResetToken).toHaveBeenCalledWith(
        'user-1',
        'new-password-hash',
      )
    })
  })
})
