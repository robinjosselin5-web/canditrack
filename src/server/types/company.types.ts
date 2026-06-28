export interface ICreateCompanyInput {
  userId: string
  categoryId?: string
  name: string
  website?: string
  email?: string
  phone?: string
  city?: string
  country?: string
  recruiterName?: string
}

export interface ICompanyCreatedResponse {
  id: string
  name: string
  status: 'draft'
}

