# HUBYPAA Redesign Plan — St. Mary's Basilica Translation

---

## Global Changes

### Color System
Replace the entire cool green-gray palette with warm limestone/brick + deep celestial blue + gold accents.

| Old Token | New Token | Hex | Rationale |
|-----------|-----------|-----|-----------|
| ground `#edf2ef` | ground `#f0ebe4` | Warm parchment/lime wash | Exterior brick-adjacent warmth |
| panel `#ffffff` | panel `#faf8f5` | Pale limestone | Stone panel surface |
| raised `#f7faf8` | raised `#f5f1ec` | Warmer limestone | Carved stone elevation |
| raised-strong `#e7efeb` | raised-strong `#ebe5dc` | Sandstone | Deeper stone warmth |
| ink `#112338` | ink `#1e2a38` | Dark nave blue-black | Oak/marble darkness |
| muted `#5e6f7b` | muted `#5c6672` | Weathered stone | Aged inscription |
| faint `#84909b` | faint `#8a9199` | Pale stone gray | Faded carving |
| rule `#d5dfe0` | rule `#d2cbc2` | Warm stone border | Limestone mortar |
| accent `#13766d` | accent `#2d6b5e` | Verdigris copper | Oxidized patina |
| signal `#1d4f72` | signal `#2d4a7a` | Celestial blue | Vault/stained-glass |
| warm `#de7247` | warm `#c2673e` | Brick terracotta | Fired brick warm |
| danger `#c05649` | danger `#a84238` | Deep brick red | Aged brick |

**New tokens added:**
- `vault`: `#1a2744` — deep interior blue for featured/focal zones
- `gold`: `#c8a44e` — brass/gold for highlights and focal accents
- `gold-soft`: `#d4b76a` — lighter gold for softer moments

### Typography
- Serif stack: Prioritize Palatino Linotype, Book Antiqua (more "carved" feel)
- Tighten letter-spacing on display type for monumental density
- Page titles: stronger weight contrast, tighter leading

### Shadows
- Shift shadow color from blue-gray `rgba(17,35,56,...)` to warm brown `rgba(60,42,28,...)`
- Increase shadow warmth globally

### Radii
- Reduce radii slightly for more architectural (less bubbly) feel
- `sm: 0.75rem`, `md: 1rem`, `lg: 1.35rem`, `xl: 1.75rem`
- Less "pill" energy, more "carved frame" energy

### Borders
- Warmer border tones: shift from ink-based to warm-brown-based opacity
- Slightly more visible borders on key structural elements

### Background
- Replace cool gradient with warm parchment gradient
- Replace dot-grid overlay with subtle brick/masonry-rhythm vertical lines
- Remove colored radial gradients from body

### Buttons
- Primary: verdigris background with gold-tinted glow
- Secondary: pale stone with warm border
- Quiet: limestone with faint border

### Panels
- `.panel`: warm limestone glass with warmer shadows
- `.panel-raised`: slight gradient suggesting carved stone relief
- `.panel-muted`: sandstone warmth
- New: `.panel-vault`: deep blue background for featured/focal panels (used sparingly)

### Header
- Warmer glass treatment (parchment tint instead of green tint)
- Nav pills: more architectural (less perfectly round)
- Logo: same "HUBYPAA" serif but with tighter tracking
- Mobile menu: warm parchment overlay instead of green-tinted glass

### Footer
- Darker treatment: vault-blue or dark stone
- Gold/warm text accents
- Feels like the "nave floor" — the ground the building rests on

### Mobile Bottom Bar
- Dark treatment (vault-toned) with warm active states
- Gold accent on active tab instead of green

---

## Route-by-Route Changes

### Home (`/`)
- Hero: "entering the basilica" — strong visual threshold
- Left panel (sticky): warmer stone treatment, gold stat accents
- Map panel: warm stone shell around map, vault-blue section kickers
- Featured conference: vault-blue background with gold title accents — the "altar object"
- Philosophy section: warm stone cards
- Meetings/Safety section: standard stone panels with enriched headers

### Meetings (`/meetings`)
- Most "civic/exterior" page — disciplined, practical
- Clean stone panels, warm filters
- Map shell: stone-frame treatment
- List sidebar: warm stone with clear hierarchy
- Chips: stone/warm instead of cool glass
- Keep this page calmer — less ornament, more precision

### Conferences (`/conferences`)
- More "interior richness" allowed
- Featured conference card: vault-blue with gold
- Map sidebar: warm stone frame
- Archive section: quieter sandstone treatment (like side chapels)

### Conference Detail (`/conferences/[slug]`)
- Ceremonial and focused — "standing before the altar"
- Main panel: strong raised treatment
- Title: maximum typographic investment
- Date/Location boxes: warm stone muted panels
- Action buttons: verdigris primary with gold glow
- Map sidebar: stone frame with warm detail panel

