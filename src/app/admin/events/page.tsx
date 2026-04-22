import type { Metadata } from "next"
import Link from "next/link"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { requireAdmin, canReviewEvents } from "@/lib/hub/auth"
import { readAll } from "@/lib/hub/store"
import { formatEventDate, formatLocation } from "@/lib/hub/format"
import { PortalSubnav } from "@/lib/hub/portal-layout"

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
      <section className="shell">
        <div className="card">You don&rsquo;t have events-admin access.</div>
      </section>
    )
  }
  const { status } = await searchParams
  const active = (STATUS_ORDER.includes(status as typeof STATUS_ORDER[number])
    ? status
    : "pending") as typeof STATUS_ORDER[number]

  const [events, regions] = await Promise.all([readAll("events"), readAll("regions")])
  const regionMap = new Map(regions.map((r) => [r.id, r]))
  const counts = Object.fromEntries(
    STATUS_ORDER.map((s) => [s, events.filter((e) => e.status === s).length]),
  )
  const list = events
    .filter((e) => e.status === active)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  return (
    <>
      <PortalHeader
        kicker="Admin · Events"
        title="Review submissions."
        subtitle="Approve events after checking for safety and fit. Archive stale items. Reject with a note when appropriate."
      />
      <PortalSubnav
        items={STATUS_ORDER.map((s) => ({
          href: `/admin/events?status=${s}`,
          label: `${s[0].toUpperCase() + s.slice(1)} (${counts[s]})`,
          active: active === s,
        }))}
      />
      <section className="shell pt-6 pb-16">
        {list.length === 0 ? (
          <p className="card card-quiet body-sm">Nothing to show.</p>
        ) : (
          <div className="grid gap-3">
            {list.map((e) => (
              <Link key={e.id} href={`/admin/events/${e.id}`} className="card card-interactive">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[var(--color-fg)]">{e.title}</p>
                    <p className="body-sm mt-1">
                      {formatEventDate(e.date, e.endDate)} · {e.venue} · {formatLocation(e.city, e.state)} · {regionMap.get(e.regionId)?.label ?? "—"}
                    </p>
                    <p className="caption mono mt-1">by {e.submitterName} ({e.submitterEmail})</p>
                  </div>
                  <span className="caption mono">Review →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}