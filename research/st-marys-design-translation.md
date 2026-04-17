# St. Mary's Basilica — Design System Translation

How the basilica's architectural principles become a web design system.

---

## 1. Architecture → Layout

### Basilica Principle
Three-aisle basilica with dominant central nave (28m), lower side aisles, and peripheral chapels. Strong axial procession from entry to altar.

### Web Translation
- **Central content column** is the dominant visual element — wider, more prominent, carrying primary content
- **Sidebars and secondary columns** are lower in visual weight — supporting, contextual, narrower
- **Page sections** follow processional logic — a clear entry, a dominant middle, and a resolving conclusion
- **Max-width container** acts as the building's footprint — everything lives inside the structural volume
- **Asymmetric grid ratios** (not 50/50 splits) — one column leads, one supports, echoing the taller nave flanked by lower aisles

### Specific Tokens
- Site max-width remains ~88rem (the building's footprint)
- Primary grids use unequal columns: `1.15fr | 0.85fr` or `1fr | 0.75fr`
- Vertical spacing between sections is generous — "processional pause" between zones

---

## 2. Materials → Color / Texture / Depth System

### Basilica Materials
| Material | Visual Quality |
|----------|---------------|
| Red-warm brick | Warm, tactile, rhythmic, load-bearing |
| Limestone/sandstone ashlar | Pale, precise, articulating |
| Lapis lazuli vault | Deep celestial blue, absorbing |
| Gold leaf | Warm illumination, focal highlight |
| Black Debnik marble | Dense, formal, grounding |
| Copper/verdigris | Oxidized green-blue, aged patina |
| Linden wood | Warm medium brown, carved |
| Bronze/iron | Dark metallic, structural |
| Stained glass | Saturated jewel colors in light |

### Web Color Palette

**Structural / Exterior (the "brick and stone" family):**
- `ground`: `#f0ebe4` — warm parchment/lime wash (was cold green-gray)
- `panel`: `#faf8f5` — pale limestone panel surface
- `raised`: `#f5f1ec` — warmer limestone, slightly elevated
- `raised-strong`: `#ebe5dc` — sandstone warmth

**Interior / Deep (the "vault and nave" family):**
- `vault`: `#1a2744` — deep nave blue (Matejko's ceiling, almost black-blue)
- `vault-mid`: `#243356` — mid celestial blue
- `celestial`: `#2d4a7a` — brighter stained-glass blue
- `celestial-soft`: `#3a6098` — lighter blue for accents

**Focal / Warm (the "gold and altar" family):**
- `gold`: `#c8a44e` — controlled brass/gold highlight
- `gold-soft`: `#d4b76a` — lighter gold for softer use
- `warm`: `#c2673e` — brick/terracotta warm accent (conferences)
- `warm-soft`: `#d4835e` — lighter warm

**Metallic / Structural (the "iron and marble" family):**
- `ink`: `#1e2a38` — near-black with blue undertone (dark oak / marble)
- `muted`: `#5c6672` — weathered stone gray
- `faint`: `#8a9199` — aged inscription gray
- `rule`: `#d2cbc2` — warm stone border

**Functional:**
- `accent`: `#2d6b5e` — verdigris/oxidized copper (primary action)
- `accent-soft`: `#246054` — deeper verdigris
- `signal`: `#2d4a7a` — celestial blue (meetings)
- `danger`: `#a84238` — brick-red error

**Key shift from current:** The entire palette moves from cool green-gray to warm limestone/brick/blue-gold. The ground is warmer. The accents are deeper. The contrast model is "warm stone exterior, deep blue-gold interior."

---

## 3. Procession → Scroll Rhythm

### Basilica Principle
Entry portal → nave expansion → lateral chapel awareness → chancel narrowing → altarpiece arrival. Pauses at each threshold.

### Web Translation
Every page should have:
1. **Portal zone** — page header area with strong visual threshold (kicker + title + intro). This is the compressed entry moment.
2. **Nave zone** — primary content area. Spacious, vertically generous, the main event.
3. **Chapel moments** — secondary panels, sidebar content, supporting cards. Smaller, contained, individually characterized.
4. **Altar zone** — the featured/primary focal element on the page. Maximum visual investment.
5. **Exit zone** — clean conclusion before the footer.

### Specific Rhythm
- Section spacing: generous `clamp(4rem, 8vw, 8rem)` between major zones
- Threshold markers: decorative rules or gradient shifts between sections
- First section after header: always a strong "arrival" moment
- Featured content: surrounded by extra breathing room

---

## 4. Focal Altar Logic → Hero and CTA Hierarchy

### Basilica Principle
The Veit Stoss altarpiece is the absolute spatial terminus. Everything in the building — axis, vault, light, narrowing chancel — points to this single object. It concentrates maximum material richness where attention is maximum.

### Web Translation
- **One primary focal element per page** — the hero, the featured card, the key CTA. This element gets the richest visual treatment.
- **Featured conference cards** are "altar objects" — they get deep color, gold accents, stronger shadows, more visual density
- **Hero sections** are "chancel zones" — where the design system reveals its richest layer
- **CTAs in focal zones** get the strongest button treatment — not every button is primary
- The rest of the page "points toward" the focal element through visual weight, spacing, and hierarchy

### Specific Application
- Featured cards: deep vault-blue background, gold text accents, stronger shadows
- Hero titles: largest type, most typographic investment
- Primary CTAs: verdigris/gold treatment, glow, lift
- Secondary content: stone/parchment tones, quieter treatment

---

## 5. Tower Asymmetry → Composition Strategy

### Basilica Principle
North tower (82m, Gothic spire) and south tower (69m, Renaissance dome) are different in height, era, and crown — but share the same brick base and proportional relationship. Equilibrium without symmetry.

### Web Translation
- **Two-column layouts are deliberately unequal** — one column is the "tall tower" (dominant) and one is the "short tower" (supporting)
- **Grid ratios should not be 50/50** — use `1.15fr | 0.85fr` or `0.9fr | 1.1fr`
- **Sticky sidebars** are one "tower" grounded while the other scrolls
- **Map/content splits** let one side anchor and the other move
- **Visual weight can be asymmetric** — a large card paired with two smaller ones, a heavy title paired with lighter body text

This prevents the static, corporate feel of perfectly balanced layouts.

---

## 6. Stained Glass → Accent / Light Treatment

### Basilica Principle
Stained glass does not illuminate — it transforms light into color events. Different windows create different atmospheric zones.

### Web Translation
- **Accent colors are light events, not background fills** — they appear in focused moments: active states, hover glows, selected markers, focus rings
- **The "stained glass" colors** (deep blue, amber gold, warm terracotta, verdigris green) appear as controlled accent moments, not as large background areas
- **Gradients** should feel like light moving through colored glass — subtle, warm-to-cool transitions, not flat bands
- **Active/selected states** glow from within — like light catching a stained-glass panel
- **Map markers** use jewel-tone colors that "light up" against the neutral map surface

---

## 7. Polychrome Density → Component Ornament Policy

### Basilica Principle
Matejko's polychrome covers all walls — but with hierarchy. Geometric patterns form the field, with figurative/heraldic elements as focal moments. Dense but not chaotic because of internal order.

### Web Translation
**Ornament is earned, not default.** Three tiers:

| Tier | Where | Treatment |
|------|-------|-----------|
| **Structural** | Most cards, lists, form fields, nav items | Clean stone/parchment surfaces. Subtle borders. No decorative gradients. Let the content breathe. |
| **Enriched** | Featured cards, hero panels, section headers, active states | Deeper colors, subtle gradient overlays, controlled shadows, gold accent touches |
| **Focal** | The one "altar" element per page — hero, featured conference, key CTA | Deep vault blue, gold highlights, strongest shadows, richest typography, maximum visual investment |

**Most of the site lives in Tier 1.** Tier 2 appears a few times per page. Tier 3 appears once per page at most.

---

## 8. Threshold / Portal Logic → Section Transitions

### Basilica Principle
The portal (compressed, articulated) separates the open square from the vast interior. Every doorway is a moment.

### Web Translation
- **Section dividers** are not just horizontal rules — they are "portals" marking passage between zones
- Use subtle gradient shifts, warm-to-cool color transitions, or decorative rule elements between major sections
- **Page header zones** (kicker + title + intro) are the "portal" — compressed, dense with information, before the page opens up
- **The header bar itself** is the ultimate threshold — separating "outside the page" from "inside the content"
- Transitions should feel deliberate, not accidental

---

## 9. Chapel Logic → Sub-Panels / Side Content / Nested Moments

### Basilica Principle
Each chapel is its own small world — different patron, different date, different style — but contained within the same architectural grammar. The walls and arches hold them together.

### Web Translation
- **Cards and sub-panels** can have individual character (different accent colors for meetings vs conferences, different internal layouts for different content types) **while sharing the same structural grammar** (same radius system, same padding rhythm, same border treatment)
- **Side content** (safety cards, data quality notes, floating notes) is like a chapel — smaller, secondary, but cared for
- **The panel system** provides the "architectural grammar" — all cards share structural properties but can vary in surface treatment
- **Archive sections, past conference grids, and secondary lists** are the "side aisles" — lower visual ceiling, quieter treatment

---

## 10. Celestial Ceiling → Controlled High-Impact Background

### Basilica Principle
The vault blue-and-gold treatment transforms a structural surface (ceiling) into an experiential surface (sky). It uses one bold move (deep blue + gold stars) applied to one surface (the vault) — not everywhere.

### Web Translation
- **One background treatment per page** can carry deep color/atmosphere — typically the hero or featured zone
- **The deep vault blue** (`#1a2744`) should be used sparingly — as a featured card background, a hero canopy, or a detail panel backdrop
- **Gold accents** on dark backgrounds create the "star" effect — small, bright, warm moments on deep cool fields
- **Do NOT paint every section deep blue** — the power of the vault comes from contrast with the stone walls. Most of the page should be warm parchment/limestone.
- **The footer** can use a darker treatment — like the nave floor, the ground plane that the building rests on

---

## 11. Public Square vs Interior → Shell vs Immersion Model

### Basilica Principle
Outside: bright, open, civic, horizontal. Inside: dim, vertical, enclosed, sacred. The transition is the most powerful moment.

### Web Translation
- **The site chrome** (header, footer, nav) is the "exterior" — structurally clean, warm stone/brick tones, disciplined, civic
- **Page content zones** are the "interior" — progressively richer as you scroll deeper into the page
- **Homepage** should have the strongest threshold experience — the page header is the square, and the hero/map zone is stepping inside
- **Functional pages** (Meetings, Submit) stay more "exterior" — practical, well-lit, clear
- **Rich pages** (Home hero, Conference detail, featured sections) reveal the "interior" — deeper color, richer treatment
- **The scroll itself is the act of entering** — the further you go, the more the design reveals

---

## Typography Translation

### Basilica References
- Carved stone inscriptions: precise, permanent, structured
- Matejko's painted prayer texts: formal, integrated into decoration
- Heraldic lettering: bold, symbolic, authoritative

### Web Typography
- **Display / Serif:** Should feel carved, not typed. Classical proportions, strong contrast between thick and thin strokes. Slightly condensed tracking.
- **Body / Sans:** Should feel inscribed — clean, precise, readable at sustained reading lengths. Not cold tech-sans; something with slight humanist warmth.
- **Labels / Mono:** Should feel like stone-carved captions — small, uppercase, widely tracked, formal.

Font stack strategy: Keep system fonts but shift toward more architectural character. Prioritize Palatino / Book Antiqua (more carved feel) for serif, and keep Avenir Next / system sans for body (already warm-humanist).

---

## Shadow and Depth Translation

### Basilica Reference
Interior depth comes from:
- Deep recesses in chapel arches
- The vault being far above
- Candlelight creating pools of warm light against dark stone
- Gold catching light while blue absorbs it

### Web Shadows
- **Shadows should be warmer** — shift from blue-gray shadows to warm brown-gray
- **Panels "float" like altarpiece frames** — soft, warm shadows suggesting carved-wood depth
- **Featured/focal panels** have deeper shadows — like stepping into a chapel recess
- **Standard panels** have subtle shadows — like stone blocks with natural relief
- **Active states** glow warm — like candlelight catching gold

Shadow formula shift:
- Current: `rgba(17, 35, 56, ...)` (blue-gray)
- New: `rgba(60, 42, 28, ...)` (warm brown)
