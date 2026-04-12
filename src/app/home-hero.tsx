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

const DATASET_DESCRIPTIONS: Record<DatasetKey, string> = {
  featured:
    "A curated starting view that keeps the strongest conference record in focus and layers in a few useful meetings.",
  meetings:
    "A broader rooms-first view for orientation, travel, or quickly finding a place to begin.",
  conferences:
    "Upcoming events with stronger visual emphasis so the calendar reads fast on a phone.",
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
      <div className="site-shell-wide">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start">
          <div className="panel-raised p-5 sm:p-7 lg:p-8 xl:sticky xl:top-24">
            <span className="section-kicker">United States directory</span>
            <h1 className="page-title mt-4">
              Find the network without fighting the interface.
            </h1>
            <p className="page-intro mt-4 max-w-2xl">
              Meetings, conferences, and context for people who need orientation
              fast. The map stays readable, the controls stay obvious, and the
              next useful action stays within reach on a phone.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/meetings" className="action-primary">
                <MapPinned className="h-4 w-4" />
                Explore meetings
              </Link>
              <Link href="/conferences" className="action-secondary">
                <CalendarDays className="h-4 w-4" />
                Browse conferences
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="panel-muted p-4">
                <div className="stat-pair">
                  <strong>{meetingCount}</strong>
                  <span>Meetings</span>
                </div>
              </div>
              <div className="panel-muted p-4">
                <div className="stat-pair">
                  <strong>{conferenceCount}</strong>
                  <span>Conferences</span>
                </div>
              </div>
              <div className="panel-muted p-4">
                <div className="stat-pair">
                  <strong>{stateCount}</strong>
                  <span>States</span>
                </div>
              </div>
            </div>

            <div className="mt-6 panel-muted p-4 sm:p-5">
              <p className="meta-label">Built for phones first</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: Compass,
                    title: "See the whole field",
                    body: "Start with geography and keep the data layer obvious.",
                  },
                  {
                    icon: MapPinned,
                    title: "Tap fast",
                    body: "Markers, filters, and next steps stay thumb-reachable.",
                  },
                  {
                    icon: CalendarDays,
                    title: "Act without guessing",
                    body: "Source links and corrections stay close to the record.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <item.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <div>
                      <h2 className="text-sm font-semibold tracking-[0.01em] text-ink">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-muted">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="panel p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="section-kicker">Live atlas</span>
                <h2 className="section-title mt-3">Start with the layer you need.</h2>
                <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                  Tap markers for details. The map stays clear because the
                  controls and record card sit outside the viewport instead of on
                  top of it.
                </p>
              </div>

              <div className="flex w-full flex-wrap gap-2 rounded-[1.4rem] border border-ink/8 bg-white/70 p-1 lg:w-auto">
                {(Object.keys(datasets) as DatasetKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    className="chip justify-between px-3 sm:px-4"
                    data-active={dataset === key}
                    aria-pressed={dataset === key}
                    onClick={() => {
                      setDataset(key)
                      setSelectedId(datasets[key][0]?.id ?? null)
                    }}
                  >
                    <span>{DATASET_LABELS[key]}</span>
                    <span className="font-mono text-[0.7rem] text-faint">
                      {datasets[key].length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
              <div className="space-y-4">
                <div className="map-shell h-[23rem] sm:h-[30rem] lg:h-[35rem] xl:h-[38rem]">
                  <YPAAMap
                    markers={markers}
                    mode={dataset === "featured" ? "mixed" : dataset === "conferences" ? "conferences" : "meetings"}
                    selectedId={selectedId}
                    onMarkerClick={(marker) => setSelectedId(marker.id)}
                    className="h-full"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="floating-note">
                    Meetings are quieter markers so the broader field stays readable.
                  </div>
                  <div className="floating-note">
                    Conferences carry stronger color and a longer detail read.
                  </div>
                  <Link href="/submit" className="floating-note inline-flex items-center justify-between gap-2 text-ink hover:text-accent">
                    Submit a correction
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="grid content-start gap-4">
                <div className="panel-muted p-4 sm:p-5">
                  <p className="meta-label">Active layer</p>
                  <h3 className="mt-2 font-serif text-[1.85rem] leading-[0.98] tracking-[-0.04em] text-ink">
                    {DATASET_LABELS[dataset]}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {DATASET_DESCRIPTIONS[dataset]}
                  </p>
                </div>

                {selectedMarker ? (
                  <MapDetailPanel marker={selectedMarker} onClose={() => setSelectedId(null)} />
                ) : (
                  <div className="panel-muted p-4 sm:p-5">
                    <p className="meta-label">Tap a marker</p>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      Select any point in the atlas to see location detail, timing,
                      and source links without covering the map.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
