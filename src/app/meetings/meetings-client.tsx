"use client"

import { useDeferredValue, useMemo, useState } from "react"
import Link from "next/link"
import type { Meeting, MeetingFormat } from "@/lib/data/normalized/types"
import { projectToSky, jitter } from "@/lib/utils/vault-projection"

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

  // Plot filtered meetings (cap for perf)
  const plotted = filtered
    .filter((m) => m.coordinates)
    .slice(0, 140)
    .map((m) => {
      const p = projectToSky(m.coordinates!.lat, m.coordinates!.lng)
      const j = jitter(m.id, 1.5, 1.5)
      return { meeting: m, x: p.x + j.x, y: p.y + j.y }
    })

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
              <a
                key={m.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setSelectedId(m.id)
                }}
                className={`row ${isNow ? "row--now" : ""}`}
                style={active ? { background: "rgba(214,162,78,0.06)" } : undefined}
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
              </a>
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

      {/* ────── RIGHT · ZOOMED SKY ────── */}
      <div className="sky-r">
        <div className="sky-r__head">
          <div className="t">
            LOCATION
            <b>North America · 0.6° arc</b>
          </div>
          <div className="t" style={{ textAlign: "right" }}>
            COORDINATES
            <b>N 40.00° · W 95.00°</b>
          </div>
        </div>

        {/* graticule */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
          }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 50 Q 50 47, 100 50"
            stroke="#6DACD4"
            strokeWidth="0.1"
            fill="none"
            opacity="0.1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 0 33 Q 50 30, 100 33"
            stroke="#6DACD4"
            strokeWidth="0.1"
            fill="none"
            opacity="0.08"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 0 67 Q 50 64, 100 67"
            stroke="#6DACD4"
            strokeWidth="0.1"
            fill="none"
            opacity="0.08"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* plotted stars */}
        {plotted.map((p, i) => {
          const isSel = p.meeting.id === effectiveSelectedId
          const isNow = i === 0
          const variant = isNow ? "now" : isSel ? "" : p.meeting.format === "online" ? "blue" : "dim"
          return (
            <button
              key={p.meeting.id}
              type="button"
              onClick={() => setSelectedId(p.meeting.id)}
              className={`pstar ${variant}`}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                background: "transparent",
                border: 0,
                padding: 0,
                cursor: "pointer",
              }}
              aria-label={p.meeting.title}
            >
              <span className="d" />
              {isSel || isNow ? (
                <span className="lbl">
                  {p.meeting.title}
                  <span className="m">
                    {[p.meeting.city, p.meeting.stateAbbreviation]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </span>
              ) : null}
            </button>
          )
        })}

        {/* detail card for selected meeting */}
        {selected ? (
          <article
            className="detail"
            style={{ top: "55%", left: "58%", transform: "translate(-50%, -50%)" }}
          >
            <div className="detail__idx">
              <span>RECORD · /{(selected.id || "").slice(-6).toUpperCase() || "—"}</span>
              <span>OPEN</span>
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
                <span>STARTS</span>
                <b>{selected.time || "—"}</b>
              </div>
              <div className="r">
                <span>FORMAT</span>
                <b>{selected.format.toUpperCase()}</b>
              </div>
              {selected.ageRange ? (
                <div className="r">
                  <span>AUDIENCE</span>
                  <b>{selected.ageRange}</b>
                </div>
              ) : null}
              <div className="r">
                <span>REGION</span>
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
                  JOIN LIVE
                </Link>
              ) : null}
              {selected.contactUrl ? (
                <Link
                  href={selected.contactUrl}
                  className="ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CONTACT
                </Link>
              ) : (
                <Link href="/about" className="ghost">
                  DETAILS
                </Link>
              )}
            </div>
          </article>
        ) : null}
      </div>
    </div>
  )
}