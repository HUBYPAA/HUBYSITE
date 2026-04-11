"use client"

import { useCallback, useRef, useState } from "react"
import { Clock3, ExternalLink, MapPin, X } from "lucide-react"
import type { MapMarker } from "@/lib/data/normalized/types"

interface MapDetailPanelProps {
  marker: MapMarker | null
  onClose: () => void
}

export function MapDetailPanel({ marker, onClose }: MapDetailPanelProps) {
  const [closing, setClosing] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [trackedId, setTrackedId] = useState<string | null>(marker?.id ?? null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const dragStartY = useRef<number | null>(null)

  // Reset state when marker changes
  const currentId = marker?.id ?? null
  if (currentId !== trackedId) {
    setTrackedId(currentId)
    if (closing) setClosing(false)
    if (expanded) setExpanded(false)
  }

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      onClose()
    }, 240)
  }, [onClose])

  // Swipe-to-dismiss for mobile bottom sheet
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (dragStartY.current === null) return
    const delta = e.changedTouches[0].clientY - dragStartY.current
    dragStartY.current = null

    if (delta > 80) {
      // Swipe down - close
      handleClose()
    } else if (delta < -60 && !expanded) {
      // Swipe up - expand
      setExpanded(true)
    }
  }, [expanded, handleClose])

  if (!marker) return null

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
      {/* Desktop: side panel */}
      <aside className="pointer-events-auto absolute right-5 top-5 z-20 hidden w-[22rem] lg:block">
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

      {/* Mobile: bottom sheet with swipe gestures */}
      <aside
        ref={sheetRef}
        className="bottom-sheet lg:hidden"
        data-closing={closing}
        style={{
          maxHeight: expanded ? "70dvh" : undefined,
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="sheet-handle" />

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="meta-label" style={{ color: accent }}>
              {marker.eyebrow ?? (marker.type === "conference" ? "Conference" : "Meeting")}
            </p>
            <h3 className="mt-1.5 font-serif text-xl leading-tight tracking-[-0.02em] text-ink">
              {marker.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted"
            aria-label="Close detail panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 space-y-2.5 text-sm text-muted">
          {marker.subtitle && (
            <div className="flex items-start gap-2.5">
              <Clock3 className="mt-0.5 h-4 w-4 flex-shrink-0 text-faint" />
              <span>{marker.subtitle}</span>
            </div>
          )}
          {marker.locationLabel && (
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-faint" />
              <span>{marker.locationLabel}</span>
            </div>
          )}
        </div>

        {expanded && summary && (
          <p className="mt-4 text-sm leading-7 text-muted fade-in">
            {summary}
          </p>
        )}

        {marker.href && (
          <a
            href={marker.href}
            target="_blank"
            rel="noreferrer"
            className="action-secondary mt-5 w-full justify-between"
          >
            Visit source
            <ExternalLink className="h-4 w-4" />
          </a>
        )}

        <p className="mt-3 text-center text-xs text-faint">
          {expanded ? "Swipe down to close" : "Swipe up for more"}
        </p>
      </aside>
    </>
  )
}
