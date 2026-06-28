export function normalizeWebsiteUrl(
  website: string | null | undefined,
): string | null | undefined {
  if (!website) {
    return website
  }

  if (/^https?:\/\//i.test(website)) {
    return website
  }

  return `https://${website}`
}
