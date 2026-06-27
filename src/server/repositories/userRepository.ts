import type { User } from '../generated/prisma/client.js'
import { prisma } from '../config/prisma.js'
import type {
  IUserPasswordResetRecord,
  IUserPublic,
  IUserWithPassword,
} from '../types/user.types.js'

export async function createUser(
  firstname: string,
  lastname: string,
  email: string,
  passwordHash: string,
): Promise<IUserPublic> {
  const user = await prisma.user.create({
    data: {
      email,
      firstname,
      lastname,
      passwordHash,
    },
  })

  return mapUser(user)
}

export async function findUserByEmail(
  email: string,
): Promise<IUserWithPassword | null> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return null
  }

  return {
    ...mapUser(user),
    passwordHash: user.passwordHash,
  }
}

export async function findUserForPasswordResetByEmail(
  email: string,
): Promise<IUserPasswordResetRecord | null> {
  const user = await prisma.user.findUnique({
    select: {
      email: true,
      id: true,
    },
    where: {
      email,
    },
  })

  return user
}

export async function savePasswordResetToken(
  userId: string,
  tokenHash: string,
  expiresAt: Date,
): Promise<void> {
  await prisma.user.update({
    data: {
      passwordResetExpiresAt: expiresAt,
      passwordResetToken: tokenHash,
    },
    where: {
      id: userId,
    },
  })
}

export async function findUserByValidPasswordResetToken(
  tokenHash: string,
): Promise<IUserPasswordResetRecord | null> {
  const user = await prisma.user.findFirst({
    select: {
      email: true,
      id: true,
    },
    where: {
      passwordResetExpiresAt: {
        gt: new Date(),
      },
      passwordResetToken: tokenHash,
    },
  })

  return user
}

export async function updatePasswordAndClearResetToken(
  userId: string,
  passwordHash: string,
): Promise<void> {
  await prisma.user.update({
    data: {
      passwordHash,
      passwordResetExpiresAt: null,
      passwordResetToken: null,
    },
    where: {
      id: userId,
    },
  })
}

function mapUser(user: User): IUserPublic {
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }
}
