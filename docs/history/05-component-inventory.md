# Component Inventory

## Global

- `Header`
  - Fixed top shell
  - Minimal nav
  - Utility actions for safety and submission
- `Footer`
  - Trust note, routing links, external AA links

## Map System

- `YPAAMap`
  - MapLibre implementation
  - Quiet raster basemap
  - Meeting clustering
  - Conference halo emphasis
  - Optional bounds fitting
- `MapDetailPanel`
  - Desktop side panel
  - Mobile bottom sheet
  - Source-link CTA

## Homepage

- `HomeHero`
  - Full-bleed map stage
  - Dataset chips
  - Editorial overlay
  - In-map metrics rail

## Meetings

- `MeetingsClient`
  - Search bar
  - Primary format chips
  - Progressive advanced filters
  - Split list/map explorer
  - Empty state

## Conferences

- `ConferencesExplorer`
  - Featured conference module
  - Upcoming record list
  - Sticky map context
  - Archive rail
- `app/conferences/[slug]/page.tsx`
  - Conference detail template
  - Confidence note
  - Single-record map

## Content Pages

- `about/page.tsx`
- `what-is-ypaa/page.tsx`
- `safety/page.tsx`
- `submit/page.tsx`

## Form System

- `SubmitForm`
  - Type selector
  - Structured fields
  - Success state
  - Error state

## Shared UI Patterns

- Section kickers
- Editorial titles
- `panel`, `panel-raised`, `panel-muted`, `panel-outline`
- Chips
- Action buttons
- List rows
- Empty states
