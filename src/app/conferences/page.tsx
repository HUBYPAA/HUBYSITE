import type { CSSProperties } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import {
  getUpcomingConferences,
  getPastConferences,
  getConferenceCount,
} from "@/lib/data/query/conferences"
import { formatDateRange } from "@/lib/utils/dates"
import {
  projectToSky,
  jitter,
  decollide,
} from "@/lib/utils/vault-projection"

export const metadata: Metadata = {
  title: "Conferences · Named as Constellations",
  description:
    "The named weekends of young people's AA — conferences plotted as constellations across the continent.",
}

export default function ConferencesPage() {
  const upcoming = getUpcomingConferences()
  const past = getPastConferences()
  const total = getConferenceCount()

  // Plot upcoming conferences onto a wide sky panel, then decollide
  // so the labels don't stack when multiple weekends land near each other.
  const rawPlotted = upcoming
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
  const plotted = decollide(rawPlotted)

  const linePath =
    plotted.length >= 2
      ? `M ${plotted
          .slice(0, 6)
          .map((p) => `${p.x} ${p.y}`)
          .join(" L ")}`
      : ""

  return (
    <>
      <section className="section section--hero">
        <div className="section__eyebrow">
          <span>The constellations</span>
          <span className="sep" aria-hidden />
          <span>Plate III</span>
          <span className="sep" aria-hidden />
          <span>{total} named weekends</span>
        </div>
        <h1 className="section__title">
          A more readable <em>calendar.</em>
        </h1>
        <p className="section__lede">
          Every young people&rsquo;s AA conference we track &mdash; plotted
          on the sky and catalogued below. One calendar. Real dates. Real
          sources. No more piecing a plan together from five group chats.
          Some are ready to book from. Some are scaffolds that still need
          confirmation.
        </p>
      </section>

      <section className="section section--tight">
        <div className="plate" style={{ height: 480 }}>
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

          {plotted.map((p) => {
            const onLeft = p.x > 70
            const labelStyle: CSSProperties = onLeft
              ? { left: "auto", right: "18px", top: "-4px", textAlign: "right" }
              : { left: "18px", top: "-4px" }
            return (
              <Link
                key={p.conf.slug}
                href={`/conferences/${p.conf.slug}`}
                className="major"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <span className="dot" />
                <span className="label" style={labelStyle}>
                  <span className="name">{p.conf.title}</span>
                  <span className="meta">
                    {[p.conf.city, shortDate(p.conf.startDate)]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="section section--sm">
        <div className="section__eyebrow">
          <span>Current calendar</span>
          <span className="sep" aria-hidden />
          <span>{upcoming.length} weekends tracked</span>
        </div>
        <div className="conf-list">
          {upcoming.map((c, i) => (
            <ConferenceRow key={c.slug} conf={c} index={i + 1} />
          ))}
        </div>
      </section>

      {past.length ? (
        <section className="section section--sm">
          <div className="section__eyebrow">
            <span>Archive</span>
            <span className="sep" aria-hidden />
            <span>{past.length} records</span>
          </div>
          <div className="conf-list">
            {past.map((c, i) => (
              <ConferenceRow key={c.slug} conf={c} index={i + 1} past />
            ))}
          </div>
        </section>
      ) : null}
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

function shortDate(iso?: string): string {
  if (!iso) return ""
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return ""
  return d
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toUpperCase()
}