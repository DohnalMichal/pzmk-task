import maplibregl from "maplibre-gl";
import { getPopupDescription } from "./getPopupDescription";

const handleClick = (map: maplibregl.Map, e: maplibregl.MapMouseEvent) => {
  const layers = [
    { id: "points-layer", type: "Point" },
    { id: "polygons-layer", type: "Polygon" },
  ];

  for (const layer of layers) {
    const features = map.queryRenderedFeatures(e.point, { layers: [layer.id] });
    if (features.length > 0) {
      const f = features[0];
      const lngLat =
        f.geometry.type === "Point"
          ? (f.geometry.coordinates as [number, number])
          : e.lngLat;
      const html = getPopupDescription(layer.type, f.properties?.id);
      new maplibregl.Popup().setLngLat(lngLat).setHTML(html).addTo(map);
      return;
    }
  }
};

export { handleClick };