### About / What Is YPAA / Safety
- Strong portal entry (title zone) then processional sections
- About: principles cards as "chapel" moments
- Safety: extra clarity — warm stone, prominent crisis resource cards
- What Is YPAA: warm panels, clear Q&A hierarchy

### Submit
- Welcoming and formal
- Left guidance panel: warm stone
- Right form panel: raised stone with clear field hierarchy
- Form fields: warm tint, visible focus states
- Submit button: strong verdigris with gold glow

### Error Pages
- Centered vault-toned panel with warm stone accents
- Clear, dignified

---

## Components to Rebuild (in globals.css)

1. Color tokens (complete replacement)
2. Shadow system (warm shift)
3. Radius system (reduce)
4. Background treatment (warm gradient + pattern)
5. `.panel` family (warm stone)
6. `.panel-vault` (new — deep blue focal)
7. `.action-*` buttons (verdigris + gold)
8. `.chip` (warm stone)
9. `.field` / `.textarea-field` / `.select-field` (warm)
10. `.list-item` (warm active state)
11. `.section-kicker` (warm/gold accent)
12. `.page-title` (tighter, more monumental)
13. `.map-shell` (warm stone frame)
14. `.floating-note` (warm stone)
15. `.site-header-glass` (warm tint)
16. `.mobile-bottom-bar` (dark/vault)
17. `.mobile-nav-overlay` (warm parchment)
18. `.rule` divider (warm)
19. `.meta-label` (warm faint)
20. `.stat-pair` (gold numeral accent)

## Component files to update

1. `header.tsx` — warm tones, architectural nav treatment
2. `footer.tsx` — dark vault-blue treatment
3. `mobile-bottom-bar.tsx` — dark bar with gold accents
4. `map-detail-panel.tsx` — warm stone accents
5. `ypaa-map.tsx` — warmer map tiles + marker colors
6. `home-hero.tsx` — monumental entry, warm stones
7. `page.tsx` (home) — vault-blue featured conference, warm sections
8. All route pages — inline color references updated

---

## Implementation Order

1. **globals.css** — complete token + component class overhaul
2. **layout.tsx** — theme-color meta, skip-link accent
3. **header.tsx** — warm glass, architectural nav
4. **footer.tsx** — dark vault treatment
5. **mobile-bottom-bar.tsx** — dark bar
6. **home-hero.tsx** — monumental hero
7. **page.tsx** (home) — vault featured conference, warm sections
8. **meetings pages** — warm civic treatment
9. **conferences pages** — enriched interior
10. **conference detail** — ceremonial focus
11. **about / what-is-ypaa / safety** — warm processional
12. **submit** — warm formal
13. **error pages** — dignified vault
14. **map components** — warm markers and tiles
15. **Testing and iteration**

---

## Risk List

| Risk | Mitigation |
|------|-----------|
| Warm palette may reduce contrast | Test all text/bg combos against WCAG AA |
| Dark footer may feel disconnected | Use transitional gradient from content to footer |
| Vault-blue panels may be too dark for readability | Use only for featured cards with light text, test carefully |
| Reduced radii may feel harsh | Keep soft enough to feel "carved" not "sharp" |
| Gold accents may feel gaudy | Use sparingly — stat numbers, featured titles, active states only |
| Map readability may suffer with warmer tones | Keep map tiles mostly neutral, adjust only the shell and markers |
| Touch targets may be affected by radius changes | Maintain min-height values, only change visual radius |
| Too much change may break visual coherence | Implement tokens first, then components, then pages — test at each step |

---

## Acceptance Checklist

- [ ] All color tokens replaced with warm basilica palette
- [ ] Shadows warm throughout
- [ ] Panels feel like carved stone, not glass bubbles
- [ ] Header feels architectural, not SaaS
- [ ] Footer feels like dark nave floor
- [ ] Mobile bottom bar feels solid, not floating glass
- [ ] Home hero feels monumental — clear threshold moment
- [ ] Featured conference card is the "altar" — richest visual treatment
- [ ] Meetings page is practical and dignified
- [ ] Conferences page has interior richness
- [ ] Typography feels carved and permanent
- [ ] Gold accents are controlled and earned
- [ ] Vault blue is used sparingly for focal moments
- [ ] All text passes WCAG AA contrast
- [ ] Maps remain fully usable
- [ ] Forms remain clear and functional
- [ ] Touch targets remain adequate
- [ ] Responsive behavior preserved
- [ ] No visual overflow or spacing bugs
- [ ] The overall feel: monumental, warm, intentional, premium
