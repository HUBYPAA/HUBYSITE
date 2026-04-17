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

  const filteredMeetings = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()

    return meetings.filter((meeting) => {
      if (formatFilter && meeting.format !== formatFilter) return false
      if (stateFilter && meeting.stateAbbreviation !== stateFilter) return false
      if (dayFilter && meeting.day !== dayFilter) return false
      if (!q) return true

      return [
        meeting.title,
        meeting.city,
        meeting.location,
        meeting.day,
        meeting.stateAbbreviation,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(q))
    })
  }, [dayFilter, deferredQuery, formatFilter, meetings, stateFilter])

  const effectiveActiveId =
    activeId === null
      ? null
      : filteredMeetings.some((meeting) => meeting.id === activeId)
        ? activeId
        : filteredMeetings[0]?.id ?? null

  const markers = useMemo(() => meetingsToMapMarkers(filteredMeetings), [filteredMeetings])
  const selectedMarker = markers.find((marker) => marker.id === effectiveActiveId) ?? null

  const hasActiveFilters = Boolean(query || formatFilter || stateFilter || dayFilter)
  const activeFilterLabels = [
    query ? `Search: ${query}` : null,
    formatFilter ? `Format: ${FORMATS.find((option) => option.value === formatFilter)?.label ?? formatFilter}` : null,
    stateFilter ? `State: ${stateFilter}` : null,
    dayFilter ? `Day: ${dayFilter}` : null,
  ].filter(Boolean) as string[]

  return (
    <div className="site-shell pb-10">
      <div className="panel rise-in mt-6 p-4 md:mt-8 md:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <span className="section-kicker">Map-first explorer</span>
            <h2 className="mt-3 font-serif text-[1.9rem] leading-[0.98] tracking-[-0.04em] text-ink sm:text-[2.3rem]">
              Find a room without overloading the screen.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
              Start with geography, narrow only when you need precision, and keep
              the selected record readable below the map instead of on top of it.
            </p>
          </div>

          <div className="panel-muted grid gap-1.5 px-4 py-3 sm:min-w-[16rem] sm:px-5 sm:py-4">
            <p className="meta-label">Visible now</p>
            <div className="flex items-end justify-between gap-4">
              <p className="font-serif text-[2.2rem] leading-none tracking-[-0.05em] text-ink">
                {filteredMeetings.length}
              </p>
              <p className="pb-1 text-sm text-muted">
                {hasActiveFilters ? `Filtered from ${meetings.length}` : `${stateOptions.length} states`}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex overflow-hidden rounded-[var(--radius-md)] border border-ink/8 bg-panel/65 p-1 lg:hidden">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-sm)] px-5 py-2.5 text-sm font-medium transition-all"
            onClick={() => setMobileView("map")}
            style={{
              background: mobileView === "map" ? "var(--color-accent)" : "transparent",
              color: mobileView === "map" ? "var(--color-accent-contrast)" : "var(--color-faint)",
            }}
          >
            <MapIcon className="h-4 w-4" />
            Map
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-sm)] px-5 py-2.5 text-sm font-medium transition-all"
            onClick={() => setMobileView("list")}
            style={{
              background: mobileView === "list" ? "var(--color-accent)" : "transparent",
              color: mobileView === "list" ? "var(--color-accent-contrast)" : "var(--color-faint)",
            }}
          >
            <List className="h-4 w-4" />
            List ({filteredMeetings.length})
          </button>
        </div>

        <div className="mt-4 grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_auto] xl:items-center">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="field pl-11 pr-10"
              placeholder="Search by city, room, day, or format"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-faint hover:text-ink"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </label>

          <div className="flex flex-wrap gap-2">
            {FORMATS.map((format) => (
              <button
                key={format.label}
                type="button"
                className="chip"
                data-active={formatFilter === format.value}
                aria-pressed={formatFilter === format.value}
                onClick={() => setFormatFilter(format.value)}
              >
                {format.label}
              </button>
            ))}
            <button
              type="button"
              className="chip"
              data-active={showAdvanced}
              aria-pressed={showAdvanced}
              onClick={() => setShowAdvanced((current) => !current)}
            >
              <Filter className="h-3.5 w-3.5" />
              Filters
            </button>
          </div>
        </div>

        {showAdvanced ? (
          <div className="mt-4 grid gap-3 fade-in sm:grid-cols-2 md:grid-cols-3">
            <label className="block">
              <span className="meta-label">State</span>
              <select
                value={stateFilter}
                onChange={(event) => setStateFilter(event.target.value)}
                className="select-field mt-2"
              >
                <option value="">All states</option>
                {stateOptions.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="meta-label">Day</span>
              <select
                value={dayFilter}
                onChange={(event) => setDayFilter(event.target.value)}
                className="select-field mt-2"
              >
                <option value="">Any day</option>
                {DAYS.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-end">
              <button
                type="button"
                className="action-quiet w-full"
                onClick={() => {
                  setQuery("")
                  setFormatFilter("")
                  setStateFilter("")
                  setDayFilter("")
                }}
                disabled={!hasActiveFilters}
              >
                Clear filters
              </button>
            </div>
          </div>
        ) : null}

        {hasActiveFilters ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 text-xs text-accent">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" style={{ animation: "pulse-ring 2s ease infinite" }} />
              {filteredMeetings.length} of {meetings.length} meetings visible
            </span>
            {activeFilterLabels.map((label) => (
              <span key={label} className="chip" data-active="true">
                {label}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
        <section
          className={`panel-raised rise-in overflow-hidden ${
            mobileView === "map" ? "hidden lg:block" : "block"
          }`}
        >
          <div className="border-b border-[rgba(60,42,28,0.08)] px-5 py-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="meta-label">Visible meetings</p>
                <p className="mt-2 text-sm leading-7 text-muted">
                  Tap any row to sync the detail card and the map.
                </p>
              </div>
              <span className="inline-flex items-center rounded-[0.75rem] border border-[rgba(200,164,78,0.18)] bg-[rgba(200,164,78,0.08)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)]">
                Live selection
              </span>
            </div>
            <div className="mt-2 flex items-end justify-between gap-4">
              <p className="font-serif text-3xl tracking-[-0.04em] text-ink">
                {filteredMeetings.length}
              </p>
              <p className="text-sm text-muted">
                {hasActiveFilters
                  ? `Filtered from ${meetings.length}`
                  : `${stateOptions.length} states represented`}
              </p>
            </div>
          </div>

          <div className="max-h-[calc(100dvh-12rem)] overflow-y-auto overscroll-contain px-4 py-2 sm:px-5">
            {filteredMeetings.length > 0 ? (
              filteredMeetings.map((meeting) => {
                const Icon = meeting.format === "online" ? Globe : MapPin

                return (
                  <button
                    key={meeting.id}
                    type="button"
                    className="list-item"
                    data-active={meeting.id === effectiveActiveId}
                    onClick={() => {
                      setActiveId(meeting.id)
                      if (window.innerWidth < 1024) {
                        setMobileView("map")
                      }
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-left text-base font-medium text-ink">
                          {meeting.title}
                        </h3>
                        <p className="mt-1.5 text-left text-sm leading-6 text-muted">
                          {[meeting.city, meeting.stateAbbreviation, meeting.day, meeting.time]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                        {meeting.location && (
                          <p className="mt-1 truncate text-left text-sm leading-6 text-faint">
                            {meeting.location}
                          </p>
                        )}
                      </div>

                      <span className="chip flex-shrink-0" data-active={meeting.id === effectiveActiveId}>
                        <Icon className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">{meeting.format}</span>
                      </span>
                    </div>
                  </button>
                )
              })
            ) : (
              <div className="px-1 py-10">
                <div className="panel-muted py-12 text-center">
                  <p className="meta-label">Nothing in this cut</p>
                  <p className="mt-3 font-serif text-2xl tracking-[-0.04em] text-ink">
                    No meetings match that view.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    Try clearing a filter or broadening the search.
                  </p>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      className="action-secondary mt-5"
                      onClick={() => {
                        setQuery("")
                        setFormatFilter("")
                        setStateFilter("")
                        setDayFilter("")
                      }}
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className={mobileView === "list" ? "hidden lg:block" : "block"}>
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="map-shell h-[28rem] sm:h-[34rem] lg:h-[calc(100dvh-18rem)]">
              <YPAAMap
                markers={markers}
                mode="meetings"
                selectedId={effectiveActiveId}
                onMarkerClick={(marker) => setActiveId(marker.id)}
                autoFit
              />
            </div>

            {selectedMarker ? (
              <MapDetailPanel marker={selectedMarker} onClose={() => setActiveId(null)} />
            ) : (
              <div className="panel-outline rise-in p-4 sm:p-5">
                <p className="meta-label">Tap a meeting</p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Select any marker to inspect timing, city, and location details
                  without covering the map.
                </p>
              </div>
            )}

            {mobileView === "map" && filteredMeetings.length > 0 ? (
              <div className="flex justify-center lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileView("list")}
                  className="chip"
                >
                  <List className="h-3.5 w-3.5" />
                  View list ({filteredMeetings.length})
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  )
}
