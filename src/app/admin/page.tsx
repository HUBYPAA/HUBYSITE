import type { Metadata } from "next"
import Link from "next/link"
import { requireAdmin } from "@/lib/hub/auth"
import { readAll } from "@/lib/hub/store"
import { RunningHead } from "@/lib/components/ornament"

export const metadata: Metadata = { 
  title: "Admin",
  description: "Review, approve, edit — HUBYPAA moderation and operations.",
}

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
    <section className="shell" aria-labelledby="admin-title">
      <header className="section section--hero">
        <RunningHead
          left={<span className="smallcaps">Admin</span>}
          center={<span>{me.roles.join(", ") || "no roles"}</span>}
        />
        <h1 id="admin-title" className="section-head">
          A single place for <em>moderation and operations.</em>
        </h1>
        <p className="lede max-w-2xl">
          Review submissions, approve access requests, manage the directory,
          and keep the newsletter running. All human, no automation.
        </p>
      </header>

      <section className="section section--tight">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AdminTile label="Events"       count={pendingEvents}     total={events.length}      href="/admin/events"      body="Review submissions, approve/reject, edit, archive." />
          <AdminTile label="Access"       count={pendingPortal}     total={portalReqs.length}  href="/admin/access"      body="Portal access requests awaiting review." />
          <AdminTile label="Submitters"   count={pendingSubmitter}  total={submitterReqs.length} href="/admin/submitters" body="Trusted-servant submitter applications." />
          <AdminTile label="Directory"    count={pendingDirectory}  total={directory.length}   href="/admin/directory"   body="Approve, edit, or purge directory contacts." />
          <AdminTile label="Newsletter"   count={subs.length}       href="/admin/newsletter"   body="Subscribers and draft management." />
          <AdminTile label="Regions"      count={0}                 href="/admin/regions"      body="Add, rename, reorder, or deactivate regions." />
        </div>
      </section>
    </section>
  )
}

function AdminTile({
  label, count, total, href, body,
}: { label: string; count: number; total?: number; href: string; body: string }) {
  const showBadge = count > 0
  return (
    <Link href={href} className="card group block">
      <div className="flex items-start justify-between">
        <p className="text-xs uppercase tracking-widest text-gilt-600">{label}</p>
        {showBadge ? (
          <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-accent/20 text-accent">
            {count} pending
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 font-serif text-xl tracking-tight text-ink group-hover:text-accent transition-colors">
        {total !== undefined ? `${total} total` : label}
      </h3>
      <p className="mt-3 text-sm leading-6 text-stone-700">{body}</p>
      <p className="mt-4 text-sm font-medium text-accent">Open →</p>
    </Link>
  )
}
