import type { Metadata } from "next"
import Link from "next/link"
import {
  ActionStrip,
  FocalPanel,
  LedgerRow,
  LedgerRows,
  PageIntro,
  PageShell,
} from "@/lib/components/atlas"
import { formatEventDate, formatLocation } from "@/lib/hub/format"
import { getPublicEvents, getRegions } from "@/lib/hub/queries"

export const metadata: Metadata = {
  title: "Events",
  description:
    "Smaller regional events, grouped by month and region, with a cleaner public calendar.",
}

export const dynamic = "force-dynamic"

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>
}) {
  const [events, regions, { region }] = await Promise.all([
    getPublicEvents(),
    getRegions({ activeOnly: true }),
    searchParams,
  ])

  const activeRegion = regions.find((entry) => entry.slug === region)?.id ?? "all"
  const regionMap = new Map(regions.map((entry) => [entry.id, entry]))
  const visible =
    activeRegion === "all"
      ? events
      : events.filter((event) => event.regionId === activeRegion)
  const groups = groupEventsByMonth(visible)

  return (
    <PageShell tone="stone">
      <div className="flex flex-col gap-8">
        <section className="celestial-hero star-field star-field--sparse">
          <div className="god-rays" aria-hidden="true" />
          <div className="celestial-hero__content shell">
            <PageIntro
              compact
              kicker="Events"
              title={
                <span className="float-text">
                  Warm motion.
                  <br />
                  <em>Small sparks, not clutter.</em>
                </span>
              }
              lead="Approved regional events, grouped by month so the calendar stays scannable on mobile and roomy on desktop."
            />
          </div>
        </section>

        <div className="shell flex flex-col gap-10">
          {/* Region filters as text links */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 items-baseline">
            <span className="page-kicker" style={{ margin: 0 }}>Filter</span>
            <Link
              href="/events"
              className={activeRegion === "all" ? "font-semibold text-[var(--ink)]" : "text-[var(--rib-blue)] hover:text-[var(--ink)]"}
            >
              All regions
            </Link>
            {regions.map((entry) => (
              <Link
                key={entry.id}
                href={`/events?region=${entry.slug}`}
                className={activeRegion === entry.id ? "font-semibold text-[var(--ink)]" : "text-[var(--rib-blue)] hover:text-[var(--ink)]"}
              >
                {entry.label}
              </Link>
            ))}
            <span className="ml-auto page-kicker" style={{ margin: 0 }}>
              {visible.length} events
            </span>
          </div>

          {groups.length === 0 ? (
            <FocalPanel
              kicker="No events yet"
              title="Nothing public is queued right now."
              lead="That usually means the next useful move is a submission, not a prettier empty calendar."
              actions={
                <ActionStrip>
                  <Link href="/submit" className="btn btn--primary">
                    Submit an event
                  </Link>
                </ActionStrip>
              }
            />
          ) : (
            groups.map((group) => (
              <section key={group.key} className="grid gap-4">
                <div className="flex items-baseline gap-4">
                  <h2 className="heading-lg">{group.label}</h2>
                  <span className="page-kicker">{group.events.length} event{group.events.length === 1 ? "" : "s"}</span>
                </div>
                <LedgerRows>
                  {group.events.map((event) => (
                    <LedgerRow
                      key={event.id}
                      label={formatEventDate(event.date, event.endDate)}
                      title={event.title}
                      summary={[
                        formatLocation(event.city, event.state),
                        regionMap.get(event.regionId)?.label,
                        event.time,
                      ]
                      .filter(Boolean)
                      .join(" · ")}
                      meta={event.hostCommittee}
                      actions={
                        <ActionStrip>
                          {event.registrationUrl ? (
                            <Link
                              href={event.registrationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn--secondary btn-sm"
                            >
                              Details
                            </Link>
                          ) : null}
                          <Link href="/submit" className="btn btn--ghost btn-sm">
                            Submit update
                          </Link>
                        </ActionStrip>
                      }
                    />
                  ))}
                </LedgerRows>
              </section>
            ))
          )}

          <FocalPanel

            kicker="Submit event"
            title="If your committee knows it, the region should be able to find it."
            lead="Public events stay useful when the people closest to them send real dates, real cities, and a real source link."
            actions={
              <ActionStrip>
                <Link href="/submit" className="btn btn--primary">
                  Submit an event
                </Link>
                <Link href="/events/archive" className="btn btn--ghost">
                  Open archive
                </Link>
              </ActionStrip>
            }
          />
        </div>
      </div>
    </PageShell>
  )
}

function groupEventsByMonth(
  events: Awaited<ReturnType<typeof getPublicEvents>>,
) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  })

  const grouped = new Map<
    string,
    { key: string; label: string; events: typeof events }
  >()

  for (const event of events) {
    const date = new Date(`${event.date}T00:00:00`)
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`
    const label = formatter.format(date)
    const entry = grouped.get(key)
    if (entry) {
      entry.events.push(event)
    } else {
      grouped.set(key, { key, label, events: [event] })
    }
  }

  return Array.from(grouped.values())
}
