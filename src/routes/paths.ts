export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  VERIFY_EMAIL: "/verify-email",
} as const;

export function buildVerifyEmailPath(email: string): string {
  return `${ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(email)}`;
}
