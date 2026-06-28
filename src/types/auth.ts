import type { IUser } from './user'

export interface IAuthSession {
  user: IUser
  token: string
}

export interface IEmailVerificationPending {
  email: string
}

export interface IAuthState {
  user: IUser | null
  token: string | null
  isAuthenticated: boolean
}

export interface IRegisterPayload {
  firstname: string
  lastname: string
  email: string
  password: string
}

export interface ILoginPayload {
  email: string
  password: string
  rememberMe?: boolean
}

export interface IForgotPasswordPayload {
  email: string
}

export interface IResetPasswordPayload {
  token: string
  password: string
}

export interface IVerifyEmailPayload {
  email: string
  code: string
}

export interface IResendEmailVerificationPayload {
  email: string
}
