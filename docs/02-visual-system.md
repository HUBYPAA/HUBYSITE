# Visual System

## Direction

The visual identity is **luminous, blue-led, and editorial** — inspired by the painted ceiling of St. Mary's Basilica in Kraków, translated into interface language rather than costume. The site feels like a celestial atlas: cool light backgrounds, architectural blue ribs, gold star marks, and crisp ink text floating in space. No beige. No brown. No cards.

---

## Color Tokens

Defined in `src/app/globals.css` via both `@theme inline` (Tailwind v4) and CSS custom properties.

### Core Palette

| Token | Hex | Role |
|-------|-----|------|
| `star-white` | `#f8fbf8` | Lightest ground — celestial white |
| `luminous-white` | `#f3f8f3` | Secondary ground — cool white |
| `cool-light` | `#eaf4f6` | **Body background** — pale blue light |
| `pale-canopy` | `#cbe4ea` | Pale blue tint — subtle washes |
| `ceiling-blue` | `#3f9dca` | Brightest blue — focal canopy moments |
| `mariacki-blue` | `#2f86b7` | Primary blue — map markers, accent moments |
| `electric-azure` | `#4bb9e6` | Electric blue — glows, halos |
| `lit-azure` | `#6dacd4` | Light blue — meeting markers, hover states |
| `pale-blue-plaster` | `#abc6d0` | Muted blue — subtle tints |
| `rib-blue` | `#45718e` | Structural blue — labels, kickers, secondary text |
| `deep-ink-blue` | `#18324a` | Deep blue — footer gradient endpoint |
| `star-gold` | `#f5cc68` | Star gold — highlights, stats, CTAs (~3-6%) |
| `gilt` | `#d6a24e` | Aged gold — secondary gold moments |
| `old-gold` | `#ad7f46` | Deep gold — strokes, borders |
| `terracotta` | `#c98146` | Warm accent — tiny accent only (~0-3%) |
| `blood-red` | `#8a2d25` | Deep red — danger adjacent |
| `ink` | `#101314` | **Primary text** — crisp near-black |
| `soft-ink` | `#283236` | Secondary text — softer gray |
| `charcoal` | `#11100d` | Deepest shadows |

### Functional Colors

| Token | Hex | Role |
|-------|-----|------|
| `success` | `#2f6b45` | Positive states |
| `warning` | `#a8661f` | Caution states |
| `danger` | `#9c2f27` | Error / destructive |
| `accent` | `#2f86b7` | Primary action blue |

### Surfaces

Surfaces exist but are used **sparingly** — the default is no container, no background, no shadow.

| Token | Value | Role |
|-------|-------|------|
| `surface` | `rgba(255, 255, 255, 0.82)` | Default translucent — rarely used |
| `surface-strong` | `rgba(255, 255, 255, 0.96)` | Elevated panels — minimal use |
| `surface-muted` | `rgba(234, 244, 246, 0.78)` | Quiet panels — minimal use |
| `surface-blue` | `rgba(63, 157, 202, 0.1)` | Blue-tinted panels |
| `border` | `rgba(24, 50, 74, 0.1)` | Hairline borders — ink-blue tint |
| `border-strong` | `rgba(24, 50, 74, 0.18)` | Elevated borders |

---

## Generative Star Fields

Each page gets a unique star field density via CSS `::before` pseudo-elements with `radial-gradient` dots:

| Class | Stars | Pages |
|-------|-------|-------|
| `.star-field--sparse` | ~12 | Meetings, Events, Archive, About, Safety, Submit, Newsletter, Portal, Admin, Auth |
| `.star-field--medium` | ~20 | Conferences, What is YPAA? |
| `.star-field--dense` | ~32 | Home |

Stars are gold (`#f5cc68`) and white mixed at varying opacity. The `.god-rays` overlay adds conic-gradient light beams radiating from the bottom center. Combined with `.float-text` (text-shadow glow), this creates the celestial hero effect on every page.

---

## Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Serif display | Fraunces | 300, 400, 500, 600 (normal + italic) | Page titles, focal headings, stat numerals, footer titles |
| Sans body | Inter | 300, 400, 500, 600 | Body text, UI controls, labels, navigation |
| Mono metadata | JetBrains Mono | 300, 400, 500 | Kickers, labels, timestamps, small caps |

### Type Scale

