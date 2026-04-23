import Link from "next/link"
import { HomeAtlas } from "@/lib/components/vault/home-atlas"
import { meetingsToMapMarkers, conferencesToMapMarkers } from "@/lib/data/normalized/adapt"
import {
  getUpcomingConferences,
  getFeaturedConference,
  getConferenceCount,
} from "@/lib/data/query/conferences"
import {
  getMeetings,
  getMeetingCount,
  getNextOnlineMeeting,
  getStartingSoonMeeting,
  getStatesWithMeetings,
} from "@/lib/data/query/meetings"

export default function VaultHome() {
  const conferences = getUpcomingConferences()
  const meetings = getMeetings()
  const featured = getFeaturedConference()
  const nextOnline = getNextOnlineMeeting()
  const startingSoon = getStartingSoonMeeting(120)
  const meetingN = getMeetingCount()
  const conferenceN = getConferenceCount()
  const stateN = getStatesWithMeetings().length

  const markers = [
    ...meetingsToMapMarkers(meetings),
    ...conferencesToMapMarkers(conferences),
  ]

  return (
    <section className="shell vhome" aria-labelledby="vhome-title">
      {/* ── Hero band ── */}
      <header className="vhome__hero">
        <div className="vhome__eyebrow">
          <span>The vault · live sky</span>
          <span className="sep" aria-hidden />
          <span>Edition MMXXV</span>
          {startingSoon ? (
            <>
              <span className="sep" aria-hidden />
              <span className="live">Tracking</span>
            </>
          ) : null}
        </div>

        <h1 id="vhome-title" className="vhome__title">
          A sky of <em>meetings.</em>
        </h1>

        <p className="vhome__lede">
          Every young people&rsquo;s AA meeting we&rsquo;ve verified, plus
          every weekend the committees will admit to &mdash;{" "}
          <em>mapped like somebody meant it.</em> Volunteer-built. No
          endorsements. No attendance data.
        </p>

        <div className="vhome__stats" aria-label="Catalog counts">
          <dl>
            <div>
              <dt>Meetings</dt>
              <dd>{meetingN.toLocaleString()}</dd>
            </div>
            <div>
              <dt>Conferences</dt>
              <dd>{conferenceN.toLocaleString()}</dd>
            </div>
            <div>
              <dt>States</dt>
              <dd>{stateN}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{shortDate(new Date().toISOString())}</dd>
            </div>
          </dl>
        </div>

        <div className="vhome__actions">
          <Link href="/meetings" className="btn btn--primary">
            Find a meeting
          </Link>
          <Link href="/conferences" className="btn btn--ghost">
            All conferences
          </Link>
        </div>
      </header>

      {/* ── Tile row: live · online · featured ── */}
      <div className="vhome__tiles" aria-label="Happening now">
        {startingSoon ? (
          <Link
            href="/meetings"
            className="vtile vtile--live"
            aria-label={`Starting soon: ${startingSoon.title}`}
          >
            <span className="vtile__kicker">
              <span className="vtile__dot vtile__dot--live" aria-hidden />
              Tracked live · starting soon
            </span>
            <span className="vtile__title">{startingSoon.title}</span>
            <span className="vtile__meta">
              {[
                startingSoon.city,
                startingSoon.day,
                startingSoon.time,
              ]
                .filter(Boolean)
                .join(" · ")}
            </span>
          </Link>
        ) : (
          <Link href="/meetings" className="vtile vtile--placeholder">
            <span className="vtile__kicker">
              <span className="vtile__dot vtile__dot--live" aria-hidden />
              Nothing starting in the next two hours
            </span>
            <span className="vtile__title">Browse the hour</span>
            <span className="vtile__meta">
              Pick a time zone · see rooms opening in it
            </span>
          </Link>
        )}

        {nextOnline ? (
          <Link
            href={nextOnline.onlineUrl ?? "/meetings"}
            className="vtile vtile--online"
            aria-label={`Next online: ${nextOnline.title}`}
            target={nextOnline.onlineUrl ? "_blank" : undefined}
            rel={nextOnline.onlineUrl ? "noopener noreferrer" : undefined}
          >
            <span className="vtile__kicker">
              <span className="vtile__dot vtile__dot--online" aria-hidden />
              Next online room
            </span>
            <span className="vtile__title">{nextOnline.title}</span>
            <span className="vtile__meta">
              {[
                nextOnline.day,
                nextOnline.time,
                nextOnline.format === "hybrid" ? "Hybrid" : "Online",
              ]
                .filter(Boolean)
                .join(" · ")}
            </span>
          </Link>
        ) : null}

        {featured ? (
          <Link
            href={`/conferences/${featured.slug}`}
            className="vtile vtile--featured"
          >
            <span className="vtile__kicker">
              <span className="vtile__dot vtile__dot--featured" aria-hidden />
              Featured · next weekend
            </span>
            <span className="vtile__title">{featured.title}</span>
            <span className="vtile__meta">
              {[
                featured.city,
                featured.stateAbbreviation,
                shortDate(featured.startDate),
              ]
                .filter(Boolean)
                .join(" · ")}
            </span>
          </Link>
        ) : null}
      </div>

      {/* ── Atlas map — the actual sky of meetings ── */}
      <section className="vhome__atlas" aria-labelledby="vhome-atlas-title">
        <div className="vhome__atlas-head">
          <div className="vhome__atlas-eyebrow">
            <span>Plate II · the atlas</span>
            <span className="sep" aria-hidden />
            <span>{markers.length.toLocaleString()} stars plotted</span>
          </div>
          <h2 id="vhome-atlas-title" className="vhome__atlas-title">
            Every room, <em>on the grid.</em>
          </h2>
          <p className="vhome__atlas-lede">
            Meetings sit in blue. Conferences sit in gold.{" "}
            <em>Click any star</em> to open its room.
          </p>
        </div>

        <HomeAtlas markers={markers} />
      </section>
    </section>
  )
}

/* ─── helpers ─── */

function shortDate(iso?: string): string {
  if (!iso) return "—"
  const d = new Date(iso.length <= 10 ? `${iso}T00:00:00` : iso)
  if (Number.isNaN(d.getTime())) return "—"
  return d
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toUpperCase()
}

