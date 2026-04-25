# Visual System

## Direction

The current visual identity is **warm, material, and editorial** — inspired by the structural discipline of St. Mary's Basilica in Kraków, but translated into interface language rather than costume. The site feels like a building: plaster walls, stone surfaces, celestial blue focal moments, and gilt highlights.

---

## Color Tokens

Defined in `src/app/globals.css` via both `@theme inline` (Tailwind v4) and CSS custom properties.

### Core Palette

| Token | Hex | Role |
|-------|-----|------|
| `ceiling-blue` | `#3f9dca` | Brightest blue — focal canopy moments |
| `mariacki-blue` | `#2f86b7` | Primary blue — map markers, accent moments |
| `lit-azure` | `#6dacd4` | Light blue — meeting markers, hover states |
| `pale-blue-plaster` | `#abc6d0` | Muted blue — subtle tints |
| `rib-blue` | `#45718e` | Structural blue — marker strokes, borders |
| `shadowed-blue` | `#3c5066` | Deep blue — shadows, depth |
| `gilt` | `#d6a24e` | Warm gold — highlights, stats, CTAs, focus rings |
| `old-gold` | `#ad7f46` | Aged gold — secondary gold moments, labels |
| `gilt-lit` | `#f5cc68` | Bright gold — halos, featured emphasis |
| `brick-red` | `#8a3a2a` | Deep brick — dark accents, danger adjacent |
| `terracotta` | `#c98146` | Warm terracotta — conference halos, warm accents |
| `rose-plaster` | `#d6aa94` | Muted rose — subtle warmth |
| `stone` | `#e8e2cd` | Cool stone — tertiary surfaces |
| `plaster` | `#f4ebdd` | Warm plaster — **body background** |
| `aged-paper` | `#efe3c8` | Yellowed paper — gradient endpoints |
| `wood` | `#24170f` | Dark wood — footer background, dark text on gold |
| `charcoal` | `#11100d` | Near-black — deepest shadows |
| `ink` | `#191a17` | Warm near-black — **primary text** |
| `muted-ink` | `#4b4338` | Warm gray — secondary text |

### Functional Colors

| Token | Hex | Role |
|-------|-----|------|
| `success` | `#2f6b45` | Positive states |
| `warning` | `#a8661f` | Caution states |
| `danger` | `#9c2f27` | Error / destructive |
| `accent` | `#2f86b7` | Primary action blue |

### Surfaces

| Token | Value | Role |
|-------|-------|------|
| `surface` | `rgba(255, 252, 246, 0.8)` | Default translucent panel |
| `surface-strong` | `rgba(255, 252, 246, 0.94)` | Elevated panels |
| `surface-muted` | `rgba(247, 240, 226, 0.74)` | Quiet panels |
| `surface-blue` | `rgba(63, 157, 202, 0.1)` | Blue-tinted panels |
| `surface-wood` | `rgba(36, 23, 15, 0.94)` | Dark footer panels |
| `border` | `rgba(75, 67, 56, 0.18)` | Default borders |
| `border-strong` | `rgba(75, 67, 56, 0.34)` | Elevated borders |

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
| `text-xs` | `0.72rem` | Micro labels |
| `text-sm` | `0.92rem` | Secondary body |
| `text-base` | `1rem` | Body |
| `text-md` | `1.08rem` | Slightly enlarged |
| `text-lg` | `1.25rem` | Subheadings |
| `text-xl` | `1.55rem` | Section headings |
| `text-2xl` | `clamp(2rem, 4vw, 3rem)` | Large headings |
| `text-3xl` | `clamp(2.6rem, 6vw, 4.8rem)` | Page titles |
| `text-4xl` | `clamp(3.4rem, 8vw, 6.6rem)` | Hero display |

---

## Shadows

| Token | Value |
|-------|-------|
| `shadow-soft` | `0 24px 60px rgba(43, 30, 14, 0.1)` |
| `shadow-panel` | `0 32px 80px rgba(43, 30, 14, 0.12)` |
| `shadow-stone` | `0 18px 40px rgba(43, 30, 14, 0.08)` |
| `shadow-carved` | `0 28px 64px rgba(43, 30, 14, 0.14)` |
| `shadow-inset` | `inset 0 1px 0 rgba(255, 255, 255, 0.78)` |

All shadows use warm brown tones (`rgba(43, 30, 14, ...)`) rather than cool blue-gray.

---

## Radii

| Token | Value |
|-------|-------|
| `radius-sm` | `0.85rem` |
| `radius-md` | `1.25rem` |
| `radius-lg` | `1.8rem` |
| `radius-xl` | `2.4rem` |
| `radius-pill` | `999px` |

---

## Spacing

| Token | Value |
|-------|-------|
| `space-1` – `space-8` | `0.25rem` – `2rem` |
| `space-10` | `2.5rem` |
| `space-12` | `3rem` |
| `space-14` | `3.5rem` |
| `space-16` | `4rem` |
| `space-20` | `5rem` |
| `space-24` | `6rem` |

---

## Layout Constants

| Token | Value |
|-------|-------|
| `container-max` | `1240px` |
| `reading-max` | `760px` |
| `gutter` | `clamp(1rem, 2vw, 2rem)` |
| `site-header-h` | `5.25rem` |
| `bottom-nav-h` | `4.6rem` |

---

## Component Tone Variants

### PageShell
- `stone` — transparent, sits on body background
- `plaster` — translucent rounded shell
- `canopy` — blue-tinted translucent shell
- `portal` — blue-accented translucent shell
- `admin` — warm-accented translucent shell
- `wood` — dark wood background, light text

### Surface
- `default` — strong translucent white
- `quiet` — muted translucent white
- `inset` — recessed warm tone
- `wood` — dark wood with gilt border
- `canopy` — blue gradient with white border

### FocalPanel
- `default` — strong raised panel
- `canopy` — full blue celestial panel
- `warm` — terracotta-tinted panel
- `wood` — dark wood panel

---

## Motion

- **Default transitions**: `120–140ms ease` for hover, focus, color changes
- **Entrance**: `rise-in` animation (220ms) — opacity + translateY
- **Reduced motion**: `prefers-reduced-motion: reduce` collapses all animations to `0.01ms`
- **No bounce, no wiggle** — motion is reveal and continuity only

---

## Accessibility

- Skip link: visible on focus, gold background
- Focus visible: custom gold+blue ring (`var(--focus-ring)`)
- All interactive elements meet minimum touch targets
- Mobile bottom bar respects `safe-area-inset-bottom`
