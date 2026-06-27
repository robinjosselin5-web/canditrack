import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { AppError } from '../errors/appError.js'
import {
  createUser,
  findUserByEmail,
  findUserByValidPasswordResetToken,
  findUserForPasswordResetByEmail,
  savePasswordResetToken,
  updatePasswordAndClearResetToken,
} from '../repositories/index.js'
import type { IAuthSession, IUserPublic } from '../types/user.types.js'
import { sendPasswordResetEmail } from './emailService.js'

const PASSWORD_SALT_ROUNDS = 12

export function logoutUser(): null {
  return null
}

export async function registerUser(
  firstname: string,
  lastname: string,
  email: string,
  password: string,
): Promise<IAuthSession> {
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
  const user = await createUser(firstname, lastname, email, passwordHash)

  return {
    user,
    token: generateAuthToken(user),
  }
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

  const { passwordHash: _passwordHash, ...publicUser } = user
  void _passwordHash

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
