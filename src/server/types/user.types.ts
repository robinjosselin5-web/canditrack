export interface IUserPasswordResetRecord {
  id: string
  email: string
}

export interface IUserEmailVerificationRecord {
  id: string
  email: string
  emailVerificationCode: string | null
  emailVerificationExpiresAt: Date | null
}

export interface IUserPublic {
  id: string
  firstname: string
  lastname: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface IUserWithPassword extends IUserPublic {
  emailVerifiedAt: string | null
  passwordHash: string
}

export interface IAuthSession {
  user: IUserPublic
  token: string
}

export interface IEmailVerificationPending {
  email: string
}
