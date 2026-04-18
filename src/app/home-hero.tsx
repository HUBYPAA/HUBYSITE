"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, MapPin, CalendarDays, Sparkles } from "lucide-react"
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

export function HomeHero({
  datasets,
  meetingCount,
  conferenceCount,
  stateCount,
}: HomeHeroProps) {
  const [dataset, setDataset] = useState<DatasetKey>("featured")
  const [selectedId, setSelectedId] = useState<string | null>(datasets.featured[0]?.id ?? null)

  const markers = datasets[dataset]
  const selectedMarker = markers.find((m) => m.id === selectedId) ?? null

  return (
    <>
      {/* Cinematic hero — aurora glow behind a tight, monumental title */}
      <section className="relative overflow-hidden">
        <div className="aurora" aria-hidden />

        <div className="shell relative z-10 pt-20 pb-10 sm:pt-28 sm:pb-16">
          <div className="flex items-center gap-2 text-[var(--color-fg-3)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-accent-bright)]" />
            <p className="label mono">ypaa-directory · v0.3 · live</p>
          </div>

          <h1 className="display-1 mt-6 max-w-4xl">
            Young people&rsquo;s AA,
            <br />
            <span style={{ color: "var(--color-accent-bright)" }}>mapped like somebody meant it.</span>
          </h1>

          <p className="body-lg mt-6 max-w-2xl">
            Every meeting and conference worth knowing about — pulled together
            into one clean, honest directory. Volunteer-built, no endorsements,
            no attendance data.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/meetings" className="btn btn-vault btn-lg">
              Open the map
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/conferences" className="btn btn-secondary btn-lg">
              Browse conferences
            </Link>
          </div>
        </div>
      </section>

      {/* Bento grid — unequal tiles, quick glance of the whole product */}
      <section className="shell pb-8">
        <div className="bento">
          {/* Big tile — live stats */}
          <div className="bento__tile bento-span-3 bento-row-2">
            <div className="flex items-center gap-2">
              <span className="pulse-dot" aria-hidden />
              <p className="label mono">live index</p>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-6">
              <Stat number={meetingCount} label="Rooms" />
              <Stat number={conferenceCount} label="Events" />
              <Stat number={stateCount} label="States" />
            </div>
            <p className="body-sm mt-8 max-w-sm">
              Updated whenever someone sends a fix. The listings that survive
              here are the ones people keep checking.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href="/meetings" className="btn btn-secondary btn-sm">
                <MapPin className="h-3.5 w-3.5" />
                Meetings
              </Link>
              <Link href="/conferences" className="btn btn-secondary btn-sm">
                <CalendarDays className="h-3.5 w-3.5" />
                Conferences
              </Link>
              <Link href="/submit" className="btn btn-ghost btn-sm">
                Send a fix →
              </Link>
            </div>
          </div>

          {/* Tile — "for the room" */}
          <Link href="/meetings" className="bento__tile bento-span-3 group block">
            <p className="label mono">for the room</p>
            <h3 className="heading-lg mt-3">Find a room fast.</h3>
            <p className="body-sm mt-3">
              No outdated links. No dead ends. Just a map, the rooms, and a
              straight line to where you need to be tonight.
            </p>
            <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--color-accent-bright)" }}>
              Open the meetings map
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </p>
          </Link>

          {/* Tile — "for the weekend" */}
          <Link href="/conferences" className="bento__tile bento-span-3 group block">
            <p className="label mono">for the weekend</p>
            <h3 className="heading-lg mt-3">Track the next weekend.</h3>
            <p className="body-sm mt-3">
              One calendar. Real dates. Real sources. No more piecing a plan
              together from five group chats.
            </p>
            <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--color-accent-bright)" }}>
              See the conferences
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </p>
          </Link>
        </div>
      </section>

      {/* Interactive atlas — map + dataset switcher + selected detail */}
      <section className="shell pb-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label mono">live atlas</p>
            <h2 className="display-2 mt-3">A map that knows when to shut up.</h2>
          </div>

          <div className="segmented" role="tablist" aria-label="Map dataset">
            {(Object.keys(datasets) as DatasetKey[]).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={dataset === key}
                data-active={dataset === key}
                onClick={() => {
                  setDataset(key)
                  setSelectedId(datasets[key][0]?.id ?? null)
                }}
              >
                {DATASET_LABELS[key]}
                <span className="mono ml-2 text-[var(--color-fg-3)]">{datasets[key].length}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="map-shell h-[26rem] sm:h-[32rem] xl:h-[40rem]">
            <YPAAMap
              markers={markers}
              mode={dataset === "featured" ? "mixed" : dataset === "conferences" ? "conferences" : "meetings"}
              selectedId={selectedId}
              onMarkerClick={(m) => setSelectedId(m.id)}
              className="h-full"
            />
          </div>

          <aside className="grid content-start gap-4">
            {selectedMarker ? (
              <MapDetailPanel marker={selectedMarker} onClose={() => setSelectedId(null)} />
            ) : (
              <div className="card card-quiet">
                <p className="label mono">no selection</p>
                <p className="body-sm mt-3">
                  Tap any marker to see timing, location, and source without
                  losing your place on the map.
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  )
}

function Stat({ number, label }: { number: number; label: string }) {
  return (
    <div>
      <dt className="label mono">{label.toLowerCase()}</dt>
      <dd
        className="stat-value mt-2"
        style={{
          fontWeight: 600,
          fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
          letterSpacing: "-0.028em",
          lineHeight: 1,
          color: "var(--color-fg)",
        }}
      >
        {number.toLocaleString()}
      </dd>
    </div>
  )
}
