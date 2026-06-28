import { httpClient } from '@/services/httpClient'
import type { IApiResponse } from '@/types/api'
import type {
  ICreateCompanyPayload,
  ICreateCompanyResponse,
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

