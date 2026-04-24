import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  getConferenceBySlug,
  getConferences,
  getUpcomingConferences,
} from "@/lib/data/query/conferences"
import { formatDateRange } from "@/lib/utils/dates"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getConferences().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = getConferenceBySlug(slug)
  if (!c) return { title: "Conference" }
  return {
    title: c.title,
    description:
      c.summary ??
      `Conference detail for ${c.title} in ${c.city ?? c.stateAbbreviation ?? "the United States"}.`,
  }
}

export default async function ConferenceDetailPage({ params }: Props) {
  const { slug } = await params
  const conf = getConferenceBySlug(slug)
  if (!conf) notFound()

  const dateRange = formatDateRange(conf.startDate, conf.endDate) || "Dates pending"
  const days = daysUntil(conf.startDate)
  const other = getUpcomingConferences()
    .filter((c) => c.slug !== conf.slug)
    .slice(0, 3)

  const location =
    [conf.city, conf.stateAbbreviation].filter(Boolean).join(", ") || "TBA"

  return (
    <>
      {/* ── Star expansion: the conference as a single named star ── */}
      <section className="star-expand">
        <span className="star-expand__star" aria-hidden />
        <div>
          <Link
            href="/conferences"
            style={{
              display: "inline-block",
              marginBottom: "var(--space-4)",
              fontFamily: "var(--font-mono)",
              fontFeatureSettings: 'var(--ff-label)',
              fontSize: "10.5px",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--gilt-aged)",
              textDecoration: "none",
            }}
          >
            ← All conferences
          </Link>
          <h1 className="star-expand__title">{conf.title}</h1>
          <p className="star-expand__inscription">
            {[dateRange, location, days != null ? `T-${days}d` : null]
              .filter(Boolean)
              .join("  ·  ")}
          </p>
          <div
            style={{
              display: "flex",
              gap: "var(--space-3)",
              flexWrap: "wrap",
              marginTop: "var(--space-6)",
            }}
          >
            {conf.registrationUrl ? (
              <Link
                href={conf.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--gold"
              >
                Register
              </Link>
            ) : null}
            {conf.websiteUrl ? (
              <Link
                href={conf.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
              >
                Host site
              </Link>
            ) : null}
            <Link href="/submit" className="btn btn--ghost">
              Send a correction
            </Link>
          </div>
        </div>
      </section>

      {/* ── Body: quiet long-form, single column ── */}
      <section className="shell">
        <div className="quiet-prose">
          <h2>What it is.</h2>
          <p>
            {conf.summary ??
              "A young people's AA conference: a weekend of meetings, speakers, and the kind of fellowship that's hard to manufacture anywhere else. The catalog is the starting point — confirm dates and venue with the organizer before you book."}
          </p>
          {conf.notes?.toLowerCase().includes("scaffold") ? (
            <p>
              <em>A note on this record.</em> It originated as a scaffold
              entry and should be confirmed against the organizer&rsquo;s
              site before travel decisions are made.
            </p>
          ) : null}

          <h2>Where + when.</h2>
          <ul>
            <li>
              <strong>Dates:</strong> {dateRange}
            </li>
            <li>
              <strong>City:</strong> {location}
            </li>
            {conf.venue ? (
              <li>
                <strong>Venue:</strong> {conf.venue}
              </li>
            ) : null}
            {conf.organizer ? (
              <li>
                <strong>Organizer:</strong> {conf.organizer}
              </li>
            ) : null}
            {conf.capacity ? (
              <li>
                <strong>Capacity:</strong> {conf.capacity.toLocaleString()}
              </li>
            ) : null}
            {conf.price ? (
              <li>
                <strong>Price:</strong> {conf.price}
              </li>
            ) : null}
          </ul>

          <h2>If something's wrong.</h2>
          <p>
            <Link href="/submit">Send the correction</Link>. The whole
            catalog improves because the people who know better take the
            minute to send what they know.
          </p>
        </div>
      </section>

      {/* ── Other stars in the same sky ── */}
      {other.length ? (
        <section className="shell" style={{ paddingBottom: "var(--space-16)" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontFeatureSettings: 'var(--ff-label)',
              fontSize: "10.5px",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--gilt-aged)",
              marginBottom: "var(--space-5)",
              textAlign: "center",
            }}
          >
            Other stars in the same sky
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "var(--space-4)",
            }}
          >
            {other.map((o) => (
              <Link
                key={o.slug}
                href={`/conferences/${o.slug}`}
                className="frame"
                style={{
                  padding: "var(--space-5) var(--space-6)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                }}
              >
                <span className="starmark" aria-hidden />
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontFeatureSettings: 'var(--ff-label)',
                      fontSize: "10px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--gilt-aged)",
                      margin: 0,
                    }}
                  >
                    {[o.city, o.stateAbbreviation].filter(Boolean).join(" · ")}
                  </p>
                  <h4
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 400,
                      fontSize: "var(--text-md)",
                      color: "var(--parchment)",
                      margin: "var(--space-1) 0 var(--space-1)",
                    }}
                  >
                    {o.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontVariantNumeric: "tabular-nums lining-nums",
                      fontSize: "11px",
                      letterSpacing: "0.16em",
                      color: "var(--gilt)",
                      margin: 0,
                    }}
                  >
                    {formatDateRange(o.startDate, o.endDate) || "TBA"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  )
}

function daysUntil(iso?: string): number | null {
  if (!iso) return null
  const start = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(start.getTime())) return null
  const now = new Date()
  const diff = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diff > 0 ? diff : 0
}
