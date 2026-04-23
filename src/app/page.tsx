import Link from "next/link"
import type { Meeting } from "@/lib/data/normalized/types"
import { Sky } from "@/lib/components/vault/sky"
import {
  getUpcomingConferences,
  getFeaturedConference,
  getConferenceCount,
} from "@/lib/data/query/conferences"
import { getMeetings, getMeetingCount } from "@/lib/data/query/meetings"

export default function VaultHome() {
  const conferences = getUpcomingConferences()
  const meetings = getMeetings()
  const featured = getFeaturedConference()
  const meetingN = getMeetingCount()
  const conferenceN = getConferenceCount()

  // Pick a "now" meeting — prefer the Southern/Midwestern belt so the coral
  // pulse sits in open sky, not on top of the labeled conferences above it.
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
      {/* Theatrical backdrop — stays full-bleed behind the content grid. */}
      <Sky conferences={conferences} meetings={meetings} />
      {nowMeeting && nowMeeting.coordinates ? (
        <NowPulse meeting={nowMeeting} />
      ) : null}

      <section className="shell vhome" aria-labelledby="vhome-title">
        <div className="vhome__hero">
          <div>
            <div className="vhome__eyebrow">
              <span>THE VAULT · LIVE SKY</span>
              <span className="sep" aria-hidden />
              <span>EDITION MMXXV</span>
              {nowMeeting ? (
                <>
                  <span className="sep" aria-hidden />
                  <span className="live">TRACKING</span>
                </>
              ) : null}
            </div>

            <h1 id="vhome-title" className="vhome__title">
              A sky of <em>meetings.</em>
            </h1>

            <p className="vhome__lede">
              {spellOut(meetingN)} young people&rsquo;s AA meetings and{" "}
              {spellOut(conferenceN)} conferences,{" "}
              <em>mapped like somebody meant it.</em> Volunteer-built. No
              endorsements. No attendance data. The coral star is the one
              starting soon.
            </p>

            <div className="vhome__actions">
              <Link href="/meetings" className="btn btn--primary">
                Find a meeting
              </Link>
              <Link href="/conferences" className="btn btn--ghost">
                All conferences
              </Link>
            </div>
          </div>

          <aside className="vhome__side" aria-label="Tonight">
            {nowMeeting ? (
              <Link
                href="/meetings"
                className="vhome-live"
                aria-label={`Starting soon: ${nowMeeting.title}`}
              >
                <span className="vhome-live__label">Tracked live</span>
                <span className="vhome-live__title">{nowMeeting.title}</span>
                <span className="vhome-live__meta">
                  {[
                    nowMeeting.city,
                    nowMeeting.day?.toUpperCase(),
                    nowMeeting.time,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </Link>
            ) : null}

            {featured ? (
              <Link
                href={`/conferences/${featured.slug}`}
                className="vhome-featured"
              >
                <span className="vhome-featured__label">Featured · next weekend</span>
                <span className="vhome-featured__title">{featured.title}</span>
                <span className="vhome-featured__meta">
                  {[featured.city, shortDate(featured.startDate)]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </Link>
            ) : null}

            <div className="card vhome-sitrep">
              <div className="vhome-sitrep__label">
                <span>Tonight · sitrep</span>
                <span>/01</span>
              </div>
              <h2 className="vhome-sitrep__title">
                {conferenceN} constellations, <em>kept by hand.</em>
              </h2>
              <div className="vhome-sitrep__rows">
                <div className="vhome-sitrep__row">
                  <span>Catalog</span>
                  <b>{meetingN.toLocaleString()} meetings</b>
                </div>
                <div className="vhome-sitrep__row">
                  <span>Next weekend</span>
                  <b>{featured ? shortDate(featured.startDate) : "—"}</b>
                </div>
                <div className="vhome-sitrep__row">
                  <span>Last update</span>
                  <b>{shortDate(new Date().toISOString())}</b>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

/* ─── helpers ─── */

function spellOut(n: number): string {
  if (n === 247) return "Two hundred and forty-seven"
  if (n === 0) return "No"
  if (n < 20)
    return [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ][n]
  return n.toLocaleString()
}

function shortDate(iso?: string): string {
  if (!iso) return "—"
  const d = new Date(iso.length <= 10 ? `${iso}T00:00:00` : iso)
  if (Number.isNaN(d.getTime())) return "—"
  return d
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toUpperCase()
}

/* ─── now pulse (coral star on the sky, no text labels) ─── */

function NowPulse({ meeting }: { meeting: Meeting }) {
  if (!meeting.coordinates) return null
  const p = projectToSkyLocal(meeting.coordinates.lat, meeting.coordinates.lng)
  return (
    <div
      className="now"
      style={{ left: `${p.x}%`, top: `${p.y}%` }}
      aria-hidden
    >
      <div className="pulse" />
    </div>
  )
}

function projectToSkyLocal(lat: number, lng: number) {
  const LNG_MIN = -135
  const LNG_MAX = 35
  const LAT_MIN = 22
  const LAT_MAX = 62
  const x = Math.min(
    98,
    Math.max(2, ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * 100),
  )
  const y = Math.min(
    78,
    Math.max(8, (1 - (lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * 100),
  )
  return { x, y }
}

