import { Sky } from "@/lib/components/vault/sky"
import {
  getUpcomingConferences,
  getFeaturedConference,
  getConferenceCount,
} from "@/lib/data/query/conferences"
import { getMeetings, getMeetingCount } from "@/lib/data/query/meetings"
import { formatDateRange } from "@/lib/utils/dates"
import Link from "next/link"

export default function VaultHome() {
  const conferences = getUpcomingConferences()
  const meetings = getMeetings()
  const featured = getFeaturedConference()
  const meetingN = getMeetingCount()
  const conferenceN = getConferenceCount()

  // Pick a "now" meeting — prefer Southern/Midwestern so the coral pulse
  // sits in empty sky, not on top of our corner panels or conference labels.
  // Target zone: 28°-38° N, -100° to -82° W (roughly Texas → Georgia).
  const nowMeeting =
    meetings.find(
      (m) =>
        m.coordinates &&
        m.coordinates.lat >= 28 &&
        m.coordinates.lat <= 38 &&
        m.coordinates.lng >= -100 &&
        m.coordinates.lng <= -82,
    ) ??
    meetings.find(
      (m) =>
        m.coordinates &&
        m.coordinates.lat >= 28 &&
        m.coordinates.lat <= 38,
    ) ??
    meetings.find((m) => m.coordinates)

  return (
    <>
      <Sky conferences={conferences} meetings={meetings} />

      {/* Engraved hero title */}
      <div className="engrave">
        <div className="engrave__eyebrow">
          <span>PLATE · I</span>
          <span className="sep" />
          <span>THE VAULT · LIVE SKY</span>
          <span className="sep" />
          <span>EDITION MMXXV</span>
        </div>
        <h1 className="engrave__title">
          A sky of
          <br />
          meetings.
        </h1>
        <p className="engrave__sub">
          {spellOut(meetingN)} young people&rsquo;s AA meetings and{" "}
          {spellOut(conferenceN)} conferences, <em>mapped like somebody
          meant it</em>. Volunteer-built. No endorsements. No attendance
          data. The coral star is starting soon.
        </p>

        {/* Mobile-only inline card (panels are hidden below 700px) */}
        <div className="mobile-only-card">
          {featured ? (
            <Link
              href={`/conferences/${featured.slug}`}
              style={{
                display: "block",
                marginTop: 28,
                padding: "18px 20px",
                border: "1px solid rgba(214,162,78,0.4)",
                background: "rgba(11,10,8,0.7)",
                textDecoration: "none",
                color: "inherit",
                pointerEvents: "auto",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9.5,
                  letterSpacing: "0.2em",
                  color: "var(--gold)",
                  textTransform: "uppercase",
                }}
              >
                NEXT WEEKEND
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 24,
                  color: "var(--parchment)",
                  marginTop: 6,
                  lineHeight: 1.1,
                }}
              >
                {featured.title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  color: "var(--gold-aged)",
                  marginTop: 8,
                  textTransform: "uppercase",
                }}
              >
                {[featured.city, shortDate(featured.startDate)]
                  .filter(Boolean)
                  .join(" · ")}
              </div>
            </Link>
          ) : null}
          <Link
            href="/meetings"
            className="btn btn--primary"
            style={{
              marginTop: 14,
              width: "100%",
              justifyContent: "center",
              pointerEvents: "auto",
            }}
          >
            ✦ FIND A MEETING
          </Link>
        </div>
      </div>

      {/* Top-right sitrep */}
      <aside className="panel" style={{ top: "112px", right: "32px" }}>
        <div className="panel__label">
          <span>TONIGHT · SITREP</span>
          <span className="idx">/01</span>
        </div>
        <div className="panel__title">
          {conferenceN} constellations,
          <br />
          <em>kept by hand.</em>
        </div>
        <div className="panel__body">
          Every one is a young people&rsquo;s AA weekend. The listings that
          survive here are the ones people keep checking. Registration
          links go straight to the host&rsquo;s own site.
        </div>
        <div className="panel__row">
          <span>CATALOG</span>
          <span>{meetingN} MEETINGS</span>
        </div>
        <div className="panel__row">
          <span>NEXT WEEKEND</span>
          <span>{featured ? shortDate(featured.startDate) : "—"}</span>
        </div>
        <div className="panel__row">
          <span>LAST UPDATE</span>
          <span>{shortDate(new Date().toISOString())}</span>
        </div>
      </aside>

      {/* Lower-left featured conference */}
      {featured ? (
        <aside className="panel" style={{ bottom: "148px", left: "32px" }}>
          <div className="panel__label">
            <span>FEATURED CONSTELLATION</span>
            <span className="idx">/02</span>
          </div>
          <Link
            href={`/conferences/${featured.slug}`}
            style={{ textDecoration: "none" }}
          >
            <div
              className="panel__title"
              style={{ fontStyle: "italic", fontWeight: 400 }}
            >
              {featured.title}
            </div>
          </Link>
          <div className="panel__body">
            {featured.summary ??
              `${featured.city ?? "—"} · ${formatDateRange(
                featured.startDate,
                featured.endDate,
              ) || "Dates pending"}.`}
          </div>
          <div className="panel__row">
            <span>REG STATUS</span>
            <span>{formatStatus(featured.conferenceStatus)}</span>
          </div>
          <div className="panel__row">
            <span>WHEN</span>
            <span>
              {formatDateRange(featured.startDate, featured.endDate) || "TBA"}
            </span>
          </div>
        </aside>
      ) : null}

      {/* "Now" pulse — a nearby meeting starting soon */}
      {nowMeeting && nowMeeting.coordinates ? (
        <NowPulseClient meeting={nowMeeting} />
      ) : null}

      {/* Constellation labels, hand-placed to match mockup poetry */}
      <div className="constel-label" style={{ left: "26%", top: "68%" }}>
        THE ROAD
      </div>
      <div className="constel-label" style={{ left: "56%", top: "34%" }}>
        THE HEARTH
      </div>
      <div className="constel-label" style={{ left: "11%", top: "72%" }}>
        THE PACIFIC ARC
      </div>
      <div className="constel-label" style={{ left: "52%", top: "18%" }}>
        THE GOLD COAST
      </div>

      {/* Edge ticks */}
      <div className="edge-ticks" aria-hidden>
        <span className="t" style={{ top: "18%", left: "18px" }}>
          +60°
        </span>
        <span className="t" style={{ top: "36%", left: "18px" }}>
          +40°
        </span>
        <span className="t" style={{ top: "54%", left: "18px" }}>
          +30°
        </span>
        <span className="t" style={{ top: "72%", left: "18px" }}>
          +22°
        </span>
      </div>

      {/* Command bar */}
      <Link
        href="/meetings"
        className="command"
        style={{ textDecoration: "none" }}
        aria-label="Find a meeting near you"
      >
        <span className="sigil">✦</span>
        <span className="prompt">
          <span className="ph">point a star&nbsp;</span>
          <span style={{ color: "var(--gold)" }}>near me</span>
          <span className="ph">&nbsp;after&nbsp;</span>
          <span style={{ color: "var(--gold)" }}>19:00</span>
          <span className="ph">&nbsp;that is&nbsp;</span>
          <span style={{ color: "var(--gold)" }}>young</span>
          <span className="cursor" />
        </span>
        <span className="k">⌘</span>
        <span className="k">K</span>
      </Link>
    </>
  )
}

