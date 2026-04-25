# Data Model And Normalization Approach

## Layers

1. **Source**
   - Lives in `src/lib/data/source/`
   - Holds meetings, conferences, states, regions, and coordinate lookup data
   - Keeps source shape close to the origin format

2. **Normalized**
   - Lives in `src/lib/data/normalized/`
   - Defines canonical entity types such as `Meeting`, `Conference`, `Location`, `Resource`, and `MapMarker`
   - Adds stable IDs, slugs, region membership, and provenance

3. **Query**
   - Lives in `src/lib/data/query/`
   - Marked `server-only`
   - Exposes route-friendly selectors like `getMeetings()`, `getUpcomingConferences()`, and `getFeaturedMeetings()`

4. **UI props**
   - Routes select the minimum data they need server-side
   - Client components receive normalized entities or lightweight marker arrays, not raw source files

## Why This Shape

- The raw data is messy and uneven, especially conference records.
- The UI needs stable IDs and consistent location fields even when the raw source varies.
- The map needs a dedicated marker shape that is smaller and cleaner than the full entity model.
- Keeping query files server-only helps avoid accidental source-data leakage into client bundles.

## Current Canonical Entities

- `Meeting`
- `Conference`
- `Location`
- `Resource`
- `MapMarker`

## Key Normalization Rules

- Stable IDs are derived from source content rather than array position alone.
- Slugs are generated from human-readable fields for static route generation.
- Source provenance is retained on entities through `sourceFile` and `sourceType`.
- Missing precise coordinates fall back to approximate city or state centroid values.
- State abbreviations are paired with full state names where possible during adaptation.
- Conference records retain scaffold notes rather than hiding them.

## Current Scale

- `247` meeting records
- `14` conference records
- `56` state and territory location records

## Where Things Live

- Raw data: `src/lib/data/source/`
- Adapters: `src/lib/data/normalized/adapt.ts`
- Normalized types: `src/lib/data/normalized/types.ts`
- Route queries: `src/lib/data/query/`
- Shared formatting helpers: `src/lib/utils/dates.ts`

## How New Data Should Be Added

1. Add or update the relevant source file in `src/lib/data/source/`.
2. Extend the adapter in `src/lib/data/normalized/adapt.ts` if the shape changed.
3. Add or adjust query helpers only if the UI actually needs a new selector.
4. Pass route-specific props from the server page into client components.
5. If a new entity needs map behavior, add a dedicated marker transformation instead of reusing full records in the client.
