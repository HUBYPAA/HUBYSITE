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
        <div className="site-shell grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <div className="panel-raised p-7 md:p-9">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="section-kicker">Upcoming</span>
                <h2 className="section-title mt-4">
                  The conference calendar starts with what is next.
                </h2>
              </div>
              <Link href="/conferences" className="action-secondary">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {featuredConference ? (
              <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <div>
                  <p className="meta-label">Featured conference</p>
                  <h3 className="mt-3 font-serif text-[2.25rem] leading-[0.98] tracking-[-0.04em] text-ink">
                    {featuredConference.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-base leading-8 text-muted">
                    {featuredConference.summary ??
                      "A major YPAA gathering with room for speakers, workshops, committees, and the kind of cross-region fellowship that changes who you know."}
                  </p>
                </div>

                <div className="panel-muted p-5">
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
                    <p className="mt-5 text-sm leading-7 text-muted">
                      This listing is a scaffold and should be verified before it is
                      treated as confirmed travel information.
                    </p>
                  )}
                  <div className="mt-6 flex flex-wrap gap-3">
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

          <div className="grid gap-6">
            <div className="panel p-7">
              <span className="section-kicker">What this is</span>
              <p className="mt-4 text-lg leading-8 text-muted">
                Not a generic nonprofit website. Not an official AA body. Just a
                cleaner way to find the young people&apos;s network without needing
                fifteen tabs and a lucky DM.
              </p>
            </div>

            <div className="panel p-7">
              <span className="section-kicker">Use it three ways</span>
              <div className="mt-6 grid gap-4">
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
                  <div key={item.title} className="flex gap-4">
                    <item.icon className="mt-1 h-4 w-4 text-accent" />
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-band pt-0">
        <div className="site-shell grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="panel p-7 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="section-kicker">Meetings</span>
                <h2 className="section-title mt-4">Rooms worth finding quickly.</h2>
              </div>
              <Link href="/meetings" className="action-secondary">
                Open map
              </Link>
            </div>

            <div className="mt-8 space-y-1">
              {featuredMeetings.map((meeting) => (
                <Link
                  key={meeting.id}
                  href="/meetings"
                  className="list-item block hover:text-accent"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-medium text-ink">{meeting.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted">
                        {[meeting.city, meeting.stateAbbreviation, meeting.day, meeting.time]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                    <span className="chip" data-active="false">
                      {meeting.format}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="panel p-7 md:p-8">
              <span className="section-kicker">Safety</span>
              <div className="mt-5 flex items-start gap-4">
                <Shield className="mt-1 h-5 w-5 text-accent" />
                <div>
                  <h2 className="text-2xl font-serif tracking-[-0.04em] text-ink">
                    Safety and anonymity are product requirements here.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted">
                    No personal names. No attendance data. Plain guidance for
                    crisis resources, online caution, and event safety.
                  </p>
                  <Link href="/safety" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent">
                    Read safety notes
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="panel-outline p-7 md:p-8">
              <div className="flex items-start gap-4">
                <Sparkles className="mt-1 h-5 w-5 text-accent" />
                <div>
                  <h2 className="text-2xl font-serif tracking-[-0.04em] text-ink">
                    Better data depends on people sending better corrections.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted">
                    Broken link, missing meeting, stale conference, wrong city,
                    not enough coordinates. There is a clean lane for all of it.
                  </p>
                  <Link href="/submit" className="action-primary mt-6">
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
