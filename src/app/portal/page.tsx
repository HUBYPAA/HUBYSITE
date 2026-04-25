import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import {
  ActionStrip,
  LedgerRow,
  LedgerRows,
  PageIntro,
  PageShell,
  StatusRail,
  Surface,
} from "@/lib/components/atlas"
import {
  canSubmitEvents,
  getCurrentUser,
  hasPortalAccess,
  isAdmin,
} from "@/lib/hub/auth"
import { formatEventDate, formatLocation } from "@/lib/hub/format"
import { readAll } from "@/lib/hub/store"

export const metadata: Metadata = {
  title: "Portal",
  description: "Private portal for HUBYPAA helpers, submitters, and administrators.",
}

export const dynamic = "force-dynamic"

export default async function PortalPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/auth/sign-in?next=/portal")
  if (!hasPortalAccess(user)) redirect("/portal/waitlist")

  const events = await readAll("events")
  const mine = events
    .filter((event) => event.submitterUserId === user.id)
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
  const pendingMine = mine.filter((event) => event.status === "pending").length

  return (
    <PageShell tone="portal">
      <div className="shell flex flex-col gap-8">
        <PageIntro
          compact
          kicker="Portal"
          title={
            <>
              Warm workbench.
              <br />
              <em>I know what needs doing.</em>
            </>
          }
          lead={`Signed in as ${user.name}. Nothing here goes public without review.`}
          aside={
            <Surface tone="quiet">
              <StatusRail
                steps={[
                  {
                    label: "Portal access",
                    detail: "You are inside the private workbench.",
                    state: "complete",
                  },
                  {
                    label: canSubmitEvents(user)
                      ? "Submitter access"
                      : "Submitter access pending",
                    detail: canSubmitEvents(user)
                      ? "You can send events for review."
                      : "Request it if your role needs event intake.",
                    state: canSubmitEvents(user) ? "current" : "upcoming",
                  },
                  {
                    label: isAdmin(user) ? "Admin access" : "Admin access not granted",
                    detail: isAdmin(user)
                      ? "Command-center routes are available."
                      : "Admin routes stay separate from normal portal work.",
                    state: isAdmin(user) ? "current" : "upcoming",
                  },
                ]}
              />
            </Surface>
          }
        />

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
          <div className="grid gap-5">
            <Surface className="grid gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="page-kicker">Primary actions</p>
                  <h2 className="heading-lg">Move work forward.</h2>
                </div>
                <ActionStrip>
                  <Link
                    href={canSubmitEvents(user) ? "/portal/submit-event" : "/portal/submitter-access"}
                    className="btn btn--primary"
                  >
                    {canSubmitEvents(user) ? "Submit an event" : "Request submitter access"}
                  </Link>
                </ActionStrip>
              </div>
              <LedgerRows>
                <LedgerRow
                  href={canSubmitEvents(user) ? "/portal/submit-event" : "/portal/submitter-access"}
                  label="Submit"
                  title={canSubmitEvents(user) ? "Add a new event for review." : "Request trusted-servant submitter access."}
                  summary={
                    canSubmitEvents(user)
                      ? "Nothing goes public without admin review. Pending submissions stay editable until someone picks them up."
                      : "Event submission is limited to approved trusted servants."
                  }
                  meta={canSubmitEvents(user) ? "Open form" : "Request access"}
                  tone="warm"
                />
                <LedgerRow
                  href="/portal/my-submissions"
                  label="My submissions"
                  title={
                    pendingMine > 0
                      ? `${pendingMine} pending review.`
                      : "Everything you have sent in."
                  }
                  summary="Open your queue, check reviewer notes, and edit anything still pending."
                  meta="Open list"
                  tone="quiet"
                />
                <LedgerRow
                  href="/portal/directory?list=current"
                  label="Directory"
                  title="Private contact directory."
                  summary="Current chairs, board members, and helper contacts. Approved users only."
                  meta="Open directory"
                  tone="quiet"
                />
              </LedgerRows>
            </Surface>

            <Surface className="grid gap-4">
              <div>
                <p className="page-kicker">Recent submissions</p>
                <h2 className="heading-lg">Your latest work.</h2>
              </div>
              {mine.length === 0 ? (
                <p className="body-sm" style={{ margin: 0 }}>
                  Nothing sent yet. The first useful thing here is usually an
                  event record or a correction path.
                </p>
              ) : (
                <LedgerRows>
                  {mine.slice(0, 4).map((event) => (
                    <LedgerRow
                      key={event.id}
                      href={`/portal/my-submissions/${event.id}`}
                      label={event.status}
                      title={event.title}
                      summary={[
                        formatEventDate(event.date, event.endDate),
                        formatLocation(event.city, event.state),
                        event.venue,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                      meta={event.locked ? "Locked" : "Open"}
                      tone={event.status === "pending" ? "warm" : "quiet"}
                    />
                  ))}
                </LedgerRows>
              )}
            </Surface>
          </div>

          <div className="grid gap-5">
            <Surface className="grid gap-4">
              <div>
                <p className="page-kicker">People and profile</p>
                <h2 className="heading-lg">Keep your own rails clean.</h2>
              </div>
              <ActionStrip>
                <Link href="/portal/profile" className="btn btn--secondary btn-sm">
                  Profile
                </Link>
                <Link href="/portal/helpers" className="btn btn--ghost btn-sm">
                  Helpers
                </Link>
                <Link href="/portal/directory" className="btn btn--ghost btn-sm">
                  Directory
                </Link>
              </ActionStrip>
            </Surface>

            {isAdmin(user) ? (
              <Surface tone="quiet" className="grid gap-4">
                <div>
                  <p className="page-kicker">Admin</p>
                  <h2 className="heading-lg">Command center routes available.</h2>
                </div>
                <p className="body-sm" style={{ margin: 0 }}>
                  Review submissions, approve access requests, manage the
                  directory, and keep the newsletter running.
                </p>
                <Link href="/admin" className="btn btn--primary btn-sm">
                  Open admin
                </Link>
              </Surface>
            ) : null}
          </div>
        </section>
      </div>
    </PageShell>
  )
}
