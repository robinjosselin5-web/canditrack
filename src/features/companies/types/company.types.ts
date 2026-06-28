export interface ICreateCompanyFormValues {
  name: string
  website: string
  email: string
  phone: string
  city: string
  country: string
  categoryId: string
  recruiterName: string
}

export interface ICreateCompanyPayload {
  name: string
  website?: string
  email?: string
  phone?: string
  city?: string
  country?: string
  categoryId?: string
  recruiterName?: string
}

export interface ICreateCompanyResponse {
  id: string
  name: string
  status: 'draft'
}

export type CompanyStatus =
  | 'draft'
  | 'pending'
  | 'no_response'
  | 'follow_up'
  | 'interview'
  | 'rejected'
  | 'accepted'

export interface ICompanyListItem {
  id: string
  name: string
  website: string | null
  email: string | null
  phone: string | null
  city: string | null
  country: string | null
  recruiterName: string | null
  isFavorite: boolean
  status: CompanyStatus
  createdAt: string
  updatedAt: string
}

export interface IUpdateCompanyPayload {
  name: string
  website?: string
  email?: string
  phone?: string
  city?: string
  country?: string
  categoryId?: string
  recruiterName?: string
}

export interface IUpdateCompanyResponse {
  id: string
  name: string
  website: string | null
  email: string | null
  phone: string | null
  city: string | null
  country: string | null
  recruiterName: string | null
  status: CompanyStatus
  updatedAt: string
}

export interface IDeleteCompanyResponse {
  message: string
}

export interface IUpdateCompanyFavoritePayload {
  isFavorite: boolean
}

export interface IUpdateCompanyFavoriteResponse {
  isFavorite: boolean
}

