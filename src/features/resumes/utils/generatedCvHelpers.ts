export interface IGeneratedCvPublicPathInput {
  publicId: string
  firstname: string
  lastname: string
}

export function slugifyCandidateName(
  lastname: string | null | undefined,
  firstname: string | null | undefined,
): string {
  const slug = `${lastname ?? ''}-${firstname ?? ''}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')

  return slug || 'cv-candidat'
}

export function buildGeneratedCvPublicPath({
  publicId,
  firstname,
  lastname,
}: IGeneratedCvPublicPathInput): string {
  return `/${slugifyCandidateName(lastname, firstname)}/${publicId}`
}
