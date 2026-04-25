# Deployment Notes

## Build

```bash
npm install
npm run dev        # Development server
npm run build      # Production build (uses Webpack via --webpack flag)
npm run lint       # ESLint
```

The build script in `package.json` includes `--webpack` due to a sandbox-specific CSS worker panic with Turbopack during earlier development.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

### Site
| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata, sitemap, robots |
| `NEXT_PUBLIC_ENABLE_VERCEL_TOOLBAR` | `1` to inject Vercel Toolbar script in production |

### Hub Module (required for portal/admin)
| Variable | Purpose |
|----------|---------|
| `HUB_SESSION_SECRET` | HMAC key for session cookies (min 16 chars) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `HUB_BOOTSTRAP_ADMIN_EMAILS` | Comma-separated emails auto-granted super_admin |
| `HUB_DATA_DIR` | Override data store directory (default: `./.hub-data`) |
| `HUB_OAUTH_REDIRECT_URL` | Optional OAuth redirect URI override |

## Deployment Targets

### Vercel (primary)

- Static routes and conference detail pages are fully static
- No required runtime file writes for public-facing routes
- Hub module writes to `.hub-data/` — on Vercel, point `HUB_DATA_DIR` to a mounted volume (Blob, EFS) or swap the store layer for a database
- Map tiles are keyless CARTO raster tiles
- Web Analytics, Speed Insights, and Toolbar are prewired

### Other Hosts

- Any host supporting Next.js 16 App Router
- Ensure `HUB_DATA_DIR` points to a persistent writable directory if using the hub module
- Generate a strong `HUB_SESSION_SECRET` before production

## Bootstrapping the First Admin

1. Set `HUB_BOOTSTRAP_ADMIN_EMAILS=you@example.com` in environment
2. Sign in at `/auth/sign-in` with that Google account
3. First sign-in auto-elevates to `super_admin` + portal + submitter access
4. From `/admin/roles`, assign scoped roles to other users

## Pre-Deployment Checklist

- [ ] `HUB_SESSION_SECRET` is set and ≥ 16 characters
- [ ] Google OAuth credentials are configured with correct redirect URI
- [ ] `NEXT_PUBLIC_SITE_URL` matches production domain
- [ ] `HUB_DATA_DIR` is persistent (or store layer swapped for DB)
- [ ] Build passes: `npm run build`
- [ ] Lint passes: `npm run lint`
- [ ] Conference data has been reviewed for stale records

## Monitoring

- Vercel Web Analytics: pageview tracking
- Vercel Speed Insights: web-vitals collection
- Hub notifications collection: audit log of admin decisions
