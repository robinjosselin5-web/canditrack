export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('fr-FR')
}

export function getDisplayValue(value: string | null | undefined): string {
  if (!value) {
    return '—'
  }

  return value
}
