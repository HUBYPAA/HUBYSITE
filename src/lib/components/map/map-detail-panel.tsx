"use client"

import { Clock3, ExternalLink, MapPin, X } from "lucide-react"
import type { MapMarker } from "@/lib/data/normalized/types"

interface MapDetailPanelProps {
  marker: MapMarker | null
  onClose: () => void
}

export function MapDetailPanel({ marker, onClose }: MapDetailPanelProps) {
  if (!marker) return null

  const accent = marker.type === "conference" ? "var(--color-warm)" : "var(--color-signal)"
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
          background:
            marker.type === "conference"
              ? "radial-gradient(circle at top left, rgba(194,103,62,0.12), transparent 48%)"
              : "radial-gradient(circle at top left, rgba(45,74,122,0.12), transparent 48%)",
        }}
      />
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="meta-label" style={{ color: accent }}>
            {marker.eyebrow ?? (marker.type === "conference" ? "Conference" : "Meeting")}
          </p>
          <h3 className="mt-2 font-serif text-[1.6rem] leading-[1.02] tracking-[-0.04em] text-ink">
            {marker.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[0.75rem] border border-ink/8 bg-panel/80 text-muted hover:text-ink"
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
          className="action-secondary relative z-10 mt-5 w-full justify-between"
        >
          {marker.type === "conference" ? "Visit source" : "Open meeting link"}
          <ExternalLink className="h-4 w-4" />
        </a>
      ) : null}
    </section>
  )
}
