import type { Metadata } from "next"
import Link from "next/link"
import {
  getUpcomingConferences,
  getPastConferences,
  getConferenceCount,
  getConferenceMapMarkers,
} from "@/lib/data/query/conferences"
import { formatDateRange } from "@/lib/utils/dates"
import { ConferencesAtlas } from "@/lib/components/vault/conferences-atlas"

export const metadata: Metadata = {
  title: "Conferences",
  description:
    "Upcoming and past YPAA conferences with map context, cleaner scanning, and room for better records over time.",
}

export default function ConferencesPage() {
  const upcoming = getUpcomingConferences()
  const past = getPastConferences()
  const total = getConferenceCount()
  const markers = getConferenceMapMarkers()

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
          className="starmark starmark--xl"
          aria-hidden
          style={{ display: "inline-block", marginBottom: "var(--space-5)" }}
        />
        <h1 className="display-page">
          A readable calendar <em>for what&rsquo;s coming up.</em>
        </h1>
        <p
          className="lede"
          style={{ marginTop: "var(--space-4)", marginInline: "auto" }}
        >
          {total} conference records are in the system. Some are fully
          usable. Some are placeholders that still need confirmation. The
          product needs both honesty and momentum.
        </p>
      </header>

      <section
        className="section"
        style={{ paddingTop: 0, paddingBottom: "var(--space-12)" }}
      >
        <div className="map-frame">
          <ConferencesAtlas markers={markers} />
        </div>
      </section>

      <section
        className="section"
        style={{ paddingTop: 0, paddingBottom: "var(--space-12)" }}
      >
        <Eyebrow
          left="Current calendar"
          right={`${upcoming.length} weekends tracked`}
        />
        <div className="conf-list" style={{ marginTop: "var(--space-5)" }}>
          {upcoming.map((c, i) => (
            <ConferenceRow key={c.slug} conf={c} index={i + 1} />
          ))}
        </div>
      </section>

      {past.length ? (
        <section
          className="section"
          style={{ paddingTop: 0, paddingBottom: "var(--space-16)" }}
        >
          <Eyebrow left="Archive" right={`${past.length} records`} />
          <div className="conf-list" style={{ marginTop: "var(--space-5)" }}>
            {past.map((c, i) => (
              <ConferenceRow key={c.slug} conf={c} index={i + 1} past />
            ))}
          </div>
        </section>
      ) : null}
    </section>
  )
}

function Eyebrow({ left, right }: { left: string; right?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        paddingBlock: "var(--space-3)",
        borderTop: "var(--rule)",
        borderBottom: "var(--rule-hair)",
        fontFamily: "var(--font-mono)",
        fontFeatureSettings: 'var(--ff-label)',
        fontSize: "11px",
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        color: "var(--gilt-aged)",
      }}
    >
      <span>{left}</span>
      {right ? (
        <>
          <span
            style={{
              flex: 1,
              height: "1px",
              background: "var(--rule-hair-color)",
            }}
            aria-hidden
          />
          <span style={{ color: "var(--gilt)" }}>{right}</span>
        </>
      ) : null}
    </div>
  )
}

function ConferenceRow({
  conf,
  index,
  past = false,
}: {
  conf: ReturnType<typeof getUpcomingConferences>[number]
  index: number
  past?: boolean
}) {
  return (
    <Link
      href={`/conferences/${conf.slug}`}
      className={`conf-row${past ? " conf-row--past" : ""}`}
    >
      <span className="conf-row__idx">
        /{String(index).padStart(2, "0")}
      </span>
      <span className="conf-row__body">
        <span className="conf-row__title">{conf.title}</span>
        {conf.summary ? (
          <span className="conf-row__summary">{conf.summary}</span>
        ) : null}
      </span>
      <span className="conf-row__when">
        {formatDateRange(conf.startDate, conf.endDate) || "TBA"}
      </span>
      <span className="conf-row__where">
        {[conf.city, conf.stateAbbreviation].filter(Boolean).join(", ") || "—"}
      </span>
    </Link>
  )
}
