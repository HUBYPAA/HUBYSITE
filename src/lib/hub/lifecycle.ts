/**
 * Contact lifecycle / rollover rules.
 *
 * The rules (from the spec):
 * - A contact's term ends the day after `termEndsAt`.
 * - If they did not consent to remain, purge them the moment their term ends.
 * - If they consented, they may remain in appropriate lists (helper, past).
 *
 * This runs on-demand: any admin view that touches directory data calls
 * `applyDirectoryLifecycle()` so the rules are enforced without a cron job.
 */

import "server-only"
import { readAll, upsert, now } from "./store"
import { notify } from "./notifications"
import type { DirectoryContact } from "./types"

function dayAfter(isoDate: string): string {
  const d = new Date(isoDate + "T00:00:00Z")
  d.setUTCDate(d.getUTCDate() + 1)
  return d.toISOString().slice(0, 10)
}

export async function applyDirectoryLifecycle(): Promise<{
  purged: number
  rolled: number
  warned: number
}> {
  const contacts = await readAll("directory_contacts")
  const today = new Date().toISOString().slice(0, 10)
  let purged = 0
  let rolled = 0
  let warned = 0

  for (const c of contacts) {
    if (c.status !== "approved") continue
    if (!c.termEndsAt) continue
    const expiresOn = dayAfter(c.termEndsAt)

    // 14-day warning.
    const warnDate = new Date(expiresOn)
    warnDate.setUTCDate(warnDate.getUTCDate() - 14)
    const warnISO = warnDate.toISOString().slice(0, 10)
    if (today === warnISO) {
      await notify("admins", "contact_expiring", `${c.name}'s term ends in 14 days`, {
        href: `/admin/directory/${c.id}`,
        meta: { contactId: c.id },
      })
      warned++
      continue
    }

    if (today < expiresOn) continue

    // Term ended.
    if (!c.consentRemainAfterTerm) {
      const updated: DirectoryContact = {
        ...c,
        status: "purged",
        purgedAt: now(),
        updatedAt: now(),
      }
      await upsert("directory_contacts", updated)
      await notify("admins", "directory_purged", `Purged: ${c.name}`, {
        meta: { contactId: c.id },
      })
      purged++
      continue
    }

    // Rolled over — adjust listings according to consent flags.
    const listings: DirectoryContact["listings"] = []
    if (c.consentHelperList) listings.push("helper")
    if (c.consentPastList) listings.push("past")
    if (listings.length === 0) {
      const updated: DirectoryContact = {
        ...c,
        status: "purged",
        purgedAt: now(),
        updatedAt: now(),
      }
      await upsert("directory_contacts", updated)
      purged++
      continue
    }
    if (JSON.stringify(listings) !== JSON.stringify(c.listings)) {
      const updated: DirectoryContact = { ...c, listings, updatedAt: now() }
      await upsert("directory_contacts", updated)
      rolled++
    }
  }

  return { purged, rolled, warned }
}