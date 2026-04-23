# What makes the Matejko ceiling magical

Research notes for applying the emotional/compositional principles of St. Mary's Basilica (Kościół Mariacki, Kraków) to the HUBYPAA site.

## Sources re-read for this note

- Existing: `@/research/st-marys-basilica-research.md`
- Existing: `@/research/st-marys-design-translation.md`
- [visitkrakow.com/st-marys-basilica](https://visitkrakow.com/st-marys-basilica/) — visitor-guide prose on the vault
- [inyourpocket.com/krakow/st-marys-basilica](https://www.inyourpocket.com/krakow/st-marys-basilica_17091v) — "no matter how many times you see it, it will take your breath away"
- [Wikipedia: Star-painted ceiling](https://en.wikipedia.org/wiki/Star-painted_ceiling) — the motif across 2,000+ years
- [krakow.travel — Kościół Mariacki](https://krakow.travel/en/46-krakow-kosciol-mariacki) — "a history spanning over eight centuries… star-strewn murals by Matejko"

## The six powers of the ceiling

### 1. Color contrast as light

Deep **lapis lazuli** (absorbing) + **gold leaf** (reflecting) is not a color choice — it is a light device. Against deep blue, even small amounts of gold read as **literally luminous**, not merely "bright." In candlelight this becomes literal: the gold catches every stray flame and throws it back, while the blue recedes. The ceiling looks lit even when it isn't.

> Translation: the base should stay deep. Gold accents should feel like they *emit*, not like they are *drawn*. Subtle glow, tight halos, warm-on-cool contrast — never a flat gold fill.

### 2. Ordered density, not scatter

Matejko's stars are **not randomly scattered**. They follow the Gothic vault's rib geometry — cluster at crowns, thin toward springers, align with the stone structure. The star shape is the **eight-pointed star** (cross + square overlay, the four cardinal directions + the four diagonals), descended from Islamic geometric tradition through medieval Europe. Not five-pointed, not cartoonish; eight-pointed, architectural.

> Translation: decorative stars follow a grid or the structure of the surface they're on. Eight-pointed over five-pointed when it matters. No randomly sprinkled glitter.

### 3. Architectural vaulting, not flat ceiling

The stars live on a **vault that arcs over you**. A flat blue field with gold stars is wallpaper; a curved, ribbed, crowned vault with gold stars is *sky*. The curvature turns geometry into cosmology.

> Translation: when the sky metaphor is evoked, imply the curvature. A subtle radial gradient (brighter center-upper, darkening toward the edges) reads as "looking up into a vault," even on a flat screen. Background-attachment fixed so it persists through scroll.

### 4. Hierarchy of layers

The ceiling is not one layer. It is at least five, visible simultaneously:

| Layer | Role |
|---|---|
| Lapis field | The ground, the receding depth |
| Gilt ribs | The structure, the grammar |
| Gold stars | The ornament, the rhythm |
| Painted prayer text | The meaning, the readable layer |
| Angels & heraldry | The figures, the rare focal moments |

> Translation: the UI should have distinct, visible layers. Background (field) → grid (structure) → cards (ornament) → labels (meaning) → featured hero elements (figures). Each reads at a different scale. Flattening them produces visual noise.

### 5. The up-gaze posture

You cannot see the ceiling without **looking up**. That single physical act — head back, chest open, breath slowed — is the body's posture of awe. The architecture forces the posture; the posture produces the feeling.

> Translation: the design should **pull the eye upward** on key moments. Heavy visual gravity at the bottom of the viewport, light and warmth toward the top. The hero title should feel like something you read by lifting your chin.

### 6. Orchestrated light, not uniform illumination

The vault is not flatly lit. Clerestory windows feed daylight into the upper zone. Stained glass in the chancel tints the light. The **blue absorbs** while the **gold reflects**. Candles below throw warm light *up* onto cold paint. Shadows live in the ribs; light pools on the crowns.

> Translation: avoid uniform fills. Gradients (subtle), glows (restrained), warm/cool contrast (always). The deepest blue should recede; the warmest gold should advance.

## The translated color palette (rechecked against photographs)

The current site palette is in the right zone. Small tuning:

**Lapis family (keep):**
- `--vault-blue-deep: #111B4A` — deepest vault shadow
- `--vault-blue: #1E2A78` — primary Matejko lapis, the signature
- `--vault-blue-mid: #2D3E9C` — vault catching stained-glass light
- `--vault-blue-bright: #7A8AD8` — hazy sky-blue accent, star glint

**Gilt family (nudge warmer + add a "lit" tier):**
- `--gold: #D8A845` (was `#D6A24E`) — slightly warmer for a more authentic gilt feel
- `--gold-aged: #9C7620` — shadowed / aged gilt in recess
- `--gold-lit: #F5CC68` — sun-struck gilt / candle-caught highlight (expose for halos)
- `--gilt-cream: #FFE09F` — brightest, only for focal stars / awards

**Polychrome (use sparingly, for moments):**
- `--crimson: #8A2A26` — Matejko red, heraldic polychrome
- `--ochre: #BC8A2E` — warm painted ochre, secondary heraldry
- `--emerald: #2F5D3A` — heraldic leaf green
- `--ivory: #F3E8D2` — painted flesh / banner ground

## The six moves, in product terms

1. **Hero zone = the vault apex.** Deep lapis gradient, densest star-field, warm gilt for the H1. Everything else is "below" it.
2. **Cards = chapel recesses.** Darker ground, soft gold-edged frames, brief warm glow on hover.
3. **Featured card = the altarpiece.** Richest gilt treatment, strongest contrast, positioned as a focal terminus (often at the center of a row, or visually weighted).
4. **Map = the atlas.** A functional counterpoint to the decorative sky — the readable layer. Dark ground, jewel-tone markers, gold strokes.
5. **List rows = painted text.** Ordered, readable, rhythmic. Not ornamental — they carry meaning.
6. **Dividers and rules = gilt filigree.** Thin, warm, at transitions. Never structural, always ornamental.

## What *not* to do (from the research, worth re-stating)

- Gothic pointed arches as UI shapes → costume
- Gold stars scattered randomly → cheap celestial wallpaper
- Stained glass images as page backgrounds → tourist shop
- Every section deep lapis → loses the contrast that makes the vault powerful
- Uniform gold everywhere → brass, not gilt
- Forced symmetry mimicking the church facade → rigid

The vault is **bold + disciplined**. Bold in the one move (deep blue + gold on the ceiling), disciplined in how rarely that move is repeated elsewhere.
