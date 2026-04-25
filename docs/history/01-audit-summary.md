# Folder Audit Summary

## Executive Summary

- The active product is the Next.js app in `ypaa/`.
- The repo root still contains a legacy prototype with useful raw data and some design debt.
- The strongest assets found in the audit were the source data files, the normalized adapter layer, and the existing MapLibre foothold.
- The weakest assets were the older visual system, scattered prototype code, and conference records that were clearly scaffold rather than verified.

## Repo Shape

### Active app

- `ypaa/src/app/` holds the live routes.
- `ypaa/src/lib/data/source/` holds raw meeting, conference, state, and coordinate inputs.
- `ypaa/src/lib/data/normalized/` adapts source records into canonical shapes.
- `ypaa/src/lib/data/query/` exposes server-only selectors for UI routes.
- `ypaa/src/lib/components/` holds the shared layout and map primitives.

### Legacy material

- `data/` and `components/` at the repo root are earlier prototype artifacts.
- `images/` contains prototype-specific assets not used by the rebuilt product.
- `page/page.tsx` is a disconnected prototype route and should not be treated as the active homepage.

## Meaningful File Classification

| Classification | Paths | Reason |
| --- | --- | --- |
| `use` | `ypaa/src/app/**`, `ypaa/src/lib/data/**`, `ypaa/src/lib/components/layout/**`, `ypaa/src/lib/components/map/**` | Core product, data model, and shared runtime surfaces. |
| `adapt` | `data/states.ts`, `data/ypaa-meetings.ts`, `ypaa/src/lib/data/source/conferences.ts`, `ypaa/src/app/submit/actions.ts` | Valuable but imperfect material. Some is legacy source context; some still needs production-hardening. |
| `preserve` | `images/**` | Not part of the rebuilt site, but worth keeping until an asset strategy review. |
| `ignore` | `page/page.tsx`, `components/**`, `data/regions.ts`, generated folders under `ypaa/.next`, `ypaa/node_modules`, `ypaa/.git` | Legacy prototype or generated/vendor content. |

## Landmines

1. Conference data is still scaffold-heavy. The UI now labels that reality, but the source file still needs confirmation work.
2. Coordinates are approximate. Meetings and conferences are positioned for discovery, not navigation precision.
3. The repo contains two parallel histories: the active app and the older prototype. New work should stay inside `ypaa/` unless the goal is data extraction.
4. Submission handling is still a scaffold. The server action validates and logs, but does not yet write to durable storage or an issue queue.
5. The previous pass left some documentation and structure in place that no longer matched the product. This doc set replaces that mismatch.

## Useful Gems Worth Keeping

- `ypaa/src/lib/data/normalized/adapt.ts`
- `ypaa/src/lib/data/normalized/types.ts`
- `ypaa/src/lib/data/source/meetings.ts`
- `ypaa/src/lib/data/source/states.ts`
- `ypaa/src/lib/data/source/coordinates.ts`
- `ypaa/src/lib/components/map/ypaa-map.tsx`
