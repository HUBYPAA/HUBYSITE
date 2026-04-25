# Data Risk Notes

## Highest Risk

### Conference records are not uniformly verified

- Many conference entries in `src/lib/data/source/conferences.ts` were scaffolded rather than confirmed from authoritative sources.
- Risk: stale city, venue, date, or registration information.
- Current mitigation: the UI avoids pretending every record is final and surfaces confidence language.

## Moderate Risk

### Coordinates are approximate

- `src/lib/data/source/coordinates.ts` uses city-level approximations and state centroids.
- Risk: marker placement is fine for discovery but not precise enough for navigation.
- Current mitigation: copy and map behavior frame the map as orientation, not turn-by-turn guidance.

### Duplicate entities are still possible

- Meetings and conferences are keyed from human-readable source fields.
- Risk: slight naming changes can create near-duplicate entries rather than updates.
- Current mitigation: stable slugs and ID generation reduce chaos, but they do not solve source reconciliation completely.

### Link health is not revalidated automatically

- Meeting contact URLs, Zoom links, and conference sites are treated as source fields.
- Risk: stale links degrade trust quickly.
- Current mitigation: submission flow explicitly invites corrections, but there is no automated checker yet.

## Lower But Real Risk

### Source ownership is mixed

- Some data is clearly pulled from state sites or intergroups, while some conference records were manually scaffolded.
- Risk: unclear provenance makes maintenance harder and confidence uneven.

### Legacy prototype drift

- Root-level legacy files may diverge from the active app data over time.
- Risk: future contributors update the wrong copy of the data.
- Current mitigation: audit docs clearly identify `ypaa/` as the active app root.
