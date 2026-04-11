# Reference Brief

## Research Sources Reviewed

- Awwwards collections for maps, minimal sites, and black websites
- SiteInspire black-and-white and minimal categories
- Godly inspiration galleries
- Mobbin web home, search, and card patterns
- MapLibre official examples
- deck.gl official MapLibre integration guide
- Vercel limits documentation

## Patterns Worth Borrowing

1. Full-bleed hero compositions that let one dominant surface do the work.
2. Minimal nav bars with generous spacing and restrained glass, not loud chrome.
3. Dark interfaces that feel layered through contrast and composition, not gradients.
4. Large editorial serif headlines paired with compact, controlled UI typography.
5. Search bars that feel embedded in the product shell rather than bolted above content.
6. Chips that act like filters, not candy-colored tags.
7. Dense information modules with one strong focal point and one quiet secondary rail.
8. Split map/list layouts where the list feels like a ledger and the map feels like context.
9. Quiet basemaps with low-label or no-label geography so the data stands out.
10. Marker systems driven by hierarchy through size, opacity, and halo rather than many colors.
11. Side panels on desktop and bottom sheets on mobile for map detail.
12. Card alternatives: lists, ledgers, banded panels, and editorial stacks.
13. Archive sections treated as lighter-weight records, not equal-status hero content.
14. Microcopy that tells the user what is useful now, not everything the product knows.
15. Submission forms framed as contribution pipelines, not generic “contact us” blocks.
16. Motion that mostly handles reveal, continuity, and focus, not decoration.

## Specific Things To Avoid

1. Giant gradient blobs.
2. Default map controls floating on top of the product.
3. Over-rounded, over-carded Tailwind defaults.
4. Three accent colors fighting for attention.
5. Faux-luxury gold on every edge.
6. Hero copy that explains the entire site before the user can act.
7. Dashboard styling disguised as editorial design.
8. Cheap marker legends and “business location” vibes.
9. Generic nonprofit language about community and resources without concrete utility.
10. Hiding low-confidence data behind polished UI instead of labeling it honestly.

## Chosen Direction

**Quiet Heat Atlas**

The final direction uses a near-black ground, warm single-accent bronze, muted signal neutrals, and restrained serif-led editorial hierarchy. The map is the emotional center, but it is treated as a calm field rather than a flashy demo. The product tone is useful, adult, and understated.

## Most Influential References

1. **Hut 8** from Awwwards minimal: strong contrast, restrained dark composition, no clutter.
2. **Northlane** from Awwwards minimal/black: disciplined spacing and high-trust surface design.
3. **Local Guides** from Awwwards map collection: map as narrative centerpiece rather than support image.
4. **Marseille by La Phase 5** from Awwwards map collection: geography used quietly while content remains primary.
5. **European Fashion Map 2019** from Awwwards map collection: selective data emphasis over “everything on the map.”

## Implementation Takeaways

- MapLibre was sufficient for the current product; deck.gl was not necessary yet.
- A no-label raster basemap plus custom marker hierarchy was the right tradeoff for speed and restraint.
- Vercel-friendly implementation meant leaning on static generation, small query helpers, and no runtime file writes.
