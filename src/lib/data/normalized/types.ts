/**
 * Canonical domain models for the YPAA platform.
 *
 * These are the normalized shapes consumed by the UI.
 * Source data is adapted into these types through the adapter layer.
 *
 * Design principles:
 * - Broad enough to absorb future growth
 * - Every entity carries provenance (source file, source type)
 * - Unknown fields are preserved in `meta` rather than discarded
 * - Optional fields are truly optional — the UI handles absence gracefully
 */

// ── Coordinates ───────────────────────────────────

export interface Coordinates {
  lat: number
  lng: number
}

// ── Core Entity Base ──────────────────────────────

export interface EntityBase {
  id: string
  type: EntityType
  title: string
  slug: string
  summary?: string
  description?: string

  // Location
  city?: string
  state?: string
  region?: string
  country?: string
  timezone?: string
  coordinates?: Coordinates

  // Temporal
  startDate?: string // ISO 8601
  endDate?: string
  lastUpdated?: string

  // Classification
  tags?: string[]
  status?: EntityStatus

  // Display
  displayPriority?: number
  featured?: boolean

  // Provenance
  sourceFile?: string
  sourceType?: string

  // Extensibility — unknown fields go here
  meta?: Record<string, unknown>
}

export type EntityType =
  | "meeting"
  | "conference"
  | "venue"
  | "page"
  | "resource"
  | "link"
  | "announcement"
  | "location"
  | "faq"
  | "content-block"

export type EntityStatus =
  | "active"
  | "draft"
  | "archived"
  | "cancelled"
  | "tentative"
  | "unknown"

// ── Meeting ───────────────────────────────────────

export type MeetingFormat = "in-person" | "online" | "hybrid"

export interface Meeting extends EntityBase {
  type: "meeting"
  day?: string
  time?: string
  format: MeetingFormat
  meetingType?: string // "open", "closed", "discussion", "speaker", etc.
  location?: string // Full address string
  venue?: string
  onlineUrl?: string
  meetingId?: string
  contactUrl?: string
  ageRange?: string
  notes?: string
  stateAbbreviation: string
}

// ── Conference ────────────────────────────────────

export type ConferenceStatus =
  | "upcoming"
  | "registration-open"
  | "sold-out"
  | "in-progress"
  | "completed"
  | "cancelled"

export interface Conference extends EntityBase {
  type: "conference"
  venue?: string
  venueAddress?: string
  registrationUrl?: string
  websiteUrl?: string
  conferenceStatus: ConferenceStatus
  capacity?: number
  price?: string
  organizer?: string
  stateAbbreviation?: string
  year?: number
  notes?: string
}

// ── Venue ─────────────────────────────────────────

export interface Venue extends EntityBase {
  type: "venue"
  address?: string
  capacity?: number
  accessibility?: string[]
  website?: string
}

// ── Page ──────────────────────────────────────────

export interface Page extends EntityBase {
  type: "page"
  blocks?: ContentBlock[]
  template?: string
}

// ── Content Block ─────────────────────────────────

export interface ContentBlock {
  id: string
  blockType: "text" | "heading" | "list" | "callout" | "faq" | "cta" | "divider"
  content?: string
  items?: string[]
  heading?: string
  level?: number
  variant?: string
}

// ── Resource ──────────────────────────────────────

export interface Resource extends EntityBase {
  type: "resource"
  url?: string
  resourceType?: string // "intergroup", "area-service", "ypaa-committee", etc.
}

// ── FAQ Item ──────────────────────────────────────

export interface FAQItem extends EntityBase {
  type: "faq"
  question: string
  answer: string
  category?: string
}

// ── Location (region/state) ───────────────────────

export interface Location extends EntityBase {
  type: "location"
  abbreviation?: string
  locationType?: "state" | "territory" | "district" | "region" | "country"
  meetingCount?: number
  conferenceCount?: number
}

// ── Union type for all entities ───────────────────

export type Entity =
  | Meeting
  | Conference
  | Venue
  | Page
  | Resource
  | FAQItem
  | Location

// ── Map marker shape ──────────────────────────────

export interface MapMarker {
  id: string
  type: "meeting" | "conference"
  coordinates: Coordinates
  title: string
  eyebrow?: string
  subtitle?: string
  state?: string
  locationLabel?: string
  href?: string
  emphasis?: "subtle" | "strong" | "featured"
  meta?: Record<string, unknown>
}

// ── Region config (preserved from source) ─────────

export interface RegionConfig {
  key: string
  label: string
  sortOrder: number
}
