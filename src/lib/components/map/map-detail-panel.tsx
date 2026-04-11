"use client"

import { Clock3, ExternalLink, MapPin, X } from "lucide-react"
import type { MapMarker } from "@/lib/data/normalized/types"

interface MapDetailPanelProps {
  marker: MapMarker | null
  onClose: () => void
}

export function MapDetailPanel({ marker, onClose }: MapDetailPanelProps) {
  if (!marker) {
    return null
  }

  const accent = marker.type === "conference" ? "var(--color-accent)" : "var(--color-signal)"
  const summary =
    typeof marker.meta?.summary === "string"
      ? marker.meta.summary
      : typeof marker.meta?.location === "string"
        ? marker.meta.location
        : typeof marker.meta?.venue === "string"
          ? marker.meta.venue
          : null

  return (
    <>
      <aside className="pointer-events-auto absolute right-5 top-5 z-20 hidden w-[22rem] md:block">
        <div className="panel-raised rise-in overflow-hidden p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="meta-label" style={{ color: accent }}>
                {marker.eyebrow ?? (marker.type === "conference" ? "Conference" : "Meeting")}
              </p>
              <h3 className="mt-2 font-serif text-[1.5rem] leading-[1.04] tracking-[-0.04em] text-ink">
                {marker.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted hover:text-ink"
              aria-label="Close detail panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 space-y-3 text-sm text-muted">
            {marker.subtitle && (
              <div className="flex items-start gap-2.5">
                <Clock3 className="mt-0.5 h-4 w-4 text-faint" />
                <span>{marker.subtitle}</span>
              </div>
            )}

            {marker.locationLabel && (
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-faint" />
                <span>{marker.locationLabel}</span>
              </div>
            )}
          </div>

          {summary && (
            <p className="mt-5 text-sm leading-7 text-muted">
              {summary}
            </p>
          )}

          {marker.href && (
            <a
              href={marker.href}
              target="_blank"
              rel="noreferrer"
              className="action-secondary mt-6 w-full justify-between"
            >
              Visit source
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </aside>

      <aside className="pointer-events-auto absolute inset-x-0 bottom-0 z-20 px-3 pb-3 md:hidden">
        <div className="panel-raised fade-in overflow-hidden rounded-[1.6rem] p-4">
          <div className="mb-3 flex justify-center">
            <span className="h-1 w-12 rounded-full bg-white/10" />
          </div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="meta-label" style={{ color: accent }}>
                {marker.eyebrow ?? (marker.type === "conference" ? "Conference" : "Meeting")}
              </p>
              <h3 className="mt-1.5 font-serif text-xl leading-tight text-ink">
                {marker.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted"
              aria-label="Close detail panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 space-y-2 text-sm text-muted">
            {marker.subtitle && (
              <div className="flex items-start gap-2.5">
                <Clock3 className="mt-0.5 h-4 w-4 text-faint" />
                <span>{marker.subtitle}</span>
              </div>
            )}
            {marker.locationLabel && (
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-faint" />
                <span>{marker.locationLabel}</span>
              </div>
            )}
          </div>

          {marker.href && (
            <a
              href={marker.href}
              target="_blank"
              rel="noreferrer"
              className="action-secondary mt-4 w-full justify-between"
            >
              Visit source
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </aside>
    </>
  )
}
