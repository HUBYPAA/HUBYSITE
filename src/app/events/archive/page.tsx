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
    <section className="shell">
      <header
        style={{
          maxWidth: "60ch",
          margin: "0 auto",
          textAlign: "center",
          paddingTop: "var(--space-16)",
          paddingBottom: "var(--space-8)",
        }}
      >
        <span
          className="starmark starmark--xl starmark--dim"
          aria-hidden
          style={{ display: "inline-block", marginBottom: "var(--space-5)" }}
        />
        <h1 className="display-page">
          The stars <em>that have set.</em>
        </h1>
        <p
          className="lede"
          style={{ marginTop: "var(--space-4)", marginInline: "auto" }}
        >
          Every conference we&rsquo;ve tracked, after it ended. Kept on
          record so the weekend you loved is still findable.
        </p>
      </header>

      <section
        className="section"
        style={{ paddingTop: 0, paddingBottom: "var(--space-16)" }}
      >
        {past.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "var(--fg-muted)",
            }}
          >
            No archived records yet.
          </p>
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

        <div
          style={{
            marginTop: "var(--space-8)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href="/events" className="btn btn--ghost">
            Back to upcoming
          </Link>
        </div>
      </section>
    </section>
  )
}
