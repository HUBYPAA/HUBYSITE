import Link from "next/link"
import { ArrowRight, CalendarDays, Compass, MapPinned, Shield, Sparkles } from "lucide-react"
import { HomeAtlas } from "@/lib/components/vault/home-atlas"
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

  const featuredConferenceLocation = featured
    ? [featured.city, featured.stateAbbreviation].filter(Boolean).join(", ")
    : ""

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
          <Link href="/meetings" className="btn btn--primary">
            Open Meetings
          </Link>
          <Link href="/conferences" className="btn btn--ghost">
            See Conferences
          </Link>
        </div>
      </header>

      <OrnamentalRule variant="ornamented" />

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
              <span>Live</span>
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
              <span className="vtile__dot vtile__dot--featured" aria-hidden />
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

      {/* ── What Is Next: Featured conference section ── */}
      {featured && (
        <section className="section" aria-labelledby="vhome-next-title">
          <RunningHead
            left={<span className="smallcaps">What Is Next</span>}
            center={<span>Pack a Bag</span>}
          />
          <h2 id="vhome-next-title" className="section-head">
            The Next Good Weekend. <em>Already Here.</em>
          </h2>
          <p className="lede max-w-2xl">
            Dates, cities, sources — everything you need to make
            the plan real without six browser tabs and a group chat
            asking if anyone&apos;s actually been.
          </p>

          <div className="grid gap-5 mt-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="frame">
              <p className="text-xs uppercase tracking-widest text-gilt-600">Featured Conference</p>
              <Link
                href={`/conferences/${featured.slug}`}
                className="group inline-block mt-3"
              >
                <h3 className="display-hero group-hover:text-accent transition-colors">
                  {featured.title}
                </h3>
              </Link>
              <p className="mt-4 max-w-lg text-sm leading-7 text-stone-700">
                {featured.summary ??
                  "A big room. A host city. A reason to leave your zip code for a weekend. Speakers, workshops, people you already love — and a whole lot you're about to."}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded border border-ink/10 bg-white/70 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/75">
                  Editorial Pick
                </span>
                {featuredConferenceLocation ? (
                  <span className="inline-flex items-center rounded border border-ink/10 bg-white/60 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/70">
                    {featuredConferenceLocation}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="frame frame--carved">
              <p className="text-xs uppercase tracking-widest text-gilt-600">Date + Place</p>
              <p className="mt-3 text-lg font-medium text-ink">
                {formatDateRange(featured.startDate, featured.endDate)}
              </p>
              <p className="mt-2 text-sm leading-7 text-stone-700">
                {[featured.venue, featured.city, featured.stateAbbreviation]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/conferences" className="btn btn--primary">
                  Open Calendar
                </Link>
                <Link href="/submit" className="btn btn--ghost">
                  Send Update
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── The Point: Feature cards ── */}
      <section className="section" aria-labelledby="vhome-point-title">
        <h2 id="vhome-point-title" className="section-head">
          Ease Is the Whole Flex.
        </h2>
        <p className="lede max-w-2xl">
          Somebody lands here new or traveling — they should find
          what they need without a fight. Make it easy to navigate.
          Make it feel like YPAA. Get out of the way.
        </p>

        <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
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
              className="card group flex gap-3.5 p-4 transition-colors hover:border-accent/30 sm:gap-4 sm:p-5"
            >
              <item.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-colors group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-stone-700 sm:mt-2 sm:leading-7">
                  {item.body}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <OrnamentalRule variant="double" />

      {/* ── Meetings: Featured rooms list ── */}
      <section className="section" aria-labelledby="vhome-meetings-title">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <div>
            <RunningHead
              left={<span className="smallcaps">Meetings</span>}
              center={<span>Room Energy</span>}
            />
            <h2 id="vhome-meetings-title" className="section-head mt-3">
              A Few Rooms With a Pulse.
            </h2>
          </div>
          <Link href="/meetings" className="btn btn--ghost self-start">
            Open Map
          </Link>
        </div>

        <p className="lede max-w-2xl mt-4">
          Not ranked. Not sponsored. Just rooms people keep mentioning
          when somebody asks where to start. Good ones to know about.
        </p>

        <div className="mt-6 space-y-1 sm:mt-8">
          {featuredMeetings.map((meeting) => (
            <Link
              key={meeting.id}
              href="/meetings"
              className="list-item group block hover:text-accent"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-medium text-ink sm:text-lg">
                    {meeting.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-stone-700 sm:mt-2 sm:leading-7">
                    {[meeting.city, meeting.stateAbbreviation, meeting.day, meeting.time]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="chip flex-shrink-0" data-active="false">
                    {meeting.format}
                  </span>
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <OrnamentalRule variant="double" />

      {/* ── Safety + Submit cards ── */}
      <section className="section">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="frame">
            <RunningHead left={<span className="smallcaps">Safety</span>} />
            <div className="mt-4 flex items-start gap-3.5 sm:mt-5 sm:gap-4">
              <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
              <div>
                <h2 className="display-page">
                  Trust Is Part of the Product.
                </h2>
                <p className="mt-3 text-sm leading-6 text-stone-700 sm:mt-4 sm:leading-7">
                  No names stored. No attendance tracked. No games with
                  your anonymity — ever. The safety page covers crisis
                  lines, online caution, and event safety in plain
                  language, written for the day you actually need it.
                </p>
                <Link href="/safety" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent sm:mt-6">
                  Read the Safety Page
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="frame frame--carved">
            <RunningHead left={<span className="smallcaps">Submit</span>} />
            <div className="flex items-start gap-3.5 sm:gap-4">
              <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
              <div>
                <h2 className="display-page">
                  Good Information Is a Form of Care.
                </h2>
                <p className="mt-3 text-sm leading-6 text-stone-700 sm:mt-4 sm:leading-7">
                  Broken link. Meeting that moved. Conference with wrong
                  dates. If you see it — send it. The whole directory
                  runs on people who care enough to keep it honest.
                </p>
                <Link href="/submit" className="btn btn--primary mt-5 sm:mt-6">
                  Submit / Update
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OrnamentalRule variant="double" />

      {/* ── The map: one honest panel ── */}
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
