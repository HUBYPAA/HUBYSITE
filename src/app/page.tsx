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
          <div className="panel-raised p-5 sm:p-7 md:p-9">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
              <div>
                <span className="section-kicker">Upcoming</span>
                <h2 className="section-title mt-3 sm:mt-4">
                  The conference calendar starts with what is next.
                </h2>
              </div>
              <Link href="/conferences" className="action-secondary self-start">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {featuredConference ? (
              <div className="mt-6 grid gap-6 sm:mt-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-8">
                <div>
                  <p className="meta-label">Featured conference</p>
                  <h3 className="mt-3 font-serif text-[1.75rem] leading-[0.98] tracking-[-0.04em] text-ink sm:text-[2.25rem]">
                    {featuredConference.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-muted sm:mt-4 sm:text-base sm:leading-8">
                    {featuredConference.summary ??
                      "A major YPAA gathering with room for speakers, workshops, committees, and the kind of cross-region fellowship that changes who you know."}
                  </p>
                </div>

                <div className="panel-muted p-4 sm:p-5">
                  <p className="meta-label">Date + place</p>
                  <p className="mt-3 text-lg font-medium text-ink">
                    {formatDateRange(featuredConference.startDate, featuredConference.endDate)}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {[featuredConference.venue, featuredConference.city, featuredConference.stateAbbreviation]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {featuredConference.notes?.includes("Scaffold") && (
                    <p className="mt-4 text-sm leading-7 text-muted sm:mt-5">
                      This listing is a scaffold and should be verified before it is
                      treated as confirmed travel information.
                    </p>
                  )}
                  <div className="mt-5 flex flex-wrap gap-3 sm:mt-6">
                    <Link href="/conferences" className="action-primary">
                      Conference page
                    </Link>
                    <Link href="/submit" className="action-secondary">
                      Send update
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-6 text-base leading-8 text-muted">
                Conference data is still being assembled. The map and submission
                flow are ready for better records as they come in.
              </p>
            )}
          </div>

          <div className="panel p-5 sm:p-7">
            <span className="section-kicker">How to use it</span>
            <h2 className="section-title mt-3 sm:mt-4">
              A calmer front door into scattered information.
            </h2>
            <p className="mt-3 text-base leading-7 text-muted sm:mt-4 sm:text-lg sm:leading-8">
              Not a generic nonprofit site. Not an official AA body. Just a
              cleaner way to find the young people&apos;s network without fifteen
              tabs, buried Instagram bios, or a lucky DM.
            </p>

            <div className="mt-6 grid gap-4 sm:mt-7">
              {[
                {
                  icon: MapPinned,
                  title: "Find a room",
                  body: "Use the meetings map when you are new, traveling, or trying to send someone somewhere concrete.",
                },
                {
                  icon: CalendarDays,
                  title: "Track the calendar",
                  body: "Use the conference side to see what is upcoming and what still needs verification.",
                },
                {
                  icon: Compass,
                  title: "Get oriented",
                  body: "Read the YPAA and About pages when you need context, safety notes, or a plain-language explanation.",
                },
              ].map((item) => (
                <div key={item.title} className="panel-muted flex gap-3.5 p-4 sm:gap-4 sm:p-5">
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
      </section>

      <section className="page-band pt-0">
        <div className="site-shell grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="panel p-5 sm:p-7 md:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div>
                <span className="section-kicker">Meetings</span>
                <h2 className="section-title mt-3 sm:mt-4">Rooms worth finding quickly.</h2>
              </div>
              <Link href="/meetings" className="action-secondary self-start">
                Open map
              </Link>
            </div>

            <div className="mt-6 space-y-1 sm:mt-8">
              {featuredMeetings.map((meeting) => (
                <Link
                  key={meeting.id}
                  href="/meetings"
                  className="list-item block hover:text-accent"
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
                    <span className="chip flex-shrink-0" data-active="false">
                      {meeting.format}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="panel p-5 sm:p-7 md:p-8">
              <span className="section-kicker">Safety</span>
              <div className="mt-4 flex items-start gap-3.5 sm:mt-5 sm:gap-4">
                <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <h2 className="font-serif text-xl tracking-[-0.04em] text-ink sm:text-2xl">
                    Safety and anonymity are product requirements here.
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted sm:mt-4 sm:leading-7">
                    No personal names. No attendance data. Plain guidance for
                    crisis resources, online caution, and event safety.
                  </p>
                  <Link href="/safety" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent sm:mt-6">
                    Read safety notes
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="panel-outline p-5 sm:p-7 md:p-8">
              <div className="flex items-start gap-3.5 sm:gap-4">
                <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <h2 className="font-serif text-xl tracking-[-0.04em] text-ink sm:text-2xl">
                    Better data depends on people sending better corrections.
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted sm:mt-4 sm:leading-7">
                    Broken link, missing meeting, stale conference, wrong city,
                    not enough coordinates. There is a clean lane for all of it.
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
