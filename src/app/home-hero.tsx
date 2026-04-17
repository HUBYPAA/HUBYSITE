"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { YPAAMap } from "@/lib/components/map/ypaa-map"
import { MapDetailPanel } from "@/lib/components/map/map-detail-panel"
import { StarryCanopy } from "@/lib/components/ornaments/starry-canopy"
import { PortalFrame } from "@/lib/components/ornaments/portal-frame"
import { FiligreeRule } from "@/lib/components/ornaments/filigree-rule"
import { HeraldicGlyph } from "@/lib/components/ornaments/heraldic-glyph"
import { StellarCorners } from "@/lib/components/ornaments/stellar-corners"
import type { MapMarker } from "@/lib/data/normalized/types"

type DatasetKey = "featured" | "meetings" | "conferences"

interface HomeHeroProps {
  datasets: Record<DatasetKey, MapMarker[]>
  meetingCount: number
  conferenceCount: number
  stateCount: number
}

const DATASET_LABELS: Record<DatasetKey, string> = {
  featured: "the overview",
  meetings: "meetings",
  conferences: "conferences",
}

const DATASET_DESCRIPTIONS: Record<DatasetKey, string> = {
  featured:
    "The big picture. A featured weekend, a few good rooms, and the full field before you get specific.",
  meetings:
    "Rooms. Cities, days, formats — practical stuff, served fast.",
  conferences:
    "The calendar. Where, when, and what still needs confirming before you book anything.",
}

