# HUBYPAA Design Reference — Every Screen, Desktop & Mobile

Use this document when building mockups. It tells you exactly what lives on each screen at each breakpoint.

---

## Global Persistent Elements (Every Screen)

These appear on **every single page** regardless of route.

### Header (fixed, top)
- **Height:** 4.25rem (68px)
- **Position:** Fixed top, full width, z-index 80
- **Background:** Frosted glass (white/60% opacity, 18px backdrop blur)
- **Bottom border:** Faint ink/10% rule (slightly more transparent on home when not scrolled)

| Element | Desktop (lg+) | Mobile (<lg) |
|---------|---------------|--------------|
| Logo | "HUBYPAA" serif + "The YPAA Hub" meta label below | "HUBYPAA" serif only (tagline hidden below 640px, shown sm+) |
| Primary nav | Horizontal pill links: **Meetings, Conferences, What Is YPAA, About** — active state has teal/12% background | Hidden |
| Secondary actions | "Safety" quiet button (Shield icon) + "Submit / Update" primary button | Hidden |
| Mobile menu button | Hidden | 44px circle button, white/75% bg, ink border — toggles between hamburger (Menu) and X icons |

### Mobile Menu Overlay (mobile only, on hamburger tap)
- Full-screen overlay below header
- Frosted glass background matching header
- Body scroll locked while open
- Staggered entrance animation (260ms)
- **Contents:**
  - Primary nav links with icons: MapPinned Meetings, CalendarDays Conferences, HelpCircle What Is YPAA, Compass About
  - Horizontal rule divider
  - Secondary nav links with icons: Shield Safety & Anonymity, Send Submit / Update
  - Bottom section: rule + centered AA principles text ("AA principles before personalities...")
- Exit animation (220ms) on close

### Mobile Bottom Bar (mobile only)
- **Visibility:** Shown below lg (1024px), hidden on desktop
- **Position:** Fixed bottom, z-index 70
- **Shape:** Rounded pill (1.5rem border-radius), backdrop blur
- **Safe area:** Respects device safe-area-inset-bottom (notch phones)
- **Tabs (4):**
  1. Home (Home icon)
  2. Meetings (MapPinned icon)
  3. Conferences (CalendarDays icon)
  4. Submit (Send icon)
- **Active state:** Accent color highlight on active tab
- **Padding effect:** Main content gets extra bottom padding on mobile to clear this bar: `calc(4.5rem + safe-area + 0.75rem)`

### Footer (static, bottom of page)
- Top border: ink/8% rule
- Padding: pb-28 (mobile, to clear bottom bar) / pb-12 (desktop)

**Mobile layout (<lg):**
- Stacked: intro block, then 2-col grid (3-col on sm+) of link groups
- Shorter description text

**Desktop layout (lg+):**
- 4-column grid: `1.2fr 1fr 1fr 1fr`
- Column 1: HUBYPAA kicker badge + serif heading + longer description
- Column 2 "Explore": Meetings, Conferences, What Is YPAA
- Column 3 "About": About this site, Submit / Update, Safety & Anonymity
- Column 4 "Outside links": AA.org, Find AA, Meeting Guide (external links)

**Bottom rule + disclaimer (both):**
- Horizontal rule
- Row: "AA principles before personalities..." left, year right (stacked on mobile, side-by-side on sm+)

### Skip Link (accessibility)
- Screen-reader only by default
- On focus: fixed pill at top-left, z-index 120, accent background
- Links to `#main-content`

### Background
- Page background: `#edf2ef` (ground color)
- Radial gradient accents (teal, warm) from top corners
- Subtle dot grid overlay pattern

---

## Screen-by-Screen Breakdown

---

### 1. HOME `/`

**Desktop layout (xl):** Two-column grid `0.92fr | 1.08fr`
**Mobile:** Single column, stacked

#### Section A — Hero

**Left column (sticky on xl, top: 6rem):**
- Logo mark area
- Hero headline (serif, large)
- Hero body text
- **Stat boxes row (3):** Number of rooms, events, states — small panel cards
- **Feature cards (3-col grid):**
  1. MapPinned icon + "Find a Room Fast" + description
  2. CalendarDays icon + "Track the Weekend" + description
  3. Compass icon + "Know the Context" + description

**Right column:**
- **Dataset tab switcher:** 3 chip-style tabs — Overview, Meetings, Conferences
- **Map:** MapLibre interactive map in `.map-shell` container
  - Desktop height: `calc(100dvh - 18rem)`
  - Mobile height: `28rem` (sm: `34rem`)
  - Map key legend (bottom-left, hidden on mobile, shown sm+)
  - Map markers: blue circles (meetings), orange circles (conferences), clusters
- **Map detail panel** (appears on marker click): right sidebar on xl, below map otherwise
  - Colored eyebrow label, title, subtitle, location, summary, "Visit source" button, X close

