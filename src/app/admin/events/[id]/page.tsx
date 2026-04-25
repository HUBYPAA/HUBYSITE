import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MarginalRail, PageShell, StatusRail, Surface } from "@/lib/components/atlas"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { requireAdmin, canReviewEvents } from "@/lib/hub/auth"
import { readAll } from "@/lib/hub/store"
import { getRegions } from "@/lib/hub/queries"
import { formatEventDate, formatLocation } from "@/lib/hub/format"
import { decideEvent, editEvent } from "../actions"

export const metadata: Metadata = { title: "Admin · Review event" }
export const dynamic = "force-dynamic"

export default async function AdminEventDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const me = await requireAdmin()
  const { id } = await params
  const [events, regions] = await Promise.all([readAll("events"), getRegions()])
  const event = events.find((e) => e.id === id)
  if (!event) notFound()

  return (
    <PageShell tone="admin">
      <PortalHeader
        kicker={`Status · ${event.status}`}
        title={event.title}
        subtitle={`Submitted by ${event.submitterName} (${event.submitterEmail})`}
      />
      <section className="shell pb-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* Left: flyer + facts */}
          <Surface className="grid gap-5">
            {event.flyerPath ? (
              <div className="relative -mx-6 -mt-6 mb-5 aspect-[4/5] overflow-hidden rounded-t-[var(--radius-lg)] bg-[var(--color-surface-2)]">
                <Image src={event.flyerPath} alt={`Flyer: ${event.title}`} fill className="object-contain" sizes="500px" />
              </div>
            ) : null}
            <div>
              <p className="page-kicker">Submitted details</p>
              <h2 className="heading-lg">What the record currently says.</h2>
            </div>
            <dl className="space-y-2 text-sm">
              <Row label="Dates" value={formatEventDate(event.date, event.endDate)} />
              <Row label="Time" value={event.time ?? "—"} />
              <Row label="Host committee" value={event.hostCommittee} />
              <Row label="Venue" value={event.venue} />
              <Row label="Location" value={formatLocation(event.city, event.state)} />
              <Row label="Region" value={regions.find((r) => r.id === event.regionId)?.label ?? "—"} />
              {event.registrationUrl ? (
                <Row
                  label="Registration"
                  value={
                    <a href={event.registrationUrl} target="_blank" rel="noreferrer" className="underline">
                      {event.registrationUrl}
                    </a>
                  }
                />
              ) : null}
              {event.chairPitch ? (
                <div>
                  <dt className="caption mt-4">Chair pitch (newsletter)</dt>
                  <dd className="mt-2 body-sm italic">{event.chairPitch}</dd>
                </div>
              ) : null}
              {event.reviewNote ? (
                <div>
                  <dt className="caption mt-4">Last review note</dt>
                  <dd className="mt-2 body-sm italic">{event.reviewNote}</dd>
                </div>
              ) : null}
            </dl>
          </Surface>

          {/* Right: actions */}
          <div className="space-y-6">
            {canReviewEvents(me) ? (
              <>
                <Surface className="grid gap-4">
                  <div>
                    <p className="page-kicker">Decision</p>
                    <h2 className="heading-lg">Approve, return, or archive.</h2>
                  </div>
                  <form action={decideEvent} className="grid gap-4">
                    <input type="hidden" name="id" value={event.id} />
                    <label className="block">
                      <span className="caption">Review note</span>
                      <textarea name="note" className="input textarea mt-2" placeholder="Optional note to the submitter" defaultValue={event.reviewNote ?? ""} />
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="unlock" /> Reopen for submitter edits
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button type="submit" name="decision" value="approved" className="btn btn-amber btn-sm">Approve</button>
                      <button type="submit" name="decision" value="rejected" className="btn btn-secondary btn-sm">Reject</button>
                      <button type="submit" name="decision" value="archived" className="btn btn-secondary btn-sm">Archive</button>
                      <button type="submit" name="decision" value="pending" className="btn btn-secondary btn-sm">Return to pending</button>
                    </div>
                  </form>
                </Surface>

                <Surface tone="quiet" className="grid gap-4">
                  <div>
                    <p className="page-kicker">Review state</p>
                    <h2 className="heading-lg">Keep the audit trail legible.</h2>
                  </div>
                  <StatusRail
                    steps={[
                      {
                        label: "Submitted",
                        detail: `Received from ${event.submitterName}.`,
                        state: "complete",
                      },
                      {
                        label: event.locked ? "Picked up for review" : "Still open to submitter edits",
                        detail: event.locked
                          ? "The record is locked while it is being reviewed."
                          : "A reviewer can still return it for corrections.",
                        state: event.locked ? "current" : "warning",
                      },
                      {
                        label: "Approved, rejected, or archived",
                        detail: "The public atlas only receives approved records.",
                        state: ["approved", "rejected", "archived"].includes(event.status) ? "complete" : "upcoming",
                      },
                    ]}
                  />
                </Surface>

                <Surface tone="quiet">
                  <details>
                    <summary className="cursor-pointer text-sm font-medium">Edit event details</summary>
                    <form action={editEvent} className="mt-4 space-y-4">
                      <input type="hidden" name="id" value={event.id} />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="block"><span className="caption">Title</span><input name="title" defaultValue={event.title} className="input mt-2" /></label>
                        <label className="block"><span className="caption">Host committee</span><input name="hostCommittee" defaultValue={event.hostCommittee} className="input mt-2" /></label>
                        <label className="block"><span className="caption">Start date</span><input type="date" name="date" defaultValue={event.date} className="input mt-2" /></label>
                        <label className="block"><span className="caption">End date</span><input type="date" name="endDate" defaultValue={event.endDate ?? ""} className="input mt-2" /></label>
                        <label className="block"><span className="caption">Time</span><input name="time" defaultValue={event.time ?? ""} className="input mt-2" /></label>
                        <label className="block">
                          <span className="caption">Region</span>
                          <select name="regionId" defaultValue={event.regionId} className="input mt-2">
                            {regions.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
                          </select>
                        </label>
                        <label className="block"><span className="caption">City</span><input name="city" defaultValue={event.city} className="input mt-2" /></label>
                        <label className="block"><span className="caption">State</span><input name="state" defaultValue={event.state ?? ""} className="input mt-2" /></label>
                        <label className="block sm:col-span-2"><span className="caption">Venue</span><input name="venue" defaultValue={event.venue} className="input mt-2" /></label>
                        <label className="block sm:col-span-2"><span className="caption">Registration URL</span><input name="registrationUrl" defaultValue={event.registrationUrl ?? ""} className="input mt-2" /></label>
                        <label className="block sm:col-span-2"><span className="caption">Chair pitch</span><textarea name="chairPitch" defaultValue={event.chairPitch ?? ""} className="input textarea mt-2" /></label>
                      </div>
                      <button type="submit" className="btn btn-amber btn-sm">Save edits</button>
                    </form>
                  </details>
                </Surface>
              </>
            ) : (
              <Surface tone="quiet" className="body-sm">You don&rsquo;t have events-admin access.</Surface>
            )}
            <MarginalRail kicker="Reminder" title="What matters most">
              <p>Venue, timing, registration source, and whether the event belongs in the regional feed.</p>
              <p>Editorial copy is secondary. Clarity and verification come first.</p>
            </MarginalRail>
            <Link href="/admin/events" className="btn btn-secondary btn-sm">← Back to list</Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <dt className="caption min-w-[110px]">{label}</dt>
      <dd className="text-sm text-[var(--color-fg)]">{value}</dd>
    </div>
  )
}
