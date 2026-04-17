"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { YPAAMap } from "@/lib/components/map/ypaa-map"
import { MapDetailPanel } from "@/lib/components/map/map-detail-panel"
import { conferencesToMapMarkers } from "@/lib/data/normalized/adapt"
import type { Conference } from "@/lib/data/normalized/types"
import { formatConferenceStatus, formatDateRange } from "@/lib/utils/dates"

interface ConferencesExplorerProps {
  upcoming: Conference[]
  past: Conference[]
}

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

  return (
    <div className="site-shell pb-16">
      <div className="mt-6 grid gap-5 md:mt-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="order-2 grid gap-5 xl:order-none">
          {featured ? (
            <section className="panel-vault panel-vault-glow rise-in p-5 sm:p-7 md:p-9">
              <div className="flex flex-wrap items-center gap-2">
                <span className="section-kicker">Featured record</span>
                <span className="inline-flex items-center rounded-[0.75rem] border border-[rgba(200,164,78,0.18)] bg-[rgba(200,164,78,0.08)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold-soft)]">
                  {formatConferenceStatus(featured.conferenceStatus)}
                </span>
              </div>
              <div className="mt-4 grid gap-6 md:mt-5 md:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] md:gap-8">
                <div>
                  <h2 className="section-title text-[rgba(240,235,228,0.95)]">{featured.title}</h2>
                  <p className="mt-4 text-base leading-8 text-[rgba(210,203,194,0.65)] md:mt-5">
                    {featured.summary ??
                      "A conference record with enough structure to give people a real starting point for dates, place, and source links."}
                  </p>

                  {featured.notes?.includes("Scaffold") ? (
                    <div className="mt-5 rounded-[var(--radius-md)] border border-[rgba(240,235,228,0.08)] bg-[rgba(240,235,228,0.05)] p-4">
                      <p className="meta-label text-[rgba(200,164,78,0.65)]">Verification note</p>
                      <p className="mt-2 text-sm leading-7 text-[rgba(210,203,194,0.62)]">
                        This record still carries scaffold-level notes. Use the source links before committing travel money.
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="rounded-[var(--radius-md)] border border-[rgba(200,164,78,0.15)] bg-[rgba(30,48,80,0.6)] p-4 sm:p-5">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[rgba(200,164,78,0.55)]">Date + place</p>
                  <p className="mt-3 text-lg font-medium text-[rgba(240,235,228,0.9)]">
                    {formatDateRange(featured.startDate, featured.endDate)}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[rgba(210,203,194,0.55)]">
                    {[featured.venue, featured.city, featured.stateAbbreviation]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3 md:mt-6">
                    <Link href={`/conferences/${featured.slug}`} className="action-primary">
                      Open detail
                    </Link>
                    {featured.websiteUrl && (
                      <a
                        href={featured.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="action-secondary border-[rgba(240,235,228,0.12)] bg-[rgba(240,235,228,0.06)] text-[rgba(240,235,228,0.8)] hover:!bg-[rgba(240,235,228,0.12)]"
                      >
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          <section className="panel rise-in p-5 sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
              <div>
                <span className="section-kicker">Upcoming</span>
                <h2 className="section-title mt-3 sm:mt-4">Current conference records.</h2>
              </div>
              <p className="text-sm text-muted">
                Some records are confirmed. Some still need review.
              </p>
            </div>

            <div className="mt-6 space-y-1 sm:mt-7">
              {upcoming.map((conference) => (
                <article
                  key={conference.id}
                  className="list-item group"
                  data-active={conference.id === activeId}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
                    <button
                      type="button"
                      className="min-w-0 flex-1 text-left"
                      onClick={() => setActiveId(conference.id)}
                    >
                      <div>
                        <p className="meta-label">{formatConferenceStatus(conference.conferenceStatus)}</p>
                        <h3 className="mt-2 text-lg font-medium text-ink sm:text-xl">
                          {conference.title}
                        </h3>
                        {conference.summary ? (
                          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
                            {conference.summary}
                          </p>
                        ) : null}
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="inline-flex items-center rounded-[0.75rem] border border-ink/8 bg-panel/60 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/75">
                            {formatDateRange(conference.startDate, conference.endDate)}
                          </span>
                          <span className="inline-flex items-center rounded-[0.75rem] border border-ink/8 bg-panel/60 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/75">
                            {[conference.city, conference.stateAbbreviation].filter(Boolean).join(", ")}
                          </span>
                          {conference.notes?.includes("Scaffold") ? (
                            <span className="inline-flex items-center rounded-[0.75rem] border border-[rgba(200,164,78,0.18)] bg-[rgba(200,164,78,0.08)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)]">
                              Verify
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </button>

                    <Link
                      href={`/conferences/${conference.slug}`}
                      className="inline-flex items-center gap-2 self-start text-sm font-medium text-ink transition-colors group-hover:text-accent hover:text-accent"
                    >
                      Detail
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="order-1 xl:order-none">
          <div className="space-y-4 xl:sticky xl:top-24">
            <div className="panel rise-in p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <div className="max-w-lg">
                  <span className="section-kicker">Map view</span>
                  <h2 className="section-title mt-3">See where the calendar is happening.</h2>
                </div>
                <p className="text-sm leading-7 text-muted">
                  Tap a marker to inspect the current record without covering the map.
                </p>
              </div>

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
              <div className="panel-outline rise-in p-4 sm:p-5">
                <p className="meta-label">Tap a conference</p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Select any marker to review dates, place, and the current source link.
                </p>
              </div>
            )}
          </div>
        </div>

        {past.length > 0 && (
          <div className="order-3 xl:col-start-2">
            <div className="panel-outline rise-in p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="section-kicker">Archive</span>
                <span className="text-sm text-muted">{past.length} past</span>
              </div>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
                Past records stay here as reference notes, not as equal-weight calls to action.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mt-5">
                {past.slice(0, 6).map((conference) => (
                  <Link
                    key={conference.id}
                    href={`/conferences/${conference.slug}`}
                    className="panel-muted block p-4 hover:border-[rgba(60,42,28,0.14)]"
                  >
                    <p className="meta-label">{formatConferenceStatus(conference.conferenceStatus)}</p>
                    <h3 className="mt-2 font-serif text-lg tracking-[-0.04em] text-ink sm:mt-3 sm:text-xl">
                      {conference.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted sm:mt-3">
                      {formatDateRange(conference.startDate, conference.endDate)}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 text-sm text-muted sm:mt-4">
                      Open archive note
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
