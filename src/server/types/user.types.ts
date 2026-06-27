export interface IUserPasswordResetRecord {
  id: string
  email: string
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
  passwordHash: string
}

export interface IAuthSession {
  user: IUserPublic
  token: string
}
