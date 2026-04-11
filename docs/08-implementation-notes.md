# Contributor And Deployment Notes

## Contributor Note

### Where raw data lives

- `src/lib/data/source/meetings.ts`
- `src/lib/data/source/conferences.ts`
- `src/lib/data/source/states.ts`
- `src/lib/data/source/coordinates.ts`

### Where adapters live

- `src/lib/data/normalized/adapt.ts`

### Where normalized data lives

- `src/lib/data/normalized/types.ts`
- Normalized entity instances are produced in the adapter layer and memoized in query files

### Where queries live

- `src/lib/data/query/meetings.ts`
- `src/lib/data/query/conferences.ts`

## How To Add New Data Later

1. Update the relevant source file.
2. If the raw shape changed, update the adapter.
3. Keep query helpers server-only.
4. Pass smaller route props into client components instead of importing source data in the client.
5. If a new page needs a new subset, add a query helper rather than filtering raw arrays in the route repeatedly.

## Deployment Notes

- The app is built on the Next.js App Router with static generation.
- There are no required runtime file writes.
- The current build verification path is `npx next build --webpack`.
- Local `next build` with Turbopack hit a sandbox-specific CSS worker panic during this audit, so Webpack is the reliable verification path here.
- Map tiles come from CARTO no-label raster tiles and do not require a secret key.
- The current submission flow is still scaffold-only and should be connected to durable storage, a webhook, or an issue queue before production.
- Vercel Web Analytics, Speed Insights, and Toolbar packages are installed and integrated.
- `NEXT_PUBLIC_SITE_URL` is the preferred canonical site URL override for metadata, sitemap, and robots output.
- `NEXT_PUBLIC_ENABLE_VERCEL_TOOLBAR=1` can be used to deliberately inject the Toolbar script in production.

## Vercel Notes

- Static routes and generated conference detail pages are Vercel-friendly.
- Keep the map implementation keyless and lightweight.
- Avoid sending raw source datasets to the client when a smaller derived marker or view-model shape will do.
- Re-check current Vercel limits documentation before adding heavier map overlays, large assets, or server function work.
- Toolbar support in local development expects the project to be linked with `vc link`.
