import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { exchangeCode, fetchProfile } from "@/lib/hub/oauth"
import { readAll, upsert, newId, now } from "@/lib/hub/store"
import { setSession } from "@/lib/hub/session"
import { ensureSeed } from "@/lib/hub/seed"
import type { HubUser } from "@/lib/hub/types"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function errorRedirect(base: string, msg: string) {
  const url = new URL("/auth/error", base)
  url.searchParams.set("message", msg)
  return NextResponse.redirect(url)
}

export async function GET(req: Request) {
  await ensureSeed()

  const url = new URL(req.url)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const store = await cookies()
  const savedState = store.get("hub_oauth_state")?.value
  const next = store.get("hub_oauth_next")?.value || "/portal"

  store.delete("hub_oauth_state")
  store.delete("hub_oauth_next")

  if (!code || !state || !savedState || state !== savedState) {
    return errorRedirect(req.url, "Invalid sign-in state. Please try again.")
  }

  let profile
  try {
    const { accessToken } = await exchangeCode(code, url.origin)
    profile = await fetchProfile(accessToken)
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Sign-in failed."
    return errorRedirect(req.url, msg)
  }

  if (!profile.email || profile.email_verified === false) {
    return errorRedirect(req.url, "Google account email is not verified.")
  }

  const users = await readAll("users")
  const existing = users.find((u) => u.googleId === profile.sub)

  let user: HubUser
  if (existing) {
    user = {
      ...existing,
      email: profile.email,
      name: profile.name ?? existing.name,
      avatarUrl: profile.picture ?? existing.avatarUrl,
      lastSeenAt: now(),
      updatedAt: now(),
    }
  } else {
    user = {
      id: newId(),
      googleId: profile.sub,
      email: profile.email,
      name: profile.name ?? profile.email,
      avatarUrl: profile.picture,
      roles: [],
      portalAccess: "none",
      submitterAccess: "none",
      createdAt: now(),
      updatedAt: now(),
      lastSeenAt: now(),
    }
  }

  // Bootstrap elevation.
  const bootstrap = (process.env.HUB_BOOTSTRAP_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
  if (bootstrap.includes(user.email.toLowerCase())) {
    if (!user.roles.includes("super_admin")) {
      user = {
        ...user,
        roles: Array.from(new Set([...user.roles, "super_admin"])) as HubUser["roles"],
      }
    }
    if (user.portalAccess !== "approved") {
      user = {
        ...user,
        portalAccess: "approved",
        portalApprovedAt: user.portalApprovedAt ?? now(),
        portalApprovedBy: user.portalApprovedBy ?? "system-bootstrap",
      }
    }
    if (user.submitterAccess !== "approved") {
      user = {
        ...user,
        submitterAccess: "approved",
        submitterApprovedAt: user.submitterApprovedAt ?? now(),
        submitterApprovedBy: user.submitterApprovedBy ?? "system-bootstrap",
      }
    }
  }

  await upsert("users", user)
  await setSession({ userId: user.id, email: user.email, name: user.name })

  return NextResponse.redirect(new URL(next, req.url))
}