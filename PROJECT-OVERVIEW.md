# HUBYPAA Redesign — Project Overview

## What This Project Is

A complete visual redesign of HUBYPAA (a map-first national directory for young people's AA meetings and conferences) where the design system, spatial logic, material language, and emotional atmosphere are derived from the architectural principles of St. Mary's Basilica in Krakow, Poland.

This is not a site about the basilica. It is a modern product whose visual identity is informed by the basilica's structural discipline, material richness, and spatial choreography — translated into interface language, not costumed onto it.

---

## Goals

### Primary
Transform the site from its original cool green-gray glassmorphic aesthetic into something that feels:
- Monumental but usable
- Warm and material (brick, stone, gold, carved wood, celestial blue) instead of cold and glassy
- Richly detailed in focal zones, restrained everywhere else
- Structurally disciplined — like a building, not a template
- Unmistakably intentional

### Non-Negotiable Constraints
- Preserve all existing routes, page responsibilities, and content hierarchy
- Preserve responsive behavior across all breakpoints
- Preserve map usability on all map-heavy pages
- Preserve touch-friendliness and accessibility
- Preserve form clarity and functional integrity
- Pass WCAG AA contrast for all critical text/background pairs
- No religious iconography, Gothic novelty fonts, or literal church branding

---

## What Was Done

### Phase 1 — Research

Deep architectural research from 7+ authoritative sources covering every zone of St. Mary's Basilica:

- Exterior massing: red brick in monk/Flemish bond, limestone ashlar trim, stepped buttresses, flying buttresses
- Twin-tower asymmetry: Gothic north tower (82m) with octagonal spire and gilded crown vs. Renaissance south tower (69m) with ellipsoidal dome — equilibrium without symmetry
- Portals: ogee arches with crockets and fleurons, threshold moments between the civic square and sacred interior
- Interior procession: entry through portal, vertical expansion in 28m nave, lateral chapel awareness, chancel narrowing, altar arrival
- Vault geometry: cross-ribbed vaults in nave, stellar vaults in chancel with heraldic stone bosses
- Starry blue ceiling: Jan Matejko's lapis lazuli vault with gold stars (1890-92), the single most emotionally powerful element
- Polychrome wall treatment: geometric fields with figurative/heraldic focal moments — dense but hierarchically ordered
- Stained glass: 14th-century apse glass + Art Nouveau nave windows by Wyspianski and Mehoffer — light as color events
- Veit Stoss altarpiece: 13m x 11m, linden wood polychromed and gilded — the absolute focal terminus where everything converges
- 11 chapels: each a small world within the same grammar — different patrons, different eras, same structural containment
- Material palette: brick, limestone, sandstone, linden wood, black Debnik marble, bronze/iron, gold leaf, copper, lapis blue

**Output:** `research/st-marys-basilica-research.md`

### Phase 2 — Design Translation

Mapped every architectural principle to a web design concept:

| Basilica | Web |
|----------|-----|
| Brick exterior, stone trim | Warm parchment ground, pale limestone panels |
| Celestial vault | Deep blue `panel-vault` class for focal moments |
| Gold leaf / gilding | `--color-gold` (#c8a44e) for highlights, stat numerals, active states |
| Verdigris copper | `--color-accent` (#2d6b5e) for primary actions |
| Brick terracotta | `--color-warm` (#c2673e) for conferences |
| Processional axis | Scroll rhythm: portal zone, nave zone, chapel moments, altar arrival, exit |
| Altar focal hierarchy | One `panel-vault` element per page — maximum visual investment at maximum attention |
| Tower asymmetry | Unequal grid columns throughout (never 50/50) |
| Polychrome ornament policy | Three tiers: structural (most surfaces), enriched (headers/featured), focal (one per page) |
| Portal threshold | Page header zones compress information before the page opens up |
| Chapel logic | Cards share structural grammar but can vary in surface treatment |
| Public square vs interior | Site chrome (header/nav) = warm exterior; page content reveals progressively richer interior |

**Output:** `research/st-marys-design-translation.md`

### Phase 3 — Implementation Plan

Detailed plan covering:
- Complete color token replacement table (old hex → new hex → rationale)
- Typography, shadow, radius, border, and background system changes
- Component-level rebuild list (20 CSS classes)
- Route-by-route design intent
- Implementation order (15 steps)
- Risk matrix (8 identified risks with mitigations)
- Acceptance checklist (20 items)

**Output:** `REDESIGN-PLAN.md`

### Phase 4 — Design System Implementation

Complete overhaul of `src/app/globals.css`:

**Color system** — 19 tokens replaced or added:
- Ground: `#edf2ef` → `#f0ebe4` (warm parchment)
- Panel: `#ffffff` → `#faf8f5` (pale limestone)
- Ink: `#112338` → `#1e2a38` (dark nave blue-black)
- Accent: `#13766d` → `#2d6b5e` (oxidized copper / verdigris)
- Signal: `#1d4f72` → `#2d4a7a` (celestial blue)
- Warm: `#de7247` → `#c2673e` (brick terracotta)
- New: `vault` (#1a2744), `gold` (#c8a44e), `gold-soft` (#d4b76a)

**Shadows** — All shifted from cold blue-gray `rgba(17,35,56,...)` to warm brown `rgba(60,42,28,...)`

**Radii** — Reduced for architectural feel: sm 0.75rem, md 1rem, lg 1.35rem, xl 1.75rem

**Typography** — Serif stack reordered to prioritize Palatino Linotype / Book Antiqua for "carved stone" character. Page title tracking tightened to -0.05em.

**New `.panel-vault` class** — Deep celestial blue panel for focal altar moments. Includes overrides for `.meta-label` (gold tint) and `.section-kicker` (gold border/text) when nested inside vault panels.

**Background** — Warm parchment gradient replacing cool green-gray. Subtle horizontal masonry-rhythm lines instead of dot grid.

**Focus states** — Gold-tinted focus rings (`rgba(200, 164, 78, 0.6)`) instead of teal.

**Selection** — Gold-tinted text selection.

### Phase 5 — Component Restyling

**Header** (`src/lib/components/layout/header.tsx`):
- Warm parchment glass: `rgba(240, 235, 228, 0.82)` with `blur(20px) saturate(1.2)`
- Warm border on scroll: `rgba(60, 42, 28, 0.1)`
- Nav pills: `rounded-[0.75rem]` with gold active background `rgba(200, 164, 78, 0.12)`
- Mobile hamburger: architectural rounded button with warm shadow

**Footer** (`src/lib/components/layout/footer.tsx`):
- Dark vault-blue gradient: `linear-gradient(180deg, #1e3050, #1a2744)`
- Gold-tinted section labels: `rgba(200, 164, 78, 0.55)`
- Gold kicker badges
- Light text on dark: `rgba(210, 203, 194, 0.8)` for body, `rgba(240, 235, 228, 0.95)` for headings
- Divider rule: gold gradient `rgba(200, 164, 78, 0.15)`

**Mobile Bottom Bar** (`src/lib/components/layout/mobile-bottom-bar.tsx`):
- Dark vault background: `rgba(26, 39, 68, 0.94)` with blur
- Gold active tab: `var(--color-gold-soft)` with `rgba(200, 164, 78, 0.12)` background
- Inactive tabs: muted stone `rgba(210, 203, 194, 0.6)`

**Mobile Nav Overlay** (CSS in globals.css):
- Warm parchment: `rgba(240, 235, 228, 0.97)`
- Active link: gold border and background accent

**Map Component** (`src/lib/components/map/ypaa-map.tsx`):
- Base tile background: `#e6e0d6` (warm stone)
- Meeting markers: `#2d4a7a` (celestial blue)
- Conference markers: `#c2673e` stroke on `#faf5ef` fill
- Clusters: `rgba(26, 39, 68, 0.92)` with `rgba(200, 164, 78, 0.7)` gold stroke
- Selection ring: gold-tinted `rgba(200, 164, 78, 0.12)`
- Map key: warm stone panel with updated palette
- Mobile map adjustments: warmer brightness/saturation

**Map Detail Panel** (`src/lib/components/map/map-detail-panel.tsx`):
- Close button: architectural rounded (`rounded-[0.75rem]`)

### Phase 6 — Route Page Restyling

**Home** (`src/app/page.tsx` + `src/app/home-hero.tsx`):
- Hero panel: warm stone with gold/verdigris radial gradient accents
- Featured conference section: **`panel-vault`** — deep blue with gold title text, gold meta-labels, warm accent badges. The "altar object" of the page.
- Philosophy section: warm stone panel
- Meetings section: warm stone with verdigris header accents
- Safety/Data quality section: warm panels with gold sparkles icon
- All inline gradient colors: warm brown and gold based

**Meetings** (`src/app/meetings/meetings-client.tsx`):
- Civic/practical treatment — the "exterior" page
- Warm stone panels, warm filter chips
- Mobile view toggle: architectural rounded with accent active state
- Sidebar: warm raised panel
- Floating notes: warm stone

**Conferences** (`src/app/conferences/conferences-explorer.tsx`):
- Featured record: **`panel-vault`** — the interior richness page
- Gold meta-labels for date/place inside vault context
- Secondary buttons on dark: warm translucent styling
- Archive section: quiet sandstone muted panels (side chapel treatment)

**Conference Detail** (`src/app/conferences/[slug]/page.tsx`):
- Ceremonial focus — "standing before the altar"
- Breadcrumb hover: gold
- Strong raised panel for main content
- Standard warm treatment (not vault — appropriate for detail, not featured)

**About / What Is YPAA / Safety / Submit**:
- All inherit warm system through CSS classes (panel, panel-raised, panel-muted, section-kicker, page-title, etc.)
- No inline color changes needed — the global system carries them

**Submit Form** (`src/app/submit/submit-form.tsx`):
- Type selector active state: gold border/background instead of teal
- Success checkmark: architectural rounded container

**Error Pages** (`src/app/error.tsx`, `src/app/not-found.tsx`):
- Warm stone `panel-raised` treatment
- Standard button hierarchy

### Phase 7 — Validation

- All 7 routes verified returning HTTP 200
- Zero TypeScript type errors
- Zero old palette color references remaining in codebase
- WCAG AA contrast verified for 12 critical text/background pairs:
  - ink on ground: 12.27 (AA)
  - ink on panel: 13.72 (AA)
  - muted on ground: 4.92 (AA)
  - muted on panel: 5.51 (AA)
  - faint on ground: 3.23 (AA-large) — darkened from #8a9199 to #7a8390 to pass
  - accent on panel: 5.87 (AA)
  - gold on vault: 7.61 (AA)
  - light text on vault: 12.49 (AA)
  - white on accent button: 5.90 (AA)
  - gold on footer: 6.76 (AA)

---

## What Is Left

### Should Do (Improves Completeness)

1. **Error pages could use vault treatment**
   - Currently `panel-raised` (warm stone) — dignified but not the richest treatment
   - Plan called for "centered vault-toned panel with warm stone accents"
   - Change: wrap the error panel in `panel-vault` with gold heading accents
   - Files: `src/app/error.tsx`, `src/app/not-found.tsx`

2. **Conference detail page title zone could be enriched**
   - Currently standard `panel-raised`
   - Could add a subtle vault-blue canopy gradient behind the h1 to strengthen the ceremonial, "standing before the altar" feeling
   - File: `src/app/conferences/[slug]/page.tsx`

3. **Threshold gradient between content and footer**
   - The transition from warm parchment content to dark vault footer is abrupt
   - A subtle gradient band or rule treatment at the content/footer boundary would strengthen the processional feel
   - File: `src/lib/components/layout/footer.tsx` or `src/app/globals.css`

4. **Stat numeral gold accent consistency**
   - The conference count stat on the home hero uses gold (`!text-[var(--color-gold)]`), but the rooms and states counts do not
   - Consider extending gold accent to all stat numerals, or only to the featured one (current state is intentional — the conference count is the "altar" stat)

### Could Do (Refinement)

5. **Extract vault-mid and celestial-soft as CSS variables**
   - `vault-mid: #243356` and `celestial-soft: #3a6098` are referenced in the design translation document but only used as inline values
   - Extracting them as `--color-vault-mid` and `--color-celestial-soft` would make the token system more complete for future work

6. **Add hover glow to panel-vault**
   - Interactive vault panels (like the featured conference card link) could have a subtle warm glow on hover — like candlelight catching gold
   - Currently hover changes are limited to text color transitions

7. **Subtle masonry background refinement**
   - The current body::before pattern uses simple horizontal lines
   - Could be refined to a more nuanced masonry-rhythm pattern (alternating line weights or slight opacity variation) without adding weight

8. **Mobile nav overlay enrichment**
   - Currently warm parchment — correct and clean
   - Could add a subtle gold gradient at the top edge for more "portal" feeling when the menu opens

### Nice to Have (Polish)

9. **Page-specific threshold dividers**
   - Between major sections, instead of just whitespace, subtle warm gradient shifts or ornamental rule elements could mark processional passage (e.g., a thin gold gradient line between hero and featured conference sections)

10. **Map shell inner glow refinement**
    - The map shell has a subtle inner shadow overlay
    - Could be warmed further or given a faint gold edge glow to tie more strongly into the carved-stone-frame metaphor

11. **Scroll-triggered entrance animations**
    - The `.rise-in` animation exists but isn't applied to most sections
    - Adding subtle rise-in animations to major sections as they scroll into view would reinforce the processional rhythm

12. **Dark mode consideration**
    - Not in scope for this redesign, but the vault-blue palette provides a natural starting point for a dark mode variant where the "interior" becomes the default surface

---

## File Inventory

### Research & Planning
| File | Purpose |
|------|---------|
| `research/st-marys-basilica-research.md` | Architectural research with sources, zone-by-zone analysis, material palette, and what would become tacky |
| `research/st-marys-design-translation.md` | 11-section mapping of architecture to web design system |
| `REDESIGN-PLAN.md` | Implementation plan, token tables, risk matrix, acceptance checklist |
| `DESIGN-REFERENCE.md` | Original structural reference (pre-existing, treated as law) |

### Modified Source Files
| File | What Changed |
|------|-------------|
| `src/app/globals.css` | Complete overhaul — tokens, shadows, radii, all component classes, backgrounds, animations |
| `src/app/layout.tsx` | Theme color meta tag updated |
| `src/lib/components/layout/header.tsx` | Warm glass, architectural nav pills, warm borders |
| `src/lib/components/layout/footer.tsx` | Complete rewrite — dark vault treatment |
| `src/lib/components/layout/mobile-bottom-bar.tsx` | Dark vault bar with gold accents (via CSS) |
| `src/lib/components/map/ypaa-map.tsx` | All marker colors, tile treatment, map key, selection ring |
| `src/lib/components/map/map-detail-panel.tsx` | Architectural close button |
| `src/app/page.tsx` | Vault featured conference, warm sections, gold accents |
| `src/app/home-hero.tsx` | Warm gradients, gold stat accents, architectural badges |
| `src/app/meetings/meetings-client.tsx` | Warm civic treatment, architectural toggles |
| `src/app/conferences/conferences-explorer.tsx` | Vault featured record, warm archive panels |
| `src/app/conferences/[slug]/page.tsx` | Gold breadcrumb hover |
| `src/app/submit/submit-form.tsx` | Gold selection state, architectural success icon |

### Unmodified Source Files (Inherit Global Styling)
| File | Why Unchanged |
|------|--------------|
| `src/app/meetings/page.tsx` | Uses global CSS classes — inherits warm system |
| `src/app/conferences/page.tsx` | Uses global CSS classes — inherits warm system |
| `src/app/about/page.tsx` | Uses global CSS classes — inherits warm system |
| `src/app/what-is-ypaa/page.tsx` | Uses global CSS classes — inherits warm system |
| `src/app/safety/page.tsx` | Uses global CSS classes — inherits warm system |
| `src/app/submit/page.tsx` | Uses global CSS classes — inherits warm system |
| `src/app/error.tsx` | Uses global CSS classes — inherits warm system |
| `src/app/not-found.tsx` | Uses global CSS classes — inherits warm system |
| All data/query/util files | No visual code — unaffected |
