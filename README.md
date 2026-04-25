# HUBYPAA

A map-first directory for young people's AA meetings and conferences. Built as a warm, editorial product with architectural discipline.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- MapLibre GL JS
- Lucide React

## Project Structure

```text
src/
├── app/                    # Next.js routes
│   ├── page.tsx            # Homepage
│   ├── meetings/           # Meetings explorer
│   ├── conferences/        # Conferences index + detail pages
│   ├── events/             # Regional events gallery
│   ├── newsletter/         # Newsletter signup
│   ├── about/              # About page
│   ├── what-is-ypaa/       # YPAA explainer
│   ├── safety/             # Safety + anonymity
│   ├── submit/             # Public submission form
│   ├── portal/             # Protected user portal
│   ├── admin/              # Role-gated admin console
│   └── auth/               # Google OAuth flow
├── lib/
│   ├── components/
│   │   ├── atlas/          # Core UI primitives
│   │   ├── site/           # Chrome + footer
│   │   └── map/            # MapLibre wrapper
│   ├── data/
│   │   ├── source/         # Raw data files
│   │   ├── normalized/     # Canonical types + adapters
│   │   └── query/          # Server-only selectors
│   ├── hub/                # Communications module
│   └── utils/              # Shared utilities
├── docs/                   # Project documentation
├── research/               # Historical design research
└── public/                 # Static assets
```

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Data Model

- Raw data lives in `src/lib/data/source/`
- Adapters live in `src/lib/data/normalized/adapt.ts`
- Canonical types live in `src/lib/data/normalized/types.ts`
- Server-only selectors live in `src/lib/data/query/`

The UI consumes normalized entities or lighter derived marker/view-model shapes. Client components never import raw source files directly.

## Deployment

Designed for Vercel:

- Static generation for public routes
- Conference detail routes use `generateStaticParams`
- Map tiles are keyless CARTO raster tiles
- Vercel Web Analytics, Speed Insights, and Toolbar prewired

### Environment Variables

See `.env.example` for the full list. Required for the hub module:

- `HUB_SESSION_SECRET` — min 16 characters
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — OAuth credentials
- `HUB_BOOTSTRAP_ADMIN_EMAILS` — comma-separated admin emails

## Communications Module

A full public + private communications module is included:

- **Public**: `/events`, `/events/archive`, `/newsletter`
- **Protected portal**: `/portal` (Google sign-in + manual waitlist)
- **Admin console**: `/admin` (role-gated)

See `docs/08-hub-module.md` for architecture, routes, and bootstrapping.

## Docs

- `docs/00-project-overview.md` — What this is, stack, structure
- `docs/01-architecture.md` — App router, components, data flow
- `docs/02-visual-system.md` — Colors, typography, motion
- `docs/03-component-inventory.md` — Atlas primitives and page components
- `docs/04-data-architecture.md` — Source → normalized → query layers
- `docs/05-content-inventory.md` — Copy inventory by page
- `docs/06-data-risk-notes.md` — Known data quality risks
- `docs/07-deployment-notes.md` — Build, env vars, deployment checklist
- `docs/08-hub-module.md` — Communications module architecture
- `docs/09-contributing.md` — Conventions and how to add data

Historical docs are archived in `docs/history/`.
