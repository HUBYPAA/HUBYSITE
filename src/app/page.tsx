import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  MapPinned,
  PenSquare,
  Shield,
} from "lucide-react"
import {
  ActionStrip,
  StarCanopy,
  FocalPanel,
  LedgerRow,
  LedgerRows,
  PageIntro,
  PageShell,
  Surface,
  ThresholdBand,
} from "@/lib/components/atlas"
import {
  getConferenceCount,
  getFeaturedConference,
  getUpcomingConferences,
} from "@/lib/data/query/conferences"
import {
  getFeaturedMeetings,
  getMeetingCount,
  getNextOnlineMeeting,
  getStartingSoonMeeting,
  getStatesWithMeetings,
} from "@/lib/data/query/meetings"
import { formatDateRange } from "@/lib/utils/dates"

export default function HomePage() {
  const featuredConference = getFeaturedConference()
  const upcomingConferences = getUpcomingConferences().slice(0, 6)
  const featuredMeetings = getFeaturedMeetings(4)
  const liveMeeting = getStartingSoonMeeting(120)
  const nextOnline = getNextOnlineMeeting()
  const meetingCount = getMeetingCount()
  const conferenceCount = getConferenceCount()
  const stateCount = getStatesWithMeetings().length

  return (
    <PageShell tone="stone">
      <div className="shell flex flex-col gap-10">
        <PageIntro
          kicker="HUBYPAA · The Living Atlas"
          title={
            <>
              Find the room.
              <br />
              Follow the weekend.
              <br />
              Keep the signal alive.
            </>
          }
          lead={
            <>
              Meetings, conferences, and every starting point people usually
              have to chase through screenshots, group chats, and dead links,
              pulled together into one regional atlas. Clean enough to trust.
              Loose enough to feel like YPAA.
            </>
          }
          actions={
            <ActionStrip>
              <Link href="/meetings" className="btn btn--primary">
                Find meetings
              </Link>
              <Link href="/conferences" className="btn btn--secondary">
                View conferences
              </Link>
              <Link href="/submit" className="btn btn--ghost">
                Submit an update
              </Link>
            </ActionStrip>
          }
          aside={
            <Surface tone="quiet" className="grid gap-4">
              <p className="page-kicker">What this is</p>
              <p className="body-sm" style={{ margin: 0 }}>
                HUBYPAA helps people find meetings, conferences, events,
                service paths, and trusted regional information through a
                modern interface inspired by the luminous painted ceiling of
                Kościół Mariacki.
              </p>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <Metric label="Rooms" value={meetingCount.toLocaleString()} />
                <Metric label="Weekends" value={conferenceCount.toLocaleString()} />
                <Metric label="States" value={String(stateCount)} />
              </div>
            </Surface>
          }
        />

        <ThresholdBand
          label="Live signal"
          title="Ground first. Signal second."
          detail="The first screen answers what this is, what you can do, and where to click. The luminous parts come later."
        >
          <div className="grid gap-4 lg:grid-cols-3">
            <Surface tone="quiet">
              <p className="page-kicker">Room opening soon</p>
              <h2 className="heading-lg" style={{ marginBottom: "0.75rem" }}>
                {liveMeeting ? liveMeeting.title : "Nothing inside the next two hours."}
              </h2>
              <p className="body-sm" style={{ margin: 0 }}>
                {liveMeeting
                  ? [liveMeeting.city, liveMeeting.stateAbbreviation, liveMeeting.day, liveMeeting.time]
                      .filter(Boolean)
                      .join(" · ")
                  : "Use the meetings finder when you need the full map, filters, or directions."}
              </p>
            </Surface>
            <Surface tone="quiet">
              <p className="page-kicker">Next online</p>
              <h2 className="heading-lg" style={{ marginBottom: "0.75rem" }}>
                {nextOnline ? nextOnline.title : "Online rooms come and go."}
              </h2>
              <p className="body-sm" style={{ margin: 0 }}>
                {nextOnline
                  ? [nextOnline.day, nextOnline.time, nextOnline.format === "hybrid" ? "Hybrid" : "Online"]
                      .filter(Boolean)
                      .join(" · ")
                  : "Check the directory for the latest verified listings."}
              </p>
            </Surface>
            <Surface tone="quiet">
              <p className="page-kicker">Useful before beautiful</p>
              <p className="body-sm" style={{ margin: 0 }}>
                Somebody lands here new or traveling, they should find what
                they need without a fight. That is the whole flex.
              </p>
            </Surface>
          </div>
        </ThresholdBand>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
          <div className="grid gap-4">
            <div>
              <p className="page-kicker">Finder preview</p>
              <h2 className="heading-lg">A few rooms with a pulse.</h2>
              <p className="body-sm" style={{ marginTop: "0.75rem" }}>
                Not ranked. Not sponsored. Just rooms people keep mentioning
                when somebody asks where to start.
              </p>
            </div>
            <LedgerRows>
              {featuredMeetings.map((meeting) => (
                <LedgerRow
                  key={meeting.id}
                  href="/meetings"
                  label={[meeting.day, meeting.time].filter(Boolean).join(" · ")}
                  title={meeting.title}
                  summary={
                    [meeting.city, meeting.stateAbbreviation, meeting.format, meeting.meetingType]
                      .filter(Boolean)
                      .join(" · ")
                  }
                  meta="Open finder"
                  tone="quiet"
                />
              ))}
            </LedgerRows>
          </div>

          <Surface className="grid gap-4">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(63,157,202,0.12)] text-[var(--mariacki-blue)]">
              <MapPinned className="h-5 w-5" />
            </div>
            <div>
              <p className="page-kicker">What you can do here</p>
              <h2 className="heading-lg">Find a room fast.</h2>
            </div>
            <p className="body-sm" style={{ margin: 0 }}>
              Search by city, day, format, or online status. Use the list when
              you need to scan fast. Use the map when you need orientation
              first.
            </p>
            <ActionStrip>
              <Link href="/meetings" className="btn btn--primary">
                Open meetings
              </Link>
              <Link href="/safety" className="btn btn--ghost">
                Safety
              </Link>
            </ActionStrip>
          </Surface>
        </section>

        {featuredConference ? (
          <FocalPanel
            tone="warm"
            kicker="Featured weekend"
            title={
              <>
                The next good weekend.
                <br />
                <em>Already here.</em>
              </>
            }
            lead={
              <>
                Dates, cities, sources, and the plan-real details without six
                browser tabs and a group chat asking if anybody has a real link.
              </>
            }
            actions={
              <ActionStrip>
                <Link
                  href={`/conferences/${featuredConference.slug}`}
                  className="btn btn--primary"
                >
                  Open details
                </Link>
                {featuredConference.registrationUrl ? (
                  <Link
                    href={featuredConference.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost"
                  >
                    Register
                  </Link>
                ) : null}
              </ActionStrip>
            }
            aside={
              <div className="grid gap-3">
                <Surface tone="quiet">
                  <p className="page-kicker">When</p>
                  <p className="body-sm" style={{ margin: 0 }}>
                    {formatDateRange(
                      featuredConference.startDate,
                      featuredConference.endDate,
                    ) || "Dates pending"}
                  </p>
                </Surface>
                <Surface tone="quiet">
                  <p className="page-kicker">Where</p>
                  <p className="body-sm" style={{ margin: 0 }}>
                    {[featuredConference.city, featuredConference.stateAbbreviation]
                      .filter(Boolean)
                      .join(", ") || "Location pending"}
                  </p>
                </Surface>
              </div>
            }
          />
        ) : null}

        <StarCanopy
          kicker="Canopy reveal"
          title="All these rooms and weekends belong to one larger pattern."
          lead="This is the only place the site opens into luminous ceremony. The blue is painted, architectural, and disciplined so the atlas feels connected rather than cosmic."
          items={upcomingConferences.map((conference) => ({
            href: `/conferences/${conference.slug}`,
            title: conference.title,
            meta: [conference.city, conference.stateAbbreviation, shortDate(conference.startDate)]
              .filter(Boolean)
              .join(" · "),
          }))}
          footer={
            <ActionStrip>
              <Link href="/conferences" className="btn btn--secondary">
                Browse all conferences
              </Link>
            </ActionStrip>
          }
        />

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
          <div className="grid gap-4">
            <div>
              <p className="page-kicker">Regional memory</p>
              <h2 className="heading-lg">Good information is a form of care.</h2>
            </div>
            <LedgerRows>
              <LedgerRow
                href="/submit"
                label="Correction path"
                title="Missing meetings, broken links, bad dates, wrong cities."
                summary="Send what you know while it's fresh. The atlas gets better because people who know better take the minute to send it."
                meta="Submit"
                tone="warm"
              />
              <LedgerRow
                href="/newsletter"
                label="Regional signal"
                title="Events, chair notes, useful updates."
                summary="At most every two months. If there is nothing meaningful to say, the issue gets skipped."
                meta="Newsletter"
                tone="quiet"
              />
              <LedgerRow
                href="/what-is-ypaa"
                label="Doorway"
                title="No alternate AA. No separate set of steps."
                summary="A clean explanation for newcomers, travelers, and anyone trying to make sense of the weekends."
                meta="Read"
                tone="quiet"
              />
            </LedgerRows>
          </div>

          <Surface className="grid gap-4">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(63,157,202,0.12)] text-[var(--ceiling-blue)]">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="page-kicker">Trust is part of the product</p>
              <h2 className="heading-lg">No games with anonymity.</h2>
            </div>
            <p className="body-sm" style={{ margin: 0 }}>
              No public member profiles. No attendance tracking. Safety stays
              plain, direct, and easy to find.
            </p>
            <ActionStrip>
              <Link href="/safety" className="btn btn--secondary">
                Read the safety page
              </Link>
            </ActionStrip>
          </Surface>
        </section>

        <FocalPanel
          kicker="Keep the atlas alive"
          title={
            <>
              Send the correction.
              <br />
              Keep the signal moving.
            </>
          }
          lead="The long-term health of this directory depends on precise corrections, better source links, and people who care enough to keep the record warm."
          actions={
            <ActionStrip>
              <Link href="/submit" className="btn btn--primary">
                <PenSquare className="h-4 w-4" />
                Submit or correct info
              </Link>
              <Link href="/events" className="btn btn--ghost">
                <CalendarDays className="h-4 w-4" />
                See events
              </Link>
            </ActionStrip>
          }
          aside={
            <div className="grid gap-3">
              <Surface tone="quiet">
                <p className="page-kicker">North star</p>
                <p className="body-sm" style={{ margin: 0 }}>
                  Painted heaven, made useful.
                </p>
              </Surface>
              <Surface tone="quiet">
                <p className="page-kicker">Product sentence</p>
                <p className="body-sm" style={{ margin: 0 }}>
                  The atlas helps people find meetings, conferences, events,
                  service paths, and trusted regional information.
                </p>
              </Surface>
            </div>
          }
          footer={
            <Link href="/about" className="btn btn--quiet">
              Read why the site exists
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
      </div>
    </PageShell>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface surface--quiet p-4">
      <p className="page-kicker" style={{ marginBottom: "0.45rem" }}>
        {label}
      </p>
      <strong
        style={{
          display: "block",
          fontFamily: "var(--font-serif)",
          fontSize: "2rem",
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        {value}
      </strong>
    </div>
  )
}

function shortDate(date?: string) {
  if (!date) return "Date pending"
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}
