"use client"

import { useDeferredValue, useMemo, useState } from "react"
import Link from "next/link"
import { YPAAMap } from "@/lib/components/map/ypaa-map"
import type {
  MapMarker,
  Meeting,
  MeetingFormat,
} from "@/lib/data/normalized/types"

interface MeetingsClientProps {
  meetings: Meeting[]
  totalCount: number
  stateCount: number
}

type FormatFilter = "" | MeetingFormat
type TagChip = "YOUNG" | "OPEN" | "BIG BOOK" | "SPEAKER" | "HYBRID" | "TONIGHT"

const TAG_CHIPS: TagChip[] = ["YOUNG", "OPEN", "BIG BOOK", "SPEAKER", "HYBRID", "TONIGHT"]

export function MeetingsClient({
  meetings,
  totalCount,
  stateCount,
}: MeetingsClientProps) {
  const [query, setQuery] = useState("")
  const [formatFilter, setFormatFilter] = useState<FormatFilter>("")
  const [activeChips, setActiveChips] = useState<Set<TagChip>>(new Set(["YOUNG"]))
  const [selectedId, setSelectedId] = useState<string | null>(meetings[0]?.id ?? null)

  const q = useDeferredValue(query)

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return meetings.filter((m) => {
      if (formatFilter && m.format !== formatFilter) return false
      if (activeChips.has("HYBRID") && m.format !== "hybrid") return false
      if (activeChips.has("OPEN") && m.meetingType !== "open") return false
      if (activeChips.has("SPEAKER") && m.meetingType !== "speaker") return false
      if (!needle) return true
      return [m.title, m.city, m.location, m.stateAbbreviation]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(needle))
    })
  }, [q, formatFilter, activeChips, meetings])

  const effectiveSelectedId =
    selectedId && filtered.some((m) => m.id === selectedId)
      ? selectedId
      : filtered[0]?.id ?? null

  const selected =
    effectiveSelectedId ? filtered.find((m) => m.id === effectiveSelectedId) ?? null : null

  const toggleChip = (c: TagChip) => {
    setActiveChips((prev) => {
      const next = new Set(prev)
      if (next.has(c)) next.delete(c)
      else next.add(c)
      return next
    })
  }

  const markers: MapMarker[] = useMemo(
    () =>
      filtered
        .filter((m) => m.coordinates)
        .map((m) => ({
          id: m.id,
          type: "meeting" as const,
          coordinates: m.coordinates!,
          title: m.title,
          subtitle: [m.city, m.stateAbbreviation].filter(Boolean).join(", "),
          eyebrow: [m.day, m.time].filter(Boolean).join(" · "),
          state: m.stateAbbreviation,
          locationLabel: m.location ?? m.venue ?? "",
          emphasis: m.format === "online" ? "subtle" : "strong",
        })),
    [filtered],
  )

  return (
    <div className="page-split">
      {/* ────── LEFT · STELLAR INDEX ────── */}
      <aside className="index">
        <div className="index__head">
          <div className="index__eyebrow">
            <span>PLATE · II · STELLAR INDEX</span>
            <span>{filtered.length.toLocaleString()} OF {totalCount.toLocaleString()}</span>
          </div>
          <h1 className="index__title">
            A cleaner <em>national</em>
            <br />
            <em>view.</em>
          </h1>
          <p className="index__sub">
            Every young people&rsquo;s AA meeting we&rsquo;ve verified,
            across {stateCount} states. Each one is a room. Each one is a
            star. No outdated links. No dead ends. Filter by format,
            search by city, follow the coral pulses &mdash; those are the
            rooms starting soon.
          </p>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city, group, or region…"
            className="field__input"
            style={{ marginTop: 14, background: "rgba(11,10,8,0.35)" }}
          />
        </div>

        {/* filter chips */}
        <div className="filters">
          {TAG_CHIPS.map((c) => {
            const on = activeChips.has(c)
            const isTonight = c === "TONIGHT"
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleChip(c)}
                className={`chip ${on ? "on" : ""} ${isTonight ? "coral" : ""}`}
                aria-pressed={on}
              >
                {isTonight ? "▸ " : ""}
                {c}
              </button>
            )
          })}
          <button
            type="button"
            className={`chip ${formatFilter === "online" ? "on" : ""}`}
            onClick={() =>
              setFormatFilter((f) => (f === "online" ? "" : "online"))
            }
          >
            ONLINE
          </button>
        </div>

        {/* list */}
        <div className="list">
          {filtered.slice(0, 120).map((m, i) => {
            const active = m.id === effectiveSelectedId
            const isNow = i === 0 // first filtered = "starting soon" for the mockup feel
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedId(m.id)}
                className={`row ${isNow ? "row--now" : ""}`}
                style={active ? { background: "rgba(214,162,78,0.06)" } : undefined}
                aria-pressed={active}
              >
                <div className="row__star">
                  <div className="d" />
                  <div className="ring" />
                </div>
                <div>
                  <div className="row__name">{m.title}</div>
                  <div className="row__meta">
                    {[m.city, m.stateAbbreviation, m.day, m.format.toUpperCase()]
                      .filter(Boolean)
                      .join(" · ")}
                  </div>
                </div>
                <div className="row__time">
                  {m.time || "—"}
                  <span className="sub">
                    {isNow ? "SOON" : (m.meetingType ?? m.format).toUpperCase()}
                  </span>
                </div>
              </button>
            )
          })}
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "40px 0",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--gold-aged)",
                opacity: 0.7,
              }}
            >
              No stars match those filters.
            </div>
          ) : null}
        </div>
      </aside>

      {/* ────── RIGHT · ATLAS MAP ────── */}
      <div className="atlas-pane">
        <YPAAMap
          markers={markers}
          mode="meetings"
          selectedId={effectiveSelectedId}
          onMarkerClick={(m) => setSelectedId(m.id)}
          autoFit
          className="atlas-pane__map"
        />

        {selected ? (
          <article
            className="detail detail--floating"
            aria-live="polite"
          >
            <div className="detail__idx">
              <span>Record · /{(selected.id || "").slice(-6).toUpperCase() || "—"}</span>
              <span>Open</span>
            </div>
            <h3 className="detail__name">
              <em>{selected.title}</em>
            </h3>
            <p className="detail__addr">
              {selected.location || selected.venue || "Address on file"}
              {selected.city
                ? ` · ${selected.city}${selected.stateAbbreviation ? `, ${selected.stateAbbreviation}` : ""}`
                : ""}
            </p>
            <div className="detail__tags">
              {[
                selected.day?.toUpperCase(),
                selected.meetingType?.toUpperCase(),
                selected.format.toUpperCase(),
              ]
                .filter(Boolean)
                .map((t) => (
                  <span key={t}>{t}</span>
                ))}
            </div>
            <div className="detail__rows">
              <div className="r">
                <span>Starts</span>
                <b>{selected.time || "—"}</b>
              </div>
              <div className="r">
                <span>Format</span>
                <b>{selected.format.toUpperCase()}</b>
              </div>
              {selected.ageRange ? (
                <div className="r">
                  <span>Audience</span>
                  <b>{selected.ageRange}</b>
                </div>
              ) : null}
              <div className="r">
                <span>Region</span>
                <b>{selected.stateAbbreviation}</b>
              </div>
            </div>
            <div className="detail__cta">
              {selected.onlineUrl ? (
                <Link
                  href={selected.onlineUrl}
                  className="primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join live
                </Link>
              ) : null}
              {selected.contactUrl ? (
                <Link
                  href={selected.contactUrl}
                  className="ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact
                </Link>
              ) : (
                <Link href="/about" className="ghost">
                  Details
                </Link>
              )}
            </div>
          </article>
        ) : null}
      </div>
    </div>
  )
}
