import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { AppError } from '../errors/appError.js'
import {
  createUser,
  findUserByEmail,
  findUserByValidPasswordResetToken,
  findUserForEmailVerificationByEmail,
  findUserForPasswordResetByEmail,
  markUserEmailAsVerified,
  saveEmailVerificationCode,
  savePasswordResetToken,
  updatePasswordAndClearResetToken,
} from '../repositories/index.js'
import type {
  IAuthSession,
  IEmailVerificationPending,
  IUserPublic,
} from '../types/user.types.js'
import {
  sendEmailVerificationCode,
  sendPasswordResetEmail,
} from './emailService.js'

const PASSWORD_SALT_ROUNDS = 12
const EMAIL_VERIFICATION_CODE_LENGTH = 5
const EMAIL_VERIFICATION_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function logoutUser(): null {
  return null
}

export async function registerUser(
  firstname: string,
  lastname: string,
  email: string,
  password: string,
): Promise<IEmailVerificationPending> {
  const existingUser = await findUserByEmail(email)

  if (existingUser) {
    throw new AppError("L'adresse e-mail est deja utilisee.", 409, [
      {
        field: 'email',
        message: "L'adresse e-mail est deja utilisee.",
      },
    ])
  }

  const passwordHash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS)
  const verificationCode = generateEmailVerificationCode()
  const verificationCodeHash = hashEmailVerificationCode(verificationCode)
  const verificationExpiresAt = getEmailVerificationExpirationDate()

  const pendingVerification = await createUser(
    firstname,
    lastname,
    email,
    passwordHash,
    verificationCodeHash,
    verificationExpiresAt,
  )

  await sendEmailVerificationCode({
    code: verificationCode,
    email,
  })

  return pendingVerification
}

export async function loginUser(
  email: string,
  password: string,
): Promise<IAuthSession> {
  const user = await findUserByEmail(email)

  if (!user) {
    throwInvalidCredentialsError()
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

  if (!isPasswordValid) {
    throwInvalidCredentialsError()
  }

  if (!user.emailVerifiedAt) {
    throw new AppError(
      "Votre adresse e-mail doit etre validee avant de vous connecter.",
      403,
      [
        {
          field: 'emailVerification',
          message: 'EMAIL_NOT_VERIFIED',
        },
      ],
    )
  }

  const {
    emailVerifiedAt: _emailVerifiedAt,
    passwordHash: _passwordHash,
    ...publicUser
  } = user
  void _emailVerifiedAt
  void _passwordHash

  return {
    user: publicUser,
    token: generateAuthToken(publicUser),
  }
}

export async function requestEmailVerificationCode(
  email: string,
): Promise<IEmailVerificationPending> {
  const user = await findUserForEmailVerificationByEmail(email)

  if (!user) {
    throw new AppError("Aucun compte n'est associe a cette adresse e-mail.", 404)
  }

  if (!user.emailVerificationCode && !user.emailVerificationExpiresAt) {
    throw new AppError("Cette adresse e-mail est deja validee.", 409)
  }

  const verificationCode = generateEmailVerificationCode()
  const verificationCodeHash = hashEmailVerificationCode(verificationCode)

  await saveEmailVerificationCode(
    user.id,
    verificationCodeHash,
    getEmailVerificationExpirationDate(),
  )
  await sendEmailVerificationCode({
    code: verificationCode,
    email: user.email,
  })

  return {
    email: user.email,
  }
}

export async function verifyEmail(
  email: string,
  code: string,
): Promise<IAuthSession> {
  const user = await findUserForEmailVerificationByEmail(email)
  const codeHash = hashEmailVerificationCode(code)

  if (
    !user ||
    !user.emailVerificationCode ||
    !user.emailVerificationExpiresAt ||
    user.emailVerificationCode !== codeHash ||
    user.emailVerificationExpiresAt <= new Date()
  ) {
    throw new AppError('Le code de validation est invalide ou expire.', 400)
  }

  const publicUser = await markUserEmailAsVerified(user.id)

  return {
    user: publicUser,
    token: generateAuthToken(publicUser),
  }
}

export async function requestPasswordReset(email: string): Promise<null> {
  const user = await findUserForPasswordResetByEmail(email)

  if (!user) {
    return null
  }

  const token = crypto.randomBytes(32).toString('hex')
  const tokenHash = hashPasswordResetToken(token)
  const expiresAt = new Date(
    Date.now() + env.PASSWORD_RESET_EXPIRES_MINUTES * 60 * 1000,
  )

  await savePasswordResetToken(user.id, tokenHash, expiresAt)
  await sendPasswordResetEmail({
    email: user.email,
    resetUrl: `${env.FRONTEND_URL}/reset-password/${token}`,
  })

  return null
}

export async function resetPassword(
  token: string,
  password: string,
): Promise<null> {
  const tokenHash = hashPasswordResetToken(token)
  const user = await findUserByValidPasswordResetToken(tokenHash)

  if (!user) {
    throw new AppError('Le lien de reinitialisation est invalide ou expire.', 400)
  }

  const passwordHash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS)
  await updatePasswordAndClearResetToken(user.id, passwordHash)

  return null
}

function hashPasswordResetToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex')
}

function generateEmailVerificationCode(): string {
  return Array.from({ length: EMAIL_VERIFICATION_CODE_LENGTH }, () => {
    const index = crypto.randomInt(EMAIL_VERIFICATION_ALPHABET.length)

    return EMAIL_VERIFICATION_ALPHABET[index]
  }).join('')
}

function hashEmailVerificationCode(code: string): string {
  return crypto.createHash('sha256').update(code.toUpperCase()).digest('hex')
}

function getEmailVerificationExpirationDate(): Date {
  return new Date(
    Date.now() + env.EMAIL_VERIFICATION_EXPIRES_MINUTES * 60 * 1000,
  )
}

function generateAuthToken(user: IUserPublic): string {
  return jwt.sign(
    {
      email: user.email,
      sub: user.id,
    },
    env.JWT_SECRET,
  )
}

function throwInvalidCredentialsError(): never {
  throw new AppError('Adresse e-mail ou mot de passe incorrect.', 401)
}
