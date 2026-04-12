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
  featured: "Overview",
  meetings: "Meetings",
  conferences: "Conferences",
}

const DATASET_DESCRIPTIONS: Record<DatasetKey, string> = {
  featured:
    "A first sweep with some shape to it: one strong event record, a few room anchors, and the field in view.",
  meetings:
    "Rooms first. Cities, days, formats, and the kind of practical next move people usually need fast.",
  conferences:
    "The calendar view: where it is, when it is, and what still needs checking before plans get real.",
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
          <div className="panel-raised relative overflow-hidden p-5 sm:p-7 lg:p-8 xl:sticky xl:top-24">
            <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top_right,rgba(222,114,71,0.22),transparent_48%),radial-gradient(circle_at_top_left,rgba(19,118,109,0.18),transparent_42%)]" />
            <div className="absolute -right-8 top-10 h-28 w-28 rounded-full border border-white/50 bg-white/20 blur-2xl" />
            <div className="absolute bottom-8 left-8 h-px w-24 rotate-[-8deg] bg-gradient-to-r from-transparent via-[rgba(17,35,56,0.28)] to-transparent" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="section-kicker">United States Directory</span>
                <span className="inline-flex items-center rounded-full border border-ink/8 bg-white/70 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/75">
                  Map-First
                </span>
                <span className="inline-flex items-center rounded-full border border-[rgba(222,114,71,0.16)] bg-[rgba(222,114,71,0.12)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-warm)]">
                  Young Energy
                </span>
              </div>

              <h1 className="page-title mt-5 max-w-3xl">
                HUBYPAA.
                <span className="block text-accent">The YPAA Hub, Mapped Like Somebody Meant It.</span>
              </h1>
              <p className="page-intro mt-5 max-w-2xl">
                Meetings, conferences, and the part people usually have to
                chase through flyers, bios, screenshots, and dead links. Clean
                enough to feel high quality. Loose enough to feel alive.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted">
                <span className="inline-flex items-center gap-2 rounded-full border border-ink/8 bg-white/62 px-3 py-1.5">
                  Less hunting
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-ink/8 bg-white/62 px-3 py-1.5">
                  More signal
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-ink/8 bg-white/62 px-3 py-1.5">
                  A little chaos
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/meetings" className="action-primary">
                  <MapPinned className="h-4 w-4" />
                  Open Meetings
                </Link>
                <Link href="/conferences" className="action-secondary">
                  <CalendarDays className="h-4 w-4" />
                  See Conferences
                </Link>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="panel-muted p-4 sm:translate-y-2">
                  <div className="stat-pair">
                    <strong>{meetingCount}</strong>
                    <span>Rooms</span>
                  </div>
                </div>
                <div className="panel-muted border-[rgba(222,114,71,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,240,233,0.88))] p-4">
                  <div className="stat-pair">
                    <strong>{conferenceCount}</strong>
                    <span>Events</span>
                  </div>
                </div>
                <div className="panel-muted p-4 sm:-translate-y-1">
                  <div className="stat-pair">
                    <strong>{stateCount}</strong>
                    <span>States</span>
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base">
                It should be easy. It should be high quality. It should reflect
                the love that grows in YPAA every single day.
              </p>

              <div className="mt-6 panel-muted p-4 sm:p-5">
                <p className="meta-label">Use It Like This</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      icon: Compass,
                      title: "Know the Why",
                      body: "Open What Is YPAA when you want the wider picture, not just the map.",
                      href: "/what-is-ypaa",
                    },
                    {
                      icon: MapPinned,
                      title: "Open Meetings",
                      body: "Go straight to Meetings when the question is where tonight, this week, or while traveling.",
                      href: "/meetings",
                    },
                    {
                      icon: CalendarDays,
                      title: "See Conferences",
                      body: "Open Conferences when the question is what weekend is next and what still needs checking.",
                      href: "/conferences",
                    },
                  ].map((item, index) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={`group flex gap-3 rounded-[1.25rem] border border-ink/8 bg-white/55 p-3.5 transition-colors hover:border-accent/30 ${
                        index === 1 ? "sm:-translate-y-2" : ""
                      }`}
                    >
                      <item.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                      <div>
                        <h2 className="text-sm font-semibold tracking-[0.01em] text-ink transition-colors group-hover:text-accent">
                          {item.title}
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-muted">{item.body}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="panel relative overflow-hidden p-4 sm:p-5 lg:p-6">
            <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(17,35,56,0.04),transparent)]" />
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="relative z-10 max-w-2xl">
                <span className="section-kicker">Live Atlas</span>
                <h2 className="section-title mt-3">A Map That Knows When to Shut Up.</h2>
                <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                  Tap around. Switch layers. Keep the geography visible while
                  the details stay close enough to matter. Quality is not more
                  chrome. It is less friction.
                </p>
              </div>

              <div className="relative z-10 flex w-full flex-wrap gap-2 rounded-[1.4rem] border border-ink/8 bg-white/70 p-1 lg:w-auto">
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
                    Overview gives the whole thing some shape before you cut in closer.
                  </div>
                  <div className="floating-note">
                    Meetings and Conferences split cleanly when you want the sharper version.
                  </div>
                  <Link href="/submit" className="floating-note inline-flex items-center justify-between gap-2 text-ink hover:text-accent">
                    Send a Fix
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="grid content-start gap-4">
                <div className="panel-muted p-4 sm:p-5">
                  <p className="meta-label">You Are Looking At</p>
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
                      Pick any point in the atlas to pull timing, place, and
                      source detail without losing the map itself.
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
