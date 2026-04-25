"use client"

import {
  useDeferredValue,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import Link from "next/link"
import {
  Clock3,
  MapPin,
  Navigation,
  Search,
  SlidersHorizontal,
} from "lucide-react"
import {
  ActionStrip,
  LedgerRows,
  PageIntro,
  PageShell,
  SplitTool,
  Surface,
} from "@/lib/components/atlas"
import { YPAAMap } from "@/lib/components/map/ypaa-map"
import type { MapMarker, Meeting } from "@/lib/data/normalized/types"

interface MeetingsClientProps {
  meetings: Meeting[]
  totalCount: number
  stateCount: number
  states: string[]
}

type ViewMode = "list" | "map" | "split"
type AttendanceFilter = "all" | "in-person" | "online" | "hybrid"
type SoonFilter = "all" | "starting-soon"

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const

export function MeetingsClient({
  meetings,
  totalCount,
  stateCount,
  states,
}: MeetingsClientProps) {
  const [query, setQuery] = useState("")
  const [dayFilter, setDayFilter] = useState("all")
  const [stateFilter, setStateFilter] = useState("all")
  const [meetingType, setMeetingType] = useState("all")
  const [attendance, setAttendance] = useState<AttendanceFilter>("all")
  const [soon, setSoon] = useState<SoonFilter>("all")
  // SSR and first client render both use "list", then we upgrade to "split" on
  // desktop via useSyncExternalStore so there is no hydration mismatch.
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopMatch,
    getDesktopMatchServer,
  )
  const [viewOverride, setViewOverride] = useState<ViewMode | null>(null)
  const view: ViewMode = viewOverride ?? (isDesktop ? "split" : "list")
  const setView = (next: ViewMode) => setViewOverride(next)
  const [selectedId, setSelectedId] = useState<string | null>(meetings[0]?.id ?? null)

  const q = useDeferredValue(query)

  const meetingTypes = useMemo(
    () =>
      Array.from(
        new Set(
          meetings
            .map((meeting) => meeting.meetingType?.trim())
            .filter((value): value is string => Boolean(value)),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    [meetings],
  )

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const now = new Date()

    return meetings
      .filter((meeting) => {
        if (dayFilter !== "all" && meeting.day !== dayFilter) return false
        if (stateFilter !== "all" && meeting.stateAbbreviation !== stateFilter) return false
        if (meetingType !== "all" && (meeting.meetingType ?? "") !== meetingType) return false
        if (attendance !== "all" && meeting.format !== attendance) return false
        if (soon === "starting-soon" && !isStartingSoon(meeting, now, 180)) {
          return false
        }
        if (!needle) return true
        return [
          meeting.title,
          meeting.city,
          meeting.location,
          meeting.venue,
          meeting.stateAbbreviation,
        ]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(needle))
      })
      .sort((left, right) => {
        const leftSoon = minutesUntilNext(left, now)
        const rightSoon = minutesUntilNext(right, now)
        if (leftSoon != null && rightSoon != null && leftSoon !== rightSoon) {
          return leftSoon - rightSoon
        }
        if (leftSoon != null && rightSoon == null) return -1
        if (leftSoon == null && rightSoon != null) return 1

        const leftLabel = `${left.stateAbbreviation}-${left.city ?? ""}-${left.title}`
        const rightLabel = `${right.stateAbbreviation}-${right.city ?? ""}-${right.title}`
        return leftLabel.localeCompare(rightLabel)
      })
  }, [attendance, dayFilter, meetingType, meetings, q, soon, stateFilter])

  const effectiveSelectedId =
    selectedId && filtered.some((meeting) => meeting.id === selectedId)
      ? selectedId
      : filtered[0]?.id ?? null

  const selected =
    effectiveSelectedId
      ? filtered.find((meeting) => meeting.id === effectiveSelectedId) ?? null
      : null

  const markers: MapMarker[] = useMemo(
    () =>
      filtered
        .filter((meeting) => meeting.coordinates)
        .map((meeting) => ({
          id: meeting.id,
          type: "meeting" as const,
          coordinates: meeting.coordinates!,
          title: meeting.title,
          subtitle: [meeting.day, meeting.time].filter(Boolean).join(" · "),
          eyebrow: [meeting.city, meeting.stateAbbreviation].filter(Boolean).join(", "),
          state: meeting.stateAbbreviation,
          locationLabel:
            meeting.location ??
            meeting.venue ??
            [meeting.city, meeting.stateAbbreviation].filter(Boolean).join(", "),
          href: meeting.onlineUrl ?? meeting.contactUrl,
          emphasis: meeting.format === "online" ? "subtle" : "strong",
          meta: {
            summary: [meeting.format, meeting.meetingType].filter(Boolean).join(" · "),
          },
        })),
    [filtered],
  )

  const activeFilterCount = [
    query.trim().length > 0,
    dayFilter !== "all",
    stateFilter !== "all",
    meetingType !== "all",
    attendance !== "all",
    soon !== "all",
  ].filter(Boolean).length

  const filterRail = (
    <>
      <Surface className="grid gap-4">
        <div>
          <p className="page-kicker">Search first</p>
          <label className="sr-only" htmlFor="meeting-search">
            Search meetings
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-ink)]"
              aria-hidden="true"
            />
            <input
              id="meeting-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="input pl-10"
              placeholder="Search city, room, venue, or state"
            />
          </div>
        </div>

        <div className="grid gap-3">
          <FilterSelect
            label="Day"
            value={dayFilter}
            onChange={setDayFilter}
            options={[
              { value: "all", label: "Any day" },
              ...DAYS.map((day) => ({ value: day, label: day })),
            ]}
          />
          <FilterSelect
            label="State"
            value={stateFilter}
            onChange={setStateFilter}
            options={[
              { value: "all", label: "All states" },
              ...states.map((state) => ({ value: state, label: state })),
            ]}
          />
          <FilterSelect
            label="Meeting type"
            value={meetingType}
            onChange={setMeetingType}
            options={[
              { value: "all", label: "Any type" },
              ...meetingTypes.map((type) => ({
                value: type,
                label: titleCase(type),
              })),
            ]}
          />
          <FilterSelect
            label="Attendance"
            value={attendance}
            onChange={(value) => setAttendance(value as AttendanceFilter)}
            options={[
              { value: "all", label: "Any attendance" },
              { value: "in-person", label: "In person" },
              { value: "online", label: "Online" },
              { value: "hybrid", label: "Hybrid" },
            ]}
          />
        </div>

        <div className="grid gap-3 border-t border-[rgba(75,67,56,0.08)] pt-4">
          <p className="page-kicker" style={{ marginBottom: 0 }}>
            Quick filters
          </p>
          <ActionStrip>
            <button
              type="button"
              className={soon === "starting-soon" ? "btn btn--secondary btn-sm" : "btn btn--ghost btn-sm"}
              aria-pressed={soon === "starting-soon"}
              onClick={() =>
                setSoon((value) => (value === "starting-soon" ? "all" : "starting-soon"))
              }
            >
              Starting soon
            </button>
            <button
              type="button"
              className={attendance === "online" ? "btn btn--secondary btn-sm" : "btn btn--ghost btn-sm"}
              aria-pressed={attendance === "online"}
              onClick={() =>
                setAttendance((value) => (value === "online" ? "all" : "online"))
              }
            >
              Online only
            </button>
            <button
              type="button"
              className={attendance === "in-person" ? "btn btn--secondary btn-sm" : "btn btn--ghost btn-sm"}
              aria-pressed={attendance === "in-person"}
              onClick={() =>
                setAttendance((value) => (value === "in-person" ? "all" : "in-person"))
              }
            >
              In person
            </button>
          </ActionStrip>
        </div>

        <div className="grid gap-3 border-t border-[rgba(75,67,56,0.08)] pt-4">
          <div className="flex items-center justify-between gap-4">
            <p className="page-kicker" style={{ marginBottom: 0 }}>
              Results
            </p>
            {activeFilterCount > 0 ? (
              <button
                type="button"
                className="btn btn--quiet btn-sm"
                onClick={() => {
                  setQuery("")
                  setDayFilter("all")
                  setStateFilter("all")
                  setMeetingType("all")
                  setAttendance("all")
                  setSoon("all")
                }}
              >
                Clear
              </button>
            ) : null}
          </div>
          <p className="body-sm" style={{ margin: 0 }}>
            {filtered.length.toLocaleString()} of {totalCount.toLocaleString()} meetings across{" "}
            {stateCount} states.
          </p>
          <p className="body-sm" style={{ margin: 0 }}>
            Built for the person standing in a parking lot with one thumb and
            low patience.
          </p>
        </div>
      </Surface>

      <Surface tone="quiet">
        <p className="page-kicker">Correction path</p>
        <p className="body-sm" style={{ margin: "0 0 1rem" }}>
          Wrong time, bad address, dead Zoom link, missing room. Send the fix
          and keep the map honest.
        </p>
        <Link href="/submit" className="btn btn--ghost btn-sm">
          Report correction
        </Link>
      </Surface>
    </>
  )

  const mainPane = (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ActionStrip>
          <button
            type="button"
            className={view === "list" ? "btn btn--secondary btn-sm" : "btn btn--ghost btn-sm"}
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
          >
            List
          </button>
          <button
            type="button"
            className={view === "map" ? "btn btn--secondary btn-sm" : "btn btn--ghost btn-sm"}
            onClick={() => setView("map")}
            aria-pressed={view === "map"}
          >
            Map
          </button>
          <button
            type="button"
            className={view === "split" ? "btn btn--secondary btn-sm hidden lg:inline-flex" : "btn btn--ghost btn-sm hidden lg:inline-flex"}
            onClick={() => setView("split")}
            aria-pressed={view === "split"}
          >
            Split
          </button>
        </ActionStrip>

        <p className="page-kicker" style={{ marginBottom: 0 }}>
          {filtered.length.toLocaleString()} results
        </p>
      </div>

      {view === "map" ? (
        <div className="atlas-map-shell">
          <YPAAMap
            markers={markers}
            mode="meetings"
            selectedId={effectiveSelectedId}
            onMarkerClick={(marker) => {
              setSelectedId(marker.id)
              if (window.matchMedia("(max-width: 1023px)").matches) {
                setView("list")
              }
            }}
            autoFit
            className="atlas-pane__map"
          />
        </div>
      ) : view === "split" ? (
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
          <MeetingRows
            meetings={filtered}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <div className="atlas-map-shell">
            <YPAAMap
              markers={markers}
              mode="meetings"
              selectedId={effectiveSelectedId}
              onMarkerClick={(marker) => setSelectedId(marker.id)}
              autoFit
              className="atlas-pane__map"
            />
          </div>
        </div>
      ) : (
        <MeetingRows
          meetings={filtered}
          selectedId={effectiveSelectedId}
          onSelect={setSelectedId}
        />
      )}
    </div>
  )

  return (
    <PageShell tone="stone">
      <div className="shell flex flex-col gap-8">
        <PageIntro
          compact
          kicker="Meetings"
          title={
            <>
              Calm rescue.
              <br />
              <em>Find a room fast.</em>
            </>
          }
          lead={
            <>
              Search by city, room, day, state, meeting type, or attendance.
              No canopy up front. The room matters more than the metaphor.
            </>
          }
          actions={
            <ActionStrip>
              <Link href="/submit" className="btn btn--ghost">
                Report correction
              </Link>
            </ActionStrip>
          }
        />

        <SplitTool
          rail={filterRail}
          main={mainPane}
          detail={<MeetingDetail meeting={selected} />}
        />
      </div>
    </PageShell>
  )
}

