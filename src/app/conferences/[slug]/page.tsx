import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { notFound } from "next/navigation"
import { YPAAMap } from "@/lib/components/map/ypaa-map"
import { FeaturedAltar } from "@/lib/components/cards/featured-altar"
import { FiligreeRule } from "@/lib/components/ornaments/filigree-rule"
import { HeraldicGlyph } from "@/lib/components/ornaments/heraldic-glyph"
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

  if (!conference) return { title: "Conference" }

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

  if (!conference) notFound()

  const marker = conferencesToMapMarkers([{ ...conference, featured: true }])[0]
  const isScaffold = conference.notes?.toLowerCase().includes("scaffold")
  return (
    <div>
      {/* Vault sky is persistent overhead; no per-page ribbon needed. */}
      <div className="site-shell pt-10">
        <FiligreeRule tone="gilt" />
      </div>

      <div className="site-shell mt-8 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/conferences"
          className="inline-flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-crimson)]"
          style={{
            fontFamily: "var(--font-serif)",
            fontVariantCaps: "all-small-caps",
            letterSpacing: "0.18em",
            fontSize: "0.78rem",
          }}
        >
          <ArrowRight className="h-3 w-3 rotate-180" />
          back to the calendar
        </Link>
        <span
          className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-gilt-shadow)] px-3 py-1 text-[var(--color-gilt-shadow)]"
          style={{
            fontFamily: "var(--font-serif)",
            fontVariantCaps: "all-small-caps",
            letterSpacing: "0.18em",
            fontSize: "0.72rem",
          }}
        >
          <HeraldicGlyph name="diamond-pip" className="h-1.5 w-1.5 text-[var(--color-gilt)]" />
          {formatConferenceStatus(conference.conferenceStatus)}
        </span>
      </div>

      {/* ── The altar at full ceremony ── */}
      <section className="altar-section site-shell mt-10">
        <div className="altar-lit">
          <FeaturedAltar conference={conference} variant="full" />
        </div>
      </section>

      <div className="site-shell mt-12">
        <FiligreeRule tone="shadow" />
      </div>

      {/* ── Body: prose nave + map sidebar (1.6 / 0.4) ── */}
      <div className="site-shell mt-12 grid gap-8 pb-16 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,0.4fr)]">
        <article>
          <span className="section-kicker">
            <HeraldicGlyph name="open-book" />
            the long view
          </span>
          <h2 className="section-title mt-4">What to know before you book.</h2>

          <div className="prose-block mt-6">
            <p>
              {conference.summary ??
                "This page keeps the essential information in one place: date, location, source links, and the confidence level of the record itself. The directory is the starting point, not the last check before you go."}
            </p>
            {isScaffold ? (
              <p>
                <strong className="text-[var(--color-crimson)]">A note on this record.</strong>{" "}
                It originated as a scaffold entry and should be confirmed against the
                organizer&apos;s site before travel decisions are made. The dates and city
                are best-effort. The venue and registration link are the things to check.
              </p>
            ) : null}
            <p>
              If something here is wrong, send the correction. The whole directory
              improves because people who know better take the minute to say so.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <DetailMuted label="weekend">
              {formatDateRange(conference.startDate, conference.endDate)}
            </DetailMuted>
            <DetailMuted label="city">
              {[conference.city, conference.stateAbbreviation].filter(Boolean).join(", ") || "tbc"}
            </DetailMuted>
            <DetailMuted label="venue">
              {conference.venue ?? "venue not yet on file"}
            </DetailMuted>
            <DetailMuted label="organizer">
              {conference.organizer ?? "organizer not yet on file"}
            </DetailMuted>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {conference.registrationUrl ? (
              <a href={conference.registrationUrl} target="_blank" rel="noreferrer" className="action-altar">
                registration
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
            {conference.websiteUrl ? (
              <a href={conference.websiteUrl} target="_blank" rel="noreferrer" className="action-secondary">
                official site
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
            <Link href="/submit" className="action-primary">
              <HeraldicGlyph name="quill-key" className="h-4 w-4 text-[var(--color-gilt-soft)]" />
              send an update
            </Link>
          </div>

          {conference.tags?.length ? (
            <div className="mt-8">
              <p className="meta-label">tags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {conference.tags.map((tag) => (
                  <span key={tag} className="chip">{tag}</span>
                ))}
              </div>
            </div>
          ) : null}

          {/* The altar's own finial */}
          <div className="mt-12 flex justify-center">
            <HeraldicGlyph name="star-eight" className="h-6 w-6 text-[var(--color-gilt)]" />
          </div>
          <div className="mt-3">
            <FiligreeRule tone="shadow" />
          </div>
        </article>

        <aside>
          <div className="space-y-4 xl:sticky xl:top-24">
            <div className="map-shell h-[18rem]">
              <YPAAMap
                markers={marker ? [marker] : []}
                mode="conferences"
                selectedId={marker?.id ?? null}
                autoFit
              />
            </div>

            <div className="panel-linden p-4">
              <p className="meta-label" style={{ color: "rgba(241,233,214,0.6)" }}>how to get there</p>
              <p
                className="mt-3 text-[var(--color-ivory)]"
                style={{ fontFamily: "var(--font-prose)", fontSize: "0.92rem", lineHeight: 1.7 }}
              >
                Verify hotel and venue from the official source. Local committee
                pages tend to have the most accurate logistics.
              </p>
            </div>

            <div className="panel-chapel panel-chapel--carnation p-4">
              <p className="meta-label">care reminder</p>
              <p
                className="mt-3 text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-prose)", fontSize: "0.92rem", lineHeight: 1.7 }}
              >
                Conferences are big rooms. Travel sober plans, sponsor check-ins,
                and roommate trust go a long way.
              </p>
              <Link
                href="/safety"
                className="mt-4 inline-flex items-center gap-2 text-[var(--color-crimson)] hover:text-[var(--color-crimson-deep)]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontVariantCaps: "all-small-caps",
                  letterSpacing: "0.16em",
                  fontSize: "0.78rem",
                }}
              >
                read the safety page
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function DetailMuted({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="panel-muted p-5">
      <p className="meta-label">{label}</p>
      <p
        className="mt-3 text-[var(--color-ink)]"
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: "1.25rem",
          lineHeight: 1.2,
        }}
      >
        {children}
      </p>
    </div>
  )
}
