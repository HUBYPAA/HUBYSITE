# HUBYPAA — Project Overview

## What This Is

HUBYPAA is a map-first directory for young people's AA meetings and conferences in the United States. It is built as a modern Next.js application with a warm, editorial visual system inspired by the architectural discipline of St. Mary's Basilica in Kraków — translated into interface language, not costume.

The site helps people find:
- **Meetings** — searchable by city, day, format, state, and meeting type
- **Conferences** — upcoming and past, with static detail pages
- **Regional events** — smaller approved events via the communications module
- **Trusted information** — safety notes, anonymity guidance, and correction paths

---

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Runtime | React 19 |
| Styling | Tailwind CSS v4 |
| Fonts | Fraunces (serif), Inter (sans), JetBrains Mono (mono) |
| Map | MapLibre GL JS |
| Icons | Lucide React |
| Validation | Zod |
| Auth | Google OAuth 2.0 (in-tree implementation) |
| Storage | File-backed JSON collections (communications module) |
| Analytics | Vercel Web Analytics, Speed Insights, Toolbar |

---

## Project Structure

```text
src/
├── app/                          # Next.js App Router routes
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout with fonts + chrome
│   ├── globals.css               # Design system tokens + component classes
│   ├── meetings/                 # Meetings explorer (server + client)
│   ├── conferences/              # Conference index + static detail pages
│   ├── about/                    # Editorial about page
│   ├── what-is-ypaa/             # YPAA explainer
│   ├── safety/                   # Safety + anonymity + crisis resources
│   ├── submit/                   # Public submission/correction form
│   ├── events/                   # Public event gallery + archive
│   ├── newsletter/               # Newsletter signup
│   ├── portal/                   # Protected user portal
│   ├── admin/                    # Role-gated admin console
│   ├── auth/                     # Sign-in, callback, sign-out
│   └── api/                      # API routes (auth start)
├── lib/
│   ├── components/
│   │   ├── atlas/index.tsx       # Core UI primitives (PageShell, FocalPanel, etc.)
│   │   ├── site/
│   │   │   ├── site-chrome.tsx   # Header + mobile nav + bottom bar
│   │   │   └── site-footer.tsx   # Footer
│   │   ├── map/
│   │   │   └── ypaa-map.tsx      # MapLibre map component
│   │   └── ornaments/
│   │       └── portal-header.tsx # Portal-specific header
│   ├── data/
│   │   ├── source/               # Raw data files (meetings, conferences, states, coordinates)
│   │   ├── normalized/           # Canonical types + adapter layer
│   │   └── query/                # Server-only selectors
│   ├── hub/                      # Communications module
│   │   ├── auth.ts               # Role/permission helpers
│   │   ├── session.ts            # HMAC-signed cookie sessions
│   │   ├── oauth.ts              # Google OAuth flow
│   │   ├── store.ts              # File-backed JSON store
│   │   ├── queries.ts            # Read-side queries for hub data
│   │   ├── types.ts              # Canonical hub types
│   │   └── ...                   # Lifecycle, notifications, uploads, format, seed
│   └── utils/                    # Shared utilities (dates, site-url)
├── public/                       # Static assets
├── docs/                         # Project documentation
└── research/                     # Historical design research
```

---

## Current Visual Identity

The site uses a **warm Mariacki-inspired palette**:

- **Ground**: warm plaster (`#f4ebdd`) — the body background
- **Surface**: strong translucent white (`rgba(255, 252, 246, 0.94)`) — cards and panels
- **Ink**: near-black (`#191a17`) — primary text
- **Accent blue**: Mariacki blue (`#2f86b7`) — celestial moments, map markers
- **Gilt**: warm gold (`#d6a24e`) — highlights, stat numerals, active states
- **Brick/Terracotta**: (`#8a3a2a`, `#c98146`) — warm accents, conference markers
- **Wood**: (`#24170f`) — dark footer ground

The design language is:
- **Monumental but usable** — large serif display type for authority, clean sans for utility
- **Warm and material** — plaster, stone, gold, wood rather than cold glass
- **Rich in focal zones, restrained elsewhere** — one `CanopyReveal` or `FocalPanel` per page
- **Structurally disciplined** — the `atlas` component system enforces consistent spacing, tone, and hierarchy

---

## Data Model

Three-layer architecture:

1. **Source** (`src/lib/data/source/`) — raw arrays close to origin format
2. **Normalized** (`src/lib/data/normalized/`) — canonical types with stable IDs, slugs, coordinates, provenance
3. **Query** (`src/lib/data/query/`) — server-only selectors producing view-models

The UI consumes normalized entities or lighter `MapMarker` shapes. Client components never import raw source files.

### Current Scale

- **247** meeting records
- **14** conference records
- **56** state/territory location records

---

## Communications Module (Hub)

An additive module for event submissions, newsletter management, and a private contact directory.

### Public Routes
- `/events` — approved regional events gallery
- `/events/archive` — past events
- `/newsletter` — signup with regional preferences

### Auth Routes
- `/auth/sign-in` — Google OAuth
- `/auth/callback` — OAuth code exchange
- `/auth/sign-out` — session clear

### Protected Portal
- `/portal` — landing dashboard
- `/portal/submit-event` — submit events for review
- `/portal/my-submissions` — edit pending submissions
- `/portal/directory` — private contact directory
- `/portal/profile` — profile and consent management

### Admin Console
- `/admin` — dashboard with queues
- `/admin/events` — moderate event submissions
- `/admin/access` — portal access requests
- `/admin/submitters` — submitter access requests
- `/admin/directory` — approve/purge contacts
- `/admin/newsletter` — subscribers + drafts
- `/admin/regions` — region management
- `/admin/roles` — role assignment (super_admin only)

See [`08-hub-module.md`](08-hub-module.md) for full architecture details.

---

## Key Conventions

- **Server-only queries**: All data selectors in `src/lib/data/query/` and `src/lib/hub/queries.ts` are marked `"server-only"`
- **Static generation**: Conference detail pages use `generateStaticParams`
- **File-backed storage**: Hub module uses atomic JSON writes under `.hub-data/` (git-ignored). Swappable for a real database.
- **Session security**: HMAC-signed HttpOnly cookies, no external auth library
- **No runtime file writes** in the public-facing directory routes; hub module writes are isolated to its store layer
