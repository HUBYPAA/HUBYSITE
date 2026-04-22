/**
 * Seeds initial regions and admin bootstrap on first access.
 *
 * Idempotent: safe to run on every boot. It only writes when a collection
 * is empty or when new seed entries are missing.
 */

import "server-only"
import { readAll, upsert, now, newId } from "./store"
import type { HubRegion, HubUser } from "./types"

const INITIAL_REGIONS: Array<Pick<HubRegion, "label" | "slug" | "sortOrder">> = [
  { label: "North America — Northeast",       slug: "na-northeast",     sortOrder: 0 },
  { label: "North America — Southeast",       slug: "na-southeast",     sortOrder: 1 },
  { label: "North America — Central",         slug: "na-central",       sortOrder: 2 },
  { label: "North America — West",            slug: "na-west",          sortOrder: 3 },
  { label: "Canada",                          slug: "canada",           sortOrder: 4 },
  { label: "Central & South America",         slug: "latam",            sortOrder: 5 },
  { label: "Western Europe",                  slug: "western-europe",   sortOrder: 6 },
  { label: "Eastern Europe & Russia",         slug: "eastern-europe",   sortOrder: 7 },
  { label: "Middle East & North Africa",      slug: "mena",             sortOrder: 8 },
  { label: "Sub-Saharan Africa",              slug: "africa",           sortOrder: 9 },
  { label: "East Asia",                       slug: "east-asia",        sortOrder: 10 },
  { label: "Southeast Asia & Oceania",        slug: "sea-oceania",      sortOrder: 11 },
  { label: "South Asia",                      slug: "south-asia",       sortOrder: 12 },
]

let _seeded = false

export async function ensureSeed(): Promise<void> {
  if (_seeded) return
  _seeded = true

  // Seed regions if missing.
  const existing = await readAll("regions")
  const existingSlugs = new Set(existing.map((r) => r.slug))
  for (const seed of INITIAL_REGIONS) {
    if (existingSlugs.has(seed.slug)) continue
    const region: HubRegion = {
      id: newId(),
      label: seed.label,
      slug: seed.slug,
      sortOrder: seed.sortOrder,
      active: true,
      createdAt: now(),
      updatedAt: now(),
    }
    await upsert("regions", region)
  }

  // Bootstrap super-admin from env. The env var lists Google account
  // emails that should be granted super_admin + portal access on sign-in.
  const bootstrap = (process.env.HUB_BOOTSTRAP_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

  if (bootstrap.length > 0) {
    const users = await readAll("users")
    for (const email of bootstrap) {
      const u = users.find((x) => x.email.toLowerCase() === email)
      if (!u) continue
      const changed =
        !u.roles.includes("super_admin") || u.portalAccess !== "approved"
      if (!changed) continue
      const updated: HubUser = {
        ...u,
        roles: Array.from(new Set([...u.roles, "super_admin"])) as HubUser["roles"],
        portalAccess: "approved",
        submitterAccess: u.submitterAccess === "approved" ? "approved" : "approved",
        portalApprovedAt: u.portalApprovedAt ?? now(),
        portalApprovedBy: u.portalApprovedBy ?? "system-bootstrap",
        submitterApprovedAt: u.submitterApprovedAt ?? now(),
        submitterApprovedBy: u.submitterApprovedBy ?? "system-bootstrap",
        updatedAt: now(),
      }
      await upsert("users", updated)
    }
  }
}