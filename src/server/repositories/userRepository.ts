import type { User } from '../generated/prisma/client.js'
import { prisma } from '../config/prisma.js'
import type {
  IUserEmailVerificationRecord,
  IUserPasswordResetRecord,
  IEmailVerificationPending,
  IUserPublic,
  IUserWithPassword,
} from '../types/user.types.js'

export async function createUser(
  firstname: string,
  lastname: string,
  email: string,
  passwordHash: string,
  emailVerificationCode: string,
  emailVerificationExpiresAt: Date,
): Promise<IEmailVerificationPending> {
  const user = await prisma.user.create({
    data: {
      email,
      emailVerificationCode,
      emailVerificationExpiresAt,
      firstname,
      lastname,
      passwordHash,
    },
  })

  return {
    email: user.email,
  }
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
    emailVerifiedAt: user.emailVerifiedAt?.toISOString() ?? null,
    passwordHash: user.passwordHash,
  }
}

export async function findUserById(userId: string): Promise<IUserPublic | null> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  return user ? mapUser(user) : null
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

export async function saveEmailVerificationCode(
  userId: string,
  codeHash: string,
  expiresAt: Date,
): Promise<void> {
  await prisma.user.update({
    data: {
      emailVerificationCode: codeHash,
      emailVerificationExpiresAt: expiresAt,
    },
    where: {
      id: userId,
    },
  })
}

export async function findUserForEmailVerificationByEmail(
  email: string,
): Promise<IUserEmailVerificationRecord | null> {
  const user = await prisma.user.findUnique({
    select: {
      email: true,
      emailVerificationCode: true,
      emailVerificationExpiresAt: true,
      id: true,
    },
    where: {
      email,
    },
  })

  return user
}

export async function markUserEmailAsVerified(
  userId: string,
): Promise<IUserPublic> {
  const user = await prisma.user.update({
    data: {
      emailVerificationCode: null,
      emailVerificationExpiresAt: null,
      emailVerifiedAt: new Date(),
    },
    where: {
      id: userId,
    },
  })

  return mapUser(user)
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

export async function updateUserProfile(
  userId: string,
  firstname: string,
  lastname: string,
  email: string,
): Promise<IUserPublic> {
  const user = await prisma.user.update({
    data: {
      email,
      firstname,
      lastname,
    },
    where: {
      id: userId,
    },
  })

  return mapUser(user)
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
