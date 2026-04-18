"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { YPAAMap } from "@/lib/components/map/ypaa-map"
import { MapDetailPanel } from "@/lib/components/map/map-detail-panel"
import { FeaturedAltar } from "@/lib/components/cards/featured-altar"
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
        upcoming.map((c, i) => ({ ...c, featured: i === 0 })),
      ),
    [upcoming],
  )

  const selectedMarker = markers.find((m) => m.id === activeId) ?? null
  const featured = upcoming[0]
  const restUpcoming = upcoming.slice(1)

  return (
    <div className="shell pb-16">
      {featured ? (
        <section className="mb-16">
          <FeaturedAltar conference={featured} variant="compact" />
        </section>
      ) : null}

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
        {/* Upcoming list */}
        <section>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Upcoming</p>
              <h2 className="heading-lg mt-3">The current calendar.</h2>
            </div>
            <p className="caption">{upcoming.length} weekends tracked</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {restUpcoming.map((conference) => (
              <UpcomingCard
                key={conference.id}
                conference={conference}
                isActive={conference.id === activeId}
                onSelect={() => setActiveId(conference.id)}
              />
            ))}
          </div>

          {past.length > 0 ? (
            <section className="mt-16">
              <hr className="hr" />
              <div className="mt-10 mb-6 flex items-end justify-between gap-3">
                <div>
                  <p className="eyebrow">Archive</p>
                  <h2 className="heading-lg mt-3">Weekends that already happened.</h2>
                </div>
                <span className="caption">{past.length} records</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {past.slice(0, 9).map((c) => (
                  <Link
                    key={c.id}
                    href={`/conferences/${c.slug}`}
                    className="card card-quiet card-interactive block"
                  >
                    <p className="caption">{formatConferenceStatus(c.conferenceStatus)}</p>
                    <h3
                      className="mt-2"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontWeight: 400,
                        fontSize: "1.125rem",
                        letterSpacing: "-0.018em",
                        lineHeight: 1.2,
                        color: "var(--color-ink)",
                      }}
                    >
                      {c.title}
                    </h3>
                    <p className="body-sm mt-2">{formatDateRange(c.startDate, c.endDate)}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </section>

        {/* Map aside */}
        <aside>
          <div className="space-y-4 xl:sticky xl:top-24">
            <div>
              <p className="eyebrow">On the map</p>
              <h3 className="heading-md mt-2">Where the calendar is.</h3>
            </div>

            <div className="map-shell h-[26rem] sm:h-[32rem] xl:h-[calc(100dvh-22rem)]">
              <YPAAMap
                markers={markers}
                mode="conferences"
                selectedId={activeId}
                onMarkerClick={(m) => setActiveId(m.id)}
                autoFit
              />
            </div>

            {selectedMarker ? (
              <MapDetailPanel marker={selectedMarker} onClose={() => setActiveId(null)} />
            ) : (
              <div className="card card-quiet">
                <p className="eyebrow">Tap a conference</p>
                <p className="body-sm mt-3">
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

function UpcomingCard({
  conference,
  isActive,
  onSelect,
}: {
  conference: Conference
  isActive: boolean
  onSelect: () => void
}) {
  const isScaffold = conference.notes?.toLowerCase().includes("scaffold")
  return (
    <article
      className="card"
      style={isActive ? { borderColor: "var(--color-vault)", boxShadow: "0 0 0 1px var(--color-vault)" } : undefined}
    >
      <button type="button" onClick={onSelect} className="block w-full text-left">
        <div className="flex items-start justify-between gap-3">
          <p className="caption">{formatConferenceStatus(conference.conferenceStatus)}</p>
          {isScaffold ? <span className="tag tag-outline">Verify</span> : null}
        </div>
        <h3
          className="mt-2"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 400,
            fontSize: "1.4rem",
            letterSpacing: "-0.022em",
            lineHeight: 1.12,
            color: "var(--color-ink)",
          }}
        >
          {conference.title}
        </h3>
        {conference.summary ? (
          <p className="body-sm mt-3">{conference.summary}</p>
        ) : null}
        <p className="body-sm mt-3">
          <span className="text-[var(--color-ink)]">
            {formatDateRange(conference.startDate, conference.endDate)}
          </span>
          {[conference.city, conference.stateAbbreviation].filter(Boolean).length ? (
            <> · {[conference.city, conference.stateAbbreviation].filter(Boolean).join(", ")}</>
          ) : null}
        </p>
      </button>

      <Link
        href={`/conferences/${conference.slug}`}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-vault)]"
      >
        See the weekend
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  )
}
