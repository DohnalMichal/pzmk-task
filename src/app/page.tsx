import { Map } from "@/components/Map/Map";
import { fetchMapData } from "@/lib/map-data";

export default async function Home() {
  const data = await fetchMapData();

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg font-medium">
          Failed to load map data.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Map data={data} />
    </main>
  );
}