#### Section B — Featured Conference

- Full-width band
- Large featured conference card with accent gradient background
- Conference name, dates, location
- CTA buttons
- (If none featured: placeholder messaging)

#### Section C — Philosophy

- Section heading: "Ease Is the Whole Flex"
- **3-column grid of panel cards** (single column mobile):
  1. MapPinned — "Find a Room Fast"
  2. CalendarDays — "Track the Weekend"
  3. Compass — "Know the Context"

#### Section D — Meetings & Safety

- **2-column layout on lg+** (stacked on mobile)
- Left: Featured meetings list (4 meeting items)
- Right top: Safety card (Shield icon + text)
- Right bottom: Data quality card (Sparkles icon + text)

---

### 2. MEETINGS `/meetings`

**Desktop layout (lg+):** Two-column grid `24rem sidebar | 1fr map`
**Mobile:** Single view with Map/List toggle

#### Left Sidebar (desktop) / List View (mobile toggle)
- "Visible meetings" count label
- Scrollable meeting list
  - Max height: `calc(100dvh - 12rem)`
  - Each item: meeting name, format badge (In Person / Online / Hybrid), day/time, location
  - Active item: gradient background highlight
  - Click selects and pans map

#### Right / Main Area
- **Controls panel above map:**
  - Page intro text
  - Visible count + filter status indicator
  - **Mobile Map/List toggle** (lg:hidden): two-button toggle
  - Search input with icon + clear button
  - **Format filter chips:** All, In Person, Online, Hybrid — pill toggles
  - **Advanced filters** (expandable): State dropdown, Day dropdown
- **Map:** Full interactive map
  - Desktop height: fills remaining viewport
  - Mobile height: `28rem` (sm: `34rem`)
  - Clusters at 16+ markers
  - Blue meeting markers, click to select
  - Map key (bottom-left, hidden <sm)
- **Floating notes** below map: 3-column grid on sm+ (single col mobile) — small info cards
- **Detail panel** (on marker selection): below map, shows meeting info

---

### 3. CONFERENCES `/conferences`

**Desktop layout (xl):** Two-column grid `1.15fr | 0.85fr`
**Mobile:** Single column (map first, then content)

#### Main Content (order-2 mobile, left on xl)
- **Featured conference card:** Large highlighted card with full details, accent styling
- **Upcoming conferences list:** Scrollable list of upcoming events with dates, locations
- **Past conferences archive:** 2-column grid on sm+ (6 items max), muted styling

#### Sidebar (order-1 mobile, right + sticky on xl)
- Map title section
- **Map:** MapLibre with conference markers (orange)
  - Responsive heights same as other maps
  - Map key
- **Detail panel** on marker click

---

### 4. CONFERENCE DETAIL `/conferences/[slug]`

**Desktop layout (xl):** Two-column grid `1fr | 0.92fr`
**Mobile:** Single column (content first, then map)

#### Main Content
- Breadcrumb back link (arrow + "Conferences")
- **Status badge** (upcoming / past / etc.)
- **Title** (large serif h1)
- **Date box** (panel-muted): formatted date range with calendar icon
- **Location box** (panel-muted): city, state, venue with map pin icon
- **Action buttons row:**
  - "Registration" primary button (if link exists)
  - "Website" secondary button (if link exists)
- **Organizer info** (if available)
- **Confidence indicator** (data quality level)
- **Notes** (if any)
- **Tags** (if any): chip-style pills

#### Sidebar (sticky on xl)
- **Map** with single conference marker
- **"What to do next" info panel:** guidance text with links

---

### 5. ABOUT `/about`

Single column with sections, max-width constrained

#### Section A — Intro
- Section kicker badge
- Page title (large serif)
- Intro paragraph

#### Section B — What It Is / Isn't
- **2-column grid on lg+:**
  - Left (larger, panel-raised): "What this site is" — descriptive text
  - Right (smaller, panel): "What it is not" — boundary-setting text

#### Section C — Principles
- **3-column grid on lg+ (stacked mobile):** Three panel cards
  1. Usefulness
  2. Restraint
  3. Trust

#### Section D — Why & How
- **2-column grid on lg+:**
  - Left: "Why now" — context text
  - Right (panel-raised): "Keep it better" — contribution CTA

---

### 6. WHAT IS YPAA `/what-is-ypaa`

Single column with sections, max-width constrained

#### Section A — Intro
- Section kicker badge
- Page title (large serif)
- Intro paragraph

#### Section B — Short Version / Meaning
- **2-column grid on lg+:**
  - Left (larger): "The short version"
  - Right (smaller): "What people usually mean"

#### Section C — Three Parts
- **3-column grid on lg+ (stacked mobile):** Three panel cards
  1. Meetings
  2. Conferences
  3. Service

