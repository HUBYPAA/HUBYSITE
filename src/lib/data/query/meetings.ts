/**
 * Meeting query / viewmodel layer.
 *
 * Provides UI-friendly accessors on top of normalized meeting data.
 * All functions are pure and stateless — safe for server components.
 */

import "server-only"

import { adaptAllMeetings, meetingsToMapMarkers } from "../normalized/adapt"
import type { Meeting, MapMarker } from "../normalized/types"

// ── Memoized data ─────────────────────────────────

let _meetings: Meeting[] | null = null

function getAllMeetings(): Meeting[] {
  if (!_meetings) {
    _meetings = adaptAllMeetings()
  }
  return _meetings
}

// ── Queries ───────────���───────────────────────────

export function getMeetings(): Meeting[] {
  return getAllMeetings()
}

export function getMeetingCount(): number {
  return getAllMeetings().length
}

export function getMeetingsByState(stateAbbreviation: string): Meeting[] {
  return getAllMeetings().filter(
    (m) => m.stateAbbreviation === stateAbbreviation,
  )
}

export function getMeetingCountsByState(): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const m of getAllMeetings()) {
    counts[m.stateAbbreviation] = (counts[m.stateAbbreviation] || 0) + 1
  }
  return counts
}

export function getStatesWithMeetings(): string[] {
  const states = new Set(getAllMeetings().map((m) => m.stateAbbreviation))
  return Array.from(states).sort()
}

export function getMeetingsByDay(day: string): Meeting[] {
  return getAllMeetings().filter((m) => m.day === day)
}

export function getMeetingsByFormat(format: string): Meeting[] {
  return getAllMeetings().filter((m) => m.format === format)
}

export function searchMeetings(query: string): Meeting[] {
  const q = query.toLowerCase().trim()
  if (!q) return getAllMeetings()

  return getAllMeetings().filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      (m.city && m.city.toLowerCase().includes(q)) ||
      (m.location && m.location.toLowerCase().includes(q)) ||
      m.stateAbbreviation.toLowerCase().includes(q),
  )
}

export function filterMeetings(filters: {
  state?: string
  day?: string
  format?: string
  query?: string
}): Meeting[] {
  let result = getAllMeetings()

  if (filters.state) {
    result = result.filter((m) => m.stateAbbreviation === filters.state)
  }
  if (filters.day) {
    result = result.filter((m) => m.day === filters.day)
  }
  if (filters.format) {
    result = result.filter((m) => m.format === filters.format)
  }
  if (filters.query) {
    const q = filters.query.toLowerCase().trim()
    result = result.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        (m.city && m.city.toLowerCase().includes(q)) ||
        (m.location && m.location.toLowerCase().includes(q)),
    )
  }

  return result
}

export function getMeetingMapMarkers(): MapMarker[] {
  return meetingsToMapMarkers(getAllMeetings())
}

/** Featured meetings: grab a curated slice for the homepage */
export function getFeaturedMeetings(count = 6): Meeting[] {
  // Prioritize meetings with complete data across diverse states
  const scored = getAllMeetings()
    .map((m) => ({
      meeting: m,
      score:
        (m.location ? 2 : 0) +
        (m.contactUrl ? 1 : 0) +
        (m.meetingType ? 1 : 0) +
        (m.format === "hybrid" ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)

  // Deduplicate by state for diversity
  const seen = new Set<string>()
  const featured: Meeting[] = []
  for (const { meeting } of scored) {
    if (featured.length >= count) break
    if (!seen.has(meeting.stateAbbreviation)) {
      seen.add(meeting.stateAbbreviation)
      featured.push(meeting)
    }
  }

  return featured
}

export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const
