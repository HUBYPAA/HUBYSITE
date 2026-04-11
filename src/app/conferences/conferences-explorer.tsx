"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
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
        <div className="order-2 xl:order-none grid gap-5">
          {featured ? (
            <section className="panel-raised p-5 sm:p-7 md:p-9">
              <span className="section-kicker">Featured record</span>
              <div className="mt-4 grid gap-6 md:mt-5 md:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] md:gap-8">
                <div>
                  <h2 className="section-title">{featured.title}</h2>
                  <p className="mt-4 text-base leading-8 text-muted md:mt-5">
                    {featured.summary ??
                      "A conference record with enough structure to give people a real starting point for dates, place, and source links."}
                  </p>
                </div>

                <div className="panel-muted p-4 sm:p-5">
                  <p className="meta-label">Date + place</p>
                  <p className="mt-3 text-lg font-medium text-ink">
                    {formatDateRange(featured.startDate, featured.endDate)}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted">
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
                        className="action-secondary"
                      >
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          <section className="panel p-5 sm:p-7">
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
                  className="list-item"
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
                        <p className="mt-2 text-sm leading-7 text-muted sm:mt-3">
                          {formatDateRange(conference.startDate, conference.endDate)}
                        </p>
                        <p className="text-sm leading-7 text-muted">
                          {[conference.city, conference.stateAbbreviation].filter(Boolean).join(", ")}
                        </p>
                      </div>
                    </button>

                    <Link
                      href={`/conferences/${conference.slug}`}
                      className="inline-flex items-center gap-2 self-start text-sm font-medium text-ink hover:text-accent"
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

        <section className="order-1 xl:order-none space-y-5">
          <div className="map-shell h-[22rem] sm:h-[32rem] xl:sticky xl:top-24 xl:h-[calc(100dvh-8rem)]">
            <YPAAMap
              markers={markers}
              mode="conferences"
              selectedId={activeId}
              onMarkerClick={(marker) => setActiveId(marker.id)}
              autoFit
            />
            <MapDetailPanel marker={selectedMarker} onClose={() => setActiveId(null)} />
          </div>

          {past.length > 0 && (
            <div className="panel p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="section-kicker">Archive</span>
                <span className="text-sm text-muted">{past.length} past</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mt-5">
                {past.slice(0, 6).map((conference) => (
                  <Link
                    key={conference.id}
                    href={`/conferences/${conference.slug}`}
                    className="panel-muted block p-4 hover:border-white/12"
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
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
