/**
 * HUBYPAA communications module — canonical types.
 *
 * These types describe the persisted shape of the communications module.
 * They are intentionally decoupled from the read-only directory/map data
 * in `src/lib/data/`, because this module has mutable, human-managed state.
 */

// ── Regions ──────────────────────────────────────────────────────────

export interface HubRegion {
  id: string
  label: string
  /** Short code used in URLs and exports. */
  slug: string
  sortOrder: number
  active: boolean
  createdAt: string
  updatedAt: string
}

// ── Users & access ──────────────────────────────────────────────────

export type HubRole =
  | "events_admin"
  | "newsletter_admin"
  | "directory_admin"
  | "super_admin"

/** Status of a user's access to the protected portal. */
export type PortalAccessStatus = "none" | "pending" | "approved" | "revoked" | "denied"

/** Status of a user's authorization to submit events. */
export type SubmitterStatus = "none" | "pending" | "approved" | "revoked" | "denied"

export interface HubUser {
  id: string
  /** Google "sub" identifier — stable per user. */
  googleId: string
  email: string
  name: string
  avatarUrl?: string

  roles: HubRole[]
  portalAccess: PortalAccessStatus
  submitterAccess: SubmitterStatus

  /** Present when portalAccess is approved; recorded for audit. */
  portalApprovedBy?: string
  portalApprovedAt?: string

  /** Present when submitterAccess is approved. */
  submitterApprovedBy?: string
  submitterApprovedAt?: string

  createdAt: string
  updatedAt: string
  lastSeenAt?: string
}

export interface PortalAccessRequest {
  id: string
  userId: string
  reason?: string
  committee?: string
  position?: string
  status: "pending" | "approved" | "denied"
  reviewedBy?: string
  reviewedAt?: string
  reviewNote?: string
  createdAt: string
}

export interface SubmitterAccessRequest {
  id: string
  userId: string
  name: string
  email: string
  committee: string
  position: string
  note?: string
  status: "pending" | "approved" | "denied"
  reviewedBy?: string
  reviewedAt?: string
  reviewNote?: string
  createdAt: string
}

// ── Events ───────────────────────────────────────────────────────────

export type EventReviewStatus = "pending" | "approved" | "rejected" | "archived"

export interface HubEvent {
  id: string
  title: string
  /** ISO date (YYYY-MM-DD) of the first day of the event. */
  date: string
  /** Optional ISO date of the last day. */
  endDate?: string
  /** Free-form local time string, e.g. "6pm – 10pm". */
  time?: string
  regionId: string
  city: string
  state?: string
  venue: string
  hostCommittee: string
  registrationUrl?: string
  flyerPath?: string
  /** Newsletter-only. Not shown publicly. */
  chairPitch?: string

  submitterUserId: string
  submitterName: string
  submitterEmail: string

  status: EventReviewStatus
  reviewedBy?: string
  reviewedAt?: string
  reviewNote?: string
  /**
   * If true, the submitter cannot edit even when status is pending/approved.
   * Admin may reopen it explicitly.
   */
  locked: boolean

  createdAt: string
  updatedAt: string
}

// ── Newsletter ──────────────────────────────────────────────────────

export interface NewsletterSubscriber {
  id: string
  email: string
  name?: string
  regionIds: string[]
  /** User must confirm via email-token OR via immediate opt-in. v1 uses immediate opt-in. */
  confirmed: boolean
  unsubscribedAt?: string
  createdAt: string
  updatedAt: string
}

export type NewsletterDraftStatus = "draft" | "ready" | "sent" | "skipped"

export interface NewsletterDraft {
  id: string
  /** Human slug: e.g. "2025-nov". */
  slug: string
  subject: string
  intro: string
  /** Ordered event IDs included in this draft. */
  eventIds: string[]
  /** Regional targeting — empty array means "all regions". */
  regionIds: string[]
  body: string
  senderName: string
  senderEmail: string
  status: NewsletterDraftStatus
  createdBy: string
  createdAt: string
  updatedAt: string
  sentAt?: string
  sentBy?: string
}

// ── Directory (private) ─────────────────────────────────────────────

export type DirectoryListing = "current" | "helper" | "past"

export interface DirectoryContact {
  id: string
  /** Optional link to a HubUser, when the person has signed in. */
  userId?: string

  name: string
  committee: string
  role: string
  regionId?: string
  email: string
  phone?: string
  yearsServed?: string
  willingToHelpWith?: string

  /** Which lists this person appears on. */
  listings: DirectoryListing[]
  /** ISO date when their term ends; drives rollover. */
  termEndsAt?: string

  /** Consent flags. */
  consentRemainAfterTerm: boolean
  consentHelperList: boolean
  consentPastList: boolean

  status: "pending" | "approved" | "purged"
  approvedBy?: string
  approvedAt?: string
  purgedAt?: string

  createdAt: string
  updatedAt: string
}

// ── Notifications ───────────────────────────────────────────────────

export type NotificationKind =
  | "event_submitted"
  | "event_approved"
  | "event_rejected"
  | "portal_access_requested"
  | "portal_access_decided"
  | "submitter_access_requested"
  | "submitter_access_decided"
  | "directory_submitted"
  | "directory_approved"
  | "directory_purged"
  | "contact_expiring"
  | "newsletter_draft_ready"

export interface HubNotification {
  id: string
  kind: NotificationKind
  /** Target audience: a userId or "admins" for admin-broadcast notifications. */
  audience: string
  title: string
  body?: string
  /** Link target inside the app. */
  href?: string
  readAt?: string
  createdAt: string
  /** Free-form payload for context. */
  meta?: Record<string, unknown>
}

// ── Session ─────────────────────────────────────────────────────────

export interface SessionPayload {
  userId: string
  email: string
  name: string
  /** Issued-at (seconds). */
  iat: number
  /** Expires-at (seconds). */
  exp: number
}