export interface IUser {
  id: string
  firstname: string
  lastname: string
  email: string
  age?: number | null
  phone?: string | null
  address?: string | null
  linkedin?: string | null
  github?: string | null
  hasAvatar?: boolean
  createdAt?: string
  updatedAt?: string
}
