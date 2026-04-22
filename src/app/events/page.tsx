import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { getPublicEvents, getRegions } from "@/lib/hub/queries"
import { formatEventDate, formatLocation } from "@/lib/hub/format"
import type { HubEvent, HubRegion } from "@/lib/hub/types"

export const metadata: Metadata = {
  title: "Events",
  description: "Young people's AA events — grouped by region, curated for discovery.",
}

export const dynamic = "force-dynamic"

interface EventsSearch {
  region?: string
  state?: string
  committee?: string
  from?: string
  to?: string
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<EventsSearch>
}) {
  const params = await searchParams
  const regions = await getRegions({ activeOnly: true })
  const events = await getPublicEvents()

  const filtered = applyFilters(events, params)
  const grouped = groupByRegion(filtered, regions)

  const stateOptions = Array.from(
    new Set(events.map((e) => e.state).filter((v): v is string => Boolean(v))),
  ).sort()
  const committeeOptions = Array.from(
    new Set(events.map((e) => e.hostCommittee).filter(Boolean)),
  ).sort()

  return (
    <>
      <PortalHeader
        kicker="Events"
        title="What's on — by region."
        subtitle="A curated, gallery-style view of upcoming YPAA events. Grouped by region first, then date."
      />

      <section className="shell pb-6">
        <form className="card grid gap-4 md:grid-cols-5" method="get">
          <label className="block">
            <span className="caption">Region</span>
            <select name="region" defaultValue={params.region ?? ""} className="input mt-2">
              <option value="">All regions</option>
              {regions.map((r) => (
                <option key={r.id} value={r.slug}>{r.label}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="caption">State</span>
            <select name="state" defaultValue={params.state ?? ""} className="input mt-2">
              <option value="">All states</option>
              {stateOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="caption">Committee</span>
            <select name="committee" defaultValue={params.committee ?? ""} className="input mt-2">
              <option value="">All committees</option>
              {committeeOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="caption">From</span>
            <input type="date" name="from" defaultValue={params.from ?? ""} className="input mt-2" />
          </label>
          <label className="block">
            <span className="caption">To</span>
            <input type="date" name="to" defaultValue={params.to ?? ""} className="input mt-2" />
          </label>
          <div className="md:col-span-5 flex flex-wrap items-center gap-3">
            <button type="submit" className="btn btn-amber">Apply</button>
            <Link href="/events" className="btn btn-secondary">Clear</Link>
            <span className="body-sm ml-auto">
              {filtered.length} of {events.length} upcoming
            </span>
          </div>
        </form>
      </section>

      <section className="shell pb-16">
        {grouped.length === 0 ? (
          <div className="altar text-center">
            <p className="altar__label">Events</p>
            <h2 className="altar__title">Nothing listed for those filters.</h2>
            <p className="altar__summary mx-auto">
              Try clearing filters, or browse the{" "}
              <Link href="/events/archive" className="underline">archive</Link>.
            </p>
          </div>
        ) : (
          grouped.map(({ region, items }) => (
            <div key={region.id} className="mt-12 first:mt-0">
              <div className="flex items-end justify-between gap-4 border-b border-[var(--color-border-2)] pb-4">
                <div>
                  <p className="label mono">region</p>
                  <h2 className="display-2 mt-2">{region.label}</h2>
                </div>
                <p className="body-sm">{items.length} event{items.length === 1 ? "" : "s"}</p>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((e) => <EventCard key={e.id} event={e} />)}
              </div>
            </div>
          ))
        )}
      </section>

      <section className="shell pb-16">
        <div className="card card-quiet flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Past events</p>
            <p className="body-sm mt-2 max-w-lg">
              Past events are archived automatically. Browse the museum to see what&rsquo;s come before.
            </p>
          </div>
          <Link href="/events/archive" className="btn btn-secondary">Open archive →</Link>
        </div>
      </section>
    </>
  )
}

function applyFilters(events: HubEvent[], p: EventsSearch): HubEvent[] {
  return events.filter((e) => {
    if (p.state && e.state !== p.state) return false
    if (p.committee && e.hostCommittee !== p.committee) return false
    if (p.from && (e.endDate ?? e.date) < p.from) return false
    if (p.to && e.date > p.to) return false
    return true
  })
}

function groupByRegion(events: HubEvent[], regions: HubRegion[]) {
  const bucket = new Map<string, HubEvent[]>()
  for (const e of events) {
    const list = bucket.get(e.regionId) ?? []
    list.push(e)
    bucket.set(e.regionId, list)
  }
  return regions
    .filter((r) => bucket.has(r.id))
    .map((r) => ({ region: r, items: bucket.get(r.id)! }))
}

function EventCard({ event }: { event: HubEvent }) {
  return (
    <article className="card card-interactive group overflow-hidden">
      {event.flyerPath ? (
        <div className="relative -mx-6 -mt-6 mb-5 aspect-[4/5] overflow-hidden rounded-t-[var(--radius-lg)] bg-[var(--color-surface-2)]">
          <Image
            src={event.flyerPath}
            alt={`Flyer: ${event.title}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
          />
        </div>
      ) : (
        <div className="-mx-6 -mt-6 mb-5 flex aspect-[4/5] items-center justify-center rounded-t-[var(--radius-lg)] border-b border-[var(--color-border-2)] bg-gradient-to-b from-[var(--color-surface-2)] to-[var(--color-surface)]">
          <p className="mono text-xs text-[var(--color-fg-3)]">no flyer</p>
        </div>
      )}
      <p className="label mono">{event.hostCommittee}</p>
      <h3 className="heading-lg mt-2">{event.title}</h3>
      <p className="body-sm mt-3">
        {formatEventDate(event.date, event.endDate)}
        {event.time ? ` · ${event.time}` : ""}
      </p>
      <p className="body-sm">
        {event.venue} · {formatLocation(event.city, event.state)}
      </p>
      {event.registrationUrl ? (
        <a
          href={event.registrationUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium"
          style={{ color: "var(--color-accent-bright)" }}
        >
          Register →
        </a>
      ) : null}
    </article>
  )
}