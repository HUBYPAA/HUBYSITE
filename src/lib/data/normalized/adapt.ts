/**
 * Adapter layer: transforms source data into canonical domain models.
 *
 * Each adapter:
 * 1. Reads from a specific source shape
 * 2. Normalizes into the canonical type
 * 3. Generates stable IDs and slugs
 * 4. Preserves unknown fields in `meta`
 * 5. Resolves coordinates where possible
 */

import type {
  Meeting,
  Conference,
  Location,
  Resource,
  MapMarker,
  MeetingFormat,
} from "./types"

import { YPAA_MEETINGS } from "../source/meetings"
import type { YPAAMeeting } from "../source/meetings"
import { MEMBER_STATES } from "../source/states"
import type { StateResource } from "../source/states"
import { SOURCE_CONFERENCES } from "../source/conferences"
import type { SourceConference } from "../source/conferences"
import { resolveCoordinates, STATE_CENTROIDS } from "../source/coordinates"

// ── Helpers ──────��────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function stableId(prefix: string, ...parts: string[]): string {
  return `${prefix}-${slugify(parts.join("-"))}`
}

// ── Meeting Adapter ──────────────���────────────────

function adaptMeeting(src: YPAAMeeting, index: number): Meeting {
  const coords = resolveCoordinates(src.city, src.state)
  const stateRecord = MEMBER_STATES.find((item) => item.abbreviation === src.state)

  return {
    id: stableId("mtg", src.state, src.city, src.name, String(index)),
    type: "meeting",
    title: src.name,
    slug: slugify(`${src.state}-${src.city}-${src.name}`),
    city: src.city,
    state: stateRecord?.name,
    stateAbbreviation: src.state,
    region: findRegionForState(src.state),
    country: "US",
    coordinates: coords ?? undefined,

    day: src.day,
    time: src.time,
    format: src.format as MeetingFormat,
    meetingType: src.type,
    location: src.location,
    onlineUrl: src.onlineUrl,
    meetingId: src.meetingId,
    contactUrl: src.contactUrl,
    notes: src.notes,

    status: "active",
    sourceFile: "source/meetings.ts",
    sourceType: "ypaa-meetings",

    // Preserve any extra fields that might appear in future data
    meta: {},
  }
}

export function adaptAllMeetings(): Meeting[] {
  return YPAA_MEETINGS.map((m, i) => adaptMeeting(m, i))
}

// ── Conference Adapter ────────────────────────────

function adaptConference(src: SourceConference): Conference {
  const coords = resolveCoordinates(src.city, src.state)
  const stateRecord = MEMBER_STATES.find((item) => item.abbreviation === src.state)

  return {
    id: stableId("conf", src.abbreviation || src.name, String(src.year)),
    type: "conference",
    title: src.name,
    slug: slugify(`${src.name}-${src.year}`),
    summary: src.description,
    city: src.city,
    state: stateRecord?.name,
    stateAbbreviation: src.state,
    region: findRegionForState(src.state),
    country: "US",
    coordinates: coords ?? undefined,

    startDate: src.startDate,
    endDate: src.endDate,
    year: src.year,
    venue: src.venue,
    venueAddress: src.venueAddress,
    registrationUrl: src.registrationUrl,
    websiteUrl: src.websiteUrl,
    conferenceStatus: src.status,
    price: src.price,
    organizer: src.organizer,
    tags: src.tags,
    notes: src.notes,

    status: src.status === "cancelled" ? "cancelled" : "active",
    sourceFile: "source/conferences.ts",
    sourceType: "conferences",
    meta: {},
  }
}

export function adaptAllConferences(): Conference[] {
  return SOURCE_CONFERENCES.map((c) => adaptConference(c))
}

// ── State/Location Adapter ────────────────────────

