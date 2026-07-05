import { AxiosError } from "axios";
import type { IApiResponse } from "@/types/api";

const API_UNAVAILABLE_MESSAGE =
  "L'API est indisponible. Verifiez que le backend est demarre.";

function getAxiosError(error: unknown): AxiosError | null {
  if (!error) {
    return null;
  }

  if (error instanceof AxiosError) {
    return error;
  }

  return null;
}

function getApiErrorData(error: AxiosError): IApiResponse<unknown> | undefined {
  return error.response?.data as IApiResponse<unknown> | undefined;
}

function getUnavailableOrFallbackMessage(
  error: AxiosError,
  fallbackMessage: string,
): string {
  if (!error.response) {
    return API_UNAVAILABLE_MESSAGE;
  }

  const response = getApiErrorData(error);

  return response?.message ?? fallbackMessage;
}

export function getLoginErrorMessage(error: unknown): string | null {
  const axiosError = getAxiosError(error);

  if (!axiosError) {
    return null;
  }

  if (axiosError.response?.status === 404) {
    return "La route de connexion est introuvable. Verifiez que l'API /api/v1/auth/login existe.";
  }

  if (axiosError.response?.status === 401) {
    return "Adresse e-mail ou mot de passe incorrect.";
  }

  if (
    axiosError.response?.status === 403 &&
    isEmailNotVerifiedError(axiosError)
  ) {
    return "Votre adresse e-mail doit etre validee avant de vous connecter.";
  }

  return getUnavailableOrFallbackMessage(
    axiosError,
    "Connexion impossible. Verifiez vos identifiants.",
  );
}

export function getResendCodeErrorMessage(error: unknown): string | null {
  const axiosError = getAxiosError(error);

  if (!axiosError) {
    return null;
  }

  return getUnavailableOrFallbackMessage(
    axiosError,
    "Impossible de renvoyer un code.",
  );
}

export function getRegisterErrorMessage(error: unknown): string | null {
  const axiosError = getAxiosError(error);

  if (!axiosError) {
    return null;
  }

  if (axiosError.response?.status === 404) {
    return "La route d'inscription est introuvable. Verifiez que l'API /api/v1/auth/register existe.";
  }

  return getUnavailableOrFallbackMessage(
    axiosError,
    "Impossible de creer le compte. Verifiez les informations saisies.",
  );
}

export function getForgotPasswordErrorMessage(error: unknown): string | null {
  const axiosError = getAxiosError(error);

  if (!axiosError) {
    return null;
  }

  return getUnavailableOrFallbackMessage(
    axiosError,
    "Impossible d'envoyer le lien de reinitialisation. Reessayez.",
  );
}

export function getResetPasswordErrorMessage(error: unknown): string | null {
  const axiosError = getAxiosError(error);

  if (!axiosError) {
    return null;
  }

  if (
    axiosError.response?.status === 400 ||
    axiosError.response?.status === 422
  ) {
    return getUnavailableOrFallbackMessage(
      axiosError,
      "Le lien de reinitialisation est invalide.",
    );
  }

  return getUnavailableOrFallbackMessage(
    axiosError,
    "Impossible de reinitialiser le mot de passe. Reessayez.",
  );
}

export function getEmailVerificationErrorMessage(
  error: unknown,
): string | null {
  const axiosError = getAxiosError(error);

  if (!axiosError) {
    return null;
  }

  return getUnavailableOrFallbackMessage(
    axiosError,
    "Impossible de valider le compte. Verifiez le code saisi.",
  );
}

export function isEmailNotVerifiedError(error: unknown): boolean {
  if (!(error instanceof AxiosError)) {
    return false;
  }

  const response = error.response?.data as IApiResponse<unknown> | undefined;

  return Boolean(
    error.response?.status === 403 &&
    response?.errors?.some(
      (apiError) =>
        apiError.field === "emailVerification" &&
        apiError.message === "EMAIL_NOT_VERIFIED",
    ),
  );
}
