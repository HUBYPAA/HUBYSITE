import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HomeHero } from "./home-hero"
import { FeaturedAltar } from "@/lib/components/cards/featured-altar"
import { FiligreeRule } from "@/lib/components/ornaments/filigree-rule"
import { HeraldicGlyph } from "@/lib/components/ornaments/heraldic-glyph"
import { meetingsToMapMarkers, conferencesToMapMarkers } from "@/lib/data/normalized/adapt"
import { getConferenceCount, getFeaturedConference, getUpcomingConferences } from "@/lib/data/query/conferences"
import { getFeaturedMeetings, getMeetingCount, getMeetings, getStatesWithMeetings } from "@/lib/data/query/meetings"

export default function HomePage() {
  const meetingCount = getMeetingCount()
  const conferenceCount = getConferenceCount()
  const statesWithMeetings = getStatesWithMeetings()
  const featuredMeetings = getFeaturedMeetings(4)
  const featuredConference = getFeaturedConference()
  const upcomingConferences = getUpcomingConferences().slice(0, 3)

  const meetingMarkers = meetingsToMapMarkers(featuredMeetings)
  const conferenceMarkers = conferencesToMapMarkers(
    upcomingConferences.map((conference, index) => ({
      ...conference,
      featured: index === 0,
    })),
  )

  const featuredMarkers = [
    ...conferenceMarkers.map((marker, index) => ({
      ...marker,
      emphasis: index === 0 ? ("featured" as const) : ("strong" as const),
    })),
    ...meetingMarkers.slice(0, 3),
  ]

  return (
    <div className="pb-12">
      <HomeHero
        datasets={{
          featured: featuredMarkers,
          meetings: meetingsToMapMarkers(getMeetings()),
          conferences: conferencesToMapMarkers(
            getUpcomingConferences().map((conference, index) => ({
              ...conference,
              featured: index === 0,
            })),
          ),
        }}
        meetingCount={meetingCount}
        conferenceCount={conferenceCount}
        stateCount={statesWithMeetings.length}
      />

      {/* ── Threshold to the altar ── */}
      <div className="site-shell mt-16">
        <FiligreeRule tone="gilt" />
      </div>

      {/* ── THE ALTAR ── */}
      <section className="altar-section pt-10">
        <div className="site-shell">
          {featuredConference ? (
            <div className="altar-lit">
              <FeaturedAltar conference={featuredConference} variant="compact" />
            </div>
          ) : (
            <div className="panel-vault relative p-9 text-center">
              <p className="meta-label" style={{ color: "var(--color-gilt-shadow)" }}>this month&apos;s altar</p>
              <p
                className="mt-4 text-[var(--color-ivory)]"
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.6rem" }}
              >
                The conference data is still being wired.
                <br />
                The map works. The submission form works.
                <br />
                The records just need people who care enough to send what they know.
              </p>
              <Link href="/submit" className="action-altar mt-7 inline-flex">send a fix</Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Threshold to the chapels ── */}
      <div className="site-shell">
        <FiligreeRule tone="shadow" />
      </div>

      {/* ── THREE CHAPELS — polychrome variation ── */}
      <section className="page-band pt-10">
        <div className="site-shell">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="section-kicker">
                <HeraldicGlyph name="open-book" />
                three chapels
              </span>
              <h2 className="section-title mt-3">Use it like this.</h2>
            </div>
            <p
              className="max-w-md text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-prose)", fontStyle: "italic", fontSize: "0.96rem", lineHeight: 1.7 }}
            >
              Three doors into the same building. Take whichever one matches
              the day you&apos;re having.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <ChapelCard
              variant="emerald"
              kicker="for the room"
              glyph="shield-cross"
              title="Find a room fast."
              body="No outdated links. No dead ends. Just a map, the rooms, and a straight line to where you need to be tonight."
              href="/meetings"
              cta="open the meetings map"
              translateY="0px"
            />
            <ChapelCard
              variant="ochre"
              kicker="for the weekend"
              glyph="star-diamond"
              title="Track the next weekend."
              body="One calendar. Real dates. Real sources. No more piecing a plan together from five different group chats."
              href="/conferences"
              cta="see the conferences"
              translateY="-12px"
            />
            <ChapelCard
              variant="carnation"
              kicker="for the why"
              glyph="open-book"
              title="Know the bigger story."
              body="What YPAA is, where it came from, and why it matters beyond the map and the calendar."
              href="/what-is-ypaa"
              cta="read the why"
              translateY="0px"
            />
          </div>
        </div>
      </section>

      {/* ── Threshold to the side aisles ── */}
      <div className="site-shell">
        <FiligreeRule tone="shadow" />
      </div>

      {/* ── SIDE AISLES — meetings list + safety + care ── */}
      <section className="page-band pt-10">
        <div className="site-shell grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          {/* Featured rooms list — Tier 1 ashlar */}
          <div className="panel rise-in p-5 sm:p-7 md:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="section-kicker">
                  <HeraldicGlyph name="shield-cross" />
                  rooms with a pulse
                </span>
                <h2 className="section-title mt-3">A few rooms people keep mentioning.</h2>
              </div>
              <Link href="/meetings" className="action-secondary self-start">
                open the map
              </Link>
            </div>

            <p
              className="mt-4 max-w-2xl text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-prose)", fontStyle: "italic", fontSize: "0.96rem", lineHeight: 1.74 }}
            >
              Not ranked. Not sponsored. Just rooms people keep mentioning
              when somebody asks where to start. Good ones to know about.
            </p>

            <div className="mt-7 space-y-1">
              {featuredMeetings.map((meeting) => (
                <Link
                  key={meeting.id}
                  href="/meetings"
                  className="list-item group block hover:text-[var(--color-crimson)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3
                        className="truncate text-[var(--color-ink)]"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 600,
                          fontSize: "1.18rem",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {meeting.title}
                      </h3>
                      <p
                        className="mt-1.5 text-[var(--color-muted)]"
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontStyle: "italic",
                          fontSize: "0.92rem",
                          lineHeight: 1.6,
                        }}
                      >
                        {[meeting.city, meeting.stateAbbreviation, meeting.day, meeting.time]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="chip flex-shrink-0">{meeting.format}</span>
                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-[var(--color-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-crimson)]" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Two stacked side chapels */}
          <div className="grid gap-5">
            {/* Safety — Guardian Angels chapel */}
            <div className="panel-chapel panel-chapel--ochre rise-in p-5 sm:p-7">
              <span className="section-kicker">
                <HeraldicGlyph name="winged-shield" />
                safety
              </span>
              <h3
                className="mt-3 text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.55rem", letterSpacing: "-0.025em", lineHeight: 1.05 }}
              >
                Trust is part of the product.
              </h3>
              <p
                className="mt-3 text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-prose)", fontSize: "0.94rem", lineHeight: 1.7 }}
              >
                No names stored. No attendance tracked. No games with
                your anonymity — ever. The safety page covers crisis
                lines, online caution, and event safety in plain
                language.
              </p>
              <Link
                href="/safety"
                className="mt-5 inline-flex items-center gap-2 text-[var(--color-ink)] hover:text-[var(--color-crimson)]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontVariantCaps: "all-small-caps",
                  letterSpacing: "0.16em",
                  fontSize: "0.86rem",
                }}
              >
                read the safety page
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Care — submit chapel */}
            <div className="panel-chapel panel-chapel--carnation rise-in p-5 sm:p-7">
              <span className="section-kicker">
                <HeraldicGlyph name="quill-key" />
                a form of care
              </span>
              <h3
                className="mt-3 text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.55rem", letterSpacing: "-0.025em", lineHeight: 1.05 }}
              >
                Good information is a form of care.
              </h3>
              <p
                className="mt-3 text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-prose)", fontSize: "0.94rem", lineHeight: 1.7 }}
              >
                Broken link. Meeting that moved. Conference with wrong
                dates. If you see it — send it. The whole directory
                runs on people who care enough to keep it honest.
              </p>
              <Link href="/submit" className="action-primary mt-5">
                <HeraldicGlyph name="quill-key" className="h-4 w-4 text-[var(--color-gilt-soft)]" />
                send an update
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

