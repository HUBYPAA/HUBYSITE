import type { Metadata } from "next"
import Link from "next/link"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { requirePortalAccess } from "@/lib/hub/auth"
import { readAll } from "@/lib/hub/store"
import { formatEventDate, formatLocation } from "@/lib/hub/format"

export const metadata: Metadata = { title: "My submissions" }
export const dynamic = "force-dynamic"

const STATUS_STYLE: Record<string, { label: string; tone: string }> = {
  pending:  { label: "Pending review",  tone: "rgba(245,184,71,0.18)" },
  approved: { label: "Approved",        tone: "rgba(127,209,160,0.18)" },
  rejected: { label: "Rejected",        tone: "rgba(226,112,102,0.18)" },
  archived: { label: "Archived",        tone: "rgba(122,138,216,0.14)" },
}

export default async function MySubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string }>
}) {
  const user = await requirePortalAccess()
  const [events, regions] = await Promise.all([
    readAll("events"),
    readAll("regions"),
  ])
  const regionMap = new Map(regions.map((r) => [r.id, r]))
  const mine = events
    .filter((e) => e.submitterUserId === user.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  const { created } = await searchParams

  return (
    <>
      <PortalHeader
        kicker="My submissions"
        title="Everything you've sent in."
        subtitle="Edit pending submissions here. Once reviewed, a submission is locked unless an admin reopens it."
      />
      <section className="shell pb-16">
        {created ? (
          <p className="card card-quiet mb-6 text-sm" style={{ color: "var(--color-success)" }}>
            Submission sent. It&rsquo;s now waiting for admin review.
          </p>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <p className="body-sm">{mine.length} submission{mine.length === 1 ? "" : "s"}</p>
          <Link href="/portal/submit-event" className="btn btn-amber">New submission</Link>
        </div>

        {mine.length === 0 ? (
          <section
            className="star-moment"
            style={{ minHeight: "auto", paddingBlock: "var(--space-16)" }}
          >
            <span className="starmark starmark--hero starmark--dim" aria-hidden />
            <h2 className="star-moment__title">
              Nothing <em>yet.</em>
            </h2>
            <p className="star-moment__lede">You haven&rsquo;t sent any events in.</p>
            <div className="star-moment__actions">
              <Link href="/portal/submit-event" className="btn btn--gold">
                Send the first one
              </Link>
            </div>
          </section>
        ) : (
          <div className="grid gap-3">
            {mine.map((e) => {
              const s = STATUS_STYLE[e.status] ?? STATUS_STYLE.pending
              const canEdit = e.status === "pending" && !e.locked
              return (
                <div key={e.id} className="card card-quiet flex flex-wrap items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider"
                        style={{ background: s.tone, color: "var(--color-fg)" }}
                      >
                        {s.label}
                      </span>
                      <p className="text-sm font-medium text-[var(--color-fg)]">{e.title}</p>
                    </div>
                    <p className="body-sm mt-1">
                      {formatEventDate(e.date, e.endDate)} · {e.venue} · {formatLocation(e.city, e.state)} · {regionMap.get(e.regionId)?.label ?? "—"}
                    </p>
                    {e.reviewNote ? (
                      <p className="body-sm mt-2 italic">Reviewer note: {e.reviewNote}</p>
                    ) : null}
                  </div>
                  {canEdit ? (
                    <Link href={`/portal/my-submissions/${e.id}`} className="btn btn-secondary btn-sm">Edit</Link>
                  ) : (
                    <span className="caption mono">Locked</span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}