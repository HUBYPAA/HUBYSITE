"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, MapPin, CalendarDays } from "lucide-react"
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
      {/* ── Cinematic aurora hero — divine light behind a huge, confident title ── */}
      <section className="hero-sky">
        <div className="aurora" aria-hidden />
        <div className="aurora-2" aria-hidden />

        <div className="shell">
          <p className="label" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="pulse-dot" aria-hidden />
            Live · {meetingCount.toLocaleString()} rooms across {stateCount} states
          </p>

          <h1 className="display-1 mt-6 max-w-5xl">
            Young people&rsquo;s AA,
            <br />
            <span className="hero-highlight">mapped</span> like somebody meant it.
          </h1>

          <p className="body-lg mt-7 max-w-2xl">
            Every meeting and conference worth knowing about — pulled together
            into one clean, honest directory. Volunteer-built. No endorsements.
            No attendance data.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/meetings" className="btn btn-coral btn-lg">
              Open the map
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/conferences" className="btn btn-secondary btn-lg">
              Browse conferences
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bento — quick product glance ── */}
      <section className="shell pb-8 -mt-6 sm:-mt-10">
        <div className="bento">
          {/* Live index — big tile */}
          <div className="bento__tile bento-span-3 bento-row-2">
            <div className="flex items-center justify-between">
              <p className="label">Live index</p>
              <span className="tag tag-coral">updating</span>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6">
              <Stat number={meetingCount} label="Rooms" />
              <Stat number={conferenceCount} label="Events" />
              <Stat number={stateCount} label="States" />
            </div>
            <p className="body-sm mt-8 max-w-sm">
              Updated whenever someone sends a fix. The listings that survive
              here are the ones people keep checking.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
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

          {/* For the room */}
          <Link href="/meetings" className="bento__tile bento-span-3 group block">
            <p className="label">For the room</p>
            <h3 className="heading-lg mt-3">Find a room fast.</h3>
            <p className="body-sm mt-3">
              No outdated links. No dead ends. Just a map, the rooms, and a
              straight line to where you need to be tonight.
            </p>
            <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--color-coral-deep)" }}>
              Open the meetings map
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </p>
          </Link>

          {/* For the weekend */}
          <Link href="/conferences" className="bento__tile bento-span-3 group block">
            <p className="label">For the weekend</p>
            <h3 className="heading-lg mt-3">Track the next weekend.</h3>
            <p className="body-sm mt-3">
              One calendar. Real dates. Real sources. No more piecing a plan
              together from five group chats.
            </p>
            <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--color-coral-deep)" }}>
              See the conferences
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </p>
          </Link>
        </div>
      </section>

      {/* ── Interactive atlas ── */}
      <section className="shell pb-20 pt-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label">Live atlas</p>
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
                <span className="mono ml-2" style={{ color: dataset === key ? "rgba(255,255,255,0.6)" : "var(--color-fg-3)" }}>
                  {datasets[key].length}
                </span>
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
                <p className="label">Tap a marker</p>
                <p className="body-sm mt-3">
                  Select any point to see timing, location, and source without
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
      <dt className="caption">{label}</dt>
      <dd
        className="stat-value mt-2"
        style={{
          fontWeight: 600,
          fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
          letterSpacing: "-0.032em",
          lineHeight: 1,
          color: "var(--color-fg)",
        }}
      >
        {number.toLocaleString()}
      </dd>
    </div>
  )
}
