export const resumesQueryKeys = {
  all: ['resumes'] as const,
  extractedData: (cvId: string | undefined) =>
    ['resumes', 'extracted-data', cvId] as const,
}
