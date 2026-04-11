"use client"

import { useEffect, useEffectEvent, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import type { MapMarker } from "@/lib/data/normalized/types"

interface YPAAMapProps {
  markers: MapMarker[]
  mode: "meetings" | "conferences" | "mixed"
  className?: string
  selectedId?: string | null
  onMarkerClick?: (marker: MapMarker) => void
  autoFit?: boolean
}

const BASE_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  name: "YPAA Atlas",
  sources: {
    carto: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution:
        "&copy; <a href='https://carto.com/'>CARTO</a> &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
    },
  },
  layers: [
    {
      id: "background",
      type: "background",
      paint: {
        "background-color": "#0c0a08",
      },
    },
    {
      id: "carto-base",
      type: "raster",
      source: "carto",
      paint: {
        "raster-opacity": 0.56,
        "raster-hue-rotate": 0,
        "raster-saturation": -0.52,
        "raster-brightness-max": 0.54,
        "raster-brightness-min": 0.06,
        "raster-contrast": 0.26,
      },
    },
  ],
}

function toGeoJSON(markers: MapMarker[]): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: markers.map((marker) => ({
      type: "Feature",
      id: marker.id,
      geometry: {
        type: "Point",
        coordinates: [marker.coordinates.lng, marker.coordinates.lat],
      },
      properties: {
        id: marker.id,
        type: marker.type,
        title: marker.title,
        subtitle: marker.subtitle ?? "",
        eyebrow: marker.eyebrow ?? "",
        state: marker.state ?? "",
        locationLabel: marker.locationLabel ?? "",
        emphasis: marker.emphasis ?? (marker.type === "conference" ? "strong" : "subtle"),
      },
    })),
  }
}

