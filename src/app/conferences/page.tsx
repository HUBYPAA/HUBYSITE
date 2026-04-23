import type { Metadata } from "next"
import Link from "next/link"
import {
  getUpcomingConferences,
  getPastConferences,
  getConferenceCount,
} from "@/lib/data/query/conferences"
import { formatDateRange } from "@/lib/utils/dates"
import { projectToSky, jitter } from "@/lib/utils/vault-projection"

export const metadata: Metadata = {
  title: "Conferences · Named as Constellations",
  description:
    "The named weekends of young people's AA — conferences plotted as constellations across the continent.",
}

export default function ConferencesPage() {
  const upcoming = getUpcomingConferences()
  const past = getPastConferences()
  const total = getConferenceCount()

  // Plot upcoming conferences onto a wide sky panel
  const plotted = upcoming
    .filter((c) => c.coordinates)
    .map((c, i) => {
      const p = projectToSky(c.coordinates!.lat, c.coordinates!.lng)
      const j = jitter(c.slug, 1, 1)
      return {
        conf: c,
        x: p.x + j.x,
        y: p.y + j.y,
        order: i,
      }
    })

  const linePath =
    plotted.length >= 2
      ? `M ${plotted
          .slice(0, 6)
          .map((p) => `${p.x} ${p.y}`)
          .join(" L ")}`
      : ""

  return (
    <>
      <section
        className="section"
        style={{
          paddingTop: "104px",
          paddingBottom: "32px",
          maxWidth: "1440px",
        }}
      >
        <div className="section__eyebrow">
          <span>PLATE · III · THE CONSTELLATIONS</span>
          <span className="sep" />
          <span>{total} NAMED WEEKENDS</span>
        </div>
        <h1 className="section__title">
          Fourteen <em>constellations</em>,
          <br />
          four weekends <em>deep</em>.
        </h1>
        <p className="section__lede">
          Every young people&rsquo;s AA conference we track, plotted on the
          sky and catalogued below. Click a star to open its plate.
        </p>
      </section>

      {/* Constellation plate */}
      <section style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 48px" }}>
        <div className="plate" style={{ height: "480px" }}>
          <span className="plate__corner tl" />
          <span className="plate__corner tr" />
          <span className="plate__corner bl" />
          <span className="plate__corner br" />
          <div className="plate__label">
            <span>
              <b>PROJECTION</b> · EQUIRECTANGULAR · CONUS + EUROPE
            </span>
            <span>
              {plotted.length} STARS VISIBLE · Z {upcoming.length}D
            </span>
          </div>

          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              pointerEvents: "none",
            }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="conf-arc" x1="0" x2="1">
                <stop offset="0%" stopColor="#D6A24E" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#D6A24E" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#D6A24E" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {linePath && (
              <path
                d={linePath}
                stroke="url(#conf-arc)"
                strokeWidth="0.2"
                fill="none"
                strokeDasharray="0.4 0.8"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </svg>

          {plotted.map((p) => (
            <Link
              key={p.conf.slug}
              href={`/conferences/${p.conf.slug}`}
              className="major"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span className="dot" />
              <span className="label">
                <span className="name">{p.conf.title}</span>
                <span className="meta">
                  {[p.conf.city, shortDate(p.conf.startDate)]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming catalog */}
      <section className="section" style={{ paddingTop: "72px" }}>
        <div className="section__eyebrow">
          <span>INDEX · UPCOMING WEEKENDS</span>
          <span className="sep" />
          <span>{upcoming.length}</span>
        </div>
        <div style={{ marginTop: "32px", display: "grid", gap: 0 }}>
          {upcoming.map((c, i) => (
            <ConferenceRow key={c.slug} conf={c} index={i + 1} />
          ))}
        </div>
      </section>

      {past.length ? (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__eyebrow">
            <span>ARCHIVE · PAST WEEKENDS</span>
            <span className="sep" />
            <span>{past.length}</span>
          </div>
          <div style={{ marginTop: "32px" }}>
            {past.map((c, i) => (
              <ConferenceRow key={c.slug} conf={c} index={i + 1} past />
            ))}
          </div>
        </section>
      ) : null}

      <div style={{ height: 120 }} />
    </>
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
      className="conf-row"
      style={{
        padding: "22px 0",
        borderBottom: "1px solid rgba(214,162,78,0.14)",
        textDecoration: "none",
        color: "inherit",
        opacity: past ? 0.6 : 1,
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
        /{String(index).padStart(2, "0")}
      </span>
      <span>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 24,
            fontWeight: 400,
            color: "var(--parchment)",
            letterSpacing: "-0.01em",
            display: "block",
            lineHeight: 1.15,
          }}
        >
          {conf.title}
        </span>
        {conf.summary ? (
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              color: "var(--parchment)",
              opacity: 0.72,
              marginTop: 6,
              display: "block",
              lineHeight: 1.5,
            }}
          >
            {conf.summary}
          </span>
        ) : null}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--gold)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {formatDateRange(conf.startDate, conf.endDate) || "TBA"}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--parchment)",
          opacity: 0.78,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          textAlign: "right",
        }}
      >
        {[conf.city, conf.stateAbbreviation].filter(Boolean).join(", ") || "—"}
      </span>
    </Link>
  )
}

function shortDate(iso?: string): string {
  if (!iso) return ""
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return ""
  return d
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toUpperCase()
}