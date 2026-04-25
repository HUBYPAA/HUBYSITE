import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ActionStrip,
  FocalPanel,
  LedgerRow,
  LedgerRows,
  MarginalRail,
  PageShell,
  StatusRail,
} from "@/lib/components/atlas"
import { CopyLinkButton } from "@/lib/components/site/copy-link-button"
import {
  getConferenceBySlug,
  getConferences,
  getUpcomingConferences,
} from "@/lib/data/query/conferences"
import { getMeetingsByState } from "@/lib/data/query/meetings"
import { resolveSiteUrl } from "@/lib/utils/site-url"
import { formatDateRange } from "@/lib/utils/dates"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getConferences().map((conference) => ({ slug: conference.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const conference = getConferenceBySlug(slug)
  if (!conference) return { title: "Conference" }

  return {
    title: conference.title,
    description:
      conference.summary ??
      `Conference detail for ${conference.title} in ${
        conference.city ?? conference.stateAbbreviation ?? "the United States"
      }.`,
  }
}

export default async function ConferenceDetailPage({ params }: Props) {
  const { slug } = await params
  const conference = getConferenceBySlug(slug)
  if (!conference) notFound()

  const dateRange =
    formatDateRange(conference.startDate, conference.endDate) || "Dates pending"
  const location =
    [conference.city, conference.stateAbbreviation].filter(Boolean).join(", ") ||
    "Location pending"
  const days = daysUntil(conference.startDate)
  const nearbyMeetings = conference.stateAbbreviation
    ? getMeetingsByState(conference.stateAbbreviation).slice(0, 3)
    : []
  const otherConferences = getUpcomingConferences()
    .filter((entry) => entry.slug !== conference.slug)
    .slice(0, 3)

  const shareUrl = new URL(`/conferences/${conference.slug}`, resolveSiteUrl()).toString()
  const calendarUrl = buildCalendarUrl({
    title: conference.title,
    startDate: conference.startDate,
    endDate: conference.endDate,
    location,
    details: conference.summary ?? conference.websiteUrl ?? shareUrl,
  })

  return (
    <PageShell tone="stone">
      <div className="flex flex-col gap-8">
        <div className="shell flex flex-col gap-8">
          <Link href="/conferences" className="btn btn--quiet btn-sm self-start">
            Back to conferences
          </Link>

          <FocalPanel
            tone="canopy"
            kicker="Conference detail"
            title={conference.title}
            lead={
              conference.summary ??
              "A young people's AA conference: meetings, speakers, service, and the kind of fellowship that is hard to manufacture anywhere else."
            }
            actions={
              <ActionStrip>
                {conference.registrationUrl ? (
                  <Link
                    href={conference.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary"
                  >
                    Register
                  </Link>
                ) : null}
                {conference.websiteUrl ? (
                  <Link
                    href={conference.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--secondary"
                  >
                    Host site
                  </Link>
                ) : null}
                {calendarUrl ? (
                  <Link
                    href={calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost"
                  >
                    Add to calendar
                  </Link>
                ) : null}
                <CopyLinkButton href={shareUrl} className="btn btn--ghost" />
                <Link href="/submit" className="btn btn--ghost">
                  Report outdated info
                </Link>
              </ActionStrip>
            }
            aside={
              <div className="grid gap-4">
                <div>
                  <p className="page-kicker">When</p>
                  <p className="body-sm" style={{ margin: 0 }}>
                    {dateRange}
                  </p>
                </div>
                <div>
                  <p className="page-kicker">Where</p>
                  <p className="body-sm" style={{ margin: 0 }}>
                    {location}
                  </p>
                </div>
                <div>
                  <p className="page-kicker">Status</p>
                  <p className="body-sm" style={{ margin: 0 }}>
                    {conference.conferenceStatus === "registration-open"
                      ? "Registration open"
                      : conference.conferenceStatus.replace(/-/g, " ")}
                    {days != null ? ` · ${days === 0 ? "Now" : `${days} days out`}` : ""}
                  </p>
                </div>
              </div>
            }
            footer={
              <p className="body-sm" style={{ margin: 0, opacity: 0.88 }}>
                This should feel like the weekend matters, not like a flyer got
                trapped in a frame.
              </p>
            }
          />

          <section className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
            <div className="grid gap-8">
              <div className="grid gap-4">
                <div>
                  <p className="page-kicker">Fact wings</p>
                  <h2 className="heading-lg">What matters before you commit.</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Fact label="Dates" value={dateRange} />
                  <Fact label="City" value={location} />
                  {conference.venue ? <Fact label="Venue" value={conference.venue} /> : null}
                  {conference.organizer ? <Fact label="Organizer" value={conference.organizer} /> : null}
                  {conference.capacity ? (
                    <Fact label="Capacity" value={conference.capacity.toLocaleString()} />
                  ) : null}
                  {conference.price ? <Fact label="Price" value={conference.price} /> : null}
                </div>
              </div>

              <div className="grid gap-4">
                <div>
                  <p className="page-kicker">What it is</p>
                  <h2 className="heading-lg">A practical weekend page, not atmosphere for its own sake.</h2>
                </div>
                <div className="quiet-prose" style={{ maxWidth: "100%", marginInline: 0, paddingBottom: 0 }}>
                  <p>
                    {conference.summary ??
                      "The catalog is the starting point. Confirm dates and venue with the organizer before you book travel, especially when a record is still being verified."}
                  </p>
                  {conference.notes?.toLowerCase().includes("scaffold") ? (
                    <p>
                      This record started as a scaffold entry. Treat it as a
                      live lead, then confirm with the organizer before making
                      travel decisions.
                    </p>
                  ) : null}
                </div>
              </div>

              {nearbyMeetings.length ? (
                <div className="grid gap-4">
                  <div>
                    <p className="page-kicker">Nearby meetings</p>
                    <h2 className="heading-lg">Good rooms in the same state.</h2>
                  </div>
                  <LedgerRows>
                    {nearbyMeetings.map((meeting) => (
                      <LedgerRow
                        key={meeting.id}
                        href="/meetings"
                        label={[meeting.day, meeting.time].filter(Boolean).join(" · ")}
                        title={meeting.title}
                        summary={
                          [meeting.city, meeting.stateAbbreviation, meeting.format]
                            .filter(Boolean)
                            .join(" · ")
                        }
                        meta="Open meetings"
                      />
                    ))}
                  </LedgerRows>
                </div>
              ) : null}

              {otherConferences.length ? (
                <div className="grid gap-4">
                  <div>
                    <p className="page-kicker">Next weekends</p>
                    <h2 className="heading-lg">Other conferences in the same season.</h2>
                  </div>
                  <LedgerRows>
                    {otherConferences.map((entry) => (
                      <LedgerRow
                        key={entry.slug}
                        href={`/conferences/${entry.slug}`}
                        label={formatDateRange(entry.startDate, entry.endDate) || "Dates pending"}
                        title={entry.title}
                        summary={
                          [entry.city, entry.stateAbbreviation].filter(Boolean).join(", ") ||
                          "Location pending"
                        }
                        meta="Open"
                      />
                    ))}
                  </LedgerRows>
                </div>
              ) : null}
            </div>

            <div className="grid gap-8">
              <MarginalRail kicker="Verification" title="Source notes">
                <p style={{ margin: 0 }}>
                  Source file: <code>{conference.sourceFile ?? "unknown"}</code>
                </p>
                {conference.websiteUrl ? (
                  <p style={{ margin: 0 }}>
                    Website: <a href={conference.websiteUrl}>{conference.websiteUrl}</a>
                  </p>
                ) : null}
                {conference.registrationUrl ? (
                  <p style={{ margin: 0 }}>
                    Registration: <a href={conference.registrationUrl}>{conference.registrationUrl}</a>
                  </p>
                ) : null}
                {conference.notes ? <p style={{ margin: 0 }}>{conference.notes}</p> : null}
              </MarginalRail>

              <StatusRail
                steps={[
                  {
                    label: "Read the record",
                    detail: "Check the dates, city, venue, and organizer details.",
                    state: "complete",
                  },
                  {
                    label: "Verify before travel",
                    detail: "Use the host site or registration page before booking.",
                    state: "current",
                  },
                  {
                    label: "Report anything stale",
                    detail: "A quick correction keeps the whole atlas stronger.",
                    state: conference.notes?.toLowerCase().includes("scaffold")
                      ? "warning"
                      : "upcoming",
                  },
                ]}
                note="The page should help you act, not perform confidence it has not earned."
              />
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 border-t border-[rgba(24,50,74,0.08)]">
      <p className="page-kicker" style={{ marginBottom: "0.5rem" }}>
        {label}
      </p>
      <p className="body-sm" style={{ margin: 0 }}>
        {value}
      </p>
    </div>
  )
}

function daysUntil(date?: string) {
  if (!date) return null
  const start = new Date(`${date}T00:00:00`)
  if (Number.isNaN(start.getTime())) return null
  const now = new Date()
  const diff = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diff > 0 ? diff : 0
}

function buildCalendarUrl({
  title,
  startDate,
  endDate,
  location,
  details,
}: {
  title: string
  startDate?: string
  endDate?: string
  location: string
  details: string
}) {
  if (!startDate) return null
  const start = startDate.replaceAll("-", "")
  const end = addOneDay(endDate ?? startDate).replaceAll("-", "")

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    location,
    details,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function addOneDay(date: string) {
  const value = new Date(`${date}T00:00:00`)
  value.setDate(value.getDate() + 1)
  return value.toISOString().slice(0, 10)
}