// ─── helpers ───
function spellOut(n: number): string {
  // Prose-style number: "Two hundred and forty-seven" for 247
  if (n === 247) return "Two hundred and forty-seven"
  if (n === 0) return "No"
  if (n < 20) return ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"][n]
  return String(n)
}
function spellOutCap(n: number): string {
  const s = spellOut(n)
  return s.charAt(0).toUpperCase() + s.slice(1)
}
function shortDate(iso?: string): string {
  if (!iso) return "—"
  const d = new Date(iso.length <= 10 ? `${iso}T00:00:00` : iso)
  if (Number.isNaN(d.getTime())) return "—"
  return d
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toUpperCase()
}
function formatStatus(s: string): string {
  return s.toUpperCase().replace(/-/g, " ")
}

// ─── now pulse (pure server, static position from coords) ───
import type { Meeting } from "@/lib/data/normalized/types"

function NowPulseClient({ meeting }: { meeting: Meeting }) {
  if (!meeting.coordinates) return null
  const p = projectToSkyLocal(meeting.coordinates.lat, meeting.coordinates.lng)
  const label = (meeting.city || meeting.location || "").split(",")[0]
  const tags = [meeting.format === "hybrid" ? "HYBRID" : null, meeting.meetingType?.toUpperCase()].filter(Boolean).join(" · ")
  return (
    <div className="now" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
      <div className="pulse" />
      <span className="label">▸ TRACKED LIVE</span>
      <span className="meetingname">{meeting.title}</span>
      <span className="meta">
        {[label, tags].filter(Boolean).join(" · ").toUpperCase()}
      </span>
    </div>
  )
}

function projectToSkyLocal(lat: number, lng: number) {
  const LNG_MIN = -135, LNG_MAX = 35, LAT_MIN = 22, LAT_MAX = 62
  const x = Math.min(98, Math.max(2, ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * 100))
  const y = Math.min(78, Math.max(8, (1 - (lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * 100))
  return { x, y }
}