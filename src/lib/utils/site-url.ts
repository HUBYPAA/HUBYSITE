const FALLBACK_SITE_URL = "https://ypaa.org"

function normalizeUrl(input: string): string {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    return input
  }

  return `https://${input}`
}

export function resolveSiteUrl(): URL {
  const candidate =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    FALLBACK_SITE_URL

  return new URL(normalizeUrl(candidate))
}
