import type { Metadata } from "next"
import Link from "next/link"
import {
  ActionStrip,
  StarCanopy,
  LedgerRow,
  LedgerRows,
  PageIntro,
  PageShell,
} from "@/lib/components/atlas"
import {
  getConferenceCount,
  getPastConferences,
  getUpcomingConferences,
} from "@/lib/data/query/conferences"
import { formatDateRange } from "@/lib/utils/dates"

export const metadata: Metadata = {
  title: "Conferences",
  description:
    "Upcoming YPAA conferences, regional filters, and the wider calendar of weekends worth following.",
}

export default async function ConferencesPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>
}) {
  const upcoming = getUpcomingConferences()
  const past = getPastConferences()
  const total = getConferenceCount()
  const { region } = await searchParams

  const regions = Array.from(
    new Set(upcoming.map((conference) => conference.region).filter(Boolean)),
  ).sort((left, right) => left!.localeCompare(right!))

  const activeRegion = region && regions.includes(region) ? region : "all"

  const visible =
    activeRegion === "all"
      ? upcoming
      : upcoming.filter((conference) => conference.region === activeRegion)

  return (
    <PageShell tone="stone">
      <div className="flex flex-col gap-8">
        <section className="celestial-hero star-field star-field--medium">
          <div className="god-rays" aria-hidden="true" />
          <div className="celestial-hero__content shell">
            <PageIntro
              compact
              kicker="Conferences"
              title={
                <span className="float-text">
                  The weekends as regional rhythm.
                  <br />
                  <em>Readable, desirable, and real.</em>
                </span>
              }
              lead={
                <>
                  {total} conference records are in the system. Some are fully
                  usable. Some are placeholders that still need confirmation. The
                  product needs both honesty and momentum.
                </>
              }
              actions={
                <ActionStrip>
                  <Link href="/events/archive" className="btn btn--ghost">
                    Weekend archive
                  </Link>
                </ActionStrip>
              }
            />
          </div>
        </section>

        <div className="shell flex flex-col gap-10">
          {/* Region filters as text links, not buttons */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 items-baseline">
            <span className="page-kicker" style={{ margin: 0 }}>Filter</span>
            <Link
              href="/conferences"
              className={activeRegion === "all" ? "font-semibold text-[var(--ink)]" : "text-[var(--rib-blue)] hover:text-[var(--ink)]"}
            >
              All regions
            </Link>
            {regions.map((entry) => (
              <Link
                key={entry}
                href={`/conferences?region=${encodeURIComponent(entry!)}`}
                className={activeRegion === entry ? "font-semibold text-[var(--ink)]" : "text-[var(--rib-blue)] hover:text-[var(--ink)]"}
              >
                {entry}
              </Link>
            ))}
            <span className="ml-auto page-kicker" style={{ margin: 0 }}>
              {visible.length} upcoming
            </span>
          </div>

          <LedgerRows>
            {visible.map((conference) => (
              <LedgerRow
                key={conference.slug}
                label={formatDateRange(conference.startDate, conference.endDate) || "Dates pending"}
                title={conference.title}
                summary={
                  conference.summary ??
                  ([conference.city, conference.stateAbbreviation].filter(Boolean).join(", ") ||
                    "Record in progress")
                }
                meta={[conference.city, conference.stateAbbreviation].filter(Boolean).join(", ") || "Location pending"}
                actions={
                  <ActionStrip>
                    <Link
                      href={`/conferences/${conference.slug}`}
                      className="btn btn--secondary btn-sm"
                    >
                      Details
                    </Link>
                    {conference.registrationUrl ? (
                      <Link
                        href={conference.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--ghost btn-sm"
                      >
                        Register
                      </Link>
                    ) : null}
                  </ActionStrip>
                }
              />
            ))}
          </LedgerRows>

          <StarCanopy
            kicker="Canopy reveal"
            title="Separate weekends, one living pattern."
            lead="This is the strongest canopy moment in the site. Conferences become brighter marks on a painted blue structure so the calendar feels connected without turning into cosmic wallpaper."
            items={visible.slice(0, 6).map((conference) => ({
              href: `/conferences/${conference.slug}`,
              title: conference.title,
              meta: [
                shortRange(conference.startDate, conference.endDate),
                conference.city,
                conference.stateAbbreviation,
              ]
                .filter(Boolean)
                .join(" · "),
            }))}
            footer={
              <ActionStrip>
                <Link href="/submit" className="btn btn--secondary">
                  Submit a weekend update
                </Link>
                <Link href="/events/archive" className="btn btn--ghost">
                  Open the archive
                </Link>
              </ActionStrip>
            }
          />

          {/* Archive section - no cards */}
          <section className="grid gap-6 py-8 border-t border-[rgba(24,50,74,0.1)]">
            <div>
              <p className="page-kicker">Archive</p>
              <h2 className="heading-lg">Institutional memory, not dead space.</h2>
            </div>
            <p className="body-sm" style={{ maxWidth: "60ch" }}>
              Past weekends still matter. The archive keeps them on record without
              making the current calendar harder to scan.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {past.slice(0, 3).map((conference) => (
                <div key={conference.slug} className="grid gap-2">
                  <p className="page-kicker">{shortRange(conference.startDate, conference.endDate)}</p>
                  <h3 className="heading-md">{conference.title}</h3>
                  <p className="body-sm" style={{ margin: 0 }}>
                    {[conference.city, conference.stateAbbreviation].filter(Boolean).join(", ") || "Location pending"}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  )
}

function shortRange(start?: string, end?: string) {
  return formatDateRange(start, end) || "Dates pending"
}
