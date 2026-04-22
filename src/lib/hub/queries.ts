/**
 * Read-side query helpers for the communications module.
 *
 * Responsible for deriving UI view models (archive rollover, public event
 * filtering, directory lifecycle, etc.) from the raw store.
 */

import "server-only"
import { readAll } from "./store"
import type { HubEvent, HubRegion } from "./types"

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function getRegions(opts: { activeOnly?: boolean } = {}): Promise<HubRegion[]> {
  const all = await readAll("regions")
  const filtered = opts.activeOnly ? all.filter((r) => r.active) : all
  return filtered.sort((a, b) => a.sortOrder - b.sortOrder || a.label.localeCompare(b.label))
}

export async function getRegionMap(): Promise<Map<string, HubRegion>> {
  const regions = await readAll("regions")
  return new Map(regions.map((r) => [r.id, r]))
}

/**
 * A "live" event is an approved event whose last day is today or later.
 * Past events auto-roll into the archive view.
 */
export async function getPublicEvents(): Promise<HubEvent[]> {
  const [events] = await Promise.all([readAll("events")])
  const today = todayISO()
  return events
    .filter((e) => e.status === "approved")
    .filter((e) => {
      const last = e.endDate ?? e.date
      return last >= today
    })
    .sort((a, b) => a.date.localeCompare(b.date))
}

export async function getArchiveEvents(): Promise<HubEvent[]> {
  const events = await readAll("events")
  const today = todayISO()
  return events
    .filter((e) => e.status === "approved" || e.status === "archived")
    .filter((e) => {
      const last = e.endDate ?? e.date
      return last < today
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

export async function getPendingEventCount(): Promise<number> {
  const events = await readAll("events")
  return events.filter((e) => e.status === "pending").length
}