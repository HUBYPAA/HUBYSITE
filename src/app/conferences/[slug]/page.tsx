import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  getConferenceBySlug,
  getConferences,
  getUpcomingConferences,
} from "@/lib/data/query/conferences"
import { formatDateRange } from "@/lib/utils/dates"
import type { Conference } from "@/lib/data/normalized/types"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getConferences().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = getConferenceBySlug(slug)
  if (!c) return { title: "Conference" }
  return {
    title: c.title,
    description:
      c.summary ??
      `Conference detail for ${c.title} in ${c.city ?? c.stateAbbreviation ?? "the United States"}.`,
  }
}

export default async function ConferenceDetailPage({ params }: Props) {
  const { slug } = await params
  const conf = getConferenceBySlug(slug)
  if (!conf) notFound()

  const dateRange = formatDateRange(conf.startDate, conf.endDate) || "Dates pending"
  const other = getUpcomingConferences()
    .filter((c) => c.slug !== conf.slug)
    .slice(0, 3)

  const days = daysUntil(conf.startDate)

  // A default 4-night route for the conference body
  const routeNodes = inferRoute(conf)

  return (
    <>
      {/* ────── HERO PLATE ────── */}
      <section className="hero">
        <div className="hero__inner">
          <div>
            <Link
              href="/conferences"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold-aged)",
                textDecoration: "none",
                display: "inline-block",
                marginBottom: 24,
              }}
            >
              ← ALL CONSTELLATIONS
            </Link>
            <div className="hero__meta">
              <span>PLATE · {conf.slug.slice(0, 6).toUpperCase()}</span>
              <span className="sep" />
              <span>{conf.stateAbbreviation ?? "—"}</span>
              <span className="sep" />
              <span>
                {conf.conferenceStatus.toUpperCase().replace(/-/g, " ")}
              </span>
            </div>
            <h1 className="hero__title">
              <em>{conf.title}</em>
            </h1>
            {conf.summary ? (
              <p className="hero__lede">{conf.summary}</p>
            ) : null}

            <div className="hero__facts">
              <div className="fact">
                <div className="fact__k">WHEN</div>
                <div className="fact__v">
                  <em>{dateRange}</em>
                </div>
              </div>
              <div className="fact">
                <div className="fact__k">WHERE</div>
                <div className="fact__v">
                  {[conf.city, conf.stateAbbreviation].filter(Boolean).join(", ") ||
                    "TBA"}
                </div>
              </div>
              <div className="fact">
                <div className="fact__k">T-MINUS</div>
                <div className="fact__v">
                  <em>{days != null ? `${days}D` : "—"}</em>
                </div>
              </div>
              <div className="fact">
                <div className="fact__k">PRICE</div>
                <div className="fact__v">{conf.price || "—"}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
              {conf.registrationUrl ? (
                <Link
                  href={conf.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  REGISTER ↗
                </Link>
              ) : null}
              {conf.websiteUrl ? (
                <Link
                  href={conf.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost"
                >
                  HOST SITE ↗
                </Link>
              ) : null}
            </div>
          </div>

          {/* Constellation plate (The Hearth) */}
          <div>
            <div className="plate">
              <span className="plate__corner tl" />
              <span className="plate__corner tr" />
              <span className="plate__corner bl" />
              <span className="plate__corner br" />
              <div className="plate__label">
                <span>
                  <b>THE HEARTH</b> · CONSTELLATION PLATE
                </span>
                <span>{conf.year ?? ""}</span>
              </div>

              <HearthDiagram conf={conf} />
            </div>
          </div>
        </div>
      </section>

      {/* ────── THE ROUTE ────── */}
      <section className="section" style={{ paddingTop: 72 }}>
        <div className="hero-detail-grid">
          <div>
            <div className="section__eyebrow">
              <span>PLATE · IV</span>
              <span className="sep" />
              <span>THE ROUTE</span>
            </div>
            <h2 className="section__title">
              Four nights, <em>held.</em>
            </h2>
            <p className="section__lede">
              The shape of a young people&rsquo;s weekend is surprisingly
              constant — an opening night, a marathon of meetings, a dance,
              a closing. The names change. The geometry doesn&rsquo;t.
            </p>

            <div className="timeline" style={{ marginTop: 32 }}>
              {routeNodes.map((n, i) => (
                <div className="timeline__node" key={i}>
                  <span className="timeline__dot" />
                  <div className="timeline__time">{n.time}</div>
                  <div className="timeline__name">
                    <em>{n.name}</em>
                  </div>
                  <div className="timeline__body">{n.body}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Field notes side panel */}
          <aside>
            <div className="detail" style={{ position: "relative" }}>
              <div className="detail__idx">
                <span>FIELD NOTES</span>
                <span>/03</span>
              </div>
              <h3 className="detail__name">
                <em>What to expect.</em>
              </h3>
              <p className="detail__addr">
                Young people&rsquo;s AA conferences are 18-to-40-ish in
                shape, open to any alcoholic who thinks they might belong,
                and run entirely by the young people who registered last
                year. The program is the point. The dance is the reward.
              </p>
              <div className="detail__rows">
                <div className="r">
                  <span>ORGANIZER</span>
                  <b>{conf.organizer || "Host committee"}</b>
                </div>
                <div className="r">
                  <span>CAPACITY</span>
                  <b>{conf.capacity ? `${conf.capacity}` : "—"}</b>
                </div>
                <div className="r">
                  <span>VENUE</span>
                  <b>{conf.venue || "—"}</b>
                </div>
                <div className="r">
                  <span>TRADITIONS</span>
                  <b>SELF-SUPPORTING · T7</b>
                </div>
              </div>
              {conf.notes ? (
                <p
                  className="detail__addr"
                  style={{
                    marginTop: 16,
                    paddingTop: 14,
                    borderTop: "1px solid rgba(214,162,78,0.2)",
                    fontStyle: "italic",
                    color: "var(--gold)",
                    opacity: 0.9,
                  }}
                >
                  &ldquo;{conf.notes}&rdquo;
                </p>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      {/* ────── SIBLINGS ────── */}
      {other.length ? (
        <section className="section" style={{ paddingTop: 40 }}>
          <div className="section__eyebrow">
            <span>NEARBY CONSTELLATIONS</span>
            <span className="sep" />
            <span>{other.length}</span>
          </div>
          <div
            style={{
              marginTop: 32,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {other.map((o) => (
              <Link
                key={o.slug}
                href={`/conferences/${o.slug}`}
                style={{
                  display: "block",
                  padding: "22px 24px",
                  border: "1px solid rgba(214,162,78,0.28)",
                  textDecoration: "none",
                  transition: "border-color 150ms",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "var(--gold-aged)",
                    textTransform: "uppercase",
                  }}
                >
                  {[o.city, o.stateAbbreviation].filter(Boolean).join(" · ")}
                </span>
                <h4
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 22,
                    color: "var(--parchment)",
                    marginTop: 10,
                    lineHeight: 1.15,
                  }}
                >
                  {o.title}
                </h4>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    color: "var(--gold)",
                    marginTop: 10,
                    display: "block",
                  }}
                >
                  {formatDateRange(o.startDate, o.endDate) || "TBA"}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <div style={{ height: 160 }} />
    </>
  )
}

/** Renders the conference as a small constellation inside its hero plate. */
function HearthDiagram({ conf }: { conf: Conference }) {
  // 4 named nodes in a diamond — Opening · Marathon · Dance · Closing
  const nodes = [
    { x: 50, y: 22, label: "Opening Night" },
    { x: 82, y: 50, label: "The Marathon" },
    { x: 50, y: 78, label: "The Dance" },
    { x: 18, y: 50, label: "Closing" },
  ]

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon
          points={nodes.map((n) => `${n.x},${n.y}`).join(" ")}
          fill="none"
          stroke="#D6A24E"
          strokeWidth="0.22"
          opacity="0.55"
          strokeDasharray="0.6 0.9"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {nodes.map((n, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${n.x}%`,
            top: `${n.y}%`,
            transform: "translate(-50%, -50%)",
            zIndex: 3,
          }}
        >
          <span
            style={{
              display: "block",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "var(--gold)",
              boxShadow: "0 0 14px 3px rgba(214,162,78,0.6)",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: n.x > 50 ? "auto" : "18px",
              right: n.x > 50 ? "18px" : "auto",
              top: -8,
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: 13,
              color: "var(--parchment)",
              whiteSpace: "nowrap",
            }}
          >
            {n.label}
          </span>
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          bottom: 18,
          left: 18,
          right: 18,
          textAlign: "center",
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: 15,
          color: "var(--gold)",
          opacity: 0.8,
          letterSpacing: "0.08em",
        }}
      >
        — {conf.title.split(" ")[0]} —
      </div>
    </div>
  )
}

function inferRoute(_conf: Conference) {
  return [
    {
      time: "NIGHT I · OPENING",
      name: "Welcome meeting.",
      body: "Doors at 18:00. Opening speaker, a large meeting, dessert, the first Hospitality Suite open until the house says so.",
    },
    {
      time: "NIGHT II · THE MARATHON",
      name: "Six meetings before midnight.",
      body: "A panel track, a Big Book track, a speaker track, a young-person-sharing track. Pick one, pick all four, sleep less.",
    },
    {
      time: "NIGHT III · THE DANCE",
      name: "Banquet and dance.",
      body: "Dinner in the ballroom, a speaker who means it, then the dance goes past midnight. Wear what you want.",
    },
    {
      time: "NIGHT IV · CLOSING",
      name: "Spiritual breakfast.",
      body: "A closing speaker, a single-share meeting, the ceremonial handoff of the bid. Everyone leaves on time.",
    },
  ]
}

function daysUntil(iso?: string): number | null {
  if (!iso) return null
  const start = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(start.getTime())) return null
  const now = new Date()
  const diff = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diff > 0 ? diff : 0
}