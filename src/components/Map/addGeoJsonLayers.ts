import maplibregl from "maplibre-gl";
import type { NormalizedData } from "@/types/map";

const POINTS_ZOOM_THRESHOLD = 11;

const addGeoJsonLayers = (map: maplibregl.Map, data: NormalizedData): void => {
  map.addSource("polygons", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: data.polygons,
    },
  });

  map.addSource("points", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: data.points,
    },
  });

  map.addLayer({
    id: "polygons-layer",
    type: "fill",
    source: "polygons",
    paint: {
      "fill-color": "#ff6347",
      "fill-opacity": 0.75,
    },
    layout: {
      visibility: "visible",
    },
  });

  map.addLayer({
    id: "points-layer",
    type: "circle",
    source: "points",
    paint: {
      "circle-radius": 6,
      "circle-color": "#007cbf",
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
    minzoom: POINTS_ZOOM_THRESHOLD,
    maxzoom: 22,
    layout: {
      visibility: "visible",
    },
  });
};

export { addGeoJsonLayers };
