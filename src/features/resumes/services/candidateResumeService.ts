import { httpClient } from '@/services/httpClient'
import type { IApiResponse } from '@/types/api'
import type {
  ICandidateCv,
  ICandidateCvExperience,
  ICandidateCvListItem,
  ICandidateCvListResponse,
  ICreateCandidateExperiencePayload,
  IUpdateCandidateExperiencePayload,
  IProfileExtractedDataResponse,
} from '../types/candidateResume.types'

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

export async function getProfileExtractedData(): Promise<IProfileExtractedDataResponse> {
  const response = await httpClient.get<IApiResponse<IProfileExtractedDataResponse>>(
    '/profile/cv/extracted-data',
  )

  return response.data.data
}

export async function createCandidateExperience(
  payload: ICreateCandidateExperiencePayload,
): Promise<ICandidateCvExperience> {
  const response = await httpClient.post<IApiResponse<ICandidateCvExperience>>(
    '/profile/experiences',
    payload,
  )

  return response.data.data
}

export async function updateCandidateExperience(
  experienceId: string,
  payload: IUpdateCandidateExperiencePayload,
): Promise<ICandidateCvExperience> {
  const response = await httpClient.patch<IApiResponse<ICandidateCvExperience>>(
    `/profile/experiences/${experienceId}`,
    payload,
  )

  return response.data.data
}

export async function deleteCandidateExperience(
  experienceId: string,
): Promise<string> {
  const response = await httpClient.delete<
    IApiResponse<{ message: string }>
  >(`/profile/experiences/${experienceId}`)

  return response.data.data.message
}

export async function analyzeCandidateCv(cvId: string): Promise<void> {
  await httpClient.post<IApiResponse<null>>(`/profile/cv/${cvId}/analyze`)
}

export async function deleteCandidateCv(cvId: string): Promise<void> {
  await httpClient.delete<IApiResponse<null>>(`/profile/cv/${cvId}`)
}
