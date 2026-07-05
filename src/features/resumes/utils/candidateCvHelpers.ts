export { MAX_CV_FILE_SIZE, MAX_CV_LABEL_LENGTH } from '@/config/candidateCvConstants'

export function formatCvDate(date: string): string {
  return new Intl.DateTimeFormat('fr-FR').format(new Date(date))
}

export function formatCvPeriod(
  startDate: string | null,
  endDate: string | null,
  isCurrent?: boolean,
): string {
  const startLabel = startDate ? formatCvPartialDate(startDate) : 'Date de debut inconnue'

  if (isCurrent) {
    return `${startLabel} - Aujourd'hui`
  }

  if (endDate) {
    return `${startLabel} - ${formatCvPartialDate(endDate)}`
  }

  return startLabel
}

export function formatCvSkillCategory(category: string): string {
  switch (category) {
    case 'LANGUAGES':
      return 'Langages'
    case 'FRAMEWORKS_LIBRARIES':
      return 'Frameworks & Bibliotheques'
    case 'TOOLS_TECHNOLOGIES':
      return 'Outils & Technologies'
    case 'METHODOLOGIES':
      return 'Methodologies'
    case 'SOFT_SKILLS':
      return 'Soft Skills'
    default:
      return 'Autres'
  }
}

export function getCandidateCvErrorMessage(
  error: unknown,
  fallbackMessage = "Une erreur est survenue pendant l'import du CV.",
): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = error as { response?: { data?: { message?: string } } }

    if (response.response?.data?.message) {
      return response.response.data.message
    }

    if (!response.response) {
      return "L'API est indisponible. Verifiez que le backend est demarre."
    }
  }

  return fallbackMessage
}

function formatCvPartialDate(date: string): string {
  if (/^\d{4}$/.test(date)) {
    return date
  }

  if (/^\d{4}-\d{2}$/.test(date)) {
    const [year, month] = date.split('-')
    return `${getMonthLabel(Number(month))} ${year}`
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return formatCvDate(date)
}

function getMonthLabel(month: number): string {
  const monthLabels = [
    'Janv.',
    'Févr.',
    'Mars',
    'Avr.',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ]

  return monthLabels[month - 1] ?? ''
}
