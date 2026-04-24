import Link from "next/link"
import { ArrowRight, CalendarDays, Compass, MapPinned, Shield, Sparkles } from "lucide-react"
import { HomeAtlas } from "@/lib/components/vault/home-atlas"
import { Sky } from "@/lib/components/vault/sky"
import { OrnamentalRule, RunningHead } from "@/lib/components/ornament"
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
  getFeaturedMeetings,
} from "@/lib/data/query/meetings"
import { formatDateRange } from "@/lib/utils/dates"

export default function HomePage() {
  const conferences = getUpcomingConferences()
  const meetings = getMeetings()
  const featured = getFeaturedConference()
  const live = getStartingSoonMeeting(120)
  const nextToOpen = live ?? getStartingSoonMeeting(24 * 60)
  const nextOnline = getNextOnlineMeeting()
  const featuredMeetings = getFeaturedMeetings(4)
  const meetingN = getMeetingCount()
  const conferenceN = getConferenceCount()
  const stateN = getStatesWithMeetings().length

  const markers = [
    ...meetingsToMapMarkers(meetings),
    ...conferencesToMapMarkers(conferences),
  ]

  return (
    <section className="shell vhome" aria-labelledby="vhome-title">
      {/* ── Canopy: full-bleed Matejko sky behind the hero band ── */}
      <div className="sky--canopy" aria-hidden="false">
        <Sky conferences={conferences} meetings={meetings} />
      </div>

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
          HUBYPAA.
          <br />
          <em>The YPAA Hub, Mapped Like Somebody Meant It.</em>
        </h1>

        <p className="vhome__lede">
          Meetings, conferences, and every starting point people usually
          have to chase through screenshots, group chats, and dead links
          &mdash; pulled together into one directory. Clean enough to
          trust. Loose enough to feel like YPAA.
        </p>

        <div className="vhome__stats" aria-label="Live index">
          <dl>
            <div>
              <dt>Rooms</dt>
              <dd>{meetingN.toLocaleString()}</dd>
            </div>
            <div>
              <dt>Events</dt>
              <dd>{conferenceN.toLocaleString()}</dd>
            </div>
            <div>
              <dt>States</dt>
              <dd>{stateN}</dd>
            </div>
          </dl>
        </div>

        <div className="vhome__actions">
          <Link href="/meetings" className="btn btn--gold">
            Open Meetings
          </Link>
          <Link href="/conferences" className="btn btn--ghost">
            See Conferences
          </Link>
        </div>
      </header>

      <OrnamentalRule variant="ornamented" />

      {/* ── Three tiles: live / next online / this weekend ── */}
      <div className="vhome__tiles" aria-label="Tonight">
        {live ? (
          <Link
            href="/meetings"
            className="vtile vtile--live"
            aria-label={`Starting soon: ${live.title}`}
          >
            <span className="vtile__kicker">
              <span className="vtile__dot vtile__dot--live" aria-hidden />
              <span>Live</span>
            </span>
            <span className="vtile__title">{live.title}</span>
            <span className="vtile__meta">
              {[live.city, live.day, live.time].filter(Boolean).join(" · ")}
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
              <span className="starmark" aria-hidden />
              <span>This weekend</span>
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

      <OrnamentalRule variant="double" />

      {/* ── Featured conference: a single named star, expanded ── */}
      {featured && (
        <section className="section" aria-labelledby="vhome-next-title">
          <RunningHead
            left={<span className="smallcaps">What Is Next</span>}
            center={<span>Pack a Bag</span>}
          />
          <h2
            id="vhome-next-title"
            className="display-page"
            style={{ marginTop: "var(--space-6)" }}
          >
            The Next Good Weekend. <em>Already Here.</em>
          </h2>
          <p
            className="lede"
            style={{ marginTop: "var(--space-3)", marginBottom: "var(--space-8)" }}
          >
            Dates, cities, sources &mdash; everything you need to make
            the plan real without six browser tabs and a group chat
            asking if anyone&apos;s actually been.
          </p>

          <Link
            href={`/conferences/${featured.slug}`}
            className="frame"
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              alignItems: "center",
              gap: "var(--space-8)",
              padding: "var(--space-8) var(--space-10)",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <span className="starmark starmark--hero" aria-hidden />
            <div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontFeatureSettings: 'var(--ff-label)',
                  fontSize: "10.5px",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "var(--gilt-aged)",
                  margin: 0,
                }}
              >
                Featured
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontFeatureSettings: "var(--ff-display)",
                  fontWeight: 300,
                  fontSize: "clamp(28px, 4vw, 44px)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: "var(--parchment)",
                  margin: "var(--space-2) 0 var(--space-3)",
                }}
              >
                {featured.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontVariantNumeric: "tabular-nums lining-nums",
                  fontSize: "var(--text-sm)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gilt)",
                  margin: 0,
                }}
              >
                {[
                  formatDateRange(featured.startDate, featured.endDate),
                  [featured.city, featured.stateAbbreviation].filter(Boolean).join(", "),
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
            <ArrowRight className="h-5 w-5" style={{ color: "var(--gilt)" }} />
          </Link>
        </section>
      )}

      {/* ── The Point: feature cards (plain, no chapel rotation) ── */}
      <section className="section" aria-labelledby="vhome-point-title">
        <h2 id="vhome-point-title" className="display-page">
          Ease Is the Whole Flex.
        </h2>
        <p className="lede" style={{ marginTop: "var(--space-3)" }}>
          Somebody lands here new or traveling &mdash; they should find
          what they need without a fight. Make it easy to navigate.
          Make it feel like YPAA. Get out of the way.
        </p>

        <div className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: MapPinned,
              title: "Find a Room Fast",
              body: "No outdated links. No dead ends. Just a map, the rooms, and a straight line to where you need to be.",
              href: "/meetings",
            },
            {
              icon: CalendarDays,
              title: "Track the Weekend",
              body: "One calendar. Real dates. Real sources. No more piecing a plan together from five different group chats.",
              href: "/conferences",
            },
            {
              icon: Compass,
              title: "Know the Context",
              body: "The bigger story — what YPAA is, where it came from, and why it matters beyond the map.",
              href: "/what-is-ypaa",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="frame group flex gap-4 p-5"
              style={{ borderRadius: "var(--radius-1)", textDecoration: "none" }}
            >
              <item.icon
                className="mt-0.5 h-4 w-4 flex-shrink-0"
                style={{ color: "var(--gilt)" }}
              />
              <div>
                <h3
                  className="smallcaps"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.22em",
                    color: "var(--parchment)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    marginTop: "var(--space-2)",
                    fontSize: "var(--text-sm)",
                    lineHeight: 1.55,
                    color: "var(--fg-muted)",
                  }}
                >
                  {item.body}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <OrnamentalRule variant="double" />

      {/* ── Meetings: featured rooms list ── */}
      <section className="section" aria-labelledby="vhome-meetings-title">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <div>
            <RunningHead
              left={<span className="smallcaps">Meetings</span>}
              center={<span>Room Energy</span>}
            />
            <h2
              id="vhome-meetings-title"
              className="display-page"
              style={{ marginTop: "var(--space-3)" }}
            >
              A Few Rooms With a Pulse.
            </h2>
          </div>
          <Link href="/meetings" className="btn btn--ghost self-start">
            Open Map
          </Link>
        </div>

        <p className="lede" style={{ marginTop: "var(--space-4)" }}>
          Not ranked. Not sponsored. Just rooms people keep mentioning
          when somebody asks where to start. Good ones to know about.
        </p>

        <div
          style={{
            marginTop: "var(--space-8)",
            display: "grid",
            gap: "1px",
            background: "var(--rule-hair-color)",
            border: "1px solid var(--rule-hair-color)",
          }}
        >
          {featuredMeetings.map((meeting) => (
            <Link
              key={meeting.id}
              href="/meetings"
              className="group block"
              style={{
                background: "var(--surface)",
                padding: "var(--space-5) var(--space-6)",
                textDecoration: "none",
              }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1 flex items-center gap-3">
                  <span className="starmark starmark--dim" aria-hidden />
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontWeight: 400,
                        fontSize: "var(--text-lg)",
                        color: "var(--parchment)",
                        margin: 0,
                      }}
                    >
                      {meeting.title}
                    </h3>
                    <p
                      style={{
                        marginTop: "var(--space-2)",
                        fontSize: "var(--text-sm)",
                        color: "var(--fg-muted)",
                      }}
                    >
                      {[
                        meeting.city,
                        meeting.stateAbbreviation,
                        meeting.day,
                        meeting.time,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--gilt-aged)",
                      padding: "4px 10px",
                      border: "1px solid var(--rule-hair-color)",
                    }}
                  >
                    {meeting.format}
                  </span>
                  <ArrowRight
                    className="h-4 w-4"
                    style={{ color: "var(--gilt-aged)" }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <OrnamentalRule variant="double" />

      {/* ── Safety + Submit: two plain frames, asymmetric ── */}
      <section className="section">
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: "0.62fr 1.38fr" }}
        >
          <div className="frame" style={{ padding: "var(--space-7)" }}>
            <RunningHead left={<span className="smallcaps">Safety</span>} />
            <div
              style={{
                marginTop: "var(--space-5)",
                display: "flex",
                gap: "var(--space-4)",
                alignItems: "flex-start",
              }}
            >
              <Shield
                className="h-5 w-5 flex-shrink-0"
                style={{ color: "var(--gilt)" }}
              />
              <div>
                <h2 className="display-page">Trust Is Part of the Product.</h2>
                <p
                  style={{
                    marginTop: "var(--space-3)",
                    fontSize: "var(--text-sm)",
                    lineHeight: 1.6,
                    color: "var(--fg-muted)",
                  }}
                >
                  No names stored. No attendance tracked. No games with
                  your anonymity &mdash; ever.
                </p>
                <Link
                  href="/safety"
                  className="btn btn--ghost"
                  style={{ marginTop: "var(--space-5)" }}
                >
                  Read the Safety Page
                </Link>
              </div>
            </div>
          </div>

          <div className="frame" style={{ padding: "var(--space-7)" }}>
            <RunningHead left={<span className="smallcaps">Submit</span>} />
            <div
              style={{
                marginTop: "var(--space-5)",
                display: "flex",
                gap: "var(--space-4)",
                alignItems: "flex-start",
              }}
            >
              <Sparkles
                className="h-5 w-5 flex-shrink-0"
                style={{ color: "var(--gilt)" }}
              />
              <div>
                <h2 className="display-page">Good Information Is a Form of Care.</h2>
                <p
                  style={{
                    marginTop: "var(--space-3)",
                    fontSize: "var(--text-sm)",
                    lineHeight: 1.6,
                    color: "var(--fg-muted)",
                  }}
                >
                  Broken link. Meeting that moved. Conference with wrong
                  dates. If you see it &mdash; send it. The whole directory
                  runs on people who care enough to keep it honest.
                </p>
                <Link
                  href="/submit"
                  className="btn btn--gold"
                  style={{ marginTop: "var(--space-5)" }}
                >
                  Submit / Update
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OrnamentalRule variant="double" />

      {/* ── The atlas at the bottom: working tool, not centerpiece ── */}
      <section className="vhome__atlas" aria-labelledby="vhome-atlas-title">
        <div className="vhome__atlas-head">
          <div className="vhome__atlas-eyebrow">
            <span>Live Atlas</span>
            <span className="sep" aria-hidden />
            <span>{markers.length.toLocaleString()} points</span>
          </div>
          <h2 id="vhome-atlas-title" className="vhome__atlas-title">
            A Map That Knows <em>When to Shut Up.</em>
          </h2>
          <p className="vhome__atlas-lede">
            Tap around. Switch layers. It shows you what matters and
            gets out of the way &mdash; less noise, not more features.
          </p>
        </div>

        <div className="map-frame" style={{ marginTop: "var(--space-6)" }}>
          <HomeAtlas markers={markers} />
        </div>
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
