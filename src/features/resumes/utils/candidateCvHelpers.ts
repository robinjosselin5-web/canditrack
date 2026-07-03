export const MAX_CV_FILE_SIZE = 10 * 1024 * 1024

export function formatCvDate(date: string): string {
  return new Intl.DateTimeFormat('fr-FR').format(new Date(date))
}

export function getCandidateCvErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = error as { response?: { data?: { message?: string } } }

    if (response.response?.data?.message) {
      return response.response.data.message
    }
  }

  return "Une erreur est survenue pendant l'import du CV."
}
