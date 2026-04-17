"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { YPAAMap } from "@/lib/components/map/ypaa-map"
import { MapDetailPanel } from "@/lib/components/map/map-detail-panel"
import { FeaturedAltar } from "@/lib/components/cards/featured-altar"
import { FiligreeRule } from "@/lib/components/ornaments/filigree-rule"
import { HeraldicGlyph } from "@/lib/components/ornaments/heraldic-glyph"
import { conferencesToMapMarkers } from "@/lib/data/normalized/adapt"
import type { Conference } from "@/lib/data/normalized/types"
import { formatConferenceStatus, formatDateRange } from "@/lib/utils/dates"

interface ConferencesExplorerProps {
  upcoming: Conference[]
  past: Conference[]
}

const CHAPEL_VARIANTS = ["ochre", "emerald", "carnation", "burgundy"] as const

export function ConferencesExplorer({ upcoming, past }: ConferencesExplorerProps) {
  const [activeId, setActiveId] = useState<string | null>(upcoming[0]?.id ?? null)

  const markers = useMemo(
    () =>
      conferencesToMapMarkers(
        upcoming.map((conference, index) => ({
          ...conference,
          featured: index === 0,
        })),
      ),
    [upcoming],
  )

  const selectedMarker = markers.find((marker) => marker.id === activeId) ?? null
  const featured = upcoming[0]
  const restUpcoming = upcoming.slice(1)

  return (
    <div className="site-shell pb-16 pt-10">
      {/* ── Featured altar ── */}
      {featured ? (
        <div className="mb-12">
          <FeaturedAltar conference={featured} variant="compact" />
        </div>
      ) : null}

      <FiligreeRule tone="shadow" />

      <div className="mt-12 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
        {/* ── Upcoming chapel grid + archive ── */}
        <div className="grid gap-6">
          <section>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="section-kicker">
                  <HeraldicGlyph name="star-diamond" />
                  upcoming
                </span>
                <h2 className="section-title mt-3">The current calendar.</h2>
              </div>
              <p
                className="text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-prose)", fontStyle: "italic", fontSize: "0.94rem" }}
              >
                Painted differently — same building.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {restUpcoming.map((conference, index) => {
                const variant = CHAPEL_VARIANTS[index % CHAPEL_VARIANTS.length]
                return (
                  <UpcomingChapel
                    key={conference.id}
                    conference={conference}
                    variant={variant}
                    isActive={conference.id === activeId}
                    onSelect={() => setActiveId(conference.id)}
                  />
                )
              })}
            </div>
          </section>

          {past.length > 0 ? (
            <section className="mt-6">
              <FiligreeRule tone="shadow" />
              <div className="mt-8 mb-5 flex items-end justify-between gap-3">
                <div>
                  <span className="section-kicker" style={{ color: "var(--color-muted)" }}>
                    <HeraldicGlyph name="open-book" />
                    side aisle · the archive
                  </span>
                  <h2
                    className="mt-3"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: "clamp(1.5rem,2.4vw,2rem)",
                      letterSpacing: "-0.025em",
                      color: "var(--color-muted)",
                    }}
                  >
                    Weekends that already happened.
                  </h2>
                </div>
                <span
                  className="text-[var(--color-muted)]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "0.84rem",
                  }}
                >
                  {past.length} weathered records
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {past.slice(0, 9).map((conference) => (
                  <Link
                    key={conference.id}
                    href={`/conferences/${conference.slug}`}
                    className="panel-archive block p-4 transition-transform hover:-translate-y-0.5"
                  >
                    <p className="meta-label">{formatConferenceStatus(conference.conferenceStatus)}</p>
                    <h3
                      className="mt-2 text-[var(--color-ink)]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: "1.05rem",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.1,
                      }}
                    >
                      {conference.title}
                    </h3>
                    <p
                      className="mt-2 text-[var(--color-muted)]"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: "0.84rem",
                      }}
                    >
                      {formatDateRange(conference.startDate, conference.endDate)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        {/* ── Map sidebar ── */}
        <aside>
          <div className="space-y-4 xl:sticky xl:top-24">
            <div className="panel p-4 sm:p-5">
              <span className="section-kicker">
                <HeraldicGlyph name="shield-cross" />
                the map view
              </span>
              <h2 className="section-title mt-3" style={{ fontSize: "clamp(1.4rem,2vw,1.7rem)" }}>
                Where the calendar is.
              </h2>

              <div className="map-shell mt-5 h-[26rem] sm:h-[32rem] xl:h-[calc(100dvh-22rem)]">
                <YPAAMap
                  markers={markers}
                  mode="conferences"
                  selectedId={activeId}
                  onMarkerClick={(marker) => setActiveId(marker.id)}
                  autoFit
                />
              </div>
            </div>

            {selectedMarker ? (
              <MapDetailPanel marker={selectedMarker} onClose={() => setActiveId(null)} />
            ) : (
              <div className="panel-chapel panel-chapel--ochre p-4 sm:p-5">
                <p className="meta-label">tap a conference</p>
                <p
                  className="mt-3 text-[var(--color-muted)]"
                  style={{ fontFamily: "var(--font-prose)", fontSize: "0.92rem", lineHeight: 1.7 }}
                >
                  Select any marker to review dates, place, and the current source link.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

function UpcomingChapel({
  conference,
  variant,
  isActive,
  onSelect,
}: {
  conference: Conference
  variant: typeof CHAPEL_VARIANTS[number]
  isActive: boolean
  onSelect: () => void
}) {
  return (
    <article
      className={`panel-chapel panel-chapel--${variant} group flex flex-col gap-3 p-5 transition-all ${
        isActive ? "ring-1 ring-[var(--color-gilt)]" : ""
      }`}
    >
      <button type="button" className="text-left" onClick={onSelect}>
        <p className="meta-label">{formatConferenceStatus(conference.conferenceStatus)}</p>
        <h3
          className="mt-2 text-[var(--color-ink)]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "1.45rem",
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
          }}
        >
          {conference.title}
        </h3>
        {conference.summary ? (
          <p
            className="mt-3 text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-prose)", fontSize: "0.92rem", lineHeight: 1.7 }}
          >
            {conference.summary}
          </p>
        ) : null}
      </button>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
        <span
          className="inline-flex items-center gap-2 text-[0.78rem] text-[var(--color-ink)]"
          style={{
            fontFamily: "var(--font-serif)",
            fontVariantCaps: "all-small-caps",
            letterSpacing: "0.16em",
            textTransform: "lowercase",
          }}
        >
          <HeraldicGlyph name="diamond-pip" className="h-1.5 w-1.5 text-[var(--color-gilt)]" />
          {formatDateRange(conference.startDate, conference.endDate)}
        </span>
        <span
          className="inline-flex items-center gap-2 text-[0.78rem] text-[var(--color-muted)]"
          style={{
            fontFamily: "var(--font-serif)",
            fontVariantCaps: "all-small-caps",
            letterSpacing: "0.16em",
            textTransform: "lowercase",
          }}
        >
          <HeraldicGlyph name="diamond-pip" className="h-1.5 w-1.5 text-[var(--color-gilt-shadow)]" />
          {[conference.city, conference.stateAbbreviation].filter(Boolean).join(", ")}
        </span>
        {conference.notes?.toLowerCase().includes("scaffold") ? (
          <span
            className="ml-auto inline-flex items-center rounded-[var(--radius-sm)] border border-[var(--color-crimson)] px-2 py-0.5 text-[0.66rem] text-[var(--color-crimson)]"
            style={{
              fontFamily: "var(--font-serif)",
              fontVariantCaps: "all-small-caps",
              letterSpacing: "0.18em",
            }}
          >
            verify
          </span>
        ) : null}
      </div>

      <Link
        href={`/conferences/${conference.slug}`}
        className="inline-flex items-center gap-2 self-start text-[var(--color-crimson)] hover:text-[var(--color-crimson-deep)]"
        style={{
          fontFamily: "var(--font-serif)",
          fontVariantCaps: "all-small-caps",
          letterSpacing: "0.16em",
          fontSize: "0.82rem",
        }}
      >
        see the weekend
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  )
}
