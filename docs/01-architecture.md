# Architecture

## Stack Overview

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 16 App Router | Static generation, App Router conventions, Vercel-native |
| React | 19.2.4 | Latest stable, concurrent features |
| Styling | Tailwind CSS v4 | Utility-first, design-token integration via `@theme inline` |
| Fonts | Google Fonts (Fraunces, Inter, JetBrains Mono) | Variable fonts, swap display, warm editorial tone |
| Map | MapLibre GL JS | Keyless raster tiles, full control over markers and styling |
| Icons | Lucide React | Consistent, lightweight, accessible |
| Validation | Zod | Type-safe schema validation for forms |

---

## App Router Structure

```text
src/app/
├── layout.tsx              # Root: fonts, metadata, SiteChrome, SiteFooter, VercelRuntime
├── page.tsx                # Home: stats, featured meetings, featured conference, canopy
├── meetings/
│   ├── page.tsx            # Server: load data, hand to MeetingsClient
│   └── meetings-client.tsx # Client: filters, search, list/map/split views
├── conferences/
│   ├── page.tsx            # Conference index with region filters
│   └── [slug]/
│       └── page.tsx        # Static detail pages (generateStaticParams)
├── events/
│   ├── page.tsx            # Public events gallery
│   └── archive/
│       └── page.tsx        # Past events
├── newsletter/
│   ├── page.tsx            # Signup page
│   └── signup-form.tsx     # Client form
├── submit/
│   ├── page.tsx            # Submission page
│   ├── submit-form.tsx     # Client form with type selector
│   └── actions.ts          # Server action: validates, logs intake
├── portal/                 # Protected portal routes
├── admin/                  # Role-gated admin routes
├── auth/                   # OAuth sign-in, callback, sign-out
└── api/
    └── auth/
        └── start/
            └── route.ts    # OAuth initiation endpoint
```

---

## Component Architecture

### The Atlas System

All UI primitives live in `src/lib/components/atlas/index.tsx`. They are intentionally low-level — styled containers with consistent spacing, tone variants, and semantic structure.

| Component | Purpose |
|-----------|---------|
| `PageShell` | Route wrapper with tone variants (`stone`, `plaster`, `canopy`, `portal`, `admin`, `wood`) |
| `PageIntro` | Page header: kicker, display title, lead paragraph, actions, aside |
| `FocalPanel` | Rich featured panel with tone variants (`default`, `canopy`, `warm`, `wood`) |
| `CanopyReveal` | Full-bleed blue celestial panel with decorative layers and linked nodes |
| `ThresholdBand` | Section header band with filter/actions area |
| `Surface` | Card/panel surface with tone variants (`default`, `quiet`, `inset`, `wood`, `canopy`) |
| `LedgerRows` / `LedgerRow` | List/ledger pattern for meetings, conferences, events |
| `ActionStrip` | Horizontal button group with wrapping |
| `SplitTool` | Three-column layout: sticky rail, main, sticky detail |
| `MarginalRail` | Side rail with accent border |
| `StatusRail` | Numbered step indicator (complete / current / upcoming / warning) |

### Layout Chrome

- `SiteChrome` (`site-chrome.tsx`) — fixed header with brand, signal counts, desktop nav, mobile menu toggle, and mobile bottom nav
- `SiteFooter` (`site-footer.tsx`) — dark wood footer with stats and actions

### Map

- `YPAAMap` (`ypaa-map.tsx`) — MapLibre wrapper with custom CARTO basemap, clustering, conference halos, and selection rings

---

## Data Flow

```
Source files (meetings.ts, conferences.ts, states.ts, coordinates.ts)
        ↓
Adapter (normalized/adapt.ts) — stable IDs, slugs, coordinates, provenance
        ↓
Canonical types (normalized/types.ts) — Meeting, Conference, Location, Resource, MapMarker
        ↓
Query layer (query/meetings.ts, query/conferences.ts) — server-only selectors
        ↓
Route pages — select minimal data server-side
        ↓
Client components — receive normalized entities or MapMarker arrays
```

---

## Hub Module Architecture

```
OAuth flow (Google)
        ↓
Session (HMAC-signed cookie)
        ↓
Auth helpers (role/permission checks)
        ↓
Store (file-backed JSON collections)
        ↓
Queries (read-side view models)
        ↓
Routes (portal / admin pages)
```

Collections: `users`, `regions`, `events`, `portal_access_requests`, `submitter_access_requests`, `newsletter_subscribers`, `newsletter_drafts`, `directory_contacts`, `notifications`

---

## State Management

- **No global state library** — React `useState` and `useDeferredValue` in client components
- **URL as state** — region filters on `/conferences` and `/events` use query params
- **Server-first data** — Routes load data server-side; client components receive props
- **Hub store** — File-backed persistence with atomic writes and per-collection promise-queue locking
