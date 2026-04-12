"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, CalendarDays, Compass, MapPinned } from "lucide-react"
import { YPAAMap } from "@/lib/components/map/ypaa-map"
import { MapDetailPanel } from "@/lib/components/map/map-detail-panel"
import type { MapMarker } from "@/lib/data/normalized/types"

type DatasetKey = "featured" | "meetings" | "conferences"

interface HomeHeroProps {
  datasets: Record<DatasetKey, MapMarker[]>
  meetingCount: number
  conferenceCount: number
  stateCount: number
}

const DATASET_LABELS: Record<DatasetKey, string> = {
  featured: "Featured",
  meetings: "Meetings",
  conferences: "Conferences",
}

export function HomeHero({
  datasets,
  meetingCount,
  conferenceCount,
  stateCount,
}: HomeHeroProps) {
  const [dataset, setDataset] = useState<DatasetKey>("featured")
  const [selectedId, setSelectedId] = useState<string | null>(datasets.featured[0]?.id ?? null)

  const markers = datasets[dataset]
  const selectedMarker = markers.find((marker) => marker.id === selectedId) ?? null

  return (
    <section className="pt-20 md:pt-24">
      {/* Mobile: stacked layout - content above map */}
      <div className="site-shell lg:hidden">
        <div className="mb-5 pt-2">
          <span className="section-kicker">United States directory</span>
          <h1 className="page-title mt-4">
            Meetings, conferences, and places to begin.
          </h1>
          <p className="page-intro mt-4 hidden sm:block">
            Built for people who need orientation fast: where to go, what is
            upcoming, and how to send better information back into the network.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/meetings" className="action-primary">
              <MapPinned className="h-4 w-4" />
              Explore meetings
            </Link>
            <Link href="/conferences" className="action-secondary">
              <CalendarDays className="h-4 w-4" />
              Conferences
            </Link>
          </div>
        </div>

        {/* Mobile stats row */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          <div className="stat-pair rounded-xl border border-white/6 bg-white/[0.02] p-3">
            <strong>{meetingCount}</strong>
            <span>Meetings</span>
          </div>
          <div className="stat-pair rounded-xl border border-white/6 bg-white/[0.02] p-3">
            <strong>{conferenceCount}</strong>
            <span>Conferences</span>
          </div>
          <div className="stat-pair rounded-xl border border-white/6 bg-white/[0.02] p-3">
            <strong>{stateCount}</strong>
            <span>States</span>
          </div>
        </div>
      </div>

      {/* Mobile map with dataset chips overlaid */}
      <div className="site-shell-wide lg:hidden">
        <div className="map-shell h-[26rem] sm:h-[28rem]">
          <YPAAMap
            markers={markers}
            mode={dataset === "featured" ? "mixed" : dataset === "conferences" ? "conferences" : "meetings"}
            selectedId={selectedId}
            onMarkerClick={(marker) => setSelectedId(marker.id)}
            className="h-full"
          />

          <MapDetailPanel marker={selectedMarker} onClose={() => setSelectedId(null)} />

          {/* Dataset toggle chips (mobile) */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] p-3">
            <div className="pointer-events-auto flex flex-wrap items-center gap-2">
              {(Object.keys(datasets) as DatasetKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className="chip"
                  data-active={dataset === key}
                  onClick={() => {
                    setDataset(key)
                    setSelectedId(datasets[key][0]?.id ?? null)
                  }}
                >
                  {DATASET_LABELS[key]}
                  <span className="font-mono text-[0.7rem] text-faint">
                    {datasets[key].length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: original overlaid layout */}
      <div className="site-shell-wide hidden lg:block">
        <div className="map-shell min-h-[42rem]">
          <YPAAMap
            markers={markers}
            mode={dataset === "featured" ? "mixed" : dataset === "conferences" ? "conferences" : "meetings"}
            selectedId={selectedId}
            onMarkerClick={(marker) => setSelectedId(marker.id)}
            className="min-h-[42rem]"
          />

          <MapDetailPanel marker={selectedMarker} onClose={() => setSelectedId(null)} />

          <div className="pointer-events-none absolute inset-0 z-[5] flex flex-col justify-between p-7">
            <div className="pointer-events-auto flex flex-wrap items-center justify-between gap-3">
              <div className="floating-note inline-flex items-center gap-2">
                <Compass className="h-3.5 w-3.5 text-accent" />
                Quiet map. Useful in seconds.
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {(Object.keys(datasets) as DatasetKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    className="chip"
                    data-active={dataset === key}
                    onClick={() => {
                      setDataset(key)
                      setSelectedId(datasets[key][0]?.id ?? null)
                    }}
                  >
                    {DATASET_LABELS[key]}
                    <span className="font-mono text-[0.7rem] text-faint">
                      {datasets[key].length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pointer-events-auto grid gap-8 lg:grid-cols-[minmax(0,34rem)_minmax(0,14rem)] lg:items-end">
              <div className="max-w-2xl">
                <span className="section-kicker">United States directory</span>
                <h1 className="page-title mt-5">
                  A national map of meetings, conferences, and places to begin.
                </h1>
                <p className="page-intro mt-5">
                  Built for people who need orientation fast: where to go, what is
                  upcoming, what YPAA means, and how to send better information
                  back into the network.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/meetings" className="action-primary">
                    <MapPinned className="h-4 w-4" />
                    Explore meetings
                  </Link>
                  <Link href="/conferences" className="action-secondary">
                    <CalendarDays className="h-4 w-4" />
                    Browse conferences
                  </Link>
                </div>
              </div>

              <div className="panel pointer-events-auto grid gap-5 p-5">
                <div className="stat-pair">
                  <strong>{meetingCount}</strong>
                  <span>Meetings tracked</span>
                </div>
                <div className="stat-pair">
                  <strong>{conferenceCount}</strong>
                  <span>Conference records</span>
                </div>
                <div className="stat-pair">
                  <strong>{stateCount}</strong>
                  <span>States covered</span>
                </div>
              </div>
            </div>

            <div className="pointer-events-auto flex flex-wrap items-center gap-3 text-sm text-muted">
              <span className="floating-note">Meetings appear as quieter signal dots.</span>
              <span className="floating-note">Conferences get stronger markers and editorial detail.</span>
              <Link href="/submit" className="inline-flex items-center gap-2 text-sm text-ink hover:text-accent">
                Submit a correction
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