#### Section D — Questions & Next Steps
- **2-column grid on lg+:**
  - Left (larger, panel-raised): "Common questions" — Q&A style
  - Right: "Where to go from here" — link buttons to other pages

---

### 7. SAFETY `/safety`

Single column with sections, max-width constrained

#### Section A — Intro
- Section kicker badge
- Page title (large serif)
- Intro paragraph

#### Section B — Help & Anonymity
- **2-column grid on lg+:**
  - Left: "Need help now" — **4 crisis resource cards** (phone numbers, hotlines, links)
  - Right: "Anonymity" — text explaining anonymity principles

#### Section C — Reminders
- **3-column grid on lg+ (stacked mobile):** Three panel cards
  1. "Before you post"
  2. "Before you travel"
  3. "Before you assume"

---

### 8. SUBMIT `/submit`

**Desktop layout (xl):** Two-column grid `0.82fr | 1.18fr`
**Mobile:** Single column (info then form)

#### Left Panel
- "What helps most" explanatory text
- Guidance on what kinds of submissions are useful

#### Right Panel (panel-raised)
- **Submit form:**
  - **Type selector:** 4 options in 2-col grid (mobile) / 4-col (md+)
    - New Meeting
    - New Conference
    - Correction
    - Other
  - **Name / Subject** text input (required)
  - **City / State** text input (optional)
  - **Source link** URL input (optional)
  - **Details** textarea (required)
  - **Email** input (optional)
  - **Submit button** (primary action style)
- **Success state:** Replaces form with checkmark icon + confirmation message + "Send another" link

---

### 9. ERROR PAGES

#### Not Found (404) & Error (500)
- Centered panel, max-width xl
- Large centered h1 ("Page Not Found" / "Something Went Wrong")
- Description text
- **3 action buttons:**
  - Try Again (error only) / Go Home
  - Meetings
  - etc.

---

## Design System Quick Reference

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| ground | `#edf2ef` | Page background |
| panel | `#ffffff` | Card/panel background |
| raised | `#f7faf8` | Elevated panel bg |
| raised-strong | `#e7efeb` | Strong elevated bg |
| ink | `#112338` | Primary text |
| muted | `#5e6f7b` | Secondary text |
| faint | `#84909b` | Tertiary text / labels |
| rule | `#d5dfe0` | Borders, dividers |
| accent | `#13766d` | Primary action (teal) |
| signal | `#1d4f72` | Meetings (navy blue) |
| warm | `#de7247` | Conferences (orange) |
| danger | `#c05649` | Error / destructive |

### Typography
| Role | Font Stack |
|------|-----------|
| Serif (headings) | Iowan Old Style, Palatino Linotype, Book Antiqua, Times New Roman |
| Sans (body) | Avenir Next, Segoe UI, Helvetica Neue, Arial |
| Mono (labels) | SF Mono, SFMono-Regular, Menlo, Consolas |

### Radii
| Token | Value |
|-------|-------|
| sm | 1rem |
| md | 1.35rem |
| lg | 1.85rem (reduced to md on mobile) |
| xl | 2.4rem |

### Key Breakpoints
| Name | Width | What changes |
|------|-------|-------------|
| sm | 640px | Tagline shows, grids expand to 2-3 col, map key visible |
| md | 768px | Form grids expand, tablet layouts |
| lg | 1024px | **Major shift:** desktop nav shows, bottom bar hides, sidebars appear, footer goes 4-col |
| xl | 1280px | Sticky sidebars activate, widest grid layouts |

### Component Patterns
| Class | Description |
|-------|------------|
| `.panel` | White glassmorphic card (78% opacity, 18px blur, rounded-lg, shadow) |
| `.panel-raised` | Elevated variant (gradient bg, stronger shadow) |
| `.panel-outline` | Accent border variant |
| `.panel-muted` | Muted background variant |
| `.action-primary` | Teal button with glow shadow, lifts on hover |
| `.action-secondary` | White outlined button |
| `.action-quiet` | Minimal muted-bg button |
| `.chip` | Pill toggle (filter buttons) |
| `.list-item` | Bordered list row with active gradient state |
| `.section-kicker` | Small pill badge with colored dot |
| `.page-title` | Fluid h1: clamp(2.7rem, 5vw, 5.6rem) |
| `.meta-label` | Tiny uppercase monospace label |
| `.map-shell` | Map container with glassmorphic border + shadow |
| `.floating-note` | Small info card below maps |

### Spacing
- Site max width: 88rem
- Site padding: 2rem (1.25rem on mobile)
- Header height: 4.25rem
- Bottom bar height: 4.5rem

### Touch Behavior (mobile)
- No hover states — active/tap feedback only
- Buttons scale to 0.96-0.97 on press
- Shorter transitions (80ms)
- Larger map markers and hit targets for fingers
