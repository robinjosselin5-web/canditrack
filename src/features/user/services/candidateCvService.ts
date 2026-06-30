import { httpClient } from '@/services/httpClient'
import type { IApiResponse } from '@/types/api'
import type {
  ICandidateCv,
  ICandidateCvListItem,
  ICandidateCvListResponse,
} from '../types/candidateCv.types'

export interface ICreateCandidateCvPayload {
  file: File
  label?: string
}

export async function createCandidateCv(
  payload: ICreateCandidateCvPayload,
): Promise<ICandidateCv> {
  const formData = new FormData()
  formData.append('file', payload.file)

  if (payload.label?.trim()) {
    formData.append('label', payload.label.trim())
  }

  const response = await httpClient.post<IApiResponse<ICandidateCv>>(
    '/profile/cv',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  return response.data.data
}

export async function getCandidateCvs(): Promise<ICandidateCvListItem[]> {
  const response = await httpClient.get<IApiResponse<ICandidateCvListResponse>>(
    '/profile/cv',
  )

  return response.data.data.cvs
}

export async function analyzeCandidateCv(cvId: string): Promise<void> {
  await httpClient.post<IApiResponse<null>>(`/profile/cv/${cvId}/analyze`)
}

export async function deleteCandidateCv(cvId: string): Promise<void> {
  await httpClient.delete<IApiResponse<null>>(`/profile/cv/${cvId}`)
}
