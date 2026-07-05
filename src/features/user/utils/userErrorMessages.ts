import { AxiosError } from 'axios'
import type { IApiResponse } from '@/types/api'

function getAxiosError(error: unknown): AxiosError | null {
  if (!error) {
    return null
  }

  if (error instanceof AxiosError) {
    return error
  }

  return null
}

function getApiErrorData(error: AxiosError): IApiResponse<unknown> | undefined {
  return error.response?.data as IApiResponse<unknown> | undefined
}

function getUnavailableOrFallbackMessage(
  error: AxiosError,
  fallbackMessage: string,
): string {
  if (!error.response) {
    return "L'API est indisponible. Verifiez que le backend est demarre."
  }

  const response = getApiErrorData(error)

  return response?.message ?? fallbackMessage
}

export function getProfileErrorMessage(error: unknown): string | null {
  const axiosError = getAxiosError(error)

  if (!axiosError) {
    return null
  }

  if (axiosError.response?.status === 409) {
    return 'Cette adresse e-mail est deja utilisee.'
  }

  return getUnavailableOrFallbackMessage(
    axiosError,
    'La mise a jour du profil a echoue.',
  )
}

export function getLogoutErrorMessage(error: unknown): string | null {
  const axiosError = getAxiosError(error)

  if (!axiosError) {
    return null
  }

  return getUnavailableOrFallbackMessage(
    axiosError,
    'La deconnexion a echoue. Reessayez.',
  )
}
