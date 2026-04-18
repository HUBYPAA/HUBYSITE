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
  const featuredMeetings = getFeaturedMeetings(6)
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

      {/* ── The altar — one saturated focal surface ── */}
      <section className="shell section reveal">
        {featuredConference ? (
          <FeaturedAltar conference={featuredConference} variant="compact" />
        ) : (
          <div className="altar text-center">
            <p className="altar__label">Featured weekend</p>
            <h2 className="altar__title">Still being wired.</h2>
            <p className="altar__summary mx-auto">
              The map works. The submission form works. The records just need
              people who care enough to send what they know.
            </p>
            <Link href="/submit" className="altar__cta">
              Send a fix
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>

      {/* ── Featured rooms list ── */}
      <section className="shell section reveal">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label mono">rooms</p>
            <h2 className="display-2 mt-3">A few rooms people keep mentioning.</h2>
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

        <div className="mt-8">
          {featuredMeetings.map((m) => (
            <Link key={m.id} href="/meetings" className="row group">
              <div className="min-w-0 flex-1">
                <p className="row__title">{m.title}</p>
                <p className="row__sub">
                  {[m.city, m.stateAbbreviation, m.day, m.time].filter(Boolean).join(" · ")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="tag">{m.format}</span>
                <ArrowRight className="h-4 w-4 text-[var(--color-fg-3)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-accent-bright)]" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Why / safety / submit — small card trio ── */}
      <section className="shell section reveal">
        <div className="grid gap-4 md:grid-cols-3">
          <QuietCard
            label="for the why"
            title="Know the bigger story."
            body="What YPAA is, where it came from, and why it matters beyond the map and the calendar."
            href="/what-is-ypaa"
            cta="Read the why"
          />
          <QuietCard
            label="safety"
            title="Trust is part of the product."
            body="No names stored. No attendance tracked. The safety page covers crisis lines, online caution, and event safety in plain language."
            href="/safety"
            cta="Read the safety page"
          />
          <QuietCard
            label="care"
            title="Good information is a form of care."
            body="Broken link. Meeting that moved. Conference with wrong dates. If you see it — send it."
            href="/submit"
            cta="Send an update"
          />
        </div>
      </section>
    </>
  )
}

function QuietCard({
  label,
  title,
  body,
  href,
  cta,
}: {
  label: string
  title: string
  body: string
  href: string
  cta: string
}) {
  return (
    <Link href={href} className="card card-interactive card-glow group block">
      <p className="label mono">{label}</p>
      <h3 className="heading-lg mt-3">{title}</h3>
      <p className="body-sm mt-3">{body}</p>
      <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--color-accent-bright)" }}>
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </p>
    </Link>
  )
}
