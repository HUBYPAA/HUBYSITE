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
        "background-color": "#09090b",
      },
    },
    {
      id: "carto-base",
      type: "raster",
      source: "carto",
      paint: {
        "raster-opacity": 0.58,
        "raster-saturation": -0.82,
        "raster-brightness-max": 0.46,
        "raster-brightness-min": 0.1,
        "raster-contrast": 0.18,
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

    return () => {
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
      "point-markers",
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
          "circle-color": "rgba(11, 11, 13, 0.86)",
          "circle-stroke-color": "rgba(183, 140, 86, 0.38)",
          "circle-stroke-width": 1.5,
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
          "text-size": 12,
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
          20,
          14,
        ],
        "circle-color": "rgba(183, 140, 86, 0.15)",
        "circle-blur": 1.1,
      },
    })

    map.addLayer({
      id: "point-markers",
      type: "circle",
      source: sourceId,
      ...(useClusters ? { filter: ["!", ["has", "point_count"]] as maplibregl.FilterSpecification } : {}),
      paint: {
        "circle-radius": [
          "case",
          ["==", ["get", "type"], "conference"],
          [
            "case",
            ["==", ["get", "emphasis"], "featured"],
            8,
            6.5,
          ],
          4.25,
        ],
        "circle-color": [
          "case",
          ["==", ["get", "type"], "conference"],
          "#b78c56",
          "#d0c8bc",
        ],
        "circle-stroke-color": "#09090b",
        "circle-stroke-width": [
          "case",
          ["==", ["get", "type"], "conference"],
          2,
          1.2,
        ],
        "circle-opacity": [
          "case",
          ["==", ["get", "type"], "conference"],
          0.96,
          0.9,
        ],
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
          16,
          12,
        ],
        "circle-color": "rgba(183, 140, 86, 0.16)",
        "circle-stroke-color": "#b78c56",
        "circle-stroke-width": 1.4,
      },
    })

    const clickLayer = "point-markers"

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
        bottom: 70,
        left: 70,
      },
      maxZoom: mode === "conferences" ? 5.5 : 6.25,
      duration: 850,
    })
  }, [autoFit, loaded, markers, mode])

  return <div ref={containerRef} className={`h-full w-full ${className}`} />
}
