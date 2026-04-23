"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { YPAAMap } from "@/lib/components/map/ypaa-map"
import type { MapMarker } from "@/lib/data/normalized/types"

interface HomeAtlasProps {
  markers: MapMarker[]
}

/**
 * THE VAULT · home-page atlas.
 * Thin client wrapper around <YPAAMap/> — handles marker clicks by
 * routing to the corresponding detail page (conferences only —
 * meetings are routed to the meetings page with the marker preselected).
 */
export function HomeAtlas({ markers }: HomeAtlasProps) {
  const router = useRouter()

  const handleClick = useCallback(
    (marker: MapMarker) => {
      if (marker.type === "conference") {
        router.push(`/conferences/${marker.id}`)
      } else {
        router.push(`/meetings?selected=${marker.id}`)
      }
    },
    [router],
  )

  return (
    <div className="vhome__map">
      <YPAAMap
        markers={markers}
        mode="mixed"
        autoFit
        onMarkerClick={handleClick}
      />
    </div>
  )
}
