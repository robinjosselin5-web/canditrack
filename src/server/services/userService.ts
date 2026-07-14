import { randomUUID } from 'node:crypto'
import { mkdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import {
  ALLOWED_AVATAR_MIME_TYPES,
  MAX_AVATAR_FILE_SIZE,
} from '../../config/userAvatarConstants.js'
import { AppError } from '../errors/appError.js'
import {
  findUserAvatarByUserId,
  findUserByEmail,
  findUserById,
  updateUserAvatar as updateUserAvatarRepository,
  updateUserProfile as updateUserProfileRepository,
} from '../repositories/index.js'
import type { IUserPublic } from '../types/user.types.js'

interface IUpdateUserProfilePayload {
  firstname: string
  lastname: string
  email: string
  age: number | null
  phone: string | null
  address: string | null
  linkedin: string | null
  github: string | null
}

const AVATAR_EXTENSION_BY_MIME_TYPE: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
}

export async function getUserProfile(userId: string): Promise<IUserPublic> {
  const user = await findUserById(userId)

  if (!user) {
    throw new AppError('Utilisateur introuvable.', 404)
  }

  return user
}

export async function updateUserProfile(
  userId: string,
  payload: IUpdateUserProfilePayload,
): Promise<IUserPublic> {
  const currentUser = await getUserProfile(userId)
  const userWithSameEmail = await findUserByEmail(payload.email)

  if (userWithSameEmail && userWithSameEmail.id !== currentUser.id) {
    throw new AppError("L'adresse e-mail est déjà utilisée.", 409, [
      {
        field: 'email',
        message: "L'adresse e-mail est déjà utilisée.",
      },
    ])
  }

  return updateUserProfileRepository(userId, payload)
}

export async function updateUserAvatar(
  userId: string,
  file: Express.Multer.File | undefined,
): Promise<IUserPublic> {
  if (!validateUploadedAvatar(file)) {
    throw new AppError('Une image est requise.', 400)
  }

  const previousAvatar = await findUserAvatarByUserId(userId)
  const extension = AVATAR_EXTENSION_BY_MIME_TYPE[file.mimetype]
  const storageFilename = `${randomUUID()}.${extension}`
  const storageKey = path.posix.join('users', userId, 'avatar', storageFilename)
  const storagePath = resolveAvatarPath(storageKey)

  await mkdir(path.dirname(storagePath), { recursive: true })
  await writeFile(storagePath, file.buffer)

  let user: IUserPublic

  try {
    user = await updateUserAvatarRepository(userId, storageKey, file.mimetype)
  } catch (error) {
    await removeStoredAvatarFile(storageKey)
    throw error
  }

  if (previousAvatar && previousAvatar.storageKey !== storageKey) {
    await removeStoredAvatarFile(previousAvatar.storageKey)
  }

  return user
}

export async function getUserAvatar(
  userId: string,
): Promise<{ storageKey: string; mimeType: string }> {
  const avatar = await findUserAvatarByUserId(userId)

  if (!avatar) {
    throw new AppError('Aucune photo de profil.', 404)
  }

  return avatar
}

export function resolveAvatarPath(storageKey: string): string {
  return path.join(process.cwd(), 'uploads', storageKey)
}

function validateUploadedAvatar(
  file: Express.Multer.File | undefined,
): file is Express.Multer.File {
  if (!file) {
    return false
  }

  if (file.size <= 0) {
    throw new AppError('Le fichier importé est vide.', 400)
  }

  if (file.size > MAX_AVATAR_FILE_SIZE) {
    throw new AppError('Le fichier dépasse la limite de 5 Mo.', 413)
  }

  if (!ALLOWED_AVATAR_MIME_TYPES.includes(file.mimetype)) {
    throw new AppError('Seuls les formats JPG, PNG et GIF sont autorisés.', 400)
  }

  return true
}

async function removeStoredAvatarFile(storageKey: string): Promise<void> {
  try {
    await unlink(resolveAvatarPath(storageKey))
  } catch (error) {
    if (isMissingFileError(error)) {
      return
    }

    console.error('[AVATAR_STORAGE] failed to remove stored avatar file', {
      storageKey,
      error,
    })
  }
}

function isMissingFileError(error: unknown): boolean {
  return (
    error instanceof Error &&
    'code' in error &&
    (error as NodeJS.ErrnoException).code === 'ENOENT'
  )
}
