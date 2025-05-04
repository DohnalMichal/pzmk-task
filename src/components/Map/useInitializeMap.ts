import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { addGeoJsonLayers } from "./addGeoJsonLayers";
import { handleClick } from "./popupHandlers";
import type { NormalizedData } from "@/types/map";
import { setCursorOnHover } from "./setCursorOnHover";

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
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
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
    map.on("zoomend", () => {
      const show = map.getZoom() >= 13;
      map.setLayoutProperty(
        "points-layer",
        "visibility",
        show ? "visible" : "none"
      );
    });

    return () => {
      mapRef.current?.remove();
    };
  }, [data, mapContainer]);
};

export { useInitializeMap };
