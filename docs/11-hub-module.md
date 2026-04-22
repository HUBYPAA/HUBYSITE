# HUBYPAA Communications Module

This document describes the communications module added to the HUBYPAA
site. It is additive: the existing meetings, conferences, safety,
submit, and static pages continue to work unchanged.

## Feature surface

Public:
- `/events` — regional events gallery with region / state / committee / date filters
- `/events/archive` — auto-populated museum of past events
- `/newsletter` — signup with regional preferences

Auth:
- `/auth/sign-in` — Google OAuth entry
- `/auth/callback` — OAuth code exchange
- `/auth/sign-out` — clears session

Protected portal (approved users only):
- `/portal` — landing / index
- `/portal/waitlist` — request portal access
- `/portal/submitter-access` — request trusted-servant submitter access
- `/portal/submit-event` — submit an event for review
- `/portal/my-submissions` and `/portal/my-submissions/[id]` — edit until reviewed
- `/portal/directory?list=current|helper|past` — private contact directory
- `/portal/helpers` — redirect to the helper list view
- `/portal/profile` — profile, consent, helper opt-in, term-end date

Admin (role-gated):
- `/admin` — dashboard
- `/admin/events` + `/admin/events/[id]` — moderate submissions
- `/admin/access` — portal-access requests
- `/admin/submitters` — submitter access
- `/admin/directory` — approve/purge, run lifecycle
- `/admin/newsletter` — subscribers + drafts
- `/admin/regions` — manage regions
- `/admin/roles` — super_admin only; assign roles

## Architecture

- **Stack**: Next.js 16 App Router, React 19, Tailwind v4 (no new UI kit).
- **Validation**: `zod`.
- **Auth**: Google OAuth 2.0 implemented in-tree (see `src/lib/hub/oauth.ts`).
  Session is an HMAC-signed JSON payload in an HttpOnly cookie
  (`src/lib/hub/session.ts`).
- **Authorization**: server-side role checks in `src/lib/hub/auth.ts`.
  `requirePortalAccess`, `requireSubmitter`, and `requireAdmin` helpers
  redirect as needed.
- **Storage**: file-backed JSON collections under `HUB_DATA_DIR`
  (defaults to `./.hub-data`). See `src/lib/hub/store.ts`. Writes are
  serialized per collection in a single Node process via a promise
  queue, and use atomic rename for crash safety.
- **Uploads**: flyers go to `public/uploads/flyers/` with a strict
  allow-list of image MIME types and an 8 MB size cap
  (`src/lib/hub/uploads.ts`).
- **Lifecycle**: directory rollover runs on each admin view and can be
  triggered from `/admin/directory` — see `src/lib/hub/lifecycle.ts`.
- **Notifications**: simple log in the `notifications` collection.
  Visible wherever the admin surfaces choose to present it (currently
  used for auditing decisions).

## Swapping storage

The file-backed store is deliberately thin. The API surface consumed by
routes is:

```ts
readAll("<collection>")
writeAll("<collection>", items)
upsert("<collection>", item)
remove("<collection>", id)
```

To move to a real database (Postgres, SQLite, KV), re-implement those
four functions in `src/lib/hub/store.ts`. Nothing in the routes touches
the filesystem directly.

In ephemeral serverless environments without a mounted volume, writes
from the file store will not persist across cold starts; point
`HUB_DATA_DIR` at a durable volume or replace the adapter.

## Environment variables

See `.env.example` for the full list.

| Variable | Purpose |
| --- | --- |
| `HUB_SESSION_SECRET` | HMAC key for signing session cookies (min 16 chars). |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials. |
| `HUB_OAUTH_REDIRECT_URL` | Optional override of the OAuth redirect URI. |
| `HUB_BOOTSTRAP_ADMIN_EMAILS` | Comma-separated list of super_admin emails. |
| `HUB_DATA_DIR` | Override the data-store directory (default: `./.hub-data`). |

## Bootstrapping the first admin

1. Set `HUB_BOOTSTRAP_ADMIN_EMAILS=you@example.com` in `.env.local` (or
   the Vercel project env).
2. Sign in at `/auth/sign-in` with that Google account.
3. On first sign-in the bootstrap hook elevates the user to
   `super_admin` with portal + submitter access.
4. From `/admin/roles`, assign scoped roles to other users.

## Content model at a glance

- `HubUser` — identity + role/access state
- `HubRegion` — admin-editable region list (seeded with the 13 in the spec)
- `HubEvent` — submissions with `pending|approved|rejected|archived`
- `NewsletterSubscriber` — email + region preferences
- `NewsletterDraft` — human-authored, never auto-sent
- `DirectoryContact` — current/helper/past, with consent flags and term-end rollover
- `PortalAccessRequest`, `SubmitterAccessRequest` — waitlist entries
- `HubNotification` — audit/notification log

## Not included in v1

- Conference hosting page (explicitly out of scope)
- Event-type taxonomy
- Automatic email send — drafts are prepared and exported
- Public people directory