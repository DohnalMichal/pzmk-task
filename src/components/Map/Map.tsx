"use client";

import { useRef } from "react";
import type { NormalizedData } from "@/types/map";
import { useInitializeMap } from "./useInitializeMap";
import "maplibre-gl/dist/maplibre-gl.css";

type MapProps = {
  data: NormalizedData;
};

const Map = ({ data }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  useInitializeMap(mapContainer, data);

  return <div ref={mapContainer} className="min-h-screen" />;
};

export { Map };
