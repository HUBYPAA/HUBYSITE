import type { Metadata } from "next"
import Link from "next/link"
import {
  ActionStrip,
  FocalPanel,
  LedgerRow,
  LedgerRows,
  PageShell,
  Surface,
} from "@/lib/components/atlas"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { requirePortalAccess } from "@/lib/hub/auth"
import { formatEventDate, formatLocation } from "@/lib/hub/format"
import { readAll } from "@/lib/hub/store"

export const metadata: Metadata = { title: "My submissions" }
export const dynamic = "force-dynamic"

export default async function MySubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string }>
}) {
  const user = await requirePortalAccess()
  const [events, { created }] = await Promise.all([
    readAll("events"),
    searchParams,
  ])

  const mine = events
    .filter((event) => event.submitterUserId === user.id)
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))

  return (
    <PageShell tone="portal">
      <PortalHeader
        kicker="My submissions"
        title="Everything you have sent in."
        subtitle="Edit pending submissions here. Once reviewed, a submission is locked unless an admin reopens it."
      />

      <section className="shell grid gap-5 pb-16">
        {created ? (
          <Surface tone="quiet">
            <p className="body-sm" style={{ color: "var(--success)", margin: 0 }}>
              Submission sent. It is now waiting for admin review.
            </p>
          </Surface>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="body-sm" style={{ margin: 0 }}>
            {mine.length} submission{mine.length === 1 ? "" : "s"}
          </p>
          <Link href="/portal/submit-event" className="btn btn--primary">
            New submission
          </Link>
        </div>

        {mine.length === 0 ? (
          <FocalPanel
            kicker="Empty state"
            title="Nothing sent yet."
            lead="The first useful move here is usually a real event record with real dates and a real source."
            actions={
              <ActionStrip>
                <Link href="/portal/submit-event" className="btn btn--primary">
                  Send the first one
                </Link>
              </ActionStrip>
            }
          />
        ) : (
          <LedgerRows>
            {mine.map((event) => (
              <LedgerRow
                key={event.id}
                href={event.status === "pending" && !event.locked ? `/portal/my-submissions/${event.id}` : undefined}
                label={event.status}
                title={event.title}
                summary={[
                  formatEventDate(event.date, event.endDate),
                  event.venue,
                  formatLocation(event.city, event.state),
                ]
                  .filter(Boolean)
                  .join(" · ")}
                meta={event.locked ? "Locked" : "Editable"}
                actions={
                  <ActionStrip>
                    {event.status === "pending" && !event.locked ? (
                      <Link href={`/portal/my-submissions/${event.id}`} className="btn btn--secondary btn-sm">
                        Edit
                      </Link>
                    ) : null}
                    <Link href="/submit" className="btn btn--ghost btn-sm">
                      Correction path
                    </Link>
                  </ActionStrip>
                }

              />
            ))}
          </LedgerRows>
        )}
      </section>
    </PageShell>
  )
}
