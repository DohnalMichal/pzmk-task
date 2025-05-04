import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { addGeoJsonLayers } from "./addGeoJsonLayers";
import { handleClick } from "./popupHandlers";
import { setCursorOnHover } from "./setCursorOnHover";
import type { NormalizedData } from "@/types/map";

const BRNO = { lat: 49.19487, lng: 16.607 };

const useInitializeMap = (
  mapContainer: React.RefObject<HTMLDivElement | null>,
  data: NormalizedData
) => {
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: [BRNO.lng, BRNO.lat],
      zoom: 10,
      hash: true,
    });

    mapRef.current = map;

    map.on("load", () => {
      addGeoJsonLayers(map, data);

      setCursorOnHover(map, "polygons-layer");
      setCursorOnHover(map, "points-layer");
    });

    map.on("click", (e) => handleClick(map, e));

    return () => {
      mapRef.current?.remove();
    };
  }, [data, mapContainer]);
};

export { useInitializeMap };
