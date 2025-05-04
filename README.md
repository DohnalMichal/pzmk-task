# 🗺️ PZMK Map Task – GeoJSON Map Viewer

This project is a solution to the **PZMK trial assignment**, which involved building a simple map-based web app using Next.js and [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/). The goal was to asynchronously fetch GeoJSON data, visualize **parcels (polygons)** and **points**, and provide basic interactivity such as popups and zoom-dependent visibility.

⏱️ **Time limit:** 6 hours  
🧠 **Focus:** Functionality > completeness

---

## ✅ Implemented Features

- **✅ Next.js + React 19 + TypeScript**
- **✅ Asynchronous fetching** of GeoJSON from the provided API
- **✅ Visualization of MultiPolygon (parcels) and Point (centroids) features**
- **✅ Duplicate polygon detection** (by geometry), rendering only one of each
- **✅ Polygons visible by default, points shown after zooming in** (threshold = zoom level 13)
- **✅ Interactive cursor when hovering over features**
- **✅ Popup with feature info on click (MapLibre Popup API)**
- **✅ Mobile-friendly responsive map layout**
- **✅ MapTiler vector tiles**

---

## 📦 Tech Stack

- **Next.js 15 App Router**
- **React 19**
- **TypeScript**
- **MapLibre GL JS**
- **Tailwind CSS**
- **MapTiler**

---

## 🔍 Assignment Requirements vs. Implementation

| Requirement                                           | Status | Notes                                               |
| ----------------------------------------------------- | ------ | --------------------------------------------------- |
| Load data from API                                    | ✅     | Fetched and typed from `gist.githubusercontent.com` |
| Show polygons and points in map                       | ✅     | Using `fill` and `circle` layers                    |
| Show only **one polygon** if multiple identical exist | ✅     | Geometry stringified & deduplicated using `Set`     |
| Show only **points** after a certain zoom             | ✅     | Points hidden by default, shown from zoom ≥ 13      |
| Use **MapLibre GL JS**                                | ✅     | Used directly, no wrapper libraries                 |
| On **click**, show data popup                         | ✅     | Uses MapLibre `Popup` with dynamic content          |
| Prevent **lat/lng confusion**                         | ✅     | Coordinates preserved correctly (lon, lat)          |
| Optional: Show only visible data                      | 🚫     | Not yet implemented (potential optimization)        |
| Optional: Cache data                                  | 🚫     | Could be implemented using SWR or a global store    |

---

## 🗺️ Map Tiles

By default, the map uses **MapTiler vector tiles** via:

```ts
style: "https://api.maptiler.com/maps/streets-v2/style.json?key=YOUR_KEY";
```

(I like the Streets style a lot so I decided to go with MapTiler style rather than OpenStreetMap)

🔑 To run locally, create `.env.local`:

```
NEXT_PUBLIC_MAPTILER_KEY=your_maptiler_api_key
```

If desired, you can switch to OpenStreetMap raster tiles (no key required).
