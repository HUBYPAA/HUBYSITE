# Data Architecture

## Three-Layer Architecture

```
Source          →   Normalized         →   Query            →   UI
(raw arrays)        (canonical types)      (selectors)          (routes + components)
```

### 1. Source Layer

Lives in `src/lib/data/source/`. Holds raw data close to the origin format.

| File | Contents | Records |
|------|----------|---------|
| `meetings.ts` | YPAA meeting records | ~247 |
| `conferences.ts` | Conference records | ~14 |
| `states.ts` | State/territory records with intergroups and committees | ~56 |
| `coordinates.ts` | City and state centroid coordinate lookups | — |
| `regions.ts` | Region config for hub module | 13 |

### 2. Normalized Layer

Lives in `src/lib/data/normalized/`.

- **`types.ts`** — Canonical entity types: `Meeting`, `Conference`, `Location`, `Resource`, `FAQItem`, `Venue`, `Page`, `ContentBlock`, `MapMarker`
- **`adapt.ts`** — Transforms source records into canonical shapes:
  - Generates stable IDs from content (not array position)
  - Generates URL-friendly slugs
  - Resolves coordinates via city/state lookup
  - Pairs state abbreviations with full names
  - Preserves unknown fields in `meta`
  - Produces `MapMarker` arrays for the map component

### 3. Query Layer

Lives in `src/lib/data/query/`. Marked `"server-only"`.

- **`meetings.ts`** — `getMeetings`, `getMeetingCount`, `getFeaturedMeetings`, `getMeetingsByState`, `getStatesWithMeetings`, `getNextOnlineMeeting`, `getStartingSoonMeeting`, `searchMeetings`, `filterMeetings`
- **`conferences.ts`** — `getConferences`, `getConferenceCount`, `getUpcomingConferences`, `getPastConferences`, `getFeaturedConference`, `getConferenceBySlug`

Query functions are memoized at the module level to avoid re-adapting on every request.

---

## Canonical Entity Types

### `Meeting`
```ts
interface Meeting extends EntityBase {
  type: "meeting"
  day?: string
  time?: string
  format: "in-person" | "online" | "hybrid"
  meetingType?: string
  location?: string
  venue?: string
  onlineUrl?: string
  meetingId?: string
  contactUrl?: string
  notes?: string
  stateAbbreviation: string
}
```

### `Conference`
```ts
interface Conference extends EntityBase {
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
```

### `MapMarker`
Lightweight shape for map consumption:
```ts
interface MapMarker {
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
```

---

## Hub Module Data Model

The communications module uses a separate data model in `src/lib/hub/types.ts`.

### Collections (file-backed JSON)

| Collection | Type | Purpose |
|------------|------|---------|
| `users` | `HubUser[]` | Identity + roles + access state |
| `regions` | `HubRegion[]` | Admin-editable region list |
| `events` | `HubEvent[]` | Submissions with review status |
| `portal_access_requests` | `PortalAccessRequest[]` | Portal waitlist |
| `submitter_access_requests` | `SubmitterAccessRequest[]` | Submitter applications |
| `newsletter_subscribers` | `NewsletterSubscriber[]` | Email + region prefs |
| `newsletter_drafts` | `NewsletterDraft[]` | Human-authored drafts |
| `directory_contacts` | `DirectoryContact[]` | Current/helper/past contacts |
| `notifications` | `HubNotification[]` | Audit/notification log |

---

## How to Add New Data

1. **Update the relevant source file** in `src/lib/data/source/`
2. **Extend the adapter** in `src/lib/data/normalized/adapt.ts` if the raw shape changed
3. **Add query helpers** only if the UI needs a new selector
4. **Pass route-specific props** from the server page into client components
5. **For map behavior**, add a dedicated marker transformation — don't pass full entities to the client

---

## Key Normalization Rules

- Stable IDs derived from content (state + city + name), not array index
- Slugs generated from human-readable fields for static routes
- Source provenance retained via `sourceFile` and `sourceType`
- Missing coordinates fall back to city-level or state-centroid approximations
- Unknown fields preserved in `meta` rather than discarded
- Conference status auto-resolved from dates (`upcoming`, `in-progress`, `completed`, `cancelled`)
