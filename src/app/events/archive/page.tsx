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
      <section className="section" style={{ paddingTop: 104, paddingBottom: 40 }}>
        <div className="section__eyebrow">
          <span>PLATE · IX · ADDENDUM</span>
          <span className="sep" />
          <span>DIMMED STARS</span>
        </div>
        <h1 className="section__title">
          The stars <em>that have set.</em>
        </h1>
        <p className="section__lede">
          Every conference we&rsquo;ve tracked, after it ended. We keep
          the record so that the weekend you loved is still findable.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0, paddingBottom: 120 }}>
        {past.length === 0 ? (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--gold-aged)",
              opacity: 0.75,
            }}
          >
            No archived records yet.
          </p>
        ) : (
          <div>
            {past.map((c, i) => (
              <Link
                key={c.slug}
                href={`/conferences/${c.slug}`}
                className="event-row"
                style={{
                  padding: "22px 0",
                  borderBottom: "1px solid rgba(214,162,78,0.1)",
                  textDecoration: "none",
                  color: "inherit",
                  opacity: 0.55,
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
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    color: "var(--star-dim)",
                    textTransform: "uppercase",
                  }}
                >
                  {formatDateRange(c.startDate, c.endDate) || "—"}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: 20,
                    fontWeight: 400,
                    color: "var(--parchment)",
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
                    color: "var(--star-dim)",
                    textAlign: "right",
                  }}
                >
                  {[c.city, c.stateAbbreviation].filter(Boolean).join(", ") || "—"}
                </span>
              </Link>
            ))}
          </div>
        )}

        <div style={{ marginTop: 48 }}>
          <Link href="/events" className="btn btn--ghost">
            ← BACK TO UPCOMING
          </Link>
        </div>
      </section>
    </>
  )
}