export function YPAAMap({
  markers,
  mode,
  className = "",
  selectedId,
  onMarkerClick,
  autoFit = false,
}: YPAAMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [loaded, setLoaded] = useState(false)

  const onSelect = useEffectEvent((id: string) => {
    const marker = markers.find((item) => item.id === id)
    if (marker) {
      onMarkerClick?.(marker)
    }
  })

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return
    }

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: BASE_STYLE,
      center: [-96.5, 38.6],
      zoom: 3.25,
      minZoom: 2.4,
      maxZoom: 14.5,
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
      scrollZoom: false,
      cooperativeGestures: true,
    })

    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right")

    map.on("load", () => {
      setLoaded(true)
    })

    mapRef.current = map

    const ro = new ResizeObserver(() => {
      map.resize()
    })
    ro.observe(containerRef.current)

    return () => {
      ro.disconnect()
      setLoaded(false)
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !loaded) {
      return
    }

    const useClusters = mode === "meetings" && markers.length > 16
    const sourceId = "ypaa-points"
    const featureCollection = toGeoJSON(markers)

    const layerIds = [
      "meeting-clusters",
      "meeting-cluster-count",
      "point-hit-area",
      "meeting-markers",
      "conference-markers",
      "conference-centers",
      "conference-halo",
      "selected-point",
    ]

    layerIds.forEach((layerId) => {
      if (map.getLayer(layerId)) {
        map.removeLayer(layerId)
      }
    })

    if (map.getSource(sourceId)) {
      map.removeSource(sourceId)
    }

    map.addSource(sourceId, {
      type: "geojson",
      data: featureCollection,
      cluster: useClusters,
      clusterMaxZoom: 8,
      clusterRadius: 36,
    })

    if (useClusters) {
      map.addLayer({
        id: "meeting-clusters",
        type: "circle",
        source: sourceId,
        filter: ["has", "point_count"],
        paint: {
          "circle-radius": [
            "step",
            ["get", "point_count"],
            18,
            15,
            22,
            30,
            28,
          ],
          "circle-color": "rgba(14, 12, 10, 0.88)",
          "circle-stroke-color": "rgba(246, 191, 111, 0.72)",
          "circle-stroke-width": 2.2,
        },
      })

      map.addLayer({
        id: "meeting-cluster-count",
        type: "symbol",
        source: sourceId,
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-font": ["Open Sans Bold"],
          "text-size": 13,
        },
        paint: {
          "text-color": "#f2eee8",
        },
      })
    }

    map.addLayer({
      id: "conference-halo",
      type: "circle",
      source: sourceId,
      filter: useClusters
        ? ["all", ["!", ["has", "point_count"]], ["==", ["get", "type"], "conference"]]
        : ["==", ["get", "type"], "conference"],
      paint: {
        "circle-radius": [
          "case",
          ["==", ["get", "emphasis"], "featured"],
          22,
          16,
        ],
        "circle-color": "rgba(246, 191, 111, 0.22)",
        "circle-blur": 1.2,
      },
    })

    map.addLayer({
      id: "point-hit-area",
      type: "circle",
      source: sourceId,
      ...(useClusters ? { filter: ["!", ["has", "point_count"]] as maplibregl.FilterSpecification } : {}),
      paint: {
        "circle-radius": 22,
        "circle-color": "transparent",
      },
    })

    map.addLayer({
      id: "meeting-markers",
      type: "circle",
      source: sourceId,
      filter: useClusters
        ? ["all", ["!", ["has", "point_count"]], ["!=", ["get", "type"], "conference"]]
        : ["!=", ["get", "type"], "conference"],
      paint: {
        "circle-radius": 5.8,
        "circle-color": "#d5dfef",
        "circle-stroke-color": "#0c0a08",
        "circle-stroke-width": 1.35,
        "circle-opacity": 0.96,
      },
    })

    map.addLayer({
      id: "conference-markers",
      type: "circle",
      source: sourceId,
      filter: useClusters
        ? ["all", ["!", ["has", "point_count"]], ["==", ["get", "type"], "conference"]]
        : ["==", ["get", "type"], "conference"],
      paint: {
        "circle-radius": [
          "case",
          ["==", ["get", "emphasis"], "featured"],
          10,
          8,
        ],
        "circle-color": "#140f0a",
        "circle-stroke-color": "#f6bf6f",
        "circle-stroke-width": 2.7,
        "circle-opacity": 0.98,
      },
    })

    map.addLayer({
      id: "conference-centers",
      type: "circle",
      source: sourceId,
      filter: useClusters
        ? ["all", ["!", ["has", "point_count"]], ["==", ["get", "type"], "conference"]]
        : ["==", ["get", "type"], "conference"],
      paint: {
        "circle-radius": [
          "case",
          ["==", ["get", "emphasis"], "featured"],
          2.7,
          2.3,
        ],
        "circle-color": "#f6bf6f",
        "circle-opacity": 1,
      },
    })

    map.addLayer({
      id: "selected-point",
      type: "circle",
      source: sourceId,
      filter: ["==", ["get", "id"], selectedId ?? ""],
      paint: {
        "circle-radius": [
          "case",
          ["==", ["get", "type"], "conference"],
          18,
          13,
        ],
        "circle-color": "rgba(255, 255, 255, 0.14)",
        "circle-stroke-color": "#f2eee8",
        "circle-stroke-width": 2.2,
      },
    })

    const clickLayer = "point-hit-area"

    const handleClusterClick = (event: maplibregl.MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] }) => {
      const feature = event.features?.[0]
      if (!feature || feature.properties == null) {
        return
      }

      const clusterId = feature.properties.cluster_id
      const source = map.getSource(sourceId) as maplibregl.GeoJSONSource & {
        getClusterExpansionZoom?: (
          clusterId: number,
          callback: (error: Error | null, zoom: number) => void,
        ) => void
      }

      source.getClusterExpansionZoom?.(clusterId, (error, zoom) => {
        if (!error) {
          map.easeTo({
            center: (feature.geometry as GeoJSON.Point).coordinates as [number, number],
            zoom,
            duration: 700,
          })
        }
      })
    }

    const handlePointClick = (event: maplibregl.MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] }) => {
      const feature = event.features?.[0]
      const id = feature?.properties?.id
      if (typeof id === "string") {
        onSelect(id)
      }
    }

    const setPointer = () => {
      map.getCanvas().style.cursor = "pointer"
    }

    const clearPointer = () => {
      map.getCanvas().style.cursor = ""
    }

    if (useClusters) {
      map.on("click", "meeting-clusters", handleClusterClick)
    }
    map.on("click", clickLayer, handlePointClick)
    map.on("mouseenter", clickLayer, setPointer)
    map.on("mouseleave", clickLayer, clearPointer)
    if (useClusters) {
      map.on("mouseenter", "meeting-clusters", setPointer)
      map.on("mouseleave", "meeting-clusters", clearPointer)
    }

    return () => {
      // Guard: the map-creation effect's cleanup may have already called
      // map.remove(), which invalidates the instance. Skip layer teardown
      // in that case — the removed map already discarded everything.
      if (!mapRef.current) return

      if (useClusters) {
        map.off("click", "meeting-clusters", handleClusterClick)
        map.off("mouseenter", "meeting-clusters", setPointer)
        map.off("mouseleave", "meeting-clusters", clearPointer)
      }
      map.off("click", clickLayer, handlePointClick)
      map.off("mouseenter", clickLayer, setPointer)
      map.off("mouseleave", clickLayer, clearPointer)

      layerIds.forEach((layerId) => {
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId)
        }
      })

      if (map.getSource(sourceId)) {
        map.removeSource(sourceId)
      }
    }
  }, [loaded, markers, mode, selectedId])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !loaded || !autoFit || markers.length === 0) {
      return
    }

    if (markers.length === 1) {
      map.easeTo({
        center: [markers[0].coordinates.lng, markers[0].coordinates.lat],
        zoom: mode === "conferences" ? 5.8 : 6.4,
        duration: 800,
      })
      return
    }

    const bounds = new maplibregl.LngLatBounds()
    markers.forEach((marker) => bounds.extend([marker.coordinates.lng, marker.coordinates.lat]))

    map.fitBounds(bounds, {
      padding: {
        top: 70,
        right: 70,
        bottom: 140,
        left: 70,
      },
      maxZoom: mode === "conferences" ? 5.5 : 6.25,
      duration: 850,
    })
  }, [autoFit, loaded, markers, mode])

  return (
    <div className={`relative h-full w-full ${className}`}>
      <div ref={containerRef} className="h-full w-full" />

      <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-2xl border border-white/10 bg-[#0f1218]/78 px-3 py-2 backdrop-blur-md">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#d5dfef]">
          Map key
        </p>
        <div className="mt-2 grid gap-1.5 text-[0.7rem] text-[#c9d0dc]">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full border border-[#0c0a08] bg-[#d5dfef]" />
            Meetings
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-full border-2 border-[#f6bf6f] bg-[#140f0a]">
              <span className="h-1 w-1 rounded-full bg-[#f6bf6f]" />
            </span>
            Conferences
          </span>
          {mode === "meetings" ? (
            <span className="inline-flex items-center gap-2 text-[#b7c0ce]">
              <span className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-full border-2 border-[#f6bf6f] bg-[#0e0c0a] text-[0.52rem] leading-none text-[#f2eee8]">
                3
              </span>
              Clusters (tap to zoom)
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
