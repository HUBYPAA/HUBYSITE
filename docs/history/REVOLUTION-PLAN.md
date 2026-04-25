# HUBYPAA Revolution Plan — St. Mary's Basilica, For Real This Time

> The renovation borrowed the basilica's vocabulary. The revolution borrows its **beliefs**.

---

## 0 · Manifesto

St. Mary's of Kraków is not a beige church. It is **red brick against blue vault against gold leaf**, with crimson polychrome figures, ruby-and-cobalt glass, and a black-marble gate. It is a building that *insists*.

The current site picked the basilica's **quietest** surfaces — aged limestone, dulled brass, oxidized copper — and made those the whole product. The result is a church-adjacent neutral: tasteful, safe, and almost nothing like walking into Mariacki.

This revolution restores the **loud half** of the contrast: the saturated brick, the lapis vault, the gilt, the polychrome, the jewel-tone glass, the Dębnik black. It also stops treating the basilica as a mood board and starts treating it as an **architectural program**:

- A building you **enter** (threshold compression → nave expansion)
- A building with a **focal terminus** (the Veit Stoss altar is the featured card)
- A building with **two unequal towers** (layouts are deliberately asymmetric)
- A building with **layered history** (surfaces carry age)
- A building with **orchestrated light** (color events, not flat fills)
- A building with **ornament hierarchy** (geometric field, figurative focal moments)

The old plan said "don't be tacky." The revolution says: *be monumental, then be disciplined about it.*

---

## 1 · Color System — Full Replacement

