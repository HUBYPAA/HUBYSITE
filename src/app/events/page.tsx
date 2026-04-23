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
      <section className="section" style={{ paddingTop: 104, paddingBottom: 40 }}>
        <div className="section__eyebrow">
          <span>PLATE · IX</span>
          <span className="sep" />
          <span>THE WEEK AHEAD</span>
        </div>
        <h1 className="section__title">
          Everything <em>in the sky,</em>
          <br />
          in order.
        </h1>
        <p className="section__lede">
          Conferences, weekend retreats, regional gatherings — sorted by
          the night they open. Click through for details on any one.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div style={{ marginTop: 20 }}>
          {upcoming.map((c, i) => (
            <Link
              key={c.slug}
              href={`/conferences/${c.slug}`}
              className="event-row"
              style={{
                padding: "24px 0",
                borderBottom: "1px solid rgba(214,162,78,0.14)",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--gold-aged)",
                }}
              >
                /{String(i + 1).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  color: "var(--gold)",
                  textTransform: "uppercase",
                }}
              >
                {formatDateRange(c.startDate, c.endDate) || "TBA"}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 22,
                  fontWeight: 400,
                  color: "var(--parchment)",
                  letterSpacing: "-0.005em",
                }}
              >
                {c.title}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--parchment)",
                  opacity: 0.78,
                  textAlign: "right",
                }}
              >
                {[c.city, c.stateAbbreviation].filter(Boolean).join(", ") || "—"}
              </span>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 48, display: "flex", gap: 16 }}>
          <Link href="/events/archive" className="btn btn--ghost">
            ARCHIVE →
          </Link>
          <Link href="/submit" className="btn btn--primary">
            ✦ SUBMIT AN EVENT
          </Link>
        </div>
      </section>
    </>
  )
}