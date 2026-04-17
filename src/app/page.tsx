import Link from "next/link"
import { ArrowRight, CalendarDays, Compass, MapPinned, Shield, Sparkles } from "lucide-react"
import { HomeHero } from "./home-hero"
import { meetingsToMapMarkers, conferencesToMapMarkers } from "@/lib/data/normalized/adapt"
import { getConferenceCount, getFeaturedConference, getUpcomingConferences } from "@/lib/data/query/conferences"
import { getFeaturedMeetings, getMeetingCount, getMeetings, getStatesWithMeetings } from "@/lib/data/query/meetings"
import { formatDateRange } from "@/lib/utils/dates"

export default function HomePage() {
  const meetingCount = getMeetingCount()
  const conferenceCount = getConferenceCount()
  const statesWithMeetings = getStatesWithMeetings()
  const featuredMeetings = getFeaturedMeetings(4)
  const featuredConference = getFeaturedConference()
  const upcomingConferences = getUpcomingConferences().slice(0, 3)
  const featuredConferenceLocation = featuredConference
    ? [featuredConference.city, featuredConference.stateAbbreviation].filter(Boolean).join(", ")
    : ""

  const meetingMarkers = meetingsToMapMarkers(featuredMeetings.map((meeting) => ({
    ...meeting,
  })))
  const conferenceMarkers = conferencesToMapMarkers(upcomingConferences.map((conference, index) => ({
    ...conference,
    featured: index === 0,
  })))

  const featuredMarkers = [
    ...conferenceMarkers.map((marker, index) => ({
      ...marker,
      emphasis: index === 0 ? ("featured" as const) : ("strong" as const),
    })),
    ...meetingMarkers.slice(0, 3),
  ]

  return (
    <div className="pb-10">
      <HomeHero
        datasets={{
          featured: featuredMarkers,
          meetings: meetingsToMapMarkers(getMeetings()),
          conferences: conferencesToMapMarkers(getUpcomingConferences().map((conference, index) => ({
            ...conference,
            featured: index === 0,
          }))),
        }}
        meetingCount={meetingCount}
        conferenceCount={conferenceCount}
        stateCount={statesWithMeetings.length}
      />

      <div className="site-shell mt-8">
        <div className="processional-divider" />
      </div>

      <section className="page-band">
        <div className="site-shell grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          {/* Featured Conference — the "altar object" */}
          <div className="panel-vault panel-vault-glow rise-in relative overflow-hidden p-5 sm:p-7 md:p-9">
            <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,rgba(200,164,78,0.14),transparent_42%),radial-gradient(circle_at_top_right,rgba(194,103,62,0.12),transparent_48%)]" />
            <div className="absolute -right-10 top-10 h-32 w-32 rounded-full border border-[rgba(200,164,78,0.08)] bg-[rgba(200,164,78,0.05)] blur-2xl" />
            <div className="absolute bottom-10 left-10 h-px w-24 rotate-[7deg] bg-gradient-to-r from-transparent via-[rgba(200,164,78,0.3)] to-transparent" />

            <div className="relative z-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="section-kicker">What Is Next</span>
                    <span className="inline-flex items-center rounded-[0.75rem] border border-[rgba(194,103,62,0.25)] bg-[rgba(194,103,62,0.12)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#d4835e]">
                      Pack a Bag
                    </span>
                  </div>
                  <h2 className="section-title mt-3 text-[rgba(240,235,228,0.95)] sm:mt-4">
                    The Next Good Weekend. Already Here.
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[rgba(210,203,194,0.7)] sm:text-base">
                    Dates, cities, sources — everything you need to make
                    the plan real without six browser tabs and a group chat
                    asking if anyone&apos;s actually been.
                  </p>
                </div>
                <Link href="/conferences" className="action-secondary self-start border-[rgba(240,235,228,0.15)] bg-[rgba(240,235,228,0.08)] text-[rgba(240,235,228,0.85)] hover:!bg-[rgba(240,235,228,0.14)]">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {featuredConference ? (
                <div className="mt-6 grid gap-6 sm:mt-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-8">
                  <div>
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[rgba(200,164,78,0.6)]">Featured Conference</p>
                    <Link
                      href={`/conferences/${featuredConference.slug}`}
                      className="group inline-block"
                    >
                      <h3 className="mt-3 font-serif text-[1.75rem] leading-[0.98] tracking-[-0.04em] text-[rgba(240,235,228,0.95)] transition-colors group-hover:text-gold-soft sm:text-[2.25rem]">
                        {featuredConference.title}
                      </h3>
                    </Link>
                    <p className="mt-3 max-w-lg text-sm leading-7 text-[rgba(210,203,194,0.65)] sm:mt-4 sm:text-base sm:leading-8">
                      {featuredConference.summary ??
                        "A big room. A host city. A reason to leave your zip code for a weekend. Speakers, workshops, people you already love — and a whole lot you're about to."}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-[0.75rem] border border-[rgba(200,164,78,0.2)] bg-[rgba(200,164,78,0.08)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[rgba(200,164,78,0.7)]">
                        Editorial Pick
                      </span>
                      {featuredConferenceLocation ? (
                        <span className="inline-flex items-center rounded-[0.75rem] border border-[rgba(240,235,228,0.1)] bg-[rgba(240,235,228,0.06)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[rgba(210,203,194,0.5)]">
                          {featuredConferenceLocation}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-[rgba(200,164,78,0.15)] bg-[linear-gradient(180deg,rgba(30,48,80,0.8),rgba(26,39,68,0.9))] p-4 sm:p-5 md:translate-y-4">
                    <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(200,164,78,0.06),transparent)]" />
                    <div className="relative z-10">
                      <p className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[rgba(200,164,78,0.55)]">Date + Place</p>
                      <p className="mt-3 text-lg font-medium text-[rgba(240,235,228,0.92)]">
                        {formatDateRange(featuredConference.startDate, featuredConference.endDate)}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[rgba(210,203,194,0.6)]">
                        {[featuredConference.venue, featuredConference.city, featuredConference.stateAbbreviation]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      {featuredConference.notes?.includes("Scaffold") && (
                        <div className="mt-4 rounded-[var(--radius-md)] border border-[rgba(240,235,228,0.08)] bg-[rgba(240,235,228,0.05)] p-3.5 sm:mt-5">
                          <p className="text-sm leading-7 text-[rgba(210,203,194,0.55)]">
                            Still getting built out — check the source
                            before you plan your whole weekend around it.
                          </p>
                        </div>
                      )}
                      <div className="mt-5 flex flex-wrap gap-3 sm:mt-6">
                        <Link href="/conferences" className="action-primary">
                          Open Calendar
                        </Link>
                        <Link href="/submit" className="action-secondary border-[rgba(240,235,228,0.12)] bg-[rgba(240,235,228,0.06)] text-[rgba(240,235,228,0.8)] hover:!bg-[rgba(240,235,228,0.12)]">
                          Send Update
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-[var(--radius-md)] border border-[rgba(240,235,228,0.1)] bg-[rgba(240,235,228,0.05)] p-5 text-base leading-8 text-[rgba(210,203,194,0.6)]">
                  Conference data is still getting wired up. The map
                  works. The submission form works. The records just need
                  people who care enough to send what they know.
                </div>
              )}
            </div>
          </div>

          {/* Philosophy — warm stone panel */}
          <div className="panel rise-in relative overflow-hidden p-5 sm:p-7">
            <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(60,42,28,0.04),transparent)]" />
            <div className="absolute right-6 top-6 h-16 w-16 rounded-full border border-[rgba(250,248,245,0.5)] bg-[rgba(250,248,245,0.2)] blur-xl" />

            <div className="relative z-10">
              <span className="section-kicker">The Point</span>
              <h2 className="section-title mt-3 sm:mt-4">
                Ease Is the Whole Flex.
              </h2>
              <p className="mt-3 text-base leading-7 text-muted sm:mt-4 sm:text-lg sm:leading-8">
                Somebody lands here new or traveling — they should find
                what they need without a fight. Make it easy to navigate.
                Make it feel like YPAA. Get out of the way.
              </p>

              <div className="mt-6 grid gap-4 sm:mt-7">
                {[
                  {
                    icon: MapPinned,
                    title: "Find a Room Fast",
                    body: "No outdated links. No dead ends. Just a map, the rooms, and a straight line to where you need to be.",
                    href: "/meetings",
                    className:
                      "border-[rgba(194,103,62,0.14)] bg-[linear-gradient(180deg,rgba(250,248,245,0.95),rgba(248,240,230,0.9))]",
                  },
                  {
                    icon: CalendarDays,
                    title: "Track the Weekend",
                    body: "One calendar. Real dates. Real sources. No more piecing a plan together from five different group chats.",
                    href: "/conferences",
                    className: "sm:translate-x-3",
                  },
                  {
                    icon: Compass,
                    title: "Know the Context",
                    body: "The bigger story — what YPAA is, where it came from, and why it matters beyond the map.",
                    href: "/what-is-ypaa",
                    className: "",
                  },
                ].map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`panel-muted group flex gap-3.5 p-4 transition-colors hover:border-accent/30 sm:gap-4 sm:p-5 ${item.className}`}
                  >
                    <item.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-colors group-hover:text-accent">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-6 text-muted sm:mt-2 sm:leading-7">{item.body}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-band pt-0">
        <div className="site-shell grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="panel rise-in relative overflow-hidden p-5 sm:p-7 md:p-8">
            <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top_left,rgba(45,107,94,0.08),transparent_48%)]" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="section-kicker">Meetings</span>
                  <span className="inline-flex items-center rounded-[0.75rem] border border-ink/8 bg-panel/65 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/75">
                    Room Energy
                  </span>
                </div>
                <h2 className="section-title mt-3 sm:mt-4">A Few Rooms With a Pulse.</h2>
              </div>
              <Link href="/meetings" className="action-secondary self-start">
                Open Map
              </Link>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
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
                      <h3 className="truncate text-base font-medium text-ink sm:text-lg">{meeting.title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-muted sm:mt-2 sm:leading-7">
                        {[meeting.city, meeting.stateAbbreviation, meeting.day, meeting.time]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="chip flex-shrink-0" data-active="false">
                        {meeting.format}
                      </span>
                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="panel-raised rise-in relative overflow-hidden p-5 sm:p-7 md:p-8">
              <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(45,107,94,0.06),transparent)]" />
              <span className="section-kicker">Safety</span>
              <div className="relative z-10 mt-4 flex items-start gap-3.5 sm:mt-5 sm:gap-4">
                <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <h2 className="font-serif text-xl tracking-[-0.04em] text-ink sm:text-2xl">
                    Trust Is Part of the Product.
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted sm:mt-4 sm:leading-7">
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

            <div className="panel-outline rise-in relative overflow-hidden p-5 sm:p-7 md:p-8">
              <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(200,164,78,0.06),transparent)]" />
              <div className="relative z-10 flex items-start gap-3.5 sm:gap-4">
                <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                <div>
                  <h2 className="font-serif text-xl tracking-[-0.04em] text-ink sm:text-2xl">
                    Good Information Is a Form of Care.
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted sm:mt-4 sm:leading-7">
                    Broken link. Meeting that moved. Conference with wrong
                    dates. If you see it — send it. The whole directory
                    runs on people who care enough to keep it honest.
                  </p>
                  <Link href="/submit" className="action-primary mt-5 sm:mt-6">
                    Submit / Update
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