const DATASET_FAMILY: Record<DatasetKey, "featured" | "meetings" | "conferences"> = {
  featured: "featured",
  meetings: "meetings",
  conferences: "conferences",
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
    <section>
      {/* ── The vault: starry canopy, full bleed ── */}
      <StarryCanopy variant="full" seed={11} />

      {/* ── First filigree threshold ── */}
      <div className="site-shell mt-8">
        <FiligreeRule tone="shadow" />
      </div>

      {/* ── The portal: compressed entry ── */}
      <PortalFrame className="mt-2">
        <p
          className="text-[var(--color-crimson)]"
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontVariantCaps: "all-small-caps",
            letterSpacing: "0.18em",
            fontSize: "0.84rem",
          }}
        >
          for whoever needs it
        </p>
        <h1 className="page-title mt-4">
          HUBYPAA
          <span className="ml-1 inline-block translate-y-[-0.18em] text-[var(--color-gilt)]">
            <HeraldicGlyph name="star-eight" className="inline h-[0.42em] w-[0.42em]" />
          </span>
        </h1>
        <p className="page-subtitle mt-5">
          Mapped like somebody meant it.
        </p>
      </PortalFrame>

      {/* ── Second filigree threshold ── */}
      <div className="site-shell mt-2">
        <FiligreeRule tone="shadow" />
      </div>

      {/* ── The nave: tower-asymmetric grid ── */}
      <div className="site-shell-wide mt-10">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] xl:items-start">
          {/* ─── NORTH TOWER (taller, narrower) ─── */}
          <div className="rise-in xl:sticky xl:top-24">
            {/* Crown microsignature above the tower */}
            <div className="mb-4 flex items-center gap-3 text-[var(--color-gilt-shadow)]">
              <HeraldicGlyph name="crown" className="h-4 w-4 text-[var(--color-gilt)]" />
              <span
                className="text-[0.72rem]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontVariantCaps: "all-small-caps",
                  letterSpacing: "0.22em",
                  textTransform: "lowercase",
                }}
              >
                north tower · the directory
              </span>
            </div>

            <div className="panel-raised relative p-5 sm:p-7">
              <StellarCorners />

              <p className="page-intro mt-2 max-w-none">
                Meetings, conferences, and every starting point people
                usually have to chase through screenshots, group chats, and
                dead links — pulled together into one directory. Clean
                enough to trust. Loose enough to feel like YPAA.
              </p>

              {/* Stat triptych — gilt italic numerals */}
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="panel-muted p-4">
                  <div className="stat-pair">
                    <strong>{meetingCount}</strong>
                    <span>rooms</span>
                  </div>
                </div>
                <div
                  className="p-4"
                  style={{
                    background: "linear-gradient(180deg, rgba(196,138,26,0.16), rgba(220,177,58,0.08))",
                    border: "1px solid var(--color-gilt-shadow)",
                    borderRadius: "var(--radius-md)",
                    transform: "translateY(-6px)",
                  }}
                >
                  <div className="stat-pair">
                    <strong style={{ color: "var(--color-crimson)" }}>{conferenceCount}</strong>
                    <span>events</span>
                  </div>
                </div>
                <div className="panel-muted p-4">
                  <div className="stat-pair">
                    <strong>{stateCount}</strong>
                    <span>states</span>
                  </div>
                </div>
              </div>

              {/* Action stack — vertical, tower-shaped */}
              <div className="mt-7 grid gap-3">
                <Link href="/meetings" className="action-primary">
                  <HeraldicGlyph name="shield-cross" className="h-4 w-4 text-[var(--color-gilt-soft)]" />
                  open the meetings map
                </Link>
                <Link href="/conferences" className="action-secondary">
                  <HeraldicGlyph name="star-diamond" className="h-4 w-4 text-[var(--color-crimson)]" />
                  see the conferences
                </Link>
                <Link href="/submit" className="action-quiet">
                  <HeraldicGlyph name="quill-key" className="h-4 w-4 text-[var(--color-gilt-shadow)]" />
                  send a fix
                </Link>
              </div>

              {/* Manifesto */}
              <div className="my-7">
                <FiligreeRule tone="shadow" />
              </div>
              <p
                className="text-[var(--color-muted)]"
                style={{
                  fontFamily: "var(--font-prose)",
                  fontStyle: "italic",
                  fontSize: "0.94rem",
                  lineHeight: 1.78,
                }}
              >
                The whole point was to build something that reflects the
                love this network actually runs on. Not a pamphlet.
                Not another site nobody updates. Something that feels
                like us.
              </p>
            </div>
          </div>

          {/* ─── SOUTH NAVE (the wide map) ─── */}
          <div className="panel rise-in relative p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="section-kicker">
                  <HeraldicGlyph name="star-diamond" />
                  the live atlas
                </span>
                <h2 className="section-title mt-3">
                  A map that knows when to shut up.
                </h2>
                <p
                  className="mt-3 text-[var(--color-muted)]"
                  style={{
                    fontFamily: "var(--font-prose)",
                    fontSize: "0.98rem",
                    lineHeight: 1.78,
                  }}
                >
                  Tap around. Switch layers. It shows you what matters
                  and gets out of the way — less noise, not more features.
                </p>
              </div>

              {/* Dataset chips — content-family active states */}
              <div
                className="flex w-full flex-wrap gap-2 rounded-[var(--radius-sm)] border border-[var(--color-iron)] p-1 lg:w-auto"
                style={{ background: "rgba(228,213,184,0.55)" }}
              >
                {(Object.keys(datasets) as DatasetKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    className="chip min-w-[7.5rem] justify-between"
                    data-active={dataset === key}
                    data-family={DATASET_FAMILY[key]}
                    aria-pressed={dataset === key}
                    onClick={() => {
                      setDataset(key)
                      setSelectedId(datasets[key][0]?.id ?? null)
                    }}
                  >
                    <span>{DATASET_LABELS[key]}</span>
                    <span
                      className="font-mono text-[0.68rem]"
                      style={{ color: dataset === key ? "currentColor" : "var(--color-muted)" }}
                    >
                      {datasets[key].length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
              <div className="space-y-4">
                <div className="map-shell h-[24rem] sm:h-[30rem] lg:h-[36rem] xl:h-[40rem]">
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
                    The overview is the wide shot — start here to get oriented.
                  </div>
                  <div className="floating-note">
                    Meetings and conferences split clean when you need to focus.
                  </div>
                  <Link
                    href="/submit"
                    className="floating-note inline-flex items-center justify-between gap-2 hover:text-[var(--color-crimson)]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <HeraldicGlyph name="quill-key" className="h-3.5 w-3.5 text-[var(--color-crimson)]" />
                      send a fix
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="grid content-start gap-4">
                <div className="panel-chapel panel-chapel--ochre p-4 sm:p-5">
                  <p className="meta-label">you are looking at</p>
                  <h3
                    className="mt-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: "1.85rem",
                      lineHeight: 0.98,
                      letterSpacing: "-0.03em",
                      color: "var(--color-ink)",
                    }}
                  >
                    {DATASET_LABELS[dataset]}
                  </h3>
                  <p
                    className="mt-3 text-[var(--color-muted)]"
                    style={{
                      fontFamily: "var(--font-prose)",
                      fontSize: "0.94rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {DATASET_DESCRIPTIONS[dataset]}
                  </p>
                </div>

                {selectedMarker ? (
                  <MapDetailPanel marker={selectedMarker} onClose={() => setSelectedId(null)} />
                ) : (
                  <div className="panel-muted p-4 sm:p-5">
                    <p className="meta-label">tap a marker</p>
                    <p
                      className="mt-3 text-[var(--color-muted)]"
                      style={{
                        fontFamily: "var(--font-prose)",
                        fontSize: "0.94rem",
                        lineHeight: 1.7,
                      }}
                    >
                      Tap any point to pull the details — timing, place,
                      and source — without losing the map.
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
