# Changelog

## [Unreleased]

### Added
- Full communications module (hub) with events, newsletter, directory, and admin console
- Google OAuth authentication with HMAC-signed session cookies
- Protected portal at `/portal` with submitter access workflow
- Admin console at `/admin` with role-based access control
- Public events gallery at `/events` and `/events/archive`
- Newsletter signup at `/newsletter` with regional preferences
- Private contact directory at `/portal/directory`
- File-backed JSON store for hub data (`.hub-data/`)
- `CanopyReveal` component — full-bleed celestial blue focal panel
- `ThresholdBand` component — section header with filter area
- `StatusRail` component — numbered step indicator
- `MarginalRail` component — side rail with accent border
- `SplitTool` component — three-column sticky layout
- Conference detail pages with calendar export, nearby meetings, and verification notes
- Copy link button for conference sharing
- `home-hero.tsx` removed — homepage now composes atlas primitives directly

### Changed
- **Visual identity**: complete overhaul to warm Mariacki-inspired palette
  - Body background: warm plaster (`#f4ebdd`)
  - Primary text: warm ink (`#191a17`)
  - Accent: Mariacki blue (`#2f86b7`) + gilt gold (`#d6a24e`)
  - Footer: dark wood gradient
  - All shadows shifted to warm brown tones
- **Typography**: switched to Fraunces (serif), Inter (sans), JetBrains Mono (mono)
- **Component architecture**: replaced ad-hoc layout components with unified `atlas` primitive system
  - `PageShell`, `PageIntro`, `FocalPanel`, `Surface`, `LedgerRows`, `LedgerRow`, `ActionStrip`
- **Header**: complete rewrite — fixed glass header with brand mark, signal counts, pill nav, mobile menu
- **Footer**: complete rewrite — dark wood treatment with stats and actions
- **Mobile bottom bar**: added 5-tab quick navigation
- **Meetings page**: rebuilt as `SplitTool` layout with list/map/split views, advanced filters
- **Conferences page**: rebuilt with region filter chips, ledger list, canopy reveal, archive grid
- **Map styling**: warmer CARTO basemap with custom marker hierarchy, conference halos, selection rings
- **Submit form**: multi-surface layout with type selector and status rail success state
- **About / What Is YPAA / Safety pages**: rebuilt with atlas primitives
- Conference status now auto-resolves from dates (upcoming, in-progress, completed)

### Removed
- Legacy cool green-gray glassmorphic design system (see `docs/history/`)
- `home-hero.tsx` standalone component
- Old header/footer/mobile-bottom-bar components (replaced by `SiteChrome` / `SiteFooter`)
- `MapDetailPanel` standalone component (functionality absorbed into page layouts)
- Dark "Quiet Heat Atlas" concept (archived in `docs/history/`)

### Fixed
- Hydration mismatch in meetings view toggle via `useSyncExternalStore`
- Map layer cleanup race condition on unmount
- Mobile map marker sizing and hit targets

---

## Historical Phases

### Phase 1 — Initial Rebuild (pre-April 2026)
- Next.js App Router migration from legacy prototype
- MapLibre integration with meeting clustering
- Basic route structure: home, meetings, conferences, about, safety, submit
- Data normalization layer (source → normalized → query)
- Cool green-gray glassmorphic visual system

### Phase 2 — Warm Redesign (April 2026)
- St. Mary's Basilica-inspired warm palette (limestone, brick, gold, celestial blue)
- `panel-vault` focal component for featured moments
- Architectural nav pills, dark vault footer, warm map markers
- Complete color token replacement (19 tokens)
- Typography shift to Palatino/Iowan Old Style serif stack

### Phase 3 — Current Evolution (April 2026)
- Evolution from the warm redesign into the current Mariacki-inspired system
- Fraunces/Inter/JetBrains Mono font stack
- `atlas` primitive component system
- Full hub communications module
- Richer page compositions with `CanopyReveal`, `ThresholdBand`, `StatusRail`
