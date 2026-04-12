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

      <section className="page-band">
        <div className="site-shell grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <div className="panel-raised relative overflow-hidden p-5 sm:p-7 md:p-9">
            <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,rgba(19,118,109,0.14),transparent_42%),radial-gradient(circle_at_top_right,rgba(222,114,71,0.16),transparent_48%)]" />
            <div className="absolute -right-10 top-10 h-32 w-32 rounded-full border border-white/50 bg-white/30 blur-2xl" />
            <div className="absolute bottom-10 left-10 h-px w-24 rotate-[7deg] bg-gradient-to-r from-transparent via-[rgba(17,35,56,0.24)] to-transparent" />

            <div className="relative z-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="section-kicker">What Is Next</span>
                    <span className="inline-flex items-center rounded-full border border-[rgba(222,114,71,0.16)] bg-[rgba(222,114,71,0.12)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-warm)]">
                      Travel Energy
                    </span>
                  </div>
                  <h2 className="section-title mt-3 sm:mt-4">
                    The Next Big Room Should Not Hide From You.
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                    One clean pull for the next weekend worth circling. Dates,
                    place, source, and enough atmosphere to make the plan feel
                    real before you open six more tabs.
                  </p>
                </div>
                <Link href="/conferences" className="action-secondary self-start">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {featuredConference ? (
                <div className="mt-6 grid gap-6 sm:mt-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-8">
                  <div>
                    <p className="meta-label">Featured Conference</p>
                    <h3 className="mt-3 font-serif text-[1.75rem] leading-[0.98] tracking-[-0.04em] text-ink sm:text-[2.25rem]">
                      {featuredConference.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-7 text-muted sm:mt-4 sm:text-base sm:leading-8">
                      {featuredConference.summary ??
                        "A big room, a host city, and a reason to get out of your own orbit for a minute. Speakers, workshops, people you know, and people you are about to know."}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full border border-ink/8 bg-white/70 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/75">
                        Editorial Pick
                      </span>
                      {featuredConferenceLocation ? (
                        <span className="inline-flex items-center rounded-full border border-ink/8 bg-white/60 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/70">
                          {featuredConferenceLocation}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="panel-muted relative overflow-hidden border-[rgba(222,114,71,0.16)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,243,237,0.88))] p-4 sm:p-5 md:translate-y-4">
                    <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(222,114,71,0.08),transparent)]" />
                    <div className="relative z-10">
                      <p className="meta-label">Date + Place</p>
                      <p className="mt-3 text-lg font-medium text-ink">
                        {formatDateRange(featuredConference.startDate, featuredConference.endDate)}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-muted">
                        {[featuredConference.venue, featuredConference.city, featuredConference.stateAbbreviation]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      {featuredConference.notes?.includes("Scaffold") && (
                        <div className="mt-4 rounded-[1.1rem] border border-ink/8 bg-white/65 p-3.5 sm:mt-5">
                          <p className="text-sm leading-7 text-muted">
                            This one still needs love before it counts as
                            locked travel information. Check the source before
                            you book anything around it.
                          </p>
                        </div>
                      )}
                      <div className="mt-5 flex flex-wrap gap-3 sm:mt-6">
                        <Link href="/conferences" className="action-primary">
                          Open Calendar
                        </Link>
                        <Link href="/submit" className="action-secondary">
                          Send Update
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-[1.5rem] border border-ink/8 bg-white/62 p-5 text-base leading-8 text-muted">
                  Conference data is still getting stitched together. The map
                  is ready. The update lane is ready. The records just need
                  more love.
                </div>
              )}
            </div>
          </div>

          <div className="panel relative overflow-hidden p-5 sm:p-7">
            <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(17,35,56,0.05),transparent)]" />
            <div className="absolute right-6 top-6 h-16 w-16 rounded-full border border-white/60 bg-white/25 blur-xl" />

            <div className="relative z-10">
              <span className="section-kicker">Why It Feels Better</span>
              <h2 className="section-title mt-3 sm:mt-4">
                Ease Is the Whole Flex.
              </h2>
              <p className="mt-3 text-base leading-7 text-muted sm:mt-4 sm:text-lg sm:leading-8">
                The job is simple: let somebody find the room, the weekend, or
                the context without chewing through a hundred tabs. It should feel
                young, sharp, and a little electric, not bureaucratic.
              </p>

              <div className="mt-6 grid gap-4 sm:mt-7">
                {[
                  {
                    icon: MapPinned,
                    title: "Find a Room Fast",
                    body: "Open the meetings map when you are new, traveling, or trying to send someone somewhere real.",
                    className:
                      "border-[rgba(222,114,71,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,244,239,0.9))]",
                  },
                  {
                    icon: CalendarDays,
                    title: "Track the Weekend",
                    body: "Open conferences when you need dates, host cities, and a clear sense of what is actually next.",
                    className: "sm:translate-x-3",
                  },
                  {
                    icon: Compass,
                    title: "Get the Context",
                    body: "Use the YPAA, About, and Safety pages when the map is not enough and the story matters too.",
                    className: "",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className={`panel-muted flex gap-3.5 p-4 sm:gap-4 sm:p-5 ${item.className}`}
                  >
                    <item.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-6 text-muted sm:mt-2 sm:leading-7">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-band pt-0">
        <div className="site-shell grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="panel relative overflow-hidden p-5 sm:p-7 md:p-8">
            <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top_left,rgba(19,118,109,0.1),transparent_48%)]" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="section-kicker">Meetings</span>
                  <span className="inline-flex items-center rounded-full border border-ink/8 bg-white/65 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/75">
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
              Not a ranking. Not a fake popularity contest. Just a few good
              rooms if you want the easiest first yes.
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
            <div className="panel-raised relative overflow-hidden p-5 sm:p-7 md:p-8">
              <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(19,118,109,0.08),transparent)]" />
              <span className="section-kicker">Safety</span>
              <div className="relative z-10 mt-4 flex items-start gap-3.5 sm:mt-5 sm:gap-4">
                <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <h2 className="font-serif text-xl tracking-[-0.04em] text-ink sm:text-2xl">
                    Trust Is Part of the Product.
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted sm:mt-4 sm:leading-7">
                    No personal names. No attendance data. No weird games with
                    anonymity. Just plain guidance for crisis resources, online
                    caution, and event safety that reads clear on a hard day.
                  </p>
                  <Link href="/safety" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent sm:mt-6">
                    Read Safety Notes
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="panel-outline relative overflow-hidden p-5 sm:p-7 md:p-8">
              <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(222,114,71,0.08),transparent)]" />
              <div className="relative z-10 flex items-start gap-3.5 sm:gap-4">
                <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <h2 className="font-serif text-xl tracking-[-0.04em] text-ink sm:text-2xl">
                    Good Information Is a Form of Care.
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted sm:mt-4 sm:leading-7">
                    Broken link, missing meeting, stale conference, wrong city,
                    bad coordinates. Love the network enough to fix what is off
                    before somebody else runs into it.
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
