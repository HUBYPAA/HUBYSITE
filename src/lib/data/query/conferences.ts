/**
 * Conference query / viewmodel layer.
 */

import "server-only"

import { adaptAllConferences, conferencesToMapMarkers } from "../normalized/adapt"
import type { Conference, ConferenceStatus, MapMarker } from "../normalized/types"

let _conferences: Conference[] | null = null

const TODAY = new Date().toISOString().split("T")[0]

/** Resolve the effective status based on dates and source status. */
function resolveStatus(conf: Conference): ConferenceStatus {
  if (conf.conferenceStatus === "cancelled") return "cancelled"
  if (conf.endDate && conf.endDate < TODAY) return "completed"
  if (conf.startDate && conf.startDate <= TODAY && (!conf.endDate || conf.endDate >= TODAY)) return "in-progress"
  return conf.conferenceStatus
}

function getAllConferences(): Conference[] {
  if (!_conferences) {
    _conferences = adaptAllConferences().map((c) => ({
      ...c,
      conferenceStatus: resolveStatus(c),
    }))
  }
  return _conferences
}

export function getConferences(): Conference[] {
  return getAllConferences()
}

export function getConferenceCount(): number {
  return getAllConferences().length
}

export function getUpcomingConferences(): Conference[] {
  return getAllConferences()
    .filter(
      (c) =>
        c.conferenceStatus !== "completed" &&
        c.conferenceStatus !== "cancelled",
    )
    .sort((a, b) => {
      if (!a.startDate) return 1
      if (!b.startDate) return -1
      return a.startDate.localeCompare(b.startDate)
    })
}

export function getPastConferences(): Conference[] {
  return getAllConferences()
    .filter((c) => c.conferenceStatus === "completed")
    .sort((a, b) => {
      if (!a.startDate) return 1
      if (!b.startDate) return -1
      return b.startDate.localeCompare(a.startDate) // most recent first
    })
}

export function getFeaturedConference(): Conference | null {
  const upcoming = getUpcomingConferences()
  return upcoming[0] ?? null
}

export function getConferenceMapMarkers(): MapMarker[] {
  return conferencesToMapMarkers(getAllConferences())
}

export function getConferenceBySlug(slug: string): Conference | undefined {
  return getAllConferences().find((c) => c.slug === slug)
}
