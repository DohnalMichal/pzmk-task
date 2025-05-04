import type { Feature, Point, MultiPolygon } from "geojson";

interface NormalizedData {
  points: Feature<Point>[];
  polygons: Feature<MultiPolygon>[];
}

interface RawFeature {
  def_point?: {
    type: "Point";
    coordinates: [number, number];
    csr?: {
      type?: string;
      properties?: Record<string, unknown>;
    };
  };
  coordinates?: {
    type: "MultiPolygon";
    coordinates: number[][][][]; // GeoJSON MultiPolygon
  };
}

interface RawDataResponse {
  result: {
    data: RawFeature[];
  };
}

export type { NormalizedData, RawFeature, RawDataResponse };
