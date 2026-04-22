/**
 * Current-user lookup and role/permission helpers.
 *
 * The session cookie only carries identifiers; everything authoritative
 * (roles, portal access, submitter access) is re-read from the store on
 * each request so that admin revocations take effect immediately.
 */

import "server-only"
import { redirect } from "next/navigation"
import { getSession } from "./session"
import { readAll } from "./store"
import { ensureSeed } from "./seed"
import type { HubRole, HubUser } from "./types"

export async function getCurrentUser(): Promise<HubUser | null> {
  await ensureSeed()
  const session = await getSession()
  if (!session) return null
  const users = await readAll("users")
  return users.find((u) => u.id === session.userId) ?? null
}

export function isAdmin(user: HubUser | null): boolean {
  if (!user) return false
  return user.roles.length > 0
}

export function hasRole(user: HubUser | null, ...roles: HubRole[]): boolean {
  if (!user) return false
  if (user.roles.includes("super_admin")) return true
  return roles.some((r) => user.roles.includes(r))
}

export function canReviewEvents(user: HubUser | null): boolean {
  return hasRole(user, "events_admin")
}

export function canManageNewsletter(user: HubUser | null): boolean {
  return hasRole(user, "newsletter_admin")
}

export function canManageDirectory(user: HubUser | null): boolean {
  return hasRole(user, "directory_admin")
}

export function canManageAccess(user: HubUser | null): boolean {
  // Any admin can triage access, but only super_admin can change roles.
  return isAdmin(user)
}

export function canSubmitEvents(user: HubUser | null): boolean {
  if (!user) return false
  return user.submitterAccess === "approved"
}

export function hasPortalAccess(user: HubUser | null): boolean {
  if (!user) return false
  return user.portalAccess === "approved"
}

export async function requirePortalAccess(): Promise<HubUser> {
  const user = await getCurrentUser()
  if (!user) redirect("/auth/sign-in?next=/portal")
  if (!hasPortalAccess(user)) redirect("/portal/waitlist")
  return user
}

export async function requireAdmin(): Promise<HubUser> {
  const user = await getCurrentUser()
  if (!user) redirect("/auth/sign-in?next=/admin")
  if (!isAdmin(user)) redirect("/portal")
  return user
}

export async function requireSubmitter(): Promise<HubUser> {
  const user = await requirePortalAccess()
  if (!canSubmitEvents(user)) redirect("/portal/submitter-access")
  return user
}