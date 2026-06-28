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

export interface ICompanyUpdatedResponse {
  id: string
  name: string
  website: string | null
  email: string | null
  phone: string | null
  city: string | null
  country: string | null
  recruiterName: string | null
  status: 'draft' | 'pending' | 'no_response' | 'follow_up' | 'interview' | 'rejected' | 'accepted'
  updatedAt: string
}

export interface ICompanyListItem {
  id: string
  name: string
  website: string | null
  email: string | null
  phone: string | null
  city: string | null
  country: string | null
  recruiterName: string | null
  status: 'draft' | 'pending' | 'no_response' | 'follow_up' | 'interview' | 'rejected' | 'accepted'
  createdAt: string
  updatedAt: string
}

