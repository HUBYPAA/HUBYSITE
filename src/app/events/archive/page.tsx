import type { Metadata } from "next"
import Link from "next/link"
import {
  ActionStrip,
  LedgerRow,
  LedgerRows,
  MarginalRail,
  PageIntro,
  PageShell,
} from "@/lib/components/atlas"
import { formatEventDate, formatLocation } from "@/lib/hub/format"
import { getArchiveEvents, getRegions } from "@/lib/hub/queries"

export const metadata: Metadata = {
  title: "Events Archive",
  description: "Past approved regional events and archived public weekends.",
}

export const dynamic = "force-dynamic"

export default async function EventsArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string; year?: string }>
}) {
  const [events, regions, { region, year }] = await Promise.all([
    getArchiveEvents(),
    getRegions({ activeOnly: true }),
    searchParams,
  ])

  const years = Array.from(new Set(events.map((event) => event.date.slice(0, 4)))).sort(
    (left, right) => right.localeCompare(left),
  )
  const activeRegion = regions.find((entry) => entry.slug === region)?.id ?? "all"
  const activeYear = year && years.includes(year) ? year : "all"
  const regionMap = new Map(regions.map((entry) => [entry.id, entry]))

  const visible = events.filter((event) => {
    if (activeRegion !== "all" && event.regionId !== activeRegion) return false
    if (activeYear !== "all" && !event.date.startsWith(activeYear)) return false
    return true
  })

  return (
    <PageShell tone="stone">
      <div className="flex flex-col gap-8">
        <section className="celestial-hero star-field star-field--sparse">
          <div className="god-rays" aria-hidden="true" />
          <div className="celestial-hero__content shell">
            <PageIntro
              compact
              kicker="Events archive"
              title={
                <span className="float-text">
                  Quiet memory.
                  <br />
                  <em>Useful after the fact.</em>
                </span>
              }
              lead="Past weekends and regional events stay on record so the history is still findable without getting in the way of the live calendar."
            />
          </div>
        </section>

        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="grid gap-6">
            <div className="flex flex-wrap gap-x-4 gap-y-2 items-baseline">
              <span className="page-kicker" style={{ margin: 0 }}>Year</span>
              <Link
                href="/events/archive"
                className={activeYear === "all" ? "font-semibold text-[var(--ink)]" : "text-[var(--rib-blue)] hover:text-[var(--ink)]"}
              >
                All years
              </Link>
              {years.map((entry) => (
                <Link
                  key={entry}
                  href={`/events/archive?year=${entry}${region ? `&region=${region}` : ""}`}
                  className={activeYear === entry ? "font-semibold text-[var(--ink)]" : "text-[var(--rib-blue)] hover:text-[var(--ink)]"}
                >
                  {entry}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 items-baseline">
              <span className="page-kicker" style={{ margin: 0 }}>Region</span>
              <Link
                href={`/events/archive${activeYear !== "all" ? `?year=${activeYear}` : ""}`}
                className={activeRegion === "all" ? "font-semibold text-[var(--ink)]" : "text-[var(--rib-blue)] hover:text-[var(--ink)]"}
              >
                All regions
              </Link>
              {regions.map((entry) => (
                <Link
                  key={entry.id}
                  href={`/events/archive?region=${entry.slug}${activeYear !== "all" ? `&year=${activeYear}` : ""}`}
                  className={activeRegion === entry.id ? "font-semibold text-[var(--ink)]" : "text-[var(--rib-blue)] hover:text-[var(--ink)]"}
                >
                  {entry.label}
                </Link>
              ))}
            </div>

            {visible.length === 0 ? (
              <p className="body-sm" style={{ margin: 0 }}>
                No archived events match that year and region.
              </p>
            ) : (
              <LedgerRows>
                {visible.map((event) => (
                  <LedgerRow
                    key={event.id}
                    label={formatEventDate(event.date, event.endDate)}
                    title={event.title}
                    summary={[
                      formatLocation(event.city, event.state),
                      regionMap.get(event.regionId)?.label,
                      event.hostCommittee,
                    ]
                    .filter(Boolean)
                    .join(" · ")}
                    meta={event.time || "Archived"}
                  />
                ))}
              </LedgerRows>
            )}
          </div>

          <MarginalRail kicker="Context" title="Archive rules">
            <p style={{ margin: 0 }}>
              Past events roll here after they end. The record stays useful.
            </p>
            <p style={{ margin: 0 }}>
              Anything wrong should still be corrected so the archive stays honest.
            </p>
            <ActionStrip>
              <Link href="/events" className="btn btn--ghost btn-sm">
                Back to upcoming
              </Link>
            </ActionStrip>
          </MarginalRail>
        </div>
      </div>
    </PageShell>
  )
}