function MeetingRows({
  meetings,
  selectedId,
  onSelect,
}: {
  meetings: Meeting[]
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  if (meetings.length === 0) {
    return (
      <Surface className="grid gap-3">
        <p className="page-kicker">No matches</p>
        <h2 className="heading-lg">Nothing fits those filters.</h2>
        <p className="body-sm" style={{ margin: 0 }}>
          Try clearing the day, state, or meeting-type filters, or search by a
          broader city or venue term.
        </p>
      </Surface>
    )
  }

  return (
    <LedgerRows>
      {meetings.slice(0, 160).map((meeting) => {
        const startingSoon = isStartingSoon(meeting, new Date(), 180)
        return (
          <button
            key={meeting.id}
            type="button"
            onClick={() => onSelect(meeting.id)}
            className={meeting.id === selectedId ? "ledger-row ledger-row--active text-left" : "ledger-row text-left"}
            aria-pressed={meeting.id === selectedId}
          >
            <div className="ledger-row__main">
              <p className="ledger-row__label">
                {[meeting.day, meeting.time].filter(Boolean).join(" · ")}
              </p>
              <h3 className="ledger-row__title">{meeting.title}</h3>
              <div className="ledger-row__summary">
                {[
                  [meeting.city, meeting.stateAbbreviation].filter(Boolean).join(", "),
                  titleCase(meeting.meetingType ?? "meeting"),
                  meeting.format === "in-person" ? "In person" : titleCase(meeting.format),
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </div>
            </div>
            <div className="ledger-row__side">
              <div className="ledger-row__meta">
                {startingSoon ? "Starting soon" : "Select"}
              </div>
              <div className="ledger-row__actions">
                <span className="btn btn--quiet btn-sm">Details</span>
              </div>
            </div>
          </button>
        )
      })}
    </LedgerRows>
  )
}

function MeetingDetail({ meeting }: { meeting: Meeting | null }) {
  if (!meeting) {
    return (
      <Surface className="grid gap-3">
        <p className="page-kicker">Selected meeting</p>
        <h2 className="heading-lg">Pick a room to open the detail rail.</h2>
        <p className="body-sm" style={{ margin: 0 }}>
          The detail view stays close to the results so the page works on a
          phone, in a parking lot, with bad signal.
        </p>
      </Surface>
    )
  }

  const directionsHref = buildDirectionsHref(meeting)

  return (
    <Surface tone="quiet" className="grid gap-4">
      <div className="detail__idx">
        <span>Record {meeting.id.slice(-6).toUpperCase()}</span>
        <span>{meeting.format === "in-person" ? "In person" : titleCase(meeting.format)}</span>
      </div>

      <div>
        <h2 className="detail__name">{meeting.title}</h2>
        <p className="detail__addr">
          {meeting.location || meeting.venue || "Address on file"}
          {meeting.city ? ` · ${meeting.city}, ${meeting.stateAbbreviation}` : ""}
        </p>
      </div>

      <div className="grid gap-2">
        <DetailLine icon={<Clock3 className="h-4 w-4" />} label="When">
          {[meeting.day, meeting.time].filter(Boolean).join(" · ") || "Time pending"}
        </DetailLine>
        <DetailLine icon={<MapPin className="h-4 w-4" />} label="Type">
          {[titleCase(meeting.meetingType ?? "meeting"), titleCase(meeting.format)]
            .filter(Boolean)
            .join(" · ")}
        </DetailLine>
        <DetailLine icon={<SlidersHorizontal className="h-4 w-4" />} label="Region">
          {meeting.stateAbbreviation}
        </DetailLine>
      </div>

      {meeting.notes ? (
        <p className="body-sm" style={{ margin: 0 }}>
          {meeting.notes}
        </p>
      ) : null}

      <ActionStrip>
        {meeting.onlineUrl ? (
          <Link
            href={meeting.onlineUrl}
            className="btn btn--primary btn-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join online
          </Link>
        ) : null}
        {meeting.contactUrl ? (
          <Link
            href={meeting.contactUrl}
            className="btn btn--secondary btn-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Details
          </Link>
        ) : null}
        {directionsHref ? (
          <Link
            href={directionsHref}
            className="btn btn--ghost btn-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Navigation className="h-4 w-4" />
            Directions
          </Link>
        ) : null}
        <Link href="/submit" className="btn btn--ghost btn-sm">
          Report correction
        </Link>
      </ActionStrip>
    </Surface>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
}) {
  return (
    <label className="grid gap-2">
      <span className="caption" style={{ marginBottom: 0 }}>
        {label}
      </span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function DetailLine({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-[var(--mariacki-blue)]" aria-hidden="true">
        {icon}
      </span>
      <div className="grid gap-1">
        <span className="caption" style={{ marginBottom: 0 }}>
          {label}
        </span>
        <span className="body-sm" style={{ margin: 0 }}>
          {children}
        </span>
      </div>
    </div>
  )
}

function titleCase(value: string) {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ")
}

function parseClockToMinutes(time?: string) {
  if (!time) return null
  const match = time.trim().toUpperCase().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/)
  if (!match) return null
  let hours = Number.parseInt(match[1], 10)
  const minutes = match[2] ? Number.parseInt(match[2], 10) : 0
  const meridian = match[3]
  if (meridian === "PM" && hours < 12) hours += 12
  if (meridian === "AM" && hours === 12) hours = 0
  if (hours > 23 || minutes > 59) return null
  return hours * 60 + minutes
}

function dayIndex(day?: string) {
  if (!day) return null
  const normalized = day.trim().toLowerCase()
  const index = DAYS.findIndex((entry) => entry.toLowerCase() === normalized)
  return index === -1 ? null : index
}

function minutesUntilNext(meeting: Meeting, now: Date) {
  const meetingDay = dayIndex(meeting.day)
  const meetingMinutes = parseClockToMinutes(meeting.time)
  if (meetingDay == null || meetingMinutes == null) return null

  const currentDay = now.getDay()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  let dayDelta = meetingDay - currentDay
  const minuteDelta = meetingMinutes - currentMinutes

  if (dayDelta < 0 || (dayDelta === 0 && minuteDelta < -10)) {
    dayDelta += 7
  }

  return dayDelta * 24 * 60 + minuteDelta
}

function isStartingSoon(meeting: Meeting, now: Date, windowMinutes: number) {
  const delta = minutesUntilNext(meeting, now)
  return delta != null && delta >= -10 && delta <= windowMinutes
}

const DESKTOP_QUERY = "(min-width: 1024px)"

function subscribeDesktop(notify: () => void) {
  if (typeof window === "undefined") return () => {}
  const media = window.matchMedia(DESKTOP_QUERY)
  media.addEventListener("change", notify)
  return () => media.removeEventListener("change", notify)
}

function getDesktopMatch() {
  if (typeof window === "undefined") return false
  return window.matchMedia(DESKTOP_QUERY).matches
}

function getDesktopMatchServer() {
  return false
}

function buildDirectionsHref(meeting: Meeting) {
  if (meeting.format === "online") return null
  const destination = [meeting.location || meeting.venue, meeting.city, meeting.stateAbbreviation]
    .filter(Boolean)
    .join(", ")
  if (!destination) return null
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`
}
