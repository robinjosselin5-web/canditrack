import { AppError } from '../errors/appError.js'
import {
  findUserByEmail,
  findUserById,
  updateUserProfile as updateUserProfileRepository,
} from '../repositories/index.js'
import type { IUserPublic } from '../types/user.types.js'

interface IUpdateUserProfilePayload {
  firstname: string
  lastname: string
  email: string
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
    throw new AppError("L'adresse e-mail est deja utilisee.", 409, [
      {
        field: 'email',
        message: "L'adresse e-mail est deja utilisee.",
      },
    ])
  }

  return updateUserProfileRepository(
    userId,
    payload.firstname,
    payload.lastname,
    payload.email,
  )
}
