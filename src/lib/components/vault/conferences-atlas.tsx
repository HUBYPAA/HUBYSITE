"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { YPAAMap } from "@/lib/components/map/ypaa-map"
import type { MapMarker } from "@/lib/data/normalized/types"

interface ConferencesAtlasProps {
  markers: MapMarker[]
}

/**
 * THE VAULT · conferences atlas.
 * Real map replacement for the old decorative "constellation plate." Each
 * conference is a gold star; click routes to its detail page.
 */
export function ConferencesAtlas({ markers }: ConferencesAtlasProps) {
  const router = useRouter()

  const handleClick = useCallback(
    (marker: MapMarker) => {
      router.push(`/conferences/${marker.id}`)
    },
    [router],
  )

  return (
    <div className="conf-atlas">
      <YPAAMap
        markers={markers}
        mode="conferences"
        autoFit
        onMarkerClick={handleClick}
      />
    </div>
  )
}
