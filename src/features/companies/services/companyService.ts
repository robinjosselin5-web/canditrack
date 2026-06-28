import { httpClient } from '@/services/httpClient'
import type { IApiResponse } from '@/types/api'
import type {
  ICreateCompanyPayload,
  ICreateCompanyResponse,
  ICompanyListItem,
  IDeleteCompanyResponse,
  IUpdateCompanyFavoritePayload,
  IUpdateCompanyFavoriteResponse,
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

export async function getCompany(companyId: string): Promise<ICompanyListItem> {
  const response = await httpClient.get<IApiResponse<ICompanyListItem>>(
    `/companies/${companyId}`,
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

export async function deleteCompany(companyId: string): Promise<string> {
  const response = await httpClient.delete<IApiResponse<IDeleteCompanyResponse>>(
    `/companies/${companyId}`,
  )

  return response.data.data.message
}

export async function updateCompanyFavorite(
  companyId: string,
  payload: IUpdateCompanyFavoritePayload,
): Promise<IUpdateCompanyFavoriteResponse> {
  const response = await httpClient.patch<
    IApiResponse<IUpdateCompanyFavoriteResponse>
  >(`/companies/${companyId}/favorite`, payload)

  return response.data.data
}

