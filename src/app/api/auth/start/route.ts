import { NextResponse } from "next/server"
import { randomBytes } from "node:crypto"
import { cookies } from "next/headers"
import { buildAuthorizeUrl, oauthConfigured } from "@/lib/hub/oauth"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(req: Request) {
  if (!oauthConfigured()) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url))
  }
  const url = new URL(req.url)
  const next = url.searchParams.get("next") || "/portal"

  const state = randomBytes(24).toString("base64url")
  const store = await cookies()
  store.set("hub_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  })
  store.set("hub_oauth_next", next, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  })

  const authorize = buildAuthorizeUrl({ origin: url.origin, state })
  return NextResponse.redirect(authorize)
}