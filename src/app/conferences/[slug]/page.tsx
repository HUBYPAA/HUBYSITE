import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ExternalLink, MapPin } from "lucide-react"
import { notFound } from "next/navigation"
import { YPAAMap } from "@/lib/components/map/ypaa-map"
import { conferencesToMapMarkers } from "@/lib/data/normalized/adapt"
import { getConferenceBySlug, getConferences } from "@/lib/data/query/conferences"
import { formatConferenceStatus, formatDateRange } from "@/lib/utils/dates"

interface ConferenceDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getConferences().map((conference) => ({
    slug: conference.slug,
  }))
}

export async function generateMetadata({
  params,
}: ConferenceDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const conference = getConferenceBySlug(slug)

  if (!conference) {
    return {
      title: "Conference",
    }
  }

  return {
    title: conference.title,
    description:
      conference.summary ??
      `Conference detail for ${conference.title} in ${conference.city ?? conference.stateAbbreviation ?? "the United States"}.`,
  }
}

export default async function ConferenceDetailPage({
  params,
}: ConferenceDetailPageProps) {
  const { slug } = await params
  const conference = getConferenceBySlug(slug)

  if (!conference) {
    notFound()
  }

  const marker = conferencesToMapMarkers([{ ...conference, featured: true }])[0]
  const isScaffold = conference.notes?.includes("Scaffold")

  return (
    <div className="site-shell pb-16 pt-28">
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/conferences" className="meta-label text-faint hover:text-gold">
          Back to conferences
        </Link>
        <span className="inline-flex items-center rounded-[0.75rem] border border-[rgba(200,164,78,0.18)] bg-[rgba(200,164,78,0.08)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)]">
          {formatConferenceStatus(conference.conferenceStatus)}
        </span>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
        <section className="panel-raised rise-in relative overflow-hidden p-5 sm:p-7 md:p-9">
          <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(26,39,68,0.9),rgba(36,51,86,0.82)_46%,rgba(36,51,86,0)_100%)]" />
          <div className="absolute -right-8 top-12 h-28 w-28 rounded-full border border-[rgba(200,164,78,0.08)] bg-[rgba(200,164,78,0.08)] blur-2xl" />
          <div className="relative z-10">
            <p className="meta-label text-[var(--color-gold)]">Conference detail</p>
            <h1 className="page-title mt-5 max-w-4xl text-[clamp(2.75rem,7vw,4.5rem)] text-[rgba(240,235,228,0.95)]">
              {conference.title}
            </h1>
            <p className="page-intro mt-6 max-w-3xl text-[rgba(210,203,194,0.72)]">
              {conference.summary ??
                "This detail page keeps the essential information in one place: date, location, source links, and the confidence level of the record itself."}
            </p>

            {isScaffold ? (
              <div className="panel-outline mt-6 p-4 sm:p-5">
                <p className="meta-label">Verification warning</p>
                <p className="mt-2 text-sm leading-7 text-muted">
                  This record originated as a scaffold entry and should be confirmed
                  before travel decisions are made.
                </p>
              </div>
            ) : null}

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="panel-muted p-5">
                <p className="meta-label">Date</p>
                <p className="mt-3 text-lg font-medium text-ink">
                  {formatDateRange(conference.startDate, conference.endDate)}
                </p>
              </div>
              <div className="panel-muted p-5">
                <p className="meta-label">Location</p>
                <p className="mt-3 text-lg font-medium text-ink">
                  {[conference.city, conference.stateAbbreviation].filter(Boolean).join(", ")}
                </p>
                {conference.venue && (
                  <p className="mt-2 text-sm leading-7 text-muted">{conference.venue}</p>
                )}
              </div>
              <div className="panel-muted p-5">
                <p className="meta-label">Organizer</p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {conference.organizer ?? "Organizer not provided"}
                </p>
              </div>
              <div className="panel-muted p-5">
                <p className="meta-label">Confidence</p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {isScaffold
                    ? "Scaffold-level record. Check the source before locking plans."
                    : "No scaffold warning on file, but source links should still be checked before plans are locked."}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {conference.registrationUrl && (
                <a
                  href={conference.registrationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="action-primary"
                >
                  Registration
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {conference.websiteUrl && (
                <a
                  href={conference.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="action-secondary"
                >
                  Website
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <Link href="/submit" className="action-secondary">
                Send update
              </Link>
            </div>

            {(conference.notes || conference.tags?.length) && (
              <>
                <div className="rule my-8" />

                <div className="grid gap-6 lg:grid-cols-2">
                  {conference.notes && (
                    <div className="panel-muted p-5">
                      <p className="meta-label">Notes</p>
                      <p className="mt-3 text-sm leading-7 text-muted">{conference.notes}</p>
                    </div>
                  )}
                  {conference.tags?.length ? (
                    <div className="panel-muted p-5">
                      <p className="meta-label">Tags</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {conference.tags.map((tag) => (
                          <span key={tag} className="chip" data-active="false">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div className="map-shell h-[26rem] sm:h-[34rem]">
            <YPAAMap
              markers={marker ? [marker] : []}
              mode="conferences"
              selectedId={marker?.id ?? null}
              autoFit
            />
          </div>

          <div className="panel rise-in p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 text-accent" />
              <div>
                <p className="meta-label">What to do next</p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Use the source links above, verify the hotel or venue details,
                  and send a correction if this page is missing information.
                </p>
                <Link href="/submit" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent">
                  Submit an update
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="panel-outline rise-in p-5 sm:p-6">
            <p className="meta-label">Travel posture</p>
            <p className="mt-3 text-sm leading-7 text-muted">
              Verify venue and hotel details from the source links, especially if
              this record still feels provisional. The directory is the starting
              point, not the last check before you go.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
