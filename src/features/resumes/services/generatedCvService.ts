import { httpClient } from '@/services/httpClient'
import type { IApiResponse } from '@/types/api'
import type {
  ICreateGeneratedCvPayload,
  IGeneratedCvDetail,
  IGeneratedCvListItem,
  IGeneratedCvRenderData,
} from '../types/generatedCv.types'

export async function createGeneratedCv(
  payload: ICreateGeneratedCvPayload,
): Promise<IGeneratedCvDetail> {
  const response = await httpClient.post<IApiResponse<IGeneratedCvDetail>>(
    '/profile/generated-cvs',
    payload,
  )

  return response.data.data
}

export async function getGeneratedCvs(): Promise<IGeneratedCvListItem[]> {
  const response = await httpClient.get<IApiResponse<IGeneratedCvListItem[]>>(
    '/profile/generated-cvs',
  )

  return response.data.data
}

export async function getGeneratedCv(
  generatedCvId: string,
): Promise<IGeneratedCvDetail> {
  const response = await httpClient.get<IApiResponse<IGeneratedCvDetail>>(
    `/profile/generated-cvs/${generatedCvId}`,
  )

  return response.data.data
}

export async function getPublicGeneratedCv(
  publicId: string,
): Promise<IGeneratedCvRenderData> {
  const response = await httpClient.get<IApiResponse<IGeneratedCvRenderData>>(
    `/public/generated-cvs/${publicId}`,
  )

  return response.data.data
}

export async function getGeneratedCvAvatar(publicId: string): Promise<Blob> {
  const response = await httpClient.get<Blob>(
    `/public/generated-cvs/${publicId}/avatar`,
    { responseType: 'blob' },
  )

  return response.data
}
