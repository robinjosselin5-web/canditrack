import { AxiosError } from 'axios'
import type { IApiResponse } from '@/types/api'
import type { UseFormSetError } from 'react-hook-form'
import type { SkillFormInput } from '../validation/skillSchema'
import { getCandidateCvErrorMessage } from './candidateCvHelpers'

const SKILL_FIELDS = new Set(['name', 'category'])

export function applySkillFormBackendErrors(
  error: unknown,
  setError: UseFormSetError<SkillFormInput>,
): void {
  if (!(error instanceof AxiosError)) {
    return
  }

  const response = error.response?.data as IApiResponse<unknown> | undefined

  for (const fieldError of response?.errors ?? []) {
    if (fieldError.field && SKILL_FIELDS.has(fieldError.field)) {
      setError(fieldError.field as keyof SkillFormInput, {
        type: 'server',
        message: fieldError.message,
      })
    }
  }
}

export function getSkillFormGlobalErrorMessage(error: unknown): string | null {
  if (!(error instanceof AxiosError)) {
    return error ? 'Impossible d ajouter cette competence. Veuillez reessayer.' : null
  }

  const response = error.response?.data as IApiResponse<unknown> | undefined
  const fieldErrors = response?.errors ?? []

  if (fieldErrors.length === 0) {
    return response?.message ?? 'Impossible d ajouter cette competence. Veuillez reessayer.'
  }

  const hasGlobalError = fieldErrors.some(
    (fieldError) => !fieldError.field || !SKILL_FIELDS.has(fieldError.field),
  )

  if (!hasGlobalError) {
    return null
  }

  return response?.message ?? 'Impossible d ajouter cette competence. Veuillez reessayer.'
}

export function getDeleteSkillErrorMessage(error: unknown): string | null {
  if (error && typeof error === 'object') {
    const response = error as { response?: { status?: number } }

    if (response.response?.status === 404) {
      return "Cette competence n existe plus ou vous n etes pas autorise a la supprimer."
    }
  }

  return error
    ? getCandidateCvErrorMessage(
        error,
        'Impossible de supprimer la competence. Veuillez reessayer.',
      )
    : null
}
