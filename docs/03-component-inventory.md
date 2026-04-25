# Component Inventory

## Layout Chrome

### `SiteChrome` (`src/lib/components/site/site-chrome.tsx`)
- Fixed header with brand mark, signal counts, desktop nav, mobile menu toggle
- Mobile bottom navigation bar (5 tabs: Home, Meetings, Events, Submit, Portal)
- Mobile menu overlay with full nav grid
- Uses `usePathname` for active state highlighting
- Header uses cool-light glass with ink-blue borders

### `SiteFooter` (`src/lib/components/site/site-footer.tsx`)
- Deep ink-blue gradient background with blue radial glow
- Site description, stats (meetings, conferences, states), action buttons
- Gold accent lines between stats
- Responsive: stacked on mobile, 3-column on desktop

---

## Atlas Primitives (`src/lib/components/atlas/index.tsx`)

### `PageShell`
Route wrapper. Tone variants: `stone`, `plaster`, `canopy`, `portal`, `admin`.

### `PageIntro`
Page header pattern: kicker (mono uppercase), display title (serif), lead paragraph, actions strip, optional aside.
- Props: `kicker`, `title`, `lead`, `actions`, `aside`, `align`, `compact`
- Titles support `.float-text` class for luminous text-shadow glow

### `FocalPanel`
Rich featured panel for hero/CTA moments. Two-column body layout + optional footer.
- **Default**: hairline top/bottom borders only — no card styling
- `canopy`: full blue celestial panel with stars, ribs, and god rays
- `warm`: blue-tinted gradient accent
- Props: `kicker`, `title`, `lead`, `actions`, `aside`, `footer`, `tone`

### `StarCanopy`
Full-bleed celestial blue panel with decorative art layers (stars, ribs, god rays).
- Contains header with title/lead and a grid of linked nodes
- Used on homepage, conferences page, and what-is-ypaa for strong focal moments
- Each instance has unique star density via page-level CSS
- Props: `kicker`, `title`, `lead`, `items` (array of `{title, meta, href}`), `footer`

### `ThresholdBand`
Section header with hairline borders, title, detail text, and children.
- No card background — just flowing text with top/bottom borders
- Props: `label`, `title`, `detail`, `children`

### `Surface`
Panel container — **used sparingly**. Most pages avoid cards entirely.
- Tone variants: `default`, `quiet`, `inset`, `canopy`, `float`
- Props: `tone`, `className`, `children`

### `LedgerRows` / `LedgerRow`
List/ledger pattern for dense information display. **No cards** — items are separated by hairline borders.
- `LedgerRow` supports: `href` (renders as Link), `label`, `title`, `summary`, `meta`, `actions`, `active`
- **No tone variants** — all rows are uniform lines
- Active rows get a left blue border accent
- Hover shifts content right with subtle blue background tint
- Props: `href`, `label`, `title`, `summary`, `meta`, `actions`, `active`

### `ActionStrip`
Horizontal flex container for buttons. Wraps, gaps, centers.

### `SplitTool`
Three-column layout: sticky left rail, main content, sticky right detail.
- Used on meetings page for filters | list/map | detail panel
- Collapses to single column below 1180px

### `MarginalRail`
Side rail with left accent border. **No background** — just a blue left border and flowing text.
- Tone variants: `quiet`, `warm`, `canopy`
- Props: `kicker`, `title`, `children`

### `StatusRail`
Numbered step indicator for progress/status display.
- Step states: `complete`, `current`, `upcoming`, `warning`
- Props: `steps` (array of `{label, detail, state}`), `note`

---

## Celestial CSS Utilities

These are pure CSS classes defined in `globals.css`, not React components:

| Class | Effect |
|-------|--------|
| `.celestial-hero` | Full-bleed hero section with overflow hidden |
| `.god-rays` | Conic-gradient light beams radiating from bottom center |
| `.star-field` | Base class for star field pseudo-element |
| `.star-field--sparse` | ~12 star radial-gradients |
| `.star-field--medium` | ~20 star radial-gradients |
| `.star-field--dense` | ~32 star radial-gradients |
| `.float-text` | Luminous blue text-shadow glow |
| `.float-text--gold` | Gold text-shadow glow |
| `.arch-geometry` | Arched rib borders (St. Mary's ceiling geometry) |
| `.display-hero` | `clamp(3rem, 10vw, 8rem)` serif display |
| `.display-grand` | `clamp(4rem, 14vw, 12rem)` serif display |
| `.editorial-split` | Asymmetric 1.4fr/0.6fr grid |
| `.editorial-split--wide` | Asymmetric 1.2fr/0.8fr grid |

---

## Map System

### `YPAAMap` (`src/lib/components/map/ypaa-map.tsx`)
MapLibre wrapper with:
- CARTO Voyager basemap with cool-tinted raster styling
- Clustering for meetings (16+ markers)
- Conference halos and center dots in blue-led palette
- Selection rings with type-aware colors
- Custom legend overlay (desktop only) — light glass with blue/white text
- Auto-fit bounds support
- Mobile-adjusted marker sizes

Props: `markers`, `mode`, `className`, `selectedId`, `onMarkerClick`, `autoFit`

---

## Site Components

### `CopyLinkButton` (`src/lib/components/site/copy-link-button.tsx`)
Copies current URL to clipboard with feedback state.

### `PortalHeader` (`src/lib/components/ornaments/portal-header.tsx`)
Portal-specific decorative header element.

---

## Form Patterns

### `SubmitForm` (`src/app/submit/submit-form.tsx`)
- Type selector (meeting, conference, correction, feedback)
- Flowing form layout with numbered sections (no card surfaces)
- Client-side validation via server action
- Success state with `FocalPanel` + `StatusRail`

### `NewsletterSignupForm` (`src/app/newsletter/signup-form.tsx`)
- Region-preference checkboxes
- Email + optional name fields
- Server action for subscription

---

## Hub Module Pages

### Portal Pages
- `PortalPage` — dashboard with status rail, action links, recent submissions
- `SubmitEventForm` — event submission form
- `MySubmissionsPage` — list of user's submissions
- `DirectoryPage` — private contact directory with list filters
- `ProfileForm` — profile, consent, helper opt-in
- `WaitlistForm` — portal access request
- `SubmitterAccessForm` — submitter access request

### Admin Pages
- `AdminPage` — dashboard with queue counts
- `AdminEventsPage` / `AdminEventDetailPage` — event moderation
- `AdminAccessPage` — portal access requests
- `AdminSubmittersPage` — submitter access requests
- `AdminDirectoryPage` — contact approval/purge
- `AdminNewsletterPage` — subscribers and drafts
- `AdminRegionsPage` — region management
- `AdminRolesPage` — role assignment (super_admin only)

---

## Page-Specific Components

Most pages compose the atlas primitives directly in their `page.tsx` files. There are no dedicated page-level wrapper components beyond the atlas system itself.

| Page | Key Components Used | Star Field |
|------|---------------------|------------|
| Home | `PageShell`, `PageIntro`, `ThresholdBand`, `LedgerRows`, `FocalPanel`, `StarCanopy` | Dense |
| Meetings | `PageShell`, `PageIntro`, `SplitTool`, `YPAAMap`, `LedgerRows` | Sparse |
| Conferences | `PageShell`, `PageIntro`, `LedgerRows`, `StarCanopy` | Medium |
| Conference Detail | `PageShell`, `FocalPanel`, `LedgerRows`, `MarginalRail`, `StatusRail` | — |
| About | `PageShell`, `PageIntro`, `LedgerRows` | Sparse |
| What Is YPAA | `PageShell`, `PageIntro`, `LedgerRows`, `StarCanopy`, `MarginalRail` | Medium |
| Safety | `PageShell`, `PageIntro`, `LedgerRows`, `MarginalRail` | Sparse |
| Submit | `PageShell`, `PageIntro`, `SubmitForm`, `MarginalRail` | Sparse |
| Events | `PageShell`, `PageIntro`, `LedgerRows`, `FocalPanel` | Sparse |
| Events Archive | `PageShell`, `PageIntro`, `LedgerRows`, `MarginalRail` | Sparse |
| Newsletter | `PageShell`, `PageIntro`, `NewsletterSignupForm`, `MarginalRail` | Sparse |
| Portal | `PageShell`, `PageIntro`, `LedgerRows`, `StatusRail` | Sparse |
| Admin | `PageShell`, `PageIntro`, `LedgerRows` | Sparse |
| Sign In | `PageShell`, `FocalPanel` | Sparse |