function adaptState(src: StateResource): Location {
  const centroid = STATE_CENTROIDS[src.abbreviation]

  return {
    id: stableId("loc", src.abbreviation),
    type: "location",
    title: src.name,
    slug: slugify(src.name),
    abbreviation: src.abbreviation,
    state: src.name,
    region: src.region,
    country: "US",
    coordinates: centroid ? { lat: centroid.lat, lng: centroid.lng } : undefined,
    locationType: src.region === "territories" ? "territory" : (src.abbreviation === "DC" ? "district" : "state"),
    status: "active",
    sourceFile: "source/states.ts",
    sourceType: "states",
    meta: {
      intergroups: src.intergroups,
      areaServiceUrl: src.areaServiceUrl,
      ypaaCommittee: src.ypaaCommittee,
      flagSvg: src.flagSvg,
      notes: src.notes,
    },
  }
}

export function adaptAllLocations(): Location[] {
  return MEMBER_STATES.map(adaptState)
}

// ��─ Resource Adapter (intergroups, YPAA committees) ──

export function adaptAllResources(): Resource[] {
  const resources: Resource[] = []

  for (const state of MEMBER_STATES) {
    // Intergroups
    for (const ig of state.intergroups) {
      resources.push({
        id: stableId("res", "ig", state.abbreviation, ig.name),
        type: "resource",
        title: ig.name,
        slug: slugify(`${state.abbreviation}-${ig.name}`),
        state: state.name,
        region: state.region,
        country: "US",
        url: ig.url,
        resourceType: "intergroup",
        status: "active",
        sourceFile: "source/states.ts",
        sourceType: "states",
        meta: { area: ig.area },
      })
    }

    // YPAA committee
    if (state.ypaaCommittee) {
      resources.push({
        id: stableId("res", "ypaa", state.abbreviation),
        type: "resource",
        title: state.ypaaCommittee.name,
        slug: slugify(`${state.abbreviation}-ypaa`),
        state: state.name,
        region: state.region,
        country: "US",
        url: state.ypaaCommittee.url,
        resourceType: "ypaa-committee",
        status: "active",
        sourceFile: "source/states.ts",
        sourceType: "states",
      })
    }
  }

  return resources
}

// ── Map Marker Generation ─────────────────────────

export function meetingsToMapMarkers(meetings: Meeting[]): MapMarker[] {
  return meetings
    .filter((m) => m.coordinates)
    .map((m) => ({
      id: m.id,
      type: "meeting" as const,
      coordinates: m.coordinates!,
      title: m.title,
      eyebrow: m.format === "hybrid" ? "Hybrid meeting" : m.format === "online" ? "Online meeting" : "Meeting",
      subtitle: `${m.day} · ${m.time}`,
      state: m.stateAbbreviation,
      locationLabel: m.city ? `${m.city}, ${m.stateAbbreviation}` : m.stateAbbreviation,
      href: m.contactUrl ?? m.onlineUrl,
      emphasis: "subtle",
      meta: {
        format: m.format,
        city: m.city,
        location: m.location,
        notes: m.notes,
        meetingType: m.meetingType,
      },
    }))
}

export function conferencesToMapMarkers(conferences: Conference[]): MapMarker[] {
  return conferences
    .filter((c) => c.coordinates)
    .map((c) => ({
      id: c.id,
      type: "conference" as const,
      coordinates: c.coordinates!,
      title: c.title,
      eyebrow: c.conferenceStatus === "in-progress" ? "Happening now" : "Conference",
      subtitle: c.startDate
        ? new Date(c.startDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : undefined,
      state: c.stateAbbreviation,
      locationLabel: c.city ? `${c.city}, ${c.stateAbbreviation}` : c.stateAbbreviation,
      href: c.websiteUrl ?? c.registrationUrl,
      emphasis: c.featured ? "featured" : "strong",
      meta: {
        status: c.conferenceStatus,
        venue: c.venue,
        city: c.city,
        summary: c.summary,
        notes: c.notes,
      },
    }))
}

// ── Internal helpers ──────────────────────────────

function findRegionForState(abbreviation: string): string | undefined {
  const state = MEMBER_STATES.find((s) => s.abbreviation === abbreviation)
  return state?.region
}
