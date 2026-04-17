"use client"

import { Clock3, ExternalLink, MapPin, X } from "lucide-react"
import type { MapMarker } from "@/lib/data/normalized/types"

interface MapDetailPanelProps {
  marker: MapMarker | null
  onClose: () => void
}

export function MapDetailPanel({ marker, onClose }: MapDetailPanelProps) {
  if (!marker) return null

  const isFeatured = marker.emphasis === "featured"
  const accent = isFeatured
    ? "var(--color-gilt)"
    : marker.type === "conference"
      ? "var(--color-crimson)"
      : "var(--color-glass-cobalt, #1d3a8a)"
  const haloColor = isFeatured
    ? "rgba(196,138,26,0.32)"
    : marker.type === "conference"
      ? "rgba(122,26,42,0.28)"
      : "rgba(29,58,138,0.24)"
  const summary =
    typeof marker.meta?.summary === "string"
      ? marker.meta.summary
      : typeof marker.meta?.location === "string"
        ? marker.meta.location
        : typeof marker.meta?.venue === "string"
          ? marker.meta.venue
          : null

  return (
    <section className="panel-raised rise-in relative overflow-hidden p-4 sm:p-5">
      <div
        className="absolute inset-x-0 top-0 h-24"
        style={{
          background: `radial-gradient(circle at top left, ${haloColor}, transparent 52%)`,
        }}
      />
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="meta-label" style={{ color: accent }}>
            {marker.eyebrow ?? (marker.type === "conference" ? "conference" : "meeting")}
          </p>
          <h3
            className="mt-2 text-[var(--color-ink)]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "1.5rem",
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
            }}
          >
            {marker.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-iron)] bg-[var(--color-ashlar-lit)] text-[var(--color-muted)] hover:text-[var(--color-crimson)]"
          aria-label="Close detail card"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="relative z-10 mt-4 grid gap-2.5 text-sm text-muted">
        {marker.subtitle ? (
          <div className="flex items-start gap-2.5">
            <Clock3 className="mt-0.5 h-4 w-4 flex-shrink-0 text-faint" />
            <span>{marker.subtitle}</span>
          </div>
        ) : null}

        {marker.locationLabel ? (
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-faint" />
            <span>{marker.locationLabel}</span>
          </div>
        ) : null}
      </div>

      {summary ? (
        <p className="relative z-10 mt-4 text-sm leading-7 text-muted">
          {summary}
        </p>
      ) : null}

      {marker.href ? (
        <a
          href={marker.href}
          target="_blank"
          rel="noreferrer"
          className={`relative z-10 mt-5 w-full justify-between ${isFeatured ? "action-altar" : "action-secondary"}`}
        >
          {marker.type === "conference" ? "visit source" : "open meeting"}
          <ExternalLink className="h-4 w-4" />
        </a>
      ) : null}
    </section>
  )
}
