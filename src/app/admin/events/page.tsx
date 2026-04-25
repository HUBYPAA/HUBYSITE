import type { Metadata } from "next"
import Link from "next/link"
import {
  ActionStrip,
  LedgerRow,
  LedgerRows,
  PageShell,
  Surface,
} from "@/lib/components/atlas"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { canReviewEvents, requireAdmin } from "@/lib/hub/auth"
import { formatEventDate, formatLocation } from "@/lib/hub/format"
import { PortalSubnav } from "@/lib/hub/portal-layout"
import { readAll } from "@/lib/hub/store"

export const metadata: Metadata = { title: "Admin · Events" }
export const dynamic = "force-dynamic"

const STATUS_ORDER = ["pending", "approved", "rejected", "archived"] as const

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const me = await requireAdmin()
  if (!canReviewEvents(me)) {
    return (
      <PageShell tone="admin">
        <section className="shell">
          <Surface>You do not have events-admin access.</Surface>
        </section>
      </PageShell>
    )
  }

  const { status } = await searchParams
  const active = (STATUS_ORDER.includes(status as typeof STATUS_ORDER[number])
    ? status
    : "pending") as typeof STATUS_ORDER[number]

  const [events, regions] = await Promise.all([readAll("events"), readAll("regions")])
  const regionMap = new Map(regions.map((region) => [region.id, region]))
  const counts = Object.fromEntries(
    STATUS_ORDER.map((entry) => [entry, events.filter((event) => event.status === entry).length]),
  )
  const list = events
    .filter((event) => event.status === active)
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))

  return (
    <PageShell tone="admin">
      <PortalHeader
        kicker="Admin · Events"
        title="Review submissions."
        subtitle="Approve events after checking for safety and fit. Archive stale items. Reject with a note when appropriate."
      />
      <PortalSubnav
        items={STATUS_ORDER.map((entry) => ({
          href: `/admin/events?status=${entry}`,
          label: `${entry[0].toUpperCase() + entry.slice(1)} (${counts[entry]})`,
          active: active === entry,
        }))}
      />

      <section className="shell grid gap-5 pb-16 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="body-sm" style={{ margin: 0 }}>
            {list.length} item{list.length === 1 ? "" : "s"} in {active}.
          </p>
          <ActionStrip>
            <Link href="/admin" className="btn btn--ghost btn-sm">
              Back to admin
            </Link>
          </ActionStrip>
        </div>

        {list.length === 0 ? (
          <Surface tone="quiet">
            <p className="body-sm" style={{ margin: 0 }}>
              Nothing to show.
            </p>
          </Surface>
        ) : (
          <LedgerRows>
            {list.map((event) => (
              <LedgerRow
                key={event.id}
                href={`/admin/events/${event.id}`}
                label={event.status}
                title={event.title}
                summary={[
                  formatEventDate(event.date, event.endDate),
                  event.venue,
                  formatLocation(event.city, event.state),
                  regionMap.get(event.regionId)?.label ?? "Region pending",
                ]
                  .filter(Boolean)
                  .join(" · ")}
                meta={event.submitterName}
                actions={
                  <ActionStrip>
                    <span className="btn btn--quiet btn-sm">Review</span>
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
