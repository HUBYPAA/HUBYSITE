import type { Metadata } from "next"
import Link from "next/link"
import { getPastConferences } from "@/lib/data/query/conferences"
import { formatDateRange } from "@/lib/utils/dates"

export const metadata: Metadata = {
  title: "Archive · Dimmed Stars",
  description: "Past conferences and retired weekends. Kept on record, dimmed.",
}

export default function EventsArchivePage() {
  const past = getPastConferences()

  return (
    <>
      <section className="section section--hero">
        <div className="section__eyebrow">
          <span>Dimmed stars</span>
          <span className="sep" aria-hidden />
          <span>Plate IX · addendum</span>
        </div>
        <h1 className="section__title">
          The stars <em>that have set.</em>
        </h1>
        <p className="section__lede">
          Every conference we&rsquo;ve tracked, after it ended. We keep
          the record so that the weekend you loved is still findable.
        </p>
      </section>

      <section className="section section--tight">
        {past.length === 0 ? (
          <p className="empty-note">No archived records yet.</p>
        ) : (
          <div className="event-list">
            {past.map((c, i) => (
              <Link
                key={c.slug}
                href={`/conferences/${c.slug}`}
                className="event-row event-row--past"
              >
                <span className="event-row__idx">
                  /{String(i + 1).padStart(2, "0")}
                </span>
                <span className="event-row__when">
                  {formatDateRange(c.startDate, c.endDate) || "—"}
                </span>
                <span className="event-row__name">{c.title}</span>
                <span className="event-row__where">
                  {[c.city, c.stateAbbreviation].filter(Boolean).join(", ") ||
                    "—"}
                </span>
              </Link>
            ))}
          </div>
        )}

        <div className="section__actions">
          <Link href="/events" className="btn btn--ghost">
            Back to upcoming
          </Link>
        </div>
      </section>
    </>
  )
}