| Token | Size | Usage |
|-------|------|-------|
| `text-xs` | `0.7rem` | Micro labels |
| `text-sm` | `0.88rem` | Secondary body |
| `text-base` | `1rem` | Body |
| `text-md` | `1.06rem` | Slightly enlarged |
| `text-lg` | `1.22rem` | Subheadings |
| `text-xl` | `1.5rem` | Section headings |
| `text-2xl` | `clamp(1.9rem, 3.8vw, 3rem)` | Large headings |
| `text-3xl` | `clamp(2.4rem, 5.5vw, 4.6rem)` | Page titles |
| `text-4xl` | `clamp(3.2rem, 7.5vw, 6.2rem)` | Hero display |
| `display-hero` | `clamp(3rem, 10vw, 8rem)` | Grand page titles |
| `display-grand` | `clamp(4rem, 14vw, 12rem)` | Monumental display |

---

## Shadows

| Token | Value |
|-------|-------|
| `shadow-soft` | `0 20px 50px rgba(16, 19, 20, 0.06)` |
| `shadow-panel` | `0 28px 70px rgba(16, 19, 20, 0.08)` |
| `shadow-stone` | `0 14px 32px rgba(16, 19, 20, 0.05)` |
| `shadow-carved` | `0 24px 56px rgba(16, 19, 20, 0.1)` |
| `shadow-inset` | `inset 0 1px 0 rgba(255, 255, 255, 0.8)` |

All shadows use cool ink-blue tones (`rgba(16, 19, 20, ...)`) rather than warm brown.

---

## Radii

| Token | Value |
|-------|-------|
| `radius-sm` | `0.75rem` |
| `radius-md` | `1.1rem` |
| `radius-lg` | `1.6rem` |
| `radius-xl` | `2.2rem` |
| `radius-pill` | `999px` |

---

## Spacing

| Token | Value |
|-------|-------|
| `space-1` – `space-8` | `0.25rem` – `2rem` |
| `space-10` | `2.5rem` |
| `space-12` | `3rem` |
| `space-16` | `4rem` |
| `space-20` | `5rem` |
| `space-24` | `6rem` |
| `space-32` | `8rem` |
| `space-40` | `10rem` |

---

## Layout Constants

| Token | Value |
|-------|-------|
| `container-max` | `1280px` |
| `reading-max` | `720px` |
| `gutter` | `clamp(1rem, 2.4vw, 2.25rem)` |
| `site-header-h` | `4.5rem` |
| `bottom-nav-h` | `4.2rem` |

### Shell Variants

| Class | Width |
|-------|-------|
| `.shell` | `1280px` max |
| `.shell-wide` | `1440px` max |
| `.shell-narrow` | `980px` max |

---

## Editorial Layouts

| Class | Columns | Usage |
|-------|---------|-------|
| `.editorial-split` | `1.4fr / 0.6fr` | Default asymmetric pair |
| `.editorial-split--wide` | `1.2fr / 0.8fr` | Wider right column |
| `.editorial-split--reverse` | `0.8fr / 1.2fr` | Reversed |
| `.asymmetric-pair` | `1fr / 1fr` | Equal but still editorial |
| `.asymmetric-pair--thirds` | `1.3fr / 0.7fr` | Strong asymmetry |

All collapse to single column below `1180px`.

---

## Component Tone Variants

### PageShell
- `stone` — transparent, sits on body background
- `plaster` — translucent rounded shell (minimal use)
- `canopy` — blue-tinted translucent shell
- `portal` — blue-accented translucent shell
- `admin` — blue-accented translucent shell

### Surface (used sparingly)
- `default` — strong translucent white
- `quiet` — muted translucent white
- `inset` — recessed cool tone
- `canopy` — blue gradient with white border
- `float` — backdrop-blur glass panel

### FocalPanel
- `default` — hairline top/bottom borders only
- `canopy` — full blue celestial panel with stars and ribs
- `warm` — blue-tinted gradient accent

---

## Motion

- **Default transitions**: `120–140ms ease` for hover, focus, color changes
- **Entrance**: `rise-in` animation (220ms) — opacity + translateY
- **View transitions**: Native `@view-transition { navigation: auto }` for page transitions
- **Star pulse**: `gentle-pulse` (8s) on star fields
- **Reduced motion**: `prefers-reduced-motion: reduce` collapses all animations to `0.01ms`
- **No bounce, no wiggle** — motion is reveal and continuity only

---

## Accessibility

- Skip link: visible on focus, gold background
- Focus visible: custom blue ring (`var(--focus-ring)`)
- All interactive elements meet minimum touch targets
- Mobile bottom bar respects `safe-area-inset-bottom`
- `prefers-reduced-motion` honored throughout
