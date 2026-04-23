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

// ── "Next meeting" helpers ────────────────────────
// Used for the homepage tiles. Both are best-effort — meeting schedule
// data is day-of-week + clock time, not a firm calendar, so we compute
// minutes-until-next-occurrence relative to the current instant.

function dayIndex(day: string | undefined): number | null {
  if (!day) return null
  const idx = DAYS.findIndex((d) => d.toLowerCase() === day.trim().toLowerCase())
  return idx === -1 ? null : idx
}

function parseClockToMinutes(time: string | undefined): number | null {
  if (!time) return null
  const t = time.trim().toUpperCase()

  // Try HH:MM optionally followed by AM/PM
  const m = t.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/)
  if (!m) return null
  let hours = parseInt(m[1], 10)
  const minutes = m[2] ? parseInt(m[2], 10) : 0
  const ampm = m[3]

  if (ampm === "PM" && hours < 12) hours += 12
  if (ampm === "AM" && hours === 12) hours = 0
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null
  return hours * 60 + minutes
}

function minutesUntilNext(meeting: Meeting, now: Date = new Date()): number | null {
  const dIdx = dayIndex(meeting.day)
  const mins = parseClockToMinutes(meeting.time)
  if (dIdx == null || mins == null) return null

  const nowDay = now.getDay()
  const nowMin = now.getHours() * 60 + now.getMinutes()

  let deltaDays = dIdx - nowDay
  const deltaMin = mins - nowMin
  if (deltaDays < 0 || (deltaDays === 0 && deltaMin < -10)) {
    // already passed this week — shift forward one week
    deltaDays += 7
  }
  return deltaDays * 24 * 60 + deltaMin
}

/**
 * Soonest online meeting (starting now, or next upcoming).
 * Falls back to any online meeting if no schedule data is parseable.
 */
export function getNextOnlineMeeting(now: Date = new Date()): Meeting | null {
  const online = getAllMeetings().filter(
    (m) => m.format === "online" || m.format === "hybrid",
  )
  if (online.length === 0) return null

  let best: { meeting: Meeting; delta: number } | null = null
  for (const m of online) {
    const delta = minutesUntilNext(m, now)
    if (delta == null) continue
    if (!best || delta < best.delta) {
      best = { meeting: m, delta }
    }
  }
  return best?.meeting ?? online[0] ?? null
}

/**
 * Soonest meeting of any format that is starting within a short window
 * (default: next 90 minutes). Returns null if nothing qualifies.
 */
export function getStartingSoonMeeting(
  windowMinutes = 90,
  now: Date = new Date(),
): Meeting | null {
  const all = getAllMeetings()
  let best: { meeting: Meeting; delta: number } | null = null
  for (const m of all) {
    const delta = minutesUntilNext(m, now)
    if (delta == null) continue
    if (delta < -10 || delta > windowMinutes) continue
    if (!best || delta < best.delta) {
      best = { meeting: m, delta }
    }
  }
  return best?.meeting ?? null
}
