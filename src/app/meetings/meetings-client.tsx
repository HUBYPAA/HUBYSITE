"use client"

import { useDeferredValue, useMemo, useState } from "react"
import { Filter, Globe, List, Map as MapIcon, MapPin, Search, X } from "lucide-react"
import { YPAAMap } from "@/lib/components/map/ypaa-map"
import { MapDetailPanel } from "@/lib/components/map/map-detail-panel"
import { meetingsToMapMarkers } from "@/lib/data/normalized/adapt"
import type { Meeting, MeetingFormat } from "@/lib/data/normalized/types"

const FORMATS: Array<{ value: "" | MeetingFormat; label: string }> = [
  { value: "", label: "All" },
  { value: "in-person", label: "In person" },
  { value: "online", label: "Online" },
  { value: "hybrid", label: "Hybrid" },
]

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

interface MeetingsClientProps {
  meetings: Meeting[]
  stateOptions: Array<{ value: string; label: string }>
}

export function MeetingsClient({ meetings, stateOptions }: MeetingsClientProps) {
  const [mobileView, setMobileView] = useState<"list" | "map">("map")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [query, setQuery] = useState("")
  const [formatFilter, setFormatFilter] = useState<"" | MeetingFormat>("")
  const [stateFilter, setStateFilter] = useState("")
  const [dayFilter, setDayFilter] = useState("")
  const [activeId, setActiveId] = useState<string | null>(meetings[0]?.id ?? null)

  const deferredQuery = useDeferredValue(query)

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    return meetings.filter((m) => {
      if (formatFilter && m.format !== formatFilter) return false
      if (stateFilter && m.stateAbbreviation !== stateFilter) return false
      if (dayFilter && m.day !== dayFilter) return false
      if (!q) return true
      return [m.title, m.city, m.location, m.day, m.stateAbbreviation]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(q))
    })
  }, [dayFilter, deferredQuery, formatFilter, meetings, stateFilter])

  const effectiveId =
    activeId === null
      ? null
      : filtered.some((m) => m.id === activeId)
        ? activeId
        : filtered[0]?.id ?? null

  const markers = useMemo(() => meetingsToMapMarkers(filtered), [filtered])
  const selectedMarker = markers.find((m) => m.id === effectiveId) ?? null

  const hasFilters = Boolean(query || formatFilter || stateFilter || dayFilter)
  const clearAll = () => { setQuery(""); setFormatFilter(""); setStateFilter(""); setDayFilter("") }

  return (
    <div className="shell pb-16">
      {/* Filters bar */}
      <div className="card">
        {/* Row: search + format tabs + filter toggle */}
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-ink-3)]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input pl-10 pr-10"
              placeholder="Search by city, room, day, or format"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--color-ink-3)] hover:text-[var(--color-ink)]"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </label>

          <div className="flex flex-wrap items-center gap-2">
            <div className="segmented">
              {FORMATS.map((f) => (
                <button
                  key={f.label}
                  type="button"
                  data-active={formatFilter === f.value}
                  aria-pressed={formatFilter === f.value}
                  onClick={() => setFormatFilter(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowAdvanced((c) => !c)}
              className="btn btn-secondary btn-sm"
              aria-expanded={showAdvanced}
            >
              <Filter className="h-3.5 w-3.5" />
              More
            </button>
          </div>
        </div>

        {showAdvanced ? (
          <div className="rise-in mt-4 grid gap-3 border-t border-[var(--color-border)] pt-4 sm:grid-cols-3">
            <label className="block">
              <span className="caption">State</span>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="input mt-2"
              >
                <option value="">All states</option>
                {stateOptions.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="caption">Day</span>
              <select
                value={dayFilter}
                onChange={(e) => setDayFilter(e.target.value)}
                className="input mt-2"
              >
                <option value="">Any day</option>
                {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </label>

            <div className="flex items-end">
              <button
                type="button"
                className="btn btn-ghost w-full"
                onClick={clearAll}
                disabled={!hasFilters}
              >
                Clear filters
              </button>
            </div>
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--color-ink-2)]">
          <span>
            <strong className="text-[var(--color-ink)]">{filtered.length}</strong>
            {" "}
            {hasFilters ? `of ${meetings.length}` : "meetings"}
            {" "}
            {hasFilters ? "match" : `across ${stateOptions.length} states`}
          </span>
          {hasFilters ? (
            <button onClick={clearAll} className="link text-sm">Clear all</button>
          ) : null}
        </div>
      </div>

      {/* Mobile map/list toggle */}
      <div className="mt-4 flex lg:hidden">
        <div className="segmented w-full">
          <button
            type="button"
            data-active={mobileView === "map"}
            onClick={() => setMobileView("map")}
            className="flex-1 justify-center"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <MapIcon className="h-4 w-4" />
            Map
          </button>
          <button
            type="button"
            data-active={mobileView === "list"}
            onClick={() => setMobileView("list")}
            className="flex-1 justify-center"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <List className="h-4 w-4" />
            List ({filtered.length})
          </button>
        </div>
      </div>

      {/* Main grid — list + map */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
        <section className={mobileView === "map" ? "hidden lg:block" : "block"}>
          <div className="card overflow-hidden p-0">
            <div className="max-h-[calc(100dvh-12rem)] overflow-y-auto overscroll-contain">
              {filtered.length > 0 ? (
                filtered.map((m) => {
                  const Icon = m.format === "online" ? Globe : MapPin
                  const isActive = m.id === effectiveId
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setActiveId(m.id)
                        if (window.innerWidth < 1024) setMobileView("map")
                      }}
                      className="block w-full border-b border-[var(--color-border)] px-5 py-4 text-left last:border-b-0 hover:bg-[var(--color-surface-2)]"
                      style={isActive ? { background: "var(--color-surface-2)", borderLeft: "3px solid var(--color-accent)", boxShadow: "inset 0 0 24px rgba(79, 125, 255, 0.06)" } : undefined}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="row__title truncate">{m.title}</p>
                          <p className="row__sub mt-1">
                            {[m.city, m.stateAbbreviation, m.day, m.time].filter(Boolean).join(" · ")}
                          </p>
                          {m.location ? (
                            <p className="caption mt-1 truncate">{m.location}</p>
                          ) : null}
                        </div>
                        <span className="tag flex-shrink-0">
                          <Icon className="h-3 w-3" />
                          <span className="hidden sm:inline">{m.format}</span>
                        </span>
                      </div>
                    </button>
                  )
                })
              ) : (
                <div className="p-10 text-center">
                  <p className="eyebrow">Nothing in this cut</p>
                  <p
                    className="mt-3"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 400,
                      fontSize: "1.5rem",
                      letterSpacing: "-0.02em",
                      color: "var(--color-ink)",
                    }}
                  >
                    No meetings match that view.
                  </p>
                  <p className="body-sm mt-3">Try clearing a filter or broadening the search.</p>
                  {hasFilters ? (
                    <button className="btn btn-secondary mt-5" onClick={clearAll}>
                      Clear all filters
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className={mobileView === "list" ? "hidden lg:block" : "block"}>
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="map-shell h-[28rem] sm:h-[34rem] lg:h-[calc(100dvh-12rem)]">
              <YPAAMap
                markers={markers}
                mode="meetings"
                selectedId={effectiveId}
                onMarkerClick={(m) => setActiveId(m.id)}
                autoFit
              />
            </div>

            {selectedMarker ? (
              <MapDetailPanel marker={selectedMarker} onClose={() => setActiveId(null)} />
            ) : (
              <div className="card card-quiet">
                <p className="eyebrow">Tap a meeting</p>
                <p className="body-sm mt-3">
                  Select any marker to inspect timing, city, and location details
                  without covering the map.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
