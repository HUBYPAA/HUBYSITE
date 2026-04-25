# Contributing

## Where Things Live

### Data

| What | Where |
|------|-------|
| Raw meetings | `src/lib/data/source/meetings.ts` |
| Raw conferences | `src/lib/data/source/conferences.ts` |
| Raw states/intergroups | `src/lib/data/source/states.ts` |
| Coordinate lookups | `src/lib/data/source/coordinates.ts` |
| Canonical types | `src/lib/data/normalized/types.ts` |
| Adapters | `src/lib/data/normalized/adapt.ts` |
| Meeting queries | `src/lib/data/query/meetings.ts` |
| Conference queries | `src/lib/data/query/conferences.ts` |

### UI

| What | Where |
|------|-------|
| Design system tokens | `src/app/globals.css` |
| Atlas primitives | `src/lib/components/atlas/index.tsx` |
| Site chrome | `src/lib/components/site/site-chrome.tsx` |
| Site footer | `src/lib/components/site/site-footer.tsx` |
| Map component | `src/lib/components/map/ypaa-map.tsx` |

### Hub Module

| What | Where |
|------|-------|
| Types | `src/lib/hub/types.ts` |
| Store | `src/lib/hub/store.ts` |
| Auth | `src/lib/hub/auth.ts` |
| Session | `src/lib/hub/session.ts` |
| Queries | `src/lib/hub/queries.ts` |

---

## Adding New Data

1. Update the relevant source file in `src/lib/data/source/`
2. If the raw shape changed, update the adapter in `src/lib/data/normalized/adapt.ts`
3. Add query helpers in `src/lib/data/query/` only if the UI needs a new selector
4. Keep query files `server-only`
5. Pass smaller route props into client components — never import source files in client components

---

## Code Conventions

- **TypeScript**: strict mode enabled. No implicit any.
- **Tailwind v4**: use `@theme inline` for design tokens in `globals.css`
- **Client components**: mark with `"use client"` only when needed (interactivity, hooks, browser APIs)
- **Server components**: default. Fetch data, pass props.
- **Server actions**: use `useActionState` for forms. Validate with Zod.
- **Naming**: PascalCase for components, camelCase for functions/variables, kebab-case for CSS classes
- **CSS classes**: semantic names (e.g., `.site-header`, `.ledger-row`) rather than utility-only

---

## Design System Changes

If modifying the visual system:

1. Update tokens in `src/app/globals.css` (both `@theme inline` and `:root`)
2. Update component classes in the same file
3. Check contrast for text/background pairs
4. Test responsive breakpoints: 720px, 980px, 1180px
5. Verify `prefers-reduced-motion` still works

---

## Testing Changes

```bash
npm run lint
npm run build
```

Manual checks:
- Homepage renders with stats and featured conference
- Meetings page: search, filters, list/map/split views work
- Conference detail: static params generate correctly
- Mobile: bottom nav shows, menu overlay works, tap targets are adequate
- Portal (if testing hub): sign-in, event submission, admin queues
