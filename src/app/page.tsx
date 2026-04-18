import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HomeHero } from "./home-hero"
import { FeaturedAltar } from "@/lib/components/cards/featured-altar"
import { meetingsToMapMarkers, conferencesToMapMarkers } from "@/lib/data/normalized/adapt"
import {
  getConferenceCount,
  getFeaturedConference,
  getUpcomingConferences,
} from "@/lib/data/query/conferences"
import {
  getFeaturedMeetings,
  getMeetingCount,
  getMeetings,
  getStatesWithMeetings,
} from "@/lib/data/query/meetings"

export default function HomePage() {
  const meetingCount = getMeetingCount()
  const conferenceCount = getConferenceCount()
  const states = getStatesWithMeetings()
  const featuredMeetings = getFeaturedMeetings(5)
  const featuredConference = getFeaturedConference()
  const upcoming = getUpcomingConferences().slice(0, 3)

  const meetingMarkers = meetingsToMapMarkers(featuredMeetings)
  const conferenceMarkers = conferencesToMapMarkers(
    upcoming.map((c, i) => ({ ...c, featured: i === 0 })),
  )

  const featuredMarkers = [
    ...conferenceMarkers.map((m, i) => ({
      ...m,
      emphasis: i === 0 ? ("featured" as const) : ("strong" as const),
    })),
    ...meetingMarkers.slice(0, 3),
  ]

  return (
    <>
      <HomeHero
        datasets={{
          featured: featuredMarkers,
          meetings: meetingsToMapMarkers(getMeetings()),
          conferences: conferencesToMapMarkers(
            getUpcomingConferences().map((c, i) => ({ ...c, featured: i === 0 })),
          ),
        }}
        meetingCount={meetingCount}
        conferenceCount={conferenceCount}
        stateCount={states.length}
      />

      {/* ── THE FEATURED CONFERENCE — the one saturated moment ── */}
      <section className="section">
        <div className="shell">
          {featuredConference ? (
            <FeaturedAltar conference={featuredConference} variant="compact" />
          ) : (
            <div className="altar text-center">
              <p className="altar__eyebrow">Featured conference</p>
              <h2 className="altar__title">Still being wired.</h2>
              <p className="altar__summary">
                The map works. The submission form works. The records just need
                people who care enough to send what they know.
              </p>
              <Link href="/submit" className="altar__cta">
                Send a fix
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Featured rooms ── */}
      <section className="section">
        <div className="shell">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Rooms with a pulse</p>
              <h2 className="heading-lg mt-3">A few rooms people keep mentioning.</h2>
              <p className="body mt-3 max-w-xl">
                Not ranked. Not sponsored. Just rooms people point newcomers
                to when somebody asks where to start.
              </p>
            </div>
            <Link href="/meetings" className="btn btn-secondary">
              View all meetings
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10">
            {featuredMeetings.map((m) => (
              <Link key={m.id} href="/meetings" className="row group">
                <div className="min-w-0 flex-1">
                  <p className="row__title group-hover:text-[var(--color-vault)]">{m.title}</p>
                  <p className="row__sub">
                    {[m.city, m.stateAbbreviation, m.day, m.time].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="tag">{m.format}</span>
                  <ArrowRight className="h-4 w-4 text-[var(--color-ink-3)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-vault)]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three cards — clean, equal, no ornament ── */}
      <section className="section">
        <div className="shell">
          <div className="grid gap-6 md:grid-cols-3">
            <QuietCard
              eyebrow="For the room"
              title="Find a room fast."
              body="No outdated links. No dead ends. Just a map, the rooms, and a straight line to where you need to be tonight."
              href="/meetings"
              cta="Open the meetings map"
            />
            <QuietCard
              eyebrow="For the weekend"
              title="Track the next weekend."
              body="One calendar. Real dates. Real sources. No more piecing a plan together from five group chats."
              href="/conferences"
              cta="See the conferences"
            />
            <QuietCard
              eyebrow="For the why"
              title="Know the bigger story."
              body="What YPAA is, where it came from, and why it matters beyond the map and the calendar."
              href="/what-is-ypaa"
              cta="Read the why"
            />
          </div>
        </div>
      </section>

      {/* ── Safety / Submit pair ── */}
      <section className="section">
        <div className="shell">
          <div className="grid gap-6 md:grid-cols-2">
            <QuietCard
              eyebrow="Safety"
              title="Trust is part of the product."
              body="No names stored. No attendance tracked. The safety page covers crisis lines, online caution, and event safety in plain language."
              href="/safety"
              cta="Read the safety page"
            />
            <QuietCard
              eyebrow="Submit"
              title="Good information is a form of care."
              body="Broken link. Meeting that moved. Conference with wrong dates. If you see it — send it. The whole directory runs on people keeping it honest."
              href="/submit"
              cta="Send an update"
            />
          </div>
        </div>
      </section>
    </>
  )
}

interface QuietCardProps {
  eyebrow: string
  title: string
  body: string
  href: string
  cta: string
}

function QuietCard({ eyebrow, title, body, href, cta }: QuietCardProps) {
  return (
    <Link href={href} className="card card-interactive block">
      <p className="eyebrow">{eyebrow}</p>
      <h3 className="heading-md mt-3" style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.5rem", letterSpacing: "-0.018em" }}>
        {title}
      </h3>
      <p className="body-sm mt-3">{body}</p>
      <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-vault)]">
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform" />
      </p>
    </Link>
  )
}
