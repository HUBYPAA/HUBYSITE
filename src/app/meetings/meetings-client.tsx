"use client"

import { useDeferredValue, useMemo, useState } from "react"
import { Filter, Globe, List, Map as MapIcon, MapPin, Search } from "lucide-react"
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
      if (formatFilter && meeting.format !== formatFilter) {
        return false
      }

      if (stateFilter && meeting.stateAbbreviation !== stateFilter) {
        return false
      }

      if (dayFilter && meeting.day !== dayFilter) {
        return false
      }

      if (!q) {
        return true
      }

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

  return (
    <div className="site-shell pb-10">
      <div className="panel mt-8 p-4 md:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <span className="section-kicker">Map-first explorer</span>
            <p className="mt-3 text-sm leading-7 text-muted">
              Start with the map, keep the filters close, and only open the
              heavier controls when you need them.
            </p>
          </div>

          <div className="flex gap-2 lg:hidden">
            <button
              type="button"
              className="action-secondary flex-1"
              onClick={() => setMobileView("map")}
              style={{
                borderColor: mobileView === "map" ? "rgba(183, 140, 86, 0.28)" : undefined,
                color: mobileView === "map" ? "var(--color-ink)" : undefined,
              }}
            >
              <MapIcon className="h-4 w-4" />
              Map
            </button>
            <button
              type="button"
              className="action-secondary flex-1"
              onClick={() => setMobileView("list")}
              style={{
                borderColor: mobileView === "list" ? "rgba(183, 140, 86, 0.28)" : undefined,
                color: mobileView === "list" ? "var(--color-ink)" : undefined,
              }}
            >
              <List className="h-4 w-4" />
              List
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 xl:grid-cols-[minmax(0,1.25fr)_auto] xl:items-center">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="field pl-11"
              placeholder="Search by meeting name, city, or location"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {FORMATS.map((format) => (
              <button
                key={format.label}
                type="button"
                className="chip"
                data-active={formatFilter === format.value}
                onClick={() => setFormatFilter(format.value)}
              >
                {format.label}
              </button>
            ))}
            <button
              type="button"
              className="chip"
              data-active={showAdvanced}
              onClick={() => setShowAdvanced((current) => !current)}
            >
              <Filter className="h-3.5 w-3.5" />
              Filters
            </button>
          </div>
        </div>

        {showAdvanced && (
          <div className="mt-4 grid gap-3 md:grid-cols-3">
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
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
        <section
          className={`panel-raised overflow-hidden ${
            mobileView === "map" ? "hidden lg:block" : "block"
          }`}
        >
          <div className="border-b border-white/8 px-5 py-4">
            <p className="meta-label">Visible meetings</p>
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

          <div className="max-h-[calc(100vh-12rem)] overflow-y-auto px-5 py-2">
            {filteredMeetings.length > 0 ? (
              filteredMeetings.map((meeting) => {
                const Icon = meeting.format === "online" ? Globe : MapPin

                return (
                  <button
                    key={meeting.id}
                    type="button"
                    className="list-item"
                    data-active={meeting.id === effectiveActiveId}
                    onClick={() => setActiveId(meeting.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-left text-base font-medium text-ink">
                          {meeting.title}
                        </h3>
                        <p className="mt-2 text-left text-sm leading-7 text-muted">
                          {[meeting.city, meeting.stateAbbreviation, meeting.day, meeting.time]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                        {meeting.location && (
                          <p className="mt-1 text-left text-sm leading-7 text-faint">
                            {meeting.location}
                          </p>
                        )}
                      </div>

                      <span className="chip" data-active={meeting.id === effectiveActiveId}>
                        <Icon className="h-3.5 w-3.5" />
                        {meeting.format}
                      </span>
                    </div>
                  </button>
                )
              })
            ) : (
              <div className="py-16 text-center">
                <p className="font-serif text-2xl tracking-[-0.04em] text-ink">
                  No meetings match that view.
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Try clearing a filter or broadening the search.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className={mobileView === "list" ? "hidden lg:block" : "block"}>
          <div className="map-shell h-[34rem] lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
            <YPAAMap
              markers={markers}
              mode="meetings"
              selectedId={effectiveActiveId}
              onMarkerClick={(marker) => setActiveId(marker.id)}
              autoFit
            />
            <MapDetailPanel marker={selectedMarker} onClose={() => setActiveId(null)} />
          </div>
        </section>
      </div>
    </div>
  )
}
