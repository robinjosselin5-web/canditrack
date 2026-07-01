import { AxiosError } from 'axios'
import type { IApiResponse } from '@/types/api'

export function getLoginErrorMessage(error: unknown): string | null {
  if (!error) {
    return null
  }

  if (error instanceof AxiosError) {
    const response = error.response?.data as IApiResponse<unknown> | undefined

    if (!error.response) {
      return "L'API est indisponible. Verifiez que le backend est demarre."
    }

    if (error.response.status === 404) {
      return "La route de connexion est introuvable. Verifiez que l'API /api/v1/auth/login existe."
    }

    if (error.response.status === 401) {
      return 'Adresse e-mail ou mot de passe incorrect.'
    }

    if (error.response.status === 403 && isEmailNotVerifiedError(error)) {
      return "Votre adresse e-mail doit etre validee avant de vous connecter."
    }

    return response?.message ?? 'Connexion impossible. Verifiez vos identifiants.'
  }

  return 'Connexion impossible. Reessayez dans quelques instants.'
}

export function getResendCodeErrorMessage(error: unknown): string | null {
  if (!error) {
    return null
  }

  if (error instanceof AxiosError) {
    const response = error.response?.data as IApiResponse<unknown> | undefined
    return response?.message ?? 'Impossible de renvoyer un code.'
  }

  return 'Impossible de renvoyer un code.'
}

export function getRegisterErrorMessage(error: unknown): string | null {
  if (!error) {
    return null
  }

  if (error instanceof AxiosError) {
    const response = error.response?.data as IApiResponse<unknown> | undefined

    if (!error.response) {
      return "L'API est indisponible. Verifiez que le backend est demarre."
    }

    if (error.response.status === 404) {
      return "La route d'inscription est introuvable. Verifiez que l'API /api/v1/auth/register existe."
    }

    return (
      response?.message ??
      'Impossible de creer le compte. Verifiez les informations saisies.'
    )
  }

  return 'Impossible de creer le compte. Reessayez dans quelques instants.'
}

export function getForgotPasswordErrorMessage(error: unknown): string | null {
  if (!error) {
    return null
  }

  if (error instanceof AxiosError) {
    const response = error.response?.data as IApiResponse<unknown> | undefined

    if (!error.response) {
      return "L'API est indisponible. Verifiez que le backend est demarre."
    }

    return (
      response?.message ??
      'Impossible d\'envoyer le lien de reinitialisation. Reessayez.'
    )
  }

  return 'Impossible d\'envoyer le lien de reinitialisation. Reessayez.'
}

export function getResetPasswordErrorMessage(error: unknown): string | null {
  if (!error) {
    return null
  }

  if (error instanceof AxiosError) {
    const response = error.response?.data as IApiResponse<unknown> | undefined

    if (!error.response) {
      return "L'API est indisponible. Verifiez que le backend est demarre."
    }

    if (error.response.status === 400 || error.response.status === 422) {
      return response?.message ?? 'Le lien de reinitialisation est invalide.'
    }

    return (
      response?.message ??
      'Impossible de reinitialiser le mot de passe. Reessayez.'
    )
  }

  return 'Impossible de reinitialiser le mot de passe. Reessayez.'
}

export function getEmailVerificationErrorMessage(error: unknown): string | null {
  if (!error) {
    return null
  }

  if (error instanceof AxiosError) {
    const response = error.response?.data as IApiResponse<unknown> | undefined

    if (!error.response) {
      return "L'API est indisponible. Verifiez que le backend est demarre."
    }

    return (
      response?.message ??
      'Impossible de valider le compte. Verifiez le code saisi.'
    )
  }

  return 'Impossible de valider le compte. Reessayez dans quelques instants.'
}

export function isEmailNotVerifiedError(error: unknown): boolean {
  if (!(error instanceof AxiosError)) {
    return false
  }

  const response = error.response?.data as IApiResponse<unknown> | undefined

  return Boolean(
    error.response?.status === 403 &&
      response?.errors?.some(
        (apiError) =>
          apiError.field === 'emailVerification' &&
          apiError.message === 'EMAIL_NOT_VERIFIED',
      ),
  )
}
