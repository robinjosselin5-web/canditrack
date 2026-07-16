export const ROUTES = {
  APPLICATIONS: '/applications',
  COMPANIES: '/companies',
  DASHBOARD: '/dashboard',
  EXTRACTED_DATA: '/profile/cv/extracted-data',
  EXTRACTED_DATA_EXPERIENCES: '/profile/cv/extracted-data/experiences',
  EXTRACTED_DATA_SKILLS: '/profile/cv/extracted-data/skills',
  EXTRACTED_DATA_TRAINING: '/profile/cv/extracted-data/training',
  FORGOT_PASSWORD: '/forgot-password',
  LOGIN: '/login',
  PROFILE_CV: '/profile/cv',
  RESET_PASSWORD: '/reset-password',
  SETTINGS: '/settings',
  STATISTICS: '/statistics',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
  GENERATED_CV_PUBLIC: '/:candidateSlug/:publicId',
} as const;

export function buildVerifyEmailPath(email: string): string {
  return `${ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(email)}`;
}
