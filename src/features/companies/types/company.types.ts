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

