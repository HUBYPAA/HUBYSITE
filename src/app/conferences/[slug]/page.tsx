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
      <Link href="/conferences" className="meta-label text-faint hover:text-accent">
        Back to conferences
      </Link>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
        <section className="panel-raised p-5 sm:p-7 md:p-9">
          <p className="meta-label">{formatConferenceStatus(conference.conferenceStatus)}</p>
          <h1 className="page-title mt-5 max-w-4xl text-[clamp(2.75rem,7vw,4.5rem)]">
            {conference.title}
          </h1>
          <p className="page-intro mt-6">
            {conference.summary ??
              "This detail page is here to keep the essential information in one place: date, location, source links, and the confidence level of the record itself."}
          </p>

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
          </div>

          <div className="rule my-8" />

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="meta-label">Organizer</p>
              <p className="mt-3 text-sm leading-7 text-muted">
                {conference.organizer ?? "Organizer not provided"}
              </p>
            </div>
            <div>
              <p className="meta-label">Confidence</p>
              <p className="mt-3 text-sm leading-7 text-muted">
                {isScaffold
                  ? "This record originated as a scaffold entry and should be confirmed before travel decisions are made."
                  : "This record does not currently carry a scaffold warning, but source links should still be checked before plans are locked."}
              </p>
            </div>
          </div>

          {(conference.notes || conference.tags?.length) && (
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {conference.notes && (
                <div>
                  <p className="meta-label">Notes</p>
                  <p className="mt-3 text-sm leading-7 text-muted">{conference.notes}</p>
                </div>
              )}
              {conference.tags?.length ? (
                <div>
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
          )}
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

          <div className="panel p-5 sm:p-6">
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
        </section>
      </div>
    </div>
  )
}
