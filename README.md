# YPAA

A map-first YPAA directory rebuilt as a quieter, darker, more editorial product.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- MapLibre GL JS
- Lucide React

## Project Shape

```text
src/
├── app/
│   ├── page.tsx                  # Homepage
│   ├── meetings/                 # Meetings explorer
│   ├── conferences/              # Conferences overview + detail pages
│   ├── about/
│   ├── what-is-ypaa/
│   ├── safety/
│   └── submit/
├── lib/
│   ├── components/
│   │   ├── layout/
│   │   └── map/
│   ├── data/
│   │   ├── source/
│   │   ├── normalized/
│   │   └── query/
│   └── utils/
└── docs/
```

## Data Model

- Raw data lives in `src/lib/data/source/`
- Adapters live in `src/lib/data/normalized/adapt.ts`
- Canonical types live in `src/lib/data/normalized/types.ts`
- Server-only selectors live in `src/lib/data/query/`

The UI should consume normalized entities or lighter derived marker/view-model shapes, not raw source arrays in client components.

## Development

```bash
npm install
npm run dev
npm run lint
npx next build --webpack
```

## Deployment Notes

- The app is designed to deploy cleanly on Vercel.
- Vercel Web Analytics, Speed Insights, and Toolbar support are prewired.
- Pages are statically generated.
- Conference detail routes use `generateStaticParams`.
- There are no required runtime file writes.
- The current submission action is still a scaffold and should be connected to durable storage or an issue pipeline before production.
- Re-check current Vercel limits before adding heavier map overlays, large assets, or server function logic.
- `metadataBase`, `robots.txt`, and `sitemap.xml` resolve from `NEXT_PUBLIC_SITE_URL`, then Vercel system URLs, then the `https://ypaa.org` fallback.

## Vercel Setup

1. Import the project into Vercel.
2. Enable Web Analytics in the project dashboard.
3. Enable Speed Insights in the project dashboard.
4. Set `NEXT_PUBLIC_SITE_URL` to the production domain if it differs from the Vercel default.
5. Leave `NEXT_PUBLIC_ENABLE_VERCEL_TOOLBAR=0` for public production unless you explicitly want the Toolbar script rendered.
6. If you want Toolbar support during `next dev`, run `vc link` so the local project is linked to the Vercel project.

The runtime integrations are:

- `@vercel/analytics` for pageview/event tracking
- `@vercel/speed-insights` for web-vitals collection
- `@vercel/toolbar` for preview-comment and local review tooling

## Map Notes

- The basemap uses CARTO dark no-label raster tiles.
- Meetings cluster at lower zoom levels.
- Conference markers use stronger emphasis than meetings.
- Coordinates are approximate and meant for discovery, not navigation precision.

## Repo Notes

- `ypaa/` is the active application.
- The repository root still contains a legacy prototype and source material. Treat it as historical context unless you are explicitly extracting data from it.

## HUBYPAA Communications Module

A full public + private communications module has been added. See
[`docs/11-hub-module.md`](docs/11-hub-module.md) for architecture,
routes, environment variables, and admin bootstrap.

Public additions: `/events`, `/events/archive`, `/newsletter`.
Protected portal at `/portal` (Google sign-in + manual waitlist).
Admin console at `/admin`.

Required new environment variables are documented in `.env.example`.

## Docs

- `docs/00-folder-inventory.json`
- `docs/01-audit-summary.md`
- `docs/02-reference-brief.md`
- `docs/03-data-architecture.md`
- `docs/04-visual-strategy.md`
- `docs/05-component-inventory.md`
- `docs/06-content-inventory.md`
- `docs/07-data-risk-notes.md`
- `docs/08-implementation-notes.md`
- `docs/09-decisions-and-assumptions.md`
- `docs/10-final-rationale.md`
- `docs/11-hub-module.md`
