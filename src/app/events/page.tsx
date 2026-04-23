import type { Metadata } from "next"
import Link from "next/link"
import { getUpcomingConferences } from "@/lib/data/query/conferences"
import { formatDateRange } from "@/lib/utils/dates"

export const metadata: Metadata = {
  title: "Events · The Week Ahead",
  description: "One-off young people's AA events, gatherings, and regional retreats.",
}

export default function EventsPage() {
  const upcoming = getUpcomingConferences()

  return (
    <>
      <section className="section section--hero">
        <div className="section__eyebrow">
          <span>The week ahead</span>
          <span className="sep" aria-hidden />
          <span>Plate IX</span>
        </div>
        <h1 className="section__title">
          Everything <em>in the sky,</em> in order.
        </h1>
        <p className="section__lede">
          Conferences, weekend retreats, regional gatherings — sorted by
          the night they open. Click through for details on any one.
        </p>
      </section>

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
    </>
  )
}
