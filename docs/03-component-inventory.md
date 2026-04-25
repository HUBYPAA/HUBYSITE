# Component Inventory

## Layout Chrome

### `SiteChrome` (`src/lib/components/site/site-chrome.tsx`)
- Fixed header with brand mark, signal counts, desktop nav, mobile menu toggle
- Mobile bottom navigation bar (5 tabs: Home, Meetings, Events, Submit, Portal)
- Mobile menu overlay with full nav grid
- Uses `usePathname` for active state highlighting

### `SiteFooter` (`src/lib/components/site/site-footer.tsx`)
- Dark wood gradient background
- Site description, stats (meetings, conferences, states), action buttons
- Responsive: stacked on mobile, 3-column on desktop

---

## Atlas Primitives (`src/lib/components/atlas/index.tsx`)

### `PageShell`
Route wrapper. Tone variants: `stone`, `plaster`, `canopy`, `portal`, `admin`, `wood`.

### `PageIntro`
Page header pattern: kicker (mono uppercase), display title (serif), lead paragraph, actions strip, optional aside.
- Props: `kicker`, `title`, `lead`, `actions`, `aside`, `align`, `compact`

### `FocalPanel`
Rich featured panel for hero/CTA moments. Two-column body layout + optional footer.
- Tone variants: `default`, `canopy`, `warm`, `wood`
- Props: `kicker`, `title`, `lead`, `actions`, `aside`, `footer`, `tone`

### `CanopyReveal`
Full-bleed celestial blue panel with decorative art layers (wash, ribs, gilt marks).
- Contains header with title/lead and a grid of linked nodes
- Used on homepage and conferences page for strong focal moments
- Props: `kicker`, `title`, `lead`, `items` (array of `{title, meta, href}`), `footer`

### `ThresholdBand`
Section header with gradient border background, title, detail text, and children (usually filter chips).
- Props: `label`, `title`, `detail`, `children`

### `Surface`
Card/panel container with border, background, and shadow.
- Tone variants: `default`, `quiet`, `inset`, `wood`, `canopy`
- Props: `tone`, `className`, `children`

### `LedgerRows` / `LedgerRow`
List/ledger pattern for dense information display.
- `LedgerRow` supports: `href` (renders as Link), `label`, `title`, `summary`, `meta`, `actions`, `active`, `tone`
- Tone variants: `default`, `warm`, `quiet`, `selected`
- Hover states with lift animation for linked rows

### `ActionStrip`
Horizontal flex container for buttons. Wraps, gaps, centers.

### `SplitTool`
Three-column layout: sticky left rail, main content, sticky right detail.
- Used on meetings page for filters | list/map | detail panel
- Collapses to single column below 1180px

### `MarginalRail`
Side rail with left accent border.
- Tone variants: `quiet`, `warm`, `wood`
- Props: `kicker`, `title`, `children`

### `StatusRail`
Numbered step indicator for progress/status display.
- Step states: `complete`, `current`, `upcoming`, `warning`
- Props: `steps` (array of `{label, detail, state}`), `note`

---

## Map System

### `YPAAMap` (`src/lib/components/map/ypaa-map.tsx`)
MapLibre wrapper with:
- Custom CARTO light no-labels basemap with warm tinting
- Clustering for meetings (16+ markers)
- Conference halos and center dots
- Selection rings with type-aware colors
- Custom legend overlay (desktop only)
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
- Multi-surface form layout with numbered sections
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

| Page | Key Components Used |
|------|---------------------|
| Home | `PageShell`, `PageIntro`, `Surface`, `ThresholdBand`, `LedgerRows`, `FocalPanel`, `CanopyReveal` |
| Meetings | `PageShell`, `PageIntro`, `SplitTool`, `Surface`, `YPAAMap`, `LedgerRows` |
| Conferences | `PageShell`, `PageIntro`, `ThresholdBand`, `LedgerRows`, `CanopyReveal`, `Surface` |
| Conference Detail | `PageShell`, `FocalPanel`, `Surface`, `LedgerRows`, `MarginalRail`, `StatusRail` |
| About | `PageShell`, `PageIntro`, `Surface`, `LedgerRows` |
| What Is YPAA | `PageShell`, `PageIntro`, `LedgerRows`, `CanopyReveal`, `MarginalRail` |
| Safety | `PageShell`, `PageIntro`, `Surface`, `LedgerRows`, `MarginalRail` |
| Submit | `PageShell`, `PageIntro`, `SubmitForm`, `MarginalRail` |
| Events | `PageShell`, `PageIntro`, `ThresholdBand`, `LedgerRows`, `FocalPanel` |
| Newsletter | `PageShell`, `PageIntro`, `Surface`, `NewsletterSignupForm`, `MarginalRail` |
| Portal | `PageShell`, `PageIntro`, `Surface`, `LedgerRows`, `StatusRail` |
| Admin | `PageShell`, `PageIntro`, `Surface`, `LedgerRows` |
