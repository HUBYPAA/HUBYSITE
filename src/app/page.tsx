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
      <div className="flex flex-col">
        {/* ── Grand Celestial Hero ───────────────────── */}
        <section className="celestial-hero star-field star-field--dense">
          <div className="god-rays" aria-hidden="true" />
          <div className="celestial-hero__content shell-wide">
            <PageIntro
              kicker="HUBYPAA · The Living Atlas"
              title={
                <span className="float-text">
                  Find the room.
                  <br />
                  Follow the weekend.
                  <br />
                  Keep the signal alive.
                </span>
              }
              lead={
                <>
                  Meetings, conferences, and every starting point people usually
                  have to chase through screenshots, group chats, and dead links,
                  pulled together into one regional atlas.
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
                <div className="grid gap-6">
                  <Metric label="Rooms" value={meetingCount.toLocaleString()} />
                  <Metric label="Weekends" value={conferenceCount.toLocaleString()} />
                  <Metric label="States" value={String(stateCount)} />
                </div>
              }
            />
          </div>
        </section>

        <div className="shell flex flex-col gap-16">
          {/* ── Live Signal (no cards) ─────────────────── */}
          <ThresholdBand
            label="Live signal"
            title="Ground first. Signal second."
            detail="The first screen answers what this is, what you can do, and where to click."
          >
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <p className="page-kicker">Room opening soon</p>
                <p className="heading-sm" style={{ marginTop: "0.5rem" }}>
                  {liveMeeting ? liveMeeting.title : "Nothing inside the next two hours."}
                </p>
                <p className="body-sm" style={{ marginTop: "0.5rem" }}>
                  {liveMeeting
                    ? [liveMeeting.city, liveMeeting.stateAbbreviation, liveMeeting.day, liveMeeting.time]
                        .filter(Boolean)
                        .join(" · ")
                    : "Use the meetings finder when you need the full map."}
                </p>
              </div>
              <div>
                <p className="page-kicker">Next online</p>
                <p className="heading-sm" style={{ marginTop: "0.5rem" }}>
                  {nextOnline ? nextOnline.title : "Online rooms come and go."}
                </p>
                <p className="body-sm" style={{ marginTop: "0.5rem" }}>
                  {nextOnline
                    ? [nextOnline.day, nextOnline.time, nextOnline.format === "hybrid" ? "Hybrid" : "Online"]
                        .filter(Boolean)
                        .join(" · ")
                    : "Check the directory for the latest verified listings."}
                </p>
              </div>
              <div>
                <p className="page-kicker">Useful before beautiful</p>
                <p className="body-sm" style={{ marginTop: "0.5rem" }}>
                  Somebody lands here new or traveling, they should find what
                  they need without a fight. That is the whole flex.
                </p>
              </div>
            </div>
          </ThresholdBand>

          {/* ── Finder Preview (asymmetric) ────────────── */}
          <section className="editorial-split--wide">
            <div className="grid gap-6">
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
                  />
                ))}
              </LedgerRows>
            </div>

            <div className="grid gap-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(63,157,202,0.12)] text-[var(--mariacki-blue)]">
                <MapPinned className="h-5 w-5" />
              </div>
              <div>
                <p className="page-kicker">What you can do here</p>
                <h2 className="heading-lg">Find a room fast.</h2>
              </div>
              <p className="body-sm">
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
            </div>
          </section>

          {/* ── Featured Weekend ───────────────────────── */}
          {featuredConference ? (
            <FocalPanel

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
                <div className="grid gap-4">
                  <div>
                    <p className="page-kicker">When</p>
                    <p className="body-sm" style={{ margin: 0 }}>
                      {formatDateRange(
                        featuredConference.startDate,
                        featuredConference.endDate,
                      ) || "Dates pending"}
                    </p>
                  </div>
                  <div>
                    <p className="page-kicker">Where</p>
                    <p className="body-sm" style={{ margin: 0 }}>
                      {[featuredConference.city, featuredConference.stateAbbreviation]
                        .filter(Boolean)
                        .join(", ") || "Location pending"}
                    </p>
                  </div>
                </div>
              }
            />
          ) : null}

          {/* ── Star Canopy ────────────────────────────── */}
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

          {/* ── Regional Memory ────────────────────────── */}
          <section className="editorial-split">
            <div className="grid gap-6">
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
                />
                <LedgerRow
                  href="/newsletter"
                  label="Regional signal"
                  title="Events, chair notes, useful updates."
                  summary="At most every two months. If there is nothing meaningful to say, the issue gets skipped."
                  meta="Newsletter"
                />
                <LedgerRow
                  href="/what-is-ypaa"
                  label="Doorway"
                  title="No alternate AA. No separate set of steps."
                  summary="A clean explanation for newcomers, travelers, and anyone trying to make sense of the weekends."
                  meta="Read"
                />
              </LedgerRows>
            </div>

            <div className="grid gap-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(63,157,202,0.12)] text-[var(--ceiling-blue)]">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="page-kicker">Trust is part of the product</p>
                <h2 className="heading-lg">No games with anonymity.</h2>
              </div>
              <p className="body-sm">
                No public member profiles. No attendance tracking. Safety stays
                plain, direct, and easy to find.
              </p>
              <ActionStrip>
                <Link href="/safety" className="btn btn--secondary">
                  Read the safety page
                </Link>
              </ActionStrip>
            </div>
          </section>

          {/* ── Keep the Atlas Alive ───────────────────── */}
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
              <div className="grid gap-4">
                <div>
                  <p className="page-kicker">North star</p>
                  <p className="body-sm" style={{ margin: 0 }}>
                    Painted heaven, made useful.
                  </p>
                </div>
                <div>
                  <p className="page-kicker">Product sentence</p>
                  <p className="body-sm" style={{ margin: 0 }}>
                    The atlas helps people find meetings, conferences, events,
                    service paths, and trusted regional information.
                  </p>
                </div>
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
      </div>
    </PageShell>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="page-kicker">{label}</p>
      <p
        className="mono"
        style={{
          marginTop: "0.25rem",
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          fontWeight: 500,
          color: "var(--ink)",
        }}
      >
        {value}
      </p>
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
