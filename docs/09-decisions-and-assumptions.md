# Decisions And Assumptions

## Key Decisions

1. Treat `ypaa/` as the active product and the repo root as legacy context.
2. Rebuild the homepage and map surfaces instead of polishing the earlier card-heavy layout.
3. Use one warm accent and neutral meeting markers instead of multiple competing accent colors.
4. Keep the basemap quiet and label-light.
5. Generate conference detail pages statically from normalized slugs.
6. Keep queries server-only and pass derived props into client components.

## Assumptions

1. Meeting data is materially more trustworthy than conference data.
2. Approximate coordinates are acceptable for discovery.
3. A static site plus lightweight client interactivity is the right Vercel posture for now.
4. The current submission flow is a scaffold, not the finished operational pipeline.

## Uncertainties

1. Which conference records are currently confirmed by primary sources.
2. Whether every YPAA committee or intergroup link in the source files is still live.
3. Whether future contributors will want to merge or retire the root-level legacy prototype files.
4. Whether more granular meeting filtering is worth adding once link and data verification improve.
