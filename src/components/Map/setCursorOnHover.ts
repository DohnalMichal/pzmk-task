import maplibregl from "maplibre-gl";

const setCursorOnHover = (map: maplibregl.Map, layerId: string) => {
  map.on("mouseenter", layerId, () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", layerId, () => {
    map.getCanvas().style.cursor = "";
  });
};

export { setCursorOnHover };
