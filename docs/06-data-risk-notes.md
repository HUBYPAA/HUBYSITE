# Data Risk Notes

## Highest Risk

### Conference records are not uniformly verified

- Many conference entries in `src/lib/data/source/conferences.ts` were scaffolded rather than confirmed from authoritative sources.
- **Risk**: stale city, venue, date, or registration information.
- **Current mitigation**: the UI avoids pretending every record is final, surfaces confidence language ("scaffold" warnings), and encourages verification before travel.

---

## Moderate Risk

### Coordinates are approximate

- `src/lib/data/source/coordinates.ts` uses city-level approximations and state centroids.
- **Risk**: marker placement is fine for discovery but not precise enough for navigation.
- **Current mitigation**: copy and map behavior frame the map as orientation, not turn-by-turn guidance.

### Duplicate entities are still possible

- Meetings and conferences are keyed from human-readable source fields.
- **Risk**: slight naming changes can create near-duplicate entries rather than updates.
- **Current mitigation**: stable slugs and ID generation reduce chaos, but they do not solve source reconciliation completely.

### Link health is not revalidated automatically

- Meeting contact URLs, Zoom links, and conference sites are treated as source fields.
- **Risk**: stale links degrade trust quickly.
- **Current mitigation**: submission flow explicitly invites corrections, but there is no automated checker yet.

---

## Lower But Real Risk

### Source ownership is mixed

- Some data is clearly pulled from state sites or intergroups, while some conference records were manually scaffolded.
- **Risk**: unclear provenance makes maintenance harder and confidence uneven.

### Hub module file storage durability

- The communications module uses file-backed JSON storage under `.hub-data/`.
- **Risk**: on ephemeral serverless runtimes (e.g., Vercel without a mounted volume), writes do not persist across cold starts.
- **Current mitigation**: storage layer is deliberately thin and swappable. For production serverless, replace `src/lib/hub/store.ts` with a database adapter.

### Google OAuth dependency

- The hub module relies on Google OAuth for authentication.
- **Risk**: if Google API access is revoked or credentials expire, portal and admin access breaks.
- **Current mitigation**: credentials are environment-configured; bootstrap admin emails allow recovery.

---

## Risk Acceptance

These risks are known and accepted for the current stage of the product. The priority is:
1. Accurate meeting data (most trustworthy)
2. Honest conference labeling (don't fake certainty)
3. Easy correction paths (lower friction to fix)
4. Automated verification (future work)
