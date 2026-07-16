export const resumesQueryKeys = {
  all: ['resumes'] as const,
  profileExtractedData: () => ['resumes', 'profile-extracted-data'] as const,
  generatedCvs: () => ['resumes', 'generated-cvs'] as const,
  generatedCv: (id: string) => ['resumes', 'generated-cvs', id] as const,
  publicGeneratedCv: (publicId: string) =>
    ['resumes', 'public-generated-cvs', publicId] as const,
}
