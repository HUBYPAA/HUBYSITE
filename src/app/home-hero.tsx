"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
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
    <section className="shell pt-10 sm:pt-16">
      {/* Eyebrow + title */}
      <p className="eyebrow">For whoever needs it</p>

      <h1 className="display-1 mt-4 max-w-3xl">
        Young people&rsquo;s AA, <span style={{ color: "var(--color-vault)" }}>mapped</span> like somebody meant it.
      </h1>

      <p className="body-lg mt-6 max-w-2xl">
        Every meeting and conference worth knowing about — pulled together
        into one clean, honest directory. Volunteer-built, no endorsements,
        no attendance data.
      </p>

      {/* Stats row + primary CTAs */}
      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <dl className="grid grid-cols-3 gap-6 sm:gap-10">
          <Stat number={meetingCount} label="Rooms" />
          <Stat number={conferenceCount} label="Events" />
          <Stat number={stateCount} label="States" />
        </dl>

        <div className="flex flex-wrap gap-3">
          <Link href="/meetings" className="btn btn-vault btn-lg">
            Open the map
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/conferences" className="btn btn-secondary btn-lg">
            Conferences
          </Link>
        </div>
      </div>

      {/* Map section */}
      <section className="mt-16 sm:mt-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">The atlas</p>
            <h2 className="heading-lg mt-3">A map that knows when to shut up.</h2>
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
                <span className="mono ml-2 text-[var(--color-ink-3)]">{datasets[key].length}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="map-shell h-[24rem] sm:h-[32rem] xl:h-[40rem]">
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
                <p className="eyebrow">Tap a marker</p>
                <p className="body mt-3">
                  Tap any point on the map to pull its details — timing,
                  place, and source — without losing your place.
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </section>
  )
}

function Stat({ number, label }: { number: number; label: string }) {
  return (
    <div>
      <dt className="caption">{label}</dt>
      <dd
        className="stat-value mt-1.5"
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 400,
          fontSize: "clamp(2.2rem, 4vw, 3rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          color: "var(--color-ink)",
        }}
      >
        {number.toLocaleString()}
      </dd>
    </div>
  )
}