interface ChapelCardProps {
  variant: "emerald" | "ochre" | "carnation" | "burgundy"
  kicker: string
  glyph: "shield-cross" | "star-diamond" | "open-book" | "winged-shield" | "quill-key"
  title: string
  body: string
  href: string
  cta: string
  translateY?: string
}

function ChapelCard({ variant, kicker, glyph, title, body, href, cta, translateY = "0px" }: ChapelCardProps) {
  return (
    <Link
      href={href}
      className={`panel-chapel panel-chapel--${variant} group block p-6 transition-all hover:-translate-y-1`}
      style={{ transform: `translateY(${translateY})` }}
    >
      <span className="section-kicker">
        <HeraldicGlyph name={glyph} />
        {kicker}
      </span>
      <h3
        className="mt-4 text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.55rem", letterSpacing: "-0.025em", lineHeight: 1.05 }}
      >
        {title}
      </h3>
      <p
        className="mt-3 text-[var(--color-muted)]"
        style={{ fontFamily: "var(--font-prose)", fontSize: "0.94rem", lineHeight: 1.7 }}
      >
        {body}
      </p>
      <p
        className="mt-5 inline-flex items-center gap-2 text-[var(--color-crimson)] transition-colors group-hover:text-[var(--color-crimson-deep)]"
        style={{
          fontFamily: "var(--font-serif)",
          fontVariantCaps: "all-small-caps",
          letterSpacing: "0.16em",
          fontSize: "0.84rem",
        }}
      >
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </p>
    </Link>
  )
}
