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
  // "Tracked live" = a room opening in the next two hours. Falls back to the
  // next scheduled meeting anywhere in the following 24 hours so the tile is
  // never empty on a quiet afternoon.
  const live = getStartingSoonMeeting(120)
  const nextToOpen = live ?? getStartingSoonMeeting(24 * 60)
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
          <span className="live">
            Live · {meetingN.toLocaleString()} rooms across {stateN} states
          </span>
          {live ? (
            <>
              <span className="sep" aria-hidden />
              <span>Room opening soon</span>
            </>
          ) : null}
        </div>

        <h1 id="vhome-title" className="vhome__title">
          Young people&rsquo;s AA, <em>mapped</em> like somebody meant it.
        </h1>

        <p className="vhome__lede">
          Every meeting and conference worth knowing about &mdash; pulled
          together into one clean, honest directory. Volunteer-built. No
          endorsements. No attendance data.
        </p>

        <div className="vhome__stats" aria-label="Live index">
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
              <dt>Last update</dt>
              <dd>{shortDate(new Date().toISOString())}</dd>
            </div>
          </dl>
        </div>

        <div className="vhome__actions">
          <Link href="/meetings" className="btn btn--primary">
            Open the map
          </Link>
          <Link href="/conferences" className="btn btn--ghost">
            Browse conferences
          </Link>
        </div>
      </header>

      {/* ── Three tiles: what's live, what's online next, what's this weekend ── */}
      <div className="vhome__tiles" aria-label="Tonight">
        {live ? (
          <Link
            href="/meetings"
            className="vtile vtile--live"
            aria-label={`Starting soon: ${live.title}`}
          >
            <span className="vtile__kicker">
              <span className="vtile__dot vtile__dot--live" aria-hidden />
              <span>Tracked live</span>
              <span className="vtile__idx">/01</span>
            </span>
            <span className="vtile__title">{live.title}</span>
            <span className="vtile__meta">
              {[live.city, live.day, live.time]
                .filter(Boolean)
                .join(" · ")}
            </span>
          </Link>
        ) : nextToOpen ? (
          <Link
            href="/meetings"
            className="vtile"
            aria-label={`Next to open: ${nextToOpen.title}`}
          >
            <span className="vtile__kicker">
              <span className="vtile__dot" aria-hidden />
              <span>Next to open</span>
              <span className="vtile__idx">/01</span>
            </span>
            <span className="vtile__title">{nextToOpen.title}</span>
            <span className="vtile__meta">
              {[nextToOpen.city, nextToOpen.day, nextToOpen.time]
                .filter(Boolean)
                .join(" · ")}
            </span>
          </Link>
        ) : null}

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
              <span>Next online</span>
              <span className="vtile__idx">/02</span>
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
              <span>This weekend</span>
              <span className="vtile__idx">/03</span>
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

      {/* ── The map: one honest panel ── */}
      <section className="vhome__atlas" aria-labelledby="vhome-atlas-title">
        <div className="vhome__atlas-head">
          <div className="vhome__atlas-eyebrow">
            <span>Live atlas</span>
            <span className="sep" aria-hidden />
            <span>{markers.length.toLocaleString()} points</span>
          </div>
          <h2 id="vhome-atlas-title" className="vhome__atlas-title">
            A map that knows <em>when to shut up.</em>
          </h2>
          <p className="vhome__atlas-lede">
            Meetings in blue. Conferences in gold. Click any point for
            timing, location, and source &mdash; no pop-ups, no tracking,
            no detours.
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

