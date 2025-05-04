import type { NormalizedData, RawDataResponse } from "@/types/map";

const BASE_URL =
  "https://gist.githubusercontent.com/davidtyemnyak/fb7b8e5fc64994a57992d9963f473c91/raw/76d2efd3da158f59ba8984ffc205f7e1bec5138b/data.json";

async function fetchMapData(): Promise<NormalizedData | null> {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      console.error(`Fetch error: ${response.status} ${response.statusText}`);
      return null;
    }

    const rawData: RawDataResponse = await response.json();

    if (
      !rawData ||
      typeof rawData !== "object" ||
      !Array.isArray(rawData.result?.data)
    ) {
      console.error("Unexpected data format from API");
      return null;
    }

    const seenPolygons = new Set<string>();

    return rawData.result.data.reduce<NormalizedData>(
      (acc, feature, index) => {
        const { def_point, coordinates } = feature;

        if (def_point?.type === "Point") {
          acc.points.push({
            type: "Feature",
            geometry: def_point,
            properties: {
              type: "Point",
              id: index,
            },
          });
        }

        if (coordinates?.type === "MultiPolygon") {
          const key = JSON.stringify(coordinates.coordinates);
          if (!seenPolygons.has(key)) {
            seenPolygons.add(key);
            acc.polygons.push({
              type: "Feature",
              geometry: coordinates,
              properties: {
                type: "Polygon",
                id: index,
              },
            });
          }
        }

        return acc;
      },
      { points: [], polygons: [] }
    );
  } catch (error) {
    console.error("Failed to fetch or parse map data:", error);
    return null;
  }
}

export { fetchMapData };
