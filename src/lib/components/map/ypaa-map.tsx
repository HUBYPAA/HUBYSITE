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
        "https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png",
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
        "background-color": "#f5efde",
      },
    },
    {
      id: "carto-base",
      type: "raster",
      source: "carto",
      paint: {
        "raster-opacity": 0.94,
        "raster-saturation": -0.35,
        "raster-brightness-max": 0.98,
        "raster-brightness-min": 0.46,
        "raster-contrast": 0.04,
        "raster-hue-rotate": 18,
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
      cooperativeGestures: false,
    })

    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right")

    map.on("load", () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        map.setPaintProperty("background", "background-color", "#f0e8d2")
      }
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
    const mobile = window.matchMedia("(max-width: 767px)").matches

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
            mobile ? 22 : 18,
            15,
            mobile ? 26 : 22,
            30,
            mobile ? 32 : 28,
          ],
          "circle-color": "rgba(46, 107, 255, 0.95)",
          "circle-stroke-color": "rgba(243, 184, 56, 0.8)",
          "circle-stroke-width": mobile ? 2.6 : 2.2,
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
          "text-size": mobile ? 15 : 13,
        },
        paint: {
          "text-color": "#ffffff",
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
          mobile ? 28 : 24,
          mobile ? 20 : 16,
        ],
        "circle-color": [
          "case",
          ["==", ["get", "emphasis"], "featured"],
          "rgba(245, 195, 74, 0.42)",   // gold halo for the altar marker
          "rgba(168, 58, 48, 0.22)",    // red halo for regular conferences
        ],
        "circle-blur": 1.2,
      },
    })

    map.addLayer({
      id: "point-hit-area",
      type: "circle",
      source: sourceId,
      ...(useClusters ? { filter: ["!", ["has", "point_count"]] as maplibregl.FilterSpecification } : {}),
      paint: {
        "circle-radius": mobile ? 30 : 22,
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
        "circle-radius": mobile ? 7.5 : 5.8,
        "circle-color": "#2e6bff",
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": mobile ? 1.6 : 1.4,
        "circle-opacity": 1,
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
          mobile ? 13 : 11,
          mobile ? 10 : 8,
        ],
        "circle-color": [
          "case",
          ["==", ["get", "emphasis"], "featured"],
          "#f3b838",
          "#ffffff",
        ],
        "circle-stroke-color": [
          "case",
          ["==", ["get", "emphasis"], "featured"],
          "#2e5bd2",
          "#c94a32",
        ],
        "circle-stroke-width": mobile ? 3 : 2.7,
        "circle-opacity": 1,
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
          mobile ? 3.4 : 2.9,
          mobile ? 2.8 : 2.3,
        ],
        "circle-color": [
          "case",
          ["==", ["get", "emphasis"], "featured"],
          "#2e5bd2",
          "#c94a32",
        ],
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
          mobile ? 24 : 20,
          mobile ? 16 : 13,
        ],
        "circle-color": "rgba(243, 184, 56, 0.12)",
        "circle-stroke-color": [
          "case",
          ["==", ["get", "emphasis"], "featured"],
          "#dc9c2a",
          ["==", ["get", "type"], "conference"],
          "#c94a32",
          "#2e6bff",
        ],
        "circle-stroke-width": 2.4,
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

    const compact = window.matchMedia("(max-width: 767px)").matches

    map.fitBounds(bounds, {
      padding: {
        top: compact ? 40 : 70,
        right: compact ? 24 : 70,
        bottom: compact ? 80 : 140,
        left: compact ? 24 : 70,
      },
      maxZoom: mode === "conferences" ? 5.5 : 6.25,
      duration: 850,
    })
  }, [autoFit, loaded, markers, mode])

  return (
    <div className={`relative h-full w-full ${className}`}>
      <div ref={containerRef} className="h-full w-full" />

      <div
        className="pointer-events-none absolute bottom-3 left-3 z-10 hidden rounded-lg px-3 py-2.5 backdrop-blur-md sm:block"
        style={{
          background: "rgba(255, 255, 255, 0.88)",
          border: "1px solid var(--color-border-2)",
          boxShadow: "0 10px 28px rgba(80, 50, 15, 0.10)",
        }}
      >
        <p className="label mono" style={{ fontSize: "0.66rem" }}>legend</p>
        <div className="mt-2 grid gap-1.5 text-[0.78rem]" style={{ color: "var(--color-fg-2)" }}>
          <span className="inline-flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "#2e6bff", boxShadow: "0 0 0 1.3px #fff" }}
            />
            Meeting
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-full"
              style={{ background: "#ffffff", boxShadow: "0 0 0 1.5px #c94a32" }}
            >
              <span className="h-1 w-1 rounded-full" style={{ background: "#c94a32" }} />
            </span>
            Conference
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-full"
              style={{ background: "#f3b838", boxShadow: "0 0 0 1.5px #2e5bd2, 0 0 10px rgba(243,184,56,0.55)" }}
            >
              <span className="h-1 w-1 rounded-full" style={{ background: "#2e5bd2" }} />
            </span>
            Featured
          </span>
          {mode === "meetings" ? (
            <span className="inline-flex items-center gap-2" style={{ color: "var(--color-fg-3)" }}>
              <span
                className="inline-flex h-3 w-3 items-center justify-center rounded-full text-[0.55rem] leading-none"
                style={{
                  background: "rgba(46, 107, 255, 0.95)",
                  color: "#fff",
                  boxShadow: "0 0 0 1px rgba(243, 184, 56, 0.7)",
                }}
              >
                3
              </span>
              Cluster
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
