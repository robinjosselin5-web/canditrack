import { httpClient } from '@/services/httpClient'
import type { IApiResponse } from '@/types/api'
import type {
  ICreateCompanyPayload,
  ICreateCompanyResponse,
  ICompanyListItem,
  IUpdateCompanyPayload,
  IUpdateCompanyResponse,
} from '../types/company.types'

export async function createCompany(
  payload: ICreateCompanyPayload,
): Promise<ICreateCompanyResponse> {
  const response = await httpClient.post<IApiResponse<ICreateCompanyResponse>>(
    '/companies',
    payload,
  )

  return response.data.data
}

export async function getCompanies(): Promise<ICompanyListItem[]> {
  const response = await httpClient.get<IApiResponse<ICompanyListItem[]>>(
    '/companies',
  )

  return response.data.data
}

export async function updateCompany(
  companyId: string,
  payload: IUpdateCompanyPayload,
): Promise<IUpdateCompanyResponse> {
  const response = await httpClient.patch<
    IApiResponse<IUpdateCompanyResponse>
  >(`/companies/${companyId}`, payload)

  return response.data.data
}

