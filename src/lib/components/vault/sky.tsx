import type { CSSProperties } from "react"
import Link from "next/link"
import type { Conference, Meeting } from "@/lib/data/normalized/types"
import {
  projectToSky,
  jitter,
  decollide,
} from "@/lib/utils/vault-projection"

interface SkyProps {
  conferences: Conference[]
  meetings: Meeting[]
}

/**
 * THE VAULT · full-bleed homepage sky.
 * Conferences become labeled gold stars. Meetings scatter as dim stars.
 * SVG overlay draws constellation lines connecting the conferences.
 */
export function Sky({ conferences, meetings }: SkyProps) {
  // Project conferences with coords, then de-collide labels
  const rawConfs = conferences
    .filter((c) => c.coordinates)
    .map((c) => {
      const p = projectToSky(c.coordinates!.lat, c.coordinates!.lng)
      const j = jitter(c.slug, 1, 1)
      return {
        conf: c,
        x: p.x + j.x,
        y: p.y + j.y,
      }
    })

  // Greedy label collision avoidance: if two conference dots are within
  // ~6% of each other on x or 4% on y, nudge the later one down + sideways.
  const plottedConfs = decollide(rawConfs)

  // Project meetings (scatter)
  const plottedMeetings = meetings
    .filter((m) => m.coordinates)
    .slice(0, 220) // guard against overplotting
    .map((m) => {
      const p = projectToSky(m.coordinates!.lat, m.coordinates!.lng)
      const j = jitter(m.id, 1.5, 1.5)
      return {
        meeting: m,
        x: p.x + j.x,
        y: p.y + j.y,
      }
    })

  // Build constellation lines between the 5 largest conference clusters
  // (just a decorative path — we pick the first N upcoming and chain them)
  const arcConfs = plottedConfs.slice(0, 5)
  const linePath =
    arcConfs.length >= 2
      ? `M ${arcConfs.map((c) => `${c.x} ${c.y}`).join(" L ")}`
      : ""

  return (
    <div className="sky" aria-hidden>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="arc-glow" x1="0" x2="1">
            <stop offset="0%" stopColor="#D6A24E" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#D6A24E" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#D6A24E" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {linePath && (
          <path
            d={linePath}
            stroke="url(#arc-glow)"
            strokeWidth="0.15"
            fill="none"
            strokeDasharray="0.4 0.8"
            vectorEffect="non-scaling-stroke"
          />
        )}

        {/* Faint graticule arcs — horizon lines */}
        <path
          d="M 0 50 Q 50 47, 100 50"
          stroke="#7A8AD8"
          strokeWidth="0.1"
          fill="none"
          opacity="0.12"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 0 33 Q 50 30, 100 33"
          stroke="#7A8AD8"
          strokeWidth="0.1"
          fill="none"
          opacity="0.1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 0 67 Q 50 64, 100 67"
          stroke="#7A8AD8"
          strokeWidth="0.1"
          fill="none"
          opacity="0.1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Dim scatter of ~220 meetings */}
      {plottedMeetings.map((m) => (
        <div
          key={m.meeting.id}
          className="star star--dim"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: "2.5px",
            height: "2.5px",
          }}
        />
      ))}

      {/* Bright-blue accent stars — a random 12 as "live" meetings */}
      {plottedMeetings.slice(0, 12).map((m) => (
        <div
          key={`b-${m.meeting.id}`}
          className="star star--blue"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: "3px",
            height: "3px",
          }}
        />
      ))}

      {/* Named conference stars with labels */}
      {plottedConfs.map((c) => {
        // Labels on the right side of dot by default; on the left if near right edge
        const onLeft = c.x > 70
        const labelStyle: CSSProperties = onLeft
          ? { left: "auto", right: "18px", top: "-4px", textAlign: "right" }
          : { left: "18px", top: "-4px" }
        return (
          <Link
            key={c.conf.slug}
            href={`/conferences/${c.conf.slug}`}
            className="major"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            aria-label={c.conf.title}
          >
            <span className="dot" />
            <span className="label" style={labelStyle}>
              <span className="name">{c.conf.title}</span>
              <span className="meta">
                {[c.conf.city, formatShort(c.conf.startDate)]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            </span>
          </Link>
        )
      })}
    </div>
  )
}

function formatShort(iso?: string): string {
  if (!iso) return ""
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return ""
  return d
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toUpperCase()
}