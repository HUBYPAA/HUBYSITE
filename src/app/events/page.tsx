import type { Metadata } from "next"
import Link from "next/link"
import { getUpcomingConferences } from "@/lib/data/query/conferences"
import { formatDateRange } from "@/lib/utils/dates"
import { RunningHead } from "@/lib/components/ornament"

export const metadata: Metadata = {
  title: "Events",
  description: "One-off young people's AA events, gatherings, and regional retreats.",
}

export default function EventsPage() {
  const upcoming = getUpcomingConferences()

  return (
    <section className="shell" aria-labelledby="events-title">
      <header className="section section--hero">
        <RunningHead
          left={<span className="smallcaps">Events</span>}
          center={<span>The week ahead</span>}
        />
        <h1 id="events-title" className="section-head">
          A simpler calendar for what is <em>actually coming up.</em>
        </h1>
        <p className="lede max-w-2xl">
          Conferences, weekend retreats, regional gatherings — sorted by
          the night they open. Some are ready to plan around. Some are
          placeholders still waiting on confirmation.
        </p>
      </header>

      <section className="section section--tight">
        <div className="event-list">
          {upcoming.map((c, i) => (
            <Link
              key={c.slug}
              href={`/conferences/${c.slug}`}
              className="event-row"
            >
              <span className="event-row__idx">
                /{String(i + 1).padStart(2, "0")}
              </span>
              <span className="event-row__when">
                {formatDateRange(c.startDate, c.endDate) || "TBA"}
              </span>
              <span className="event-row__name">{c.title}</span>
              <span className="event-row__where">
                {[c.city, c.stateAbbreviation].filter(Boolean).join(", ") ||
                  "—"}
              </span>
            </Link>
          ))}
        </div>

        <div className="section__actions">
          <Link href="/submit" className="btn btn--primary">
            Submit an event
          </Link>
          <Link href="/events/archive" className="btn btn--ghost">
            Archive
          </Link>
        </div>
      </section>
    </section>
  )
}
