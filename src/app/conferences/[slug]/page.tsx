import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ExternalLink, ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"
import { YPAAMap } from "@/lib/components/map/ypaa-map"
import { FeaturedAltar } from "@/lib/components/cards/featured-altar"
import { conferencesToMapMarkers } from "@/lib/data/normalized/adapt"
import { getConferenceBySlug, getConferences } from "@/lib/data/query/conferences"
import { formatConferenceStatus, formatDateRange } from "@/lib/utils/dates"

interface ConferenceDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getConferences().map((conference) => ({ slug: conference.slug }))
}

export async function generateMetadata({
  params,
}: ConferenceDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const conference = getConferenceBySlug(slug)
  if (!conference) return { title: "Conference" }
  return {
    title: conference.title,
    description:
      conference.summary ??
      `Conference detail for ${conference.title} in ${conference.city ?? conference.stateAbbreviation ?? "the United States"}.`,
  }
}

export default async function ConferenceDetailPage({ params }: ConferenceDetailPageProps) {
  const { slug } = await params
  const conference = getConferenceBySlug(slug)

  if (!conference) notFound()

  const marker = conferencesToMapMarkers([{ ...conference, featured: true }])[0]
  const isScaffold = conference.notes?.toLowerCase().includes("scaffold")

  return (
    <div className="shell pt-10 pb-20">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/conferences"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
        >
          <ArrowLeft className="h-4 w-4" />
          All conferences
        </Link>
        <span className="tag tag-outline">{formatConferenceStatus(conference.conferenceStatus)}</span>
      </div>

      <section className="mt-8">
        <FeaturedAltar conference={conference} variant="full" />
      </section>

      <div className="mt-14 grid gap-10 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,0.4fr)]">
        <article>
          <p className="eyebrow">The long view</p>
          <h2 className="display-2 mt-3">What to know before you book.</h2>

          <div className="prose mt-8">
            <p>
              {conference.summary ??
                "This page keeps the essential information in one place: date, location, source links, and the confidence level of the record itself. The directory is the starting point, not the last check before you go."}
            </p>
            {isScaffold ? (
              <p>
                <strong>A note on this record.</strong> It originated as a
                scaffold entry and should be confirmed against the
                organizer&rsquo;s site before travel decisions are made. The
                dates and city are best-effort. The venue and registration link
                are the things to check.
              </p>
            ) : null}
            <p>
              If something here is wrong, send the correction. The whole
              directory improves because people who know better take the
              minute to say so.
            </p>
          </div>

          <dl className="mt-10 grid gap-5 sm:grid-cols-2">
            <Detail label="Weekend">
              {formatDateRange(conference.startDate, conference.endDate)}
            </Detail>
            <Detail label="City">
              {[conference.city, conference.stateAbbreviation].filter(Boolean).join(", ") || "TBC"}
            </Detail>
            <Detail label="Venue">
              {conference.venue ?? "Not yet on file"}
            </Detail>
            <Detail label="Organizer">
              {conference.organizer ?? "Not yet on file"}
            </Detail>
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            {conference.registrationUrl ? (
              <a href={conference.registrationUrl} target="_blank" rel="noreferrer" className="btn btn-vault">
                Registration
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
            {conference.websiteUrl ? (
              <a href={conference.websiteUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
                Official site
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
            <Link href="/submit" className="btn btn-ghost">
              Send an update
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {conference.tags?.length ? (
            <div className="mt-10">
              <p className="eyebrow">Tags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {conference.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ) : null}
        </article>

        <aside>
          <div className="space-y-5 xl:sticky xl:top-24">
            <div className="map-shell h-[18rem]">
              <YPAAMap
                markers={marker ? [marker] : []}
                mode="conferences"
                selectedId={marker?.id ?? null}
                autoFit
              />
            </div>

            <div className="card card-quiet">
              <p className="eyebrow">How to get there</p>
              <p className="body-sm mt-3">
                Verify hotel and venue from the official source. Local committee
                pages tend to have the most accurate logistics.
              </p>
            </div>

            <div className="card card-quiet">
              <p className="eyebrow">Care reminder</p>
              <p className="body-sm mt-3">
                Conferences are big rooms. Travel sober plans, sponsor check-ins,
                and roommate trust go a long way.
              </p>
              <Link
                href="/safety"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-vault)]"
              >
                Read the safety page
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="card card-quiet">
      <dt className="eyebrow">{label}</dt>
      <dd
        className="mt-2"
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 400,
          fontSize: "1.2rem",
          letterSpacing: "-0.014em",
          color: "var(--color-ink)",
        }}
      >
        {children}
      </dd>
    </div>
  )
}
