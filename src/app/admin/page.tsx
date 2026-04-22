import type { Metadata } from "next"
import Link from "next/link"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { requireAdmin } from "@/lib/hub/auth"
import { readAll } from "@/lib/hub/store"

export const metadata: Metadata = { title: "Admin" }
export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const me = await requireAdmin()
  const [events, portalReqs, submitterReqs, directory, subs] = await Promise.all([
    readAll("events"),
    readAll("portal_access_requests"),
    readAll("submitter_access_requests"),
    readAll("directory_contacts"),
    readAll("newsletter_subscribers"),
  ])

  const pendingEvents = events.filter((e) => e.status === "pending").length
  const pendingPortal = portalReqs.filter((r) => r.status === "pending").length
  const pendingSubmitter = submitterReqs.filter((r) => r.status === "pending").length
  const pendingDirectory = directory.filter((c) => c.status === "pending").length

  return (
    <>
      <PortalHeader
        kicker={`Admin · ${me.roles.join(", ") || "no roles"}`}
        title="Review, approve, edit."
        subtitle="A single place for HUBYPAA moderation and operations."
      />
      <section className="shell pb-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AdminTile label="Events"       count={pendingEvents}     total={events.length}      href="/admin/events"      body="Review submissions, approve/reject, edit, archive." />
          <AdminTile label="Access"       count={pendingPortal}     total={portalReqs.length}  href="/admin/access"      body="Portal access requests awaiting review." />
          <AdminTile label="Submitters"   count={pendingSubmitter}  total={submitterReqs.length} href="/admin/submitters" body="Trusted-servant submitter applications." />
          <AdminTile label="Directory"    count={pendingDirectory}  total={directory.length}   href="/admin/directory"   body="Approve, edit, or purge directory contacts." />
          <AdminTile label="Newsletter"   count={subs.length}       href="/admin/newsletter"   body="Subscribers and draft management." />
          <AdminTile label="Regions"      count={0}                 href="/admin/regions"      body="Add, rename, reorder, or deactivate regions." />
        </div>
      </section>
    </>
  )
}

function AdminTile({
  label, count, total, href, body,
}: { label: string; count: number; total?: number; href: string; body: string }) {
  const showBadge = count > 0
  return (
    <Link href={href} className="card card-interactive group block">
      <div className="flex items-start justify-between">
        <p className="label mono">{label}</p>
        {showBadge ? (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
            style={{ background: "rgba(245,184,71,0.2)", color: "var(--color-accent-bright)" }}
          >
            {count} pending
          </span>
        ) : null}
      </div>
      <h3 className="heading-lg mt-3">
        {total !== undefined ? `${total} total` : label}
      </h3>
      <p className="body-sm mt-3">{body}</p>
      <p className="mt-4 text-sm font-medium" style={{ color: "var(--color-accent-bright)" }}>Open →</p>
    </Link>
  )
}