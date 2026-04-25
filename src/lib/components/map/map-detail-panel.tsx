"use client"

import { Clock3, ExternalLink, MapPin, X } from "lucide-react"
import { Surface } from "@/lib/components/atlas"
import type { MapMarker } from "@/lib/data/normalized/types"

interface MapDetailPanelProps {
  marker: MapMarker | null
  onClose: () => void
}

export function MapDetailPanel({ marker, onClose }: MapDetailPanelProps) {
  if (!marker) return null

  const summary =
    typeof marker.meta?.summary === "string"
      ? marker.meta.summary
      : typeof marker.meta?.location === "string"
        ? marker.meta.location
        : typeof marker.meta?.venue === "string"
          ? marker.meta.venue
          : null

  return (
    <Surface tone="quiet" className="rise-in">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="eyebrow">
            {marker.eyebrow ?? (marker.type === "conference" ? "Conference" : "Meeting")}
          </p>
          <h3
            className="mt-2"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              fontSize: "1.5rem",
              lineHeight: 1.1,
              letterSpacing: "-0.018em",
              color: "var(--color-ink)",
            }}
          >
            {marker.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center border border-[var(--rule-color)] bg-[var(--color-surface)] text-[var(--color-ink-3)] transition-colors hover:border-[var(--rule-strong-color)] hover:text-[var(--color-ink)]"
          style={{ borderRadius: "var(--radius-1)" }}
          aria-label="Close detail"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 space-y-2 text-sm text-[var(--color-ink-2)]">
        {marker.subtitle ? (
          <div className="flex items-start gap-2">
            <Clock3 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-ink-3)]" />
            <span>{marker.subtitle}</span>
          </div>
        ) : null}
        {marker.locationLabel ? (
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-ink-3)]" />
            <span>{marker.locationLabel}</span>
          </div>
        ) : null}
      </div>

      {summary ? (
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-2)]">{summary}</p>
      ) : null}

      {marker.href ? (
        <a
          href={marker.href}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary mt-5 w-full justify-between"
        >
          {marker.type === "conference" ? "Visit source" : "Open meeting"}
          <ExternalLink className="h-4 w-4" />
        </a>
      ) : null}
    </Surface>
  )
}