Every token from the renovation is replaced. Add three families it never had: **polychrome** (Matejko's walls), **stained glass** (light events), **altar materials** (wood / ivory / Dębnik / gilt).

### 1.1 Structural — "brick and stone"

The exterior. Where most of the site lives.

| Token | Hex | Role |
|---|---|---|
| `brick-deep` | `#8a2f1e` | Shadow side of fired brick — borders, footer mass, inscriptions |
| `brick` | `#b03e28` | The building's primary warm surface — header band, hero gutter, large feature zones |
| `brick-lit` | `#c55638` | Brick catching low sun — hover states on brick surfaces, mortar highlights |
| `mortar` | `#d2b79a` | Lime mortar between bricks — micro-rhythms, rule glyphs |
| `ashlar` | `#e8dbc3` | Warm limestone articulation — panel surface |
| `ashlar-lit` | `#f2e8d4` | Sun-struck limestone — raised surfaces |
| `ashlar-deep` | `#d4c3a6` | Shaded limestone — sandstone depth, carved recesses |
| `ground` | `#ead9bd` | Warm lime-wash / plaster wall — body background, sits *with* brick, not away from it |

Key shift: **`ground` is no longer parchment.** Parchment is paper; the basilica's walls are lime-washed plaster. The ground tone is warmer, more mineral, slightly yellow-green when it meets brick.

### 1.2 Celestial — "nave and vault"

The interior sky. Matejko's ceiling.

| Token | Hex | Role |
|---|---|---|
| `lapis-deep` | `#111b4a` | Deepest vault shadow — altar backdrop, nighttime zones |
| `lapis` | `#1e2a78` | Matejko blue — featured card ground, starry vault canopy |
| `lapis-lit` | `#2d3e9c` | Vault catching stained-glass light — gradient highlights |
| `celestial` | `#3a55b8` | Brighter sky — accent moments inside vault panels |
| `star-glint` | `#7a8ad8` | Faint blue glow around gilt stars |

Key shift: **the vault is actually lapis now.** `#1a2744` was slate; `#1e2a78` is the sky you paint angels on.

### 1.3 Gilt — "gold leaf, not brass"

The stars, the crown, the altar.

| Token | Hex | Role |
|---|---|---|
| `gilt` | `#dcb13a` | Real gold leaf — focal accents, featured title color, active states on dark |
| `gilt-lit` | `#ebc856` | Sun-struck gilt — halos, focus glows |
| `gilt-shadow` | `#9c7620` | Aged gilt in recess — gilt on light backgrounds needs this for contrast |
| `gilt-soft` | `#c9a54a` | Calmer gilt for secondary gold moments |

Key shift: **gilt is brighter and warmer.** `#c8a44e` read as dulled brass. `#dcb13a` reads as leaf.

### 1.4 Polychrome — "Matejko's painted walls"

Saturated figurative colors. Used in pattern fields, heraldic seals, enriched states. Never as flat body fills.

| Token | Hex | Role |
|---|---|---|
| `crimson` | `#9a2a2a` | Matejko red — pattern fields, section-header florals, primary action on light |
| `crimson-deep` | `#6e1a1f` | Shadow crimson — inscription underlines, error states |
| `emerald` | `#2f5d3a` | Matejko green — meetings accent, heraldic leaves |
| `emerald-deep` | `#1e3f27` | Shadow emerald — chip active on meetings |
| `ochre` | `#b88a2a` | Warm painted ochre — chapel card variation, secondary heraldry |
| `burgundy` | `#5c1f2a` | Wine-dark polychrome — focal underpainting |
| `ivory` | `#f1e9d6` | Painted flesh / banner ground — enriched card interiors |
| `carnation` | `#c97a6e` | Altarpiece flesh tone — single soft moment on featured card |

### 1.5 Stained Glass — "light events only"

**Never use as large fills.** These appear only as **gradients behind focal elements**, **active marker halos**, and **hover wipes**.

| Token | Hex | Role |
|---|---|---|
| `glass-cobalt` | `#1d3a8a` | Primary stained glass blue — hero canopy gradient |
| `glass-ruby` | `#7a1a2a` | Stained glass red — featured conference halo |
| `glass-amber` | `#c48a1a` | Stained glass amber — CTA focus glow |
| `glass-emerald` | `#1f4a34` | Stained glass green — meetings marker glow |
| `glass-violet` | `#4a1f6a` | Rare violet glass — reserved for error/recovery screens |

### 1.6 Altar Materials — "Veit Stoss's substrate"

| Token | Hex | Role |
|---|---|---|
| `linden` | `#8a5a2c` | Carved linden wood — altarpiece frame, enriched card interior |
| `linden-deep` | `#5c3c1e` | Shadowed wood — inner frame bevels |
| `debnik` | `#0c0c0f` | Black Dębnik marble — focal frames, grille lines, one footer band |
| `debnik-lit` | `#1a1a20` | Marble catching light — softer alternative where true black is too much |

### 1.7 Metal & Ink

| Token | Hex | Role |
|---|---|---|
| `ink` | `#1a1410` | Warm near-black — body text (pulled warmer — no more blue text) |
| `muted` | `#5c4a38` | Weathered inscription — secondary text |
| `faint` | `#8c7a66` | Faded carving — tertiary text |
| `iron` | `#2a2420` | Wrought-iron grillework — strong borders |
| `verdigris` | `#2d6b5e` | **Demoted.** Used only on tower-cap motifs, section-header glyphs, and a footer seal. **Not a primary action color.** |

### 1.8 Functional

| Token | Hex | Role |
|---|---|---|
| `action` | `#8a2f1e` (= `brick-deep`) | Primary CTA — the building's own red |
| `action-lit` | `#b03e28` (= `brick`) | CTA hover |
| `signal` | `#1e2a78` (= `lapis`) | Meetings / location accent |
| `danger` | `#7a1a2a` (= `glass-ruby`) | Errors — real blood-red, not muted brick |
| `success` | `#2f5d3a` (= `emerald`) | Submission success |

---

## 2 · The Starry Vault — the single boldest move

The basilica's most emotionally powerful element is Matejko's lapis ceiling with gold stars. The revolution makes this a **literal page element**, once per visit, at the top of the home page.

### Spec

- **Component**: `<StarryCanopy />` — a full-width band, `clamp(14rem, 28vw, 22rem)` tall, sitting **behind** the site header and the top of the hero.
- **Ground**: radial gradient from `lapis-deep` at top-center to `lapis` at edges, with a faint `lapis-lit` glow 30% down-left.
- **Stars**: 80–120 eight-pointed stars, sized 3–9px, positioned via a seeded pseudorandom function (so they don't re-shuffle on every render). Each star:
  - 4 long gilt rays + 4 short gilt rays (CSS `clip-path: polygon(...)` — real 8-point geometry, not emoji)
  - Color: `gilt` with 40% of them getting `gilt-lit` for twinkle variance
  - A 10% subset animate a 3s opacity breathing cycle, staggered by `--i * 0.1s`
- **Density gradient**: stars cluster denser at top, thin toward bottom — the "horizon" where vault meets wall
- **Horizon rule**: a `debnik` 1px line at the bottom of the canopy, with a gilt-filigree row (see §4.3) sitting on top of it — the moment where vault meets nave wall
- **Parallax**: on scroll, stars drift upward at 0.3x scroll rate (pure CSS `translate3d`, opt-out via `prefers-reduced-motion`)
- **Mobile**: canopy height reduces to `clamp(10rem, 40vw, 14rem)`; star count halves; no parallax

This is the single unmistakable "this is a basilica site" gesture. Every other page references it via a thin 2rem-tall `StarryRibbon` at the top — just enough vault to remember you're inside.

---

## 3 · The Pentaptych — featured conference as altarpiece

The Veit Stoss altarpiece is a pentaptych: a tall central panel flanked by two shorter wings, with a predella beneath. The featured conference card becomes this structure.

### Spec

```
┌─────────────────────────────────────────────────────────┐
│  [kicker: THIS MONTH'S ALTAR]                           │  ← gilt-on-lapis kicker
├────────┬───────────────────────────────┬────────────────┤
│        │                               │                │
│  WING  │      CENTRAL PANEL            │     WING       │  ← pentaptych row
│ (date) │  (title + city + serif body)  │  (action CTA)  │
│        │                               │                │
├────────┴───────────────────────────────┴────────────────┤
│  [predella: small meta row — host, committee, source]   │  ← linden wood band
└─────────────────────────────────────────────────────────┘
```

- **Frame**: `debnik` 2px outer border with an inner 1px `gilt` inlay 3px inward — real carved-frame geometry
- **Ground**: `lapis` with a `glass-ruby` → transparent radial behind the central panel (the altarpiece's own red backing)
- **Central panel**: slightly recessed (`inset box-shadow`), title in `gilt` serif at `clamp(2.2rem, 5vw, 3.4rem)`
- **Wings**: `lapis-deep` ground, `ivory` text, smaller type — subordinate but full-height
- **Predella**: `linden` band at the bottom, `ivory` text, `gilt-shadow` divider line above — the wooden shelf the altar sits on
- **Corner finials**: 4 small 8-point gilt stars at each inner corner of the frame — subtle, 6px
- **On hover**: the ruby radial brightens (`glass-ruby` → `glass-ruby + 10% lightness`), no movement. The altar doesn't wiggle.

This is the only Tier-3 focal element per page. Everything else points to it.

---

## 4 · Ornament System — "earned, hierarchical"

Three tiers, strictly enforced:

| Tier | Name | Where | Treatment |
|---|---|---|---|
| 1 | **Exterior wall** | ~80% of surfaces: lists, forms, most cards, meetings page | Plain ashlar. Clean rules. No patterns, no gradients beyond subtle shadows. |
| 2 | **Polychrome chapel** | Enriched moments: section headers, chapel cards, active states, safety/about highlights | Subtle geometric field pattern at 6–10% opacity. Heraldic glyph in section kicker. Minor gilt accents. |
| 3 | **Altar** | One per page, earned: hero canopy, featured conference pentaptych, conference-detail main panel | Full program: lapis/linden/gilt/debnik, ruby halo, 8-point stars, carved frame, gilt filigree. |

### 4.1 Geometric field pattern (Tier 2)

A single repeating SVG pattern, applied as `background-image` at 6–10% opacity on enriched card grounds:

- 48×48px tile
- Motif: interlocking trefoils in thin `gilt-shadow` lines on transparent — references the stellar vault ribwork
- Rotation: alternate tiles rotate 45° for rhythm
- Opacity: 0.06 on light grounds, 0.10 on dark grounds

### 4.2 Heraldic glyphs (Tier 2 section kickers)

Currently section kickers are a gold pill with a dot. Replace with: **small inline SVG coat-of-arms-adjacent glyphs**, one per content family:

| Family | Glyph | Reference |
|---|---|---|
| Meetings | Shield with cross bars | Krakow civic heraldry |
| Conferences | Eight-point star inside diamond | Stellar vault boss |
| About / What Is YPAA | Open book with ribbon | Matejko prayer-text panels |
| Safety | Winged shield | Guardian Angels chapel |
| Submit | Quill crossed with key | Scribal guild heraldry |

All glyphs 16px, stroke-only, `gilt-shadow` on light / `gilt` on dark. Do not go gaudy — they're marks, not illustrations.

### 4.3 Gilt filigree rule

Replace the current `.rule` horizontal-gradient line with a proper **filigree divider**:

- Base: 1px `debnik` line
- Center: 6rem-wide inline SVG — a symmetrical vine motif with a centered 8-point star
- Flanks: gradient fade from the SVG out to transparent

Used at section thresholds and at the base of the Starry Canopy. Quiet, unmistakable, carved.

### 4.4 Stellar vault corner motif

At the corners of every Tier 3 panel and select Tier 2 panels: **four tiny gilt rib-lines meeting at an 8-point star boss** inset 8px from each corner. This is the stellar vault in miniature. 6px, drawn in SVG, a fixed brand signature.

---

## 5 · Tower Asymmetry — real, not rhetorical

The current hero grid is `0.92fr | 1.08fr` — effectively 50/50 with a lean. That's not asymmetry; that's a tie.

### New grid discipline

| Layout | Ratio | Rationale |
|---|---|---|
| Home hero | `0.62fr | 1.38fr` | Left: tall narrow "North Tower" (82m) — stats, kicker, CTA stack. Right: wider "nave" — the map. |
| Meetings page | `1.2fr | 0.8fr` | Left: the map (nave). Right: list (aisle). |
| Conferences index | `1.35fr | 0.65fr` | Left: featured + list. Right: sticky chapel-sidebar. |
| Conference detail | `1.6fr | 0.4fr` | Center: pentaptych. Right: compact map chip. |
| Submit | `0.4fr | 1.6fr` | Left: narrow guidance tower. Right: full form nave. |
| About / What Is / Safety | single column + peripheral "chapel" cards | Processional |

The "North Tower" column is **always taller** than the "South Tower" — give it 10–20% more vertical content or padding. The asymmetry must be *seen*, not just declared.

### Visual tower cap

At the top of the dominant column on home: a tiny gilt crown motif (2rem, SVG, stroke-only) — a nod to the 1666 crown still on the North Tower. Used once. Unannounced.

---

## 6 · Portal Compression — you actually enter

Currently the hero starts at full `site-shell-wide` width and full volume. There's no threshold.

### New home-page opening sequence

```
[ StarryCanopy — full bleed ]
     ↓
[ Filigree rule ]
     ↓
[ PortalFrame ]  ← 620px max-width, ashlar ground, tall ogee-capped mask
  " For whoever needs it. "          ← small-caps serif, crimson
  HUBYPAA.                            ← display, brick-deep
  Mapped like somebody meant it.      ← gilt-shadow, serif italic
     ↓
[ Filigree rule ]
     ↓
[ The nave opens — full site-shell-wide ]
  [ Tower asymmetry: stats | map ]
```

The `PortalFrame` is a ~5rem-tall band, narrower than the rest of the page, with a subtle pointed-arch-cap SVG mask at the top edge — you read "through a doorway" into the wider content. **This is the single clearest architectural gesture on the page.** It's the only place on the site where the container gets narrower before it gets wider.

CSS:
```css
.portal-frame {
  width: min(100% - 2rem, 38rem);
  margin-inline: auto;
  padding: clamp(3rem, 6vw, 5rem) 1.5rem;
  mask-image: url("/portal-arch.svg");
  mask-size: 100% 100%;
}
```

---

## 7 · Stained Glass Light Events

Light is orchestrated, not uniform. Five places the stained-glass palette appears — and nowhere else:

1. **Featured pentaptych**: ruby radial behind center panel
2. **Primary CTA focus ring**: amber halo (`0 0 0 6px rgba(196,138,26,0.35)`)
3. **Active map marker**: jewel-tone glow matching its content family (meetings = cobalt, conferences = ruby, featured = amber)
4. **Hover wipe on enriched chapel cards**: a 400ms cobalt → transparent gradient sweeps from top-left on first hover
5. **Error page**: violet glass gradient canopy behind the 404 figure — a rare chapel

Jewel tones never appear as flat fills. They only appear as **gradients, glows, or sweeps**.

---

## 8 · Historical Layering

Not everything on the site is the same age. The basilica holds 13th–19th century work in the same frame. The site should too.

### Age strata

| Zone | "Era" | Treatment |
|---|---|---|
| Current/featured conferences | Matejko restoration (freshly polychromed) | Full saturation, strongest gilt, densest ornament |
| This-month meetings list | High Gothic (functional, structural) | Clean ashlar, minimal ornament, crisp rules |
| Past conferences archive | Weathered / side chapels | Saturation dropped 30%, colors pushed toward sepia, slight grain texture overlay |
| About / What Is YPAA copy | Inscribed stone (timeless) | Small-caps kicker, wider tracking, no polychrome, `ashlar-deep` ground |
| Submit / admin-facing | Workshop floor (utilitarian) | Brick gutter, plain form fields, stripped ornament |
| Safety page | Guardian Angels chapel | Warmer, softer — ochre + ivory + soft emerald, more protective than authoritative |

### Archive weathering

Archive content blocks get a CSS filter that's genuinely visible:

```css
.archive-panel {
  filter: saturate(0.72) sepia(0.06) brightness(0.97);
}
```

And a faint `rgba(140, 122, 102, 0.04)` paper-grain SVG overlay via `::before`. The page should *show* that these items are older.

---

## 9 · Typography — carved, not typed

The current system uses Palatino and tight tracking. Fine, but it doesn't **do** anything. The revolution adds deliberate typographic moves:

### Type roles

| Role | Stack | Treatment |
|---|---|---|
| `display` | Cormorant Garamond (new) → Palatino → serif | Display titles. High-contrast serif with carved feel. Weight 600. Tracking `-0.04em`. Line-height `0.88`. |
| `inscription` | Same family, 500 weight, SMALL CAPS, tracking `0.18em` | Kickers, meta labels, monumental short phrases |
| `prose` | Iowan Old Style → Palatino → serif | Long-form reading (about, what-is-ypaa) |
| `body` | Avenir Next → system sans | UI, forms, lists |
| `mono` | SF Mono → ui-monospace | Stat numerals, timestamps, source ids |

Cormorant Garamond (self-hosted, 2 weights) is the one font swap. It has the stone-carved feel Palatino implies but never quite delivers.

### Display title program

Every `page-title` now has three layers:

```
[ small-caps crimson kicker ]         ← tracking 0.18em, 0.78rem
[ DISPLAY TITLE ]                     ← Cormorant 600, clamp(3rem, 8vw, 6.5rem)
[ gilt-italic subtitle ]              ← italic, color gilt-shadow, 1.2rem
```

### Drop caps on prose pages

On `/about`, `/what-is-ypaa`, and conference-detail body copy: the first paragraph opens with a **4-line drop cap** in Cormorant 600, color `crimson`, with a thin `gilt` inner line along its right edge — the illuminated initial. Once per page, only on prose pages.

### Stat numerals

Current stats use gilt color — good. But set them in **Cormorant italic 500** at a *larger* size with the label beneath in tracked small-caps. Numerals should feel inscribed, not dashboarded.

### Selection color

```css
::selection { background: rgba(220,177,58,0.32); color: var(--color-ink); }
```

Selected text catches gilt light. Small touch, huge.

---

## 10 · The Site Chrome

### 10.1 Header

- Ground: `brick-deep` — not parchment, not glass. The header is the **brick base** of the towers.
- Logo: "HUBYPAA" in Cormorant 600, `ashlar-lit` color, tracked `-0.02em`. A tiny gilt 8-point star replaces the dot on the "I" — no, HUBYPAA has no I. Replace the period: a gilt star instead of a full stop.
- Nav links: `ashlar-deep` default, `gilt` on hover, `ivory` when active, with a 1px `gilt` underline on active.
- Height: 4.5rem desktop, 4rem mobile. A thin 1px `gilt-shadow` line at the bottom — the cornice.
- **Two asymmetric crown motifs** flanking the logo — tiny SVG nods to the Gothic spire (left) and Renaissance dome (right). 14px. Nobody will notice; everyone will feel.

### 10.2 Footer — the nave floor

- Ground: `debnik` — actual black marble
- Top band: 3rem `linden` shelf with gilt inscriptional text — "HUBYPAA · a directory kept by hand · est. 2026"
- Middle band: three columns of footer links in `ashlar-lit` small-caps, tracked `0.12em`
- Bottom band: 2rem `brick-deep` strip with a centered gilt 8-point star and attribution in `mortar` color
- Full-width filigree rule at the top of the footer, separating content from floor
- No logos. No social icons as chips. The footer is a floor — dense, grounded, inscribed.

### 10.3 Mobile bottom bar

Keep it dark, but shift the ground from `#1a2744` to real `lapis` (`#1e2a78`). Active tab: gilt star icon, `gilt-lit` label. The bar's top edge gets the filigree rule as a 1px ornament.

### 10.4 Mobile nav overlay

Ground: `ground` (lime-wash). Top: a 4rem StarryRibbon. Nav links: full-width Tier-2 chapel cards with heraldic glyph left and label in Cormorant. Active link: `crimson` ground, `ivory` text, gilt rule underline.

---

## 11 · Page-by-page blueprints

### 11.1 Home — `/`

```
┌── StarryCanopy (full bleed, 18rem) ──┐
│  ✦    ✦  ✦       ✦   ✦    ✦     ✦   │
│      ✦      ✦          ✦     ✦       │
└───────[ gilt filigree rule ]─────────┘
               PORTAL
        ⸻ for whoever needs it ⸻
               HUBYPAA✦
          mapped like somebody meant it
        ⸻ [ gilt filigree rule ] ⸻

┌─── North Tower (0.62fr) ─┬─── Nave (1.38fr) ───────┐
│                           │                          │
│  [ Stat pentaptych ]      │  [ Dataset pentaptych ]  │
│   Rooms · Events · States │   Overview | Meetings |  │
│   (stellar-vault corners) │   Conferences            │
│                           │                          │
│  [ Primary action stack ] │  [ MAP — 42rem tall ]    │
│   ▸ OPEN MEETINGS         │   Jewel-tone markers     │
│   ▸ see conferences       │                          │
│   ▸ submit a fix          │  [ MapDetailPanel        │
│                           │    with ruby halo when   │
│  [ "Use it like this"     │    featured marker sel.] │
│    chapel triptych ]      │                          │
│                           │                          │
└───────────────────────────┴──────────────────────────┘

[ gilt filigree rule ]

┌── FEATURED ALTAR — Pentaptych ──────────────────────┐
│  ▸ this month's altar                                │
│ ┌─wing─┬──────── CENTRAL ──────────┬─────wing──────┐ │
│ │ Date │  CONFERENCE TITLE          │  RSVP CTA     │ │
│ │ City │  gilt serif, ruby halo     │  gilt-on-vault│ │
│ └──────┴───────────────────────────┴───────────────┘ │
│  [ linden predella — host · committee · source ]     │
└──────────────────────────────────────────────────────┘

[ gilt filigree rule ]

"Use it like this" triad — three Tier-2 chapel cards
with heraldic glyphs, ashlar ground, polychrome field

[ Footer — debnik floor ]
```

### 11.2 Meetings — `/meetings`

The **most disciplined** page. Gothic structural, not polychromed.

- Portal: single-line page title, no subtitle, filigree rule above
- Grid: `1.2fr | 0.8fr` — map dominates
- Map: framed in a `debnik` 2px iron-grille border
- List sidebar: plain ashlar, sharp rules between items, active item gets a `glass-cobalt` left rail (4px)
- Filter chips: ashlar ground, `iron` border, active state `emerald` ground / `ivory` text (meetings = emerald in the polychrome)
- No featured card, no pentaptych, no stars
- One micro-ornament: the page title kicker uses the meetings shield glyph

### 11.3 Conferences — `/conferences`

More interior richness. The featured item is the pentaptych (see §3). Below it:

- "Upcoming" grid — Tier 2 chapel cards, 3-column, each card a different chapel ethos:
  - Card 1: ochre underpainting
  - Card 2: emerald underpainting
  - Card 3: carnation underpainting
  - Rotating through the polychrome palette (NOT every card the same)
- "Archive" section — weathered treatment (§8), single-column dense list, sepia-shifted
- Filigree rule between upcoming and archive — a real threshold

### 11.4 Conference detail — `/conferences/[slug]`

The ceremonial page. You are standing before the altar.

- Portal: crimson kicker (`{{city}} · {{date}}`), Cormorant display title, gilt-italic subtitle
- Below portal: the pentaptych again but **at full scale** — fills the nave, becomes the page's body
- Right sidebar (0.4fr): compact map chip in `debnik` frame, "how to get there" linden panel, "source" predella
- Body text: drop cap on first paragraph, prose type stack, wide leading
- Footer of the content: a gilt 8-point star centered above the rule — the altar's own finial

### 11.5 About / What Is YPAA

Inscribed stone. Quiet. Prose-dominant.

- Ground: `ashlar-deep` (warmer, older)
- Portal: all-caps small-caps kicker, Cormorant title, no subtitle
- Body: single column, `prose` type stack, drop cap, wide leading (1.78)
- Principles: 4–6 "chapel" cards in a 2-column grid, each with a different polychrome underpainting + a heraldic glyph
- No map, no CTAs, no big buttons. This is reading space.

### 11.6 Safety

The Guardian Angels chapel. Protective tone.

- Ground: warmer `ashlar-lit`, ivory panel
- Crisis resource cards: Tier 3 treatment but in ochre + ivory (not lapis + gilt) — safety's color is warm, not sacred
- Phone numbers: Cormorant italic 600, underline in `crimson`
- No stars, no altar — this is a chapel of care, not ceremony

### 11.7 Submit

Workshop floor. Utilitarian but dignified.

- Ground: `ground` with subtle brick-rhythm vertical stripes at 3% opacity (the workshop's brick wall)
- Left guidance column: narrow tower, `linden` accents, "what makes a good submission" as inscriptional small-caps list
- Right form: wide, ashlar-raised panel, iron-border inputs, crimson `:focus` ring
- Submit button: brick-deep primary action with gilt underline on hover
- Success state: emerald flash with a single gilt star appearing above the form — earned, not celebrated

### 11.8 404 / Error

The rare chapel. Violet glass.

- Ground: `lapis-deep`
- Canopy: `glass-violet` gradient
- Centered: a single gilt 8-point star, 5rem, slightly tilted
- Message: Cormorant italic, `ivory`, short: *"this passage is closed."*
- Action: `ashlar` secondary button, `gilt` hover — "return to the nave"

---

## 12 · Component-by-component re-spec

### 12.1 `.panel` family

Four surfaces, distinct materials:

| Class | Material | Use |
|---|---|---|
| `.panel` | Ashlar | Default card — most surfaces |
| `.panel-raised` | Limestone with limestone-deep bottom | Slight elevation |
| `.panel-linden` | Linden wood + gilt inner rule | Enriched chapel cards |
| `.panel-vault` | Lapis + gilt corner stars + ruby radial | **Reserved for pentaptych only** |
| `.panel-brick` | Brick + mortar micro-pattern | Header/footer inlays, submit gutter |
| `.panel-debnik` | Dębnik black + ivory text | Footer top band, grille frames |
| `.panel-archive` | Ashlar-deep + weathering filter | Archive content |

All panels keep the same radius system and padding rhythm — the grammar holds; the material changes.

### 12.2 Buttons

- `.action` — primary. Brick-deep ground, ivory text, gilt 1px inner inline-shadow, no rounded pill (use `radius-md` for carved feel). Hover: `brick`, gilt-lit glow. Active: inset 1px debnik.
- `.action-secondary` — ashlar ground, iron border, ink text. Hover: ashlar-lit, crimson border.
- `.action-quiet` — transparent, ink text, gilt-shadow underline on hover only.
- `.action-altar` — only on the pentaptych: gilt ground, lapis-deep text, debnik 1px outer border, gilt-lit halo on hover. Used once per page max.

### 12.3 Chips

- Ground: ashlar
- Border: `iron` 1px
- Letter tracking: `0.1em`, small-caps
- Active state **varies by content family**:
  - Meetings: `emerald` ground, ivory text
  - Conferences: `crimson` ground, ivory text
  - Featured/Overview: `lapis` ground, gilt text
  - Neutral: `linden` ground, ivory text

The chips are the clearest place the polychrome hierarchy reads: different content types, different painted colors, same architectural grammar.

### 12.4 Form fields

- Ground: `ivory` (the banner's own ground)
- Border: `iron` 1px
- Radius: `radius-sm` (carved, not pillowy)
- Focus: 1px `crimson` border + 4px `gilt` 0.22-opacity ring (amber stained glass)
- Placeholder: `faint` italic
- Error: `glass-ruby` border + 2px inset shadow in `crimson-deep`

### 12.5 List items

- Base: ashlar ground, `iron` 1px bottom rule
- Hover: `ashlar-lit` ground, `gilt-shadow` text shift
- Active: 4px left rail in content-family color (cobalt/ruby/emerald), `linden` ground wash

### 12.6 Map markers

- Neutral marker: ashlar fill, debnik border, 1.2rem
- Meetings: emerald fill with cobalt glow halo
- Conferences: crimson fill with ruby glow halo
- Featured: gilt 8-point star, 1.6rem, ruby+amber pulsing halo
- Selected: halo doubles in radius and animates a 2.4s opacity breath

Marker colors **match their chip colors**. The site's color logic is coherent across map and UI.

### 12.7 Scrollbars

```css
* {
  scrollbar-color: var(--color-linden) transparent;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--color-linden), var(--color-linden-deep));
  border-radius: 2px;
}
```

A carved-wood scrollbar. You touch it and feel the altarpiece.

### 12.8 Focus rings

Global `:focus-visible` ring becomes `outline: 2px solid var(--color-gilt-lit); outline-offset: 3px; border-radius: inherit;` plus a 6px `rgba(196,138,26,0.22)` box-shadow — the amber stained-glass halo on every focused element. Accessibility and atmosphere at once.

---

## 13 · Motion

The current site has `fade-in`, `rise-in`, `stagger-in`. Keep them but add:

### 13.1 `star-twinkle`

A 10% subset of canopy stars animate a 3s opacity + scale breathing cycle, staggered by `--i * 0.1s`. Randomized per star.

### 13.2 `candle-flicker`

The gilt halo behind the primary CTA breathes at 4s, 4–8% intensity swing. You don't consciously see it; you feel the room is warm.

### 13.3 `portal-reveal`

On first-paint of the home page: StarryCanopy fades in over 800ms with stars appearing staggered 40ms apart, then the PortalFrame rises from 20px below + mask sweeps open over 600ms, then the nave grid stagger-ins. Total ~1.6s of ceremony. `prefers-reduced-motion` collapses it to 200ms opacity.

### 13.4 `archive-settle`

Archive panels' weathering filter animates in slightly slower (900ms saturation 1.0 → 0.72) — they "age" as they enter.

### 13.5 No hover wiggles

No cards that bounce on hover. No buttons that rotate. The basilica is still. Movement earns itself: light shifts, halos breathe, reveals unfold. Everything else is rock.

---

## 14 · Minute details — the earned touches

These are the "nobody will notice; everyone will feel" moves.

1. **The star-period.** Replace the `.` in the logo's "HUBYPAA." with a 0.7em gilt 8-point star SVG. The logo now has a tiny altar in it.
2. **Initial drop caps on prose** — illuminated, crimson + gilt inner edge.
3. **Footer inscription** in Cormorant italic small-caps on the linden band — Latin-*free*, English, plainspoken: *"a directory kept by hand · for whoever needs it · est. 2026"*
4. **Cursor change** on interactive altar elements (pentaptych CTA only) — a custom cursor with a tiny gilt reticle. Once per page.
5. **Map attribution** reset to Cormorant italic small at 0.68rem in `mortar` color. Even the legal text is set intentionally.
6. **Page transition**: on route change, a 200ms gilt filigree rule sweeps across the viewport top-to-bottom — a "curtain between chapels."
7. **Scroll progress**: a 2px gilt hairline at the very top of the viewport shows scroll depth. Always present, never announced.
8. **Section-kicker glyphs** vary by page family (see §4.2) — five total, deployed consistently.
9. **Filter chip "all" state**: instead of a generic "all" chip, the neutral state shows a small heraldic shield glyph with no label. Quieter and more carved than "All Meetings."
10. **Empty states**: a single centered gilt star + Cormorant italic sentence. No illustrations. No emoji. A lit candle in an empty chapel.
11. **Loading states**: a 3-second looped "star-twinkle" of 5 randomized gilt stars in a 240×60 band. Replaces spinners entirely.
12. **Timestamps** in Cormorant mono-numerals + small-caps AM/PM: *7:30 <span class=sc>pm</span>*. No `19:30`; no `7:30 PM` caps.
13. **Hover on featured map marker** triggers a 600ms ruby-halo breath and a faint amber gilt glow at the center. The altar catches light when you look.
14. **Quotes and testimonials** (if/when added) set in Cormorant italic, `burgundy` color, with a crimson opening quote at 2.4× body size, no closing quote.
15. **Rules between meta items** (e.g., "city · day · format") use a gilt 3×3 diamond glyph instead of `·`. Carved pip, not midpoint.
16. **Error field messages** begin with a tiny `glass-ruby` shield glyph, not an icon font warning triangle.
17. **Success state flash** on submit: a single 8-point gilt star rises from the submit button over 900ms, fades at y=-40px. One-time ceremony. No confetti, no checkmark balloon.
18. **Select/input placeholder** in Cormorant italic `faint`. Even the absence of content is set intentionally.
19. **Navigation underline** is not a straight line — it's the filigree rule in miniature, 2rem wide, visible on active and on hover.
20. **Body scroll-linked**: the StarryRibbon at the top of secondary pages desaturates from lapis → lapis-deep over the first 60vh of scroll. You *descend* into the nave.

---

## 15 · What dies

Explicit killswitches — these ship out:

- `rgba(240, 235, 228, 0.82)` glass header
- The verdigris-green accent as primary action color
- The 50/50-ish hero split
- All identical-looking warm parchment cards
- The pill-shaped chip aesthetic (too SaaS)
- Current `.panel-vault` (replaced with the real pentaptych)
- Plain horizontal gradient `.rule`
- The "section-kicker" as a dotted pill — replaced by heraldic glyph + small-caps text with no pill
- The top-of-body dot-grid background (replaced by the StarryCanopy / StarryRibbon system)
- Generic "All · Upcoming · Past" text chips — replaced by heraldic state
- Blue-black body text — replaced by warm `#1a1410` ink
- All `rgba(60, 42, 28, 0.08)` beige borders — replaced by either `iron` 1px or `gilt-shadow` 1px depending on tier

---

## 16 · Implementation order

Ship in this order. Each stage is **independently visible**.

1. **Stage 1 — The Palette Revolt** *(highest ROI, lowest risk)*
   - Replace every color token in `globals.css` per §1
   - Swap `ink` to warm, `ground` to lime-wash, `vault` to real lapis, `gilt` brighter
   - Demote verdigris
   - Introduce brick, polychrome, stained glass, altar materials
   - The site will look *different* on every route the moment this ships, even with zero layout changes

2. **Stage 2 — The Chrome**
   - Header: brick-deep ground, star-period logo, gilt cornice
   - Footer: debnik floor, linden shelf, gilt inscription
   - Mobile bottom bar: real lapis, filigree top
   - Mobile overlay: StarryRibbon + Tier-2 nav cards

3. **Stage 3 — The Starry Canopy + Portal**
   - Ship `<StarryCanopy />` component
   - Ship `<StarryRibbon />` for secondary pages
   - Ship `<PortalFrame />` with ogee mask
   - Ship gilt filigree rule component
   - Retire old `.rule` and `body::before`

4. **Stage 4 — The Pentaptych**
   - Build `<FeaturedAltar />` component
   - Plug into home + conferences index
   - Retire current `.panel-vault`

5. **Stage 5 — Typography Upgrade**
   - Self-host Cormorant Garamond 500 + 600
   - Introduce `display` / `inscription` / `prose` / `body` / `mono` roles
   - Drop caps on prose pages
   - Stat numerals re-set

6. **Stage 6 — Ornament Tiers**
   - Geometric field pattern SVG
   - 5 heraldic glyphs
   - Stellar vault corner motif
   - Apply Tier 2 treatments to enriched cards and section headers

7. **Stage 7 — Tower Asymmetry + Layouts**
   - New grid ratios per §5
   - Visual tower-cap on home
   - Asymmetric chapel-card rhythm on conferences

8. **Stage 8 — Stained Glass Events**
   - Ruby halo on pentaptych
   - Amber focus ring
   - Jewel-tone marker halos
   - Cobalt hover wipe
   - Violet 404 canopy

9. **Stage 9 — Historical Layering**
   - Archive weathering filter
   - Per-page era treatments
   - Safety page warmth recalibration

10. **Stage 10 — Micro-details**
    - Star-period logo
    - Filigree divider glyphs in meta rows
    - Custom cursor on altar CTA
    - Page-transition filigree sweep
    - Scroll-progress hairline
    - Loading star-twinkles
    - All 20 earned touches from §14

---

## 17 · Acceptance — how we know it landed

The revolution has shipped when, on first load, a new visitor can say:

- [ ] "That's **red**, not beige." (palette revolt visible)
- [ ] "I just walked under a **ceiling of stars**." (StarryCanopy)
- [ ] "I went **through a doorway** to get here." (PortalFrame)
- [ ] "The featured thing looks like an **altarpiece**, not a card." (Pentaptych)
- [ ] "The towers are **different heights** on purpose." (Asymmetry)
- [ ] "Different sections feel like **different ages**." (Historical layering)
- [ ] "Colored light catches the buttons when I touch them." (Stained glass events)
- [ ] "The type looks **carved**." (Cormorant + inscription kickers + drop caps)
- [ ] "The footer is the **floor** of the building." (Debnik)
- [ ] "Every meeting/conference color is its own **painted chapel**." (Polychrome hierarchy)

And when a returning user can say: **"They didn't redecorate; they rebuilt it."**

---

## 18 · What this is not

- Not Catholic. Not religious. Not cathedral-themed-dating-app. The basilica is a **formal reference**, not a spiritual claim. No crosses, no saints, no prayer text. YPAA stays YPAA.
- Not medieval cosplay. No blackletter fonts, no parchment backgrounds with burn marks, no illuminated-manuscript borders. The references are **structural**, not costumed.
- Not maximalist everywhere. The ornament system's whole point is that **80% of the surface is plain ashlar**. The altarpiece is loud because the walls are quiet.
- Not fragile. All motion has a reduced-motion path. All color pairs pass WCAG AA. All heraldic glyphs have `aria-hidden` with text alternatives. The building is accessible from the Main Market Square.

---

## 19 · Closing

The current site got the brief *spiritually* — warm tones, serif type, gold accents, dark footer-ish treatment. But it stopped at the gift-shop version. Mariacki isn't a gift shop. It's a red brick tower, a lapis ceiling, a carved altar, a marble gate, and seven centuries of people adding the thing they thought was missing.

This site should be the same: something added to by hand, with a clear structural grammar, a focal terminus, and enough saturated color to be unmistakable at a glance.

Build the red. Build the blue. Build the gold. Build the door you walk through. Then light the candles.
