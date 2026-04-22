/**
 * Minimal Google OAuth 2.0 (authorization-code flow).
 *
 * We don't use a library here; the flow is small and keeping the code on
 * this side makes it obvious what is and isn't happening with user data.
 */

import "server-only"

const AUTHORIZE_URL = "https://accounts.google.com/o/oauth2/v2/auth"
const TOKEN_URL = "https://oauth2.googleapis.com/token"
const USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo"

function env(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env var: ${name}`)
  return v
}

export function redirectUri(origin: string): string {
  // Allow override for deployment environments where the public URL
  // differs from the incoming request origin.
  const fromEnv = process.env.HUB_OAUTH_REDIRECT_URL
  if (fromEnv) return fromEnv
  return `${origin}/auth/callback`
}

export function buildAuthorizeUrl(opts: {
  origin: string
  state: string
}): string {
  const params = new URLSearchParams({
    client_id: env("GOOGLE_CLIENT_ID"),
    redirect_uri: redirectUri(opts.origin),
    response_type: "code",
    scope: "openid email profile",
    access_type: "online",
    include_granted_scopes: "true",
    state: opts.state,
    prompt: "select_account",
  })
  return `${AUTHORIZE_URL}?${params.toString()}`
}

export interface GoogleProfile {
  sub: string
  email: string
  email_verified?: boolean
  name?: string
  picture?: string
}

export async function exchangeCode(code: string, origin: string): Promise<{
  accessToken: string
}> {
  const body = new URLSearchParams({
    code,
    client_id: env("GOOGLE_CLIENT_ID"),
    client_secret: env("GOOGLE_CLIENT_SECRET"),
    redirect_uri: redirectUri(origin),
    grant_type: "authorization_code",
  })
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Token exchange failed: ${res.status} ${text}`)
  }
  const json = (await res.json()) as { access_token: string }
  return { accessToken: json.access_token }
}

export async function fetchProfile(accessToken: string): Promise<GoogleProfile> {
  const res = await fetch(USERINFO_URL, {
    headers: { authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`userinfo failed: ${res.status} ${text}`)
  }
  return (await res.json()) as GoogleProfile
}

export function oauthConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
}