export const ROUTES = {
  APPLICATIONS: '/applications',
  COMPANIES: '/companies',
  DASHBOARD: '/dashboard',
  EXTRACTED_DATA: '/profile/cv/extracted-data',
  FORGOT_PASSWORD: '/forgot-password',
  LOGIN: '/login',
  PROFILE_CV: '/profile/cv',
  RESET_PASSWORD: '/reset-password',
  SETTINGS: '/settings',
  STATISTICS: '/statistics',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
} as const;

export function buildVerifyEmailPath(email: string): string {
  return `${ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(email)}`;
}
