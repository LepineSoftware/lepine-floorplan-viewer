// src/components/FloorplanMap.jsx
import { useEffect } from "react";
import {
  MapContainer,
  ImageOverlay,
  Polygon, // Use Polygon for area-based interaction
  ZoomControl,
  useMap,
  useMapEvents, // Used for coordinate debugging
} from "react-leaflet";
import L from "leaflet";
import { MAP_CONFIG, floorplans } from "../data/floorplans";
import "leaflet/dist/leaflet.css";

// Helper component to log coordinates to the console for polygon creation
function CoordinateDebugger() {
  useMapEvents({
    click(e) {
      // In L.CRS.Simple, lat is Y and lng is X
      const y = Math.round(e.latlng.lat);
      const x = Math.round(e.latlng.lng);
      console.log(`Coordinate captured: [${y}, ${x}]`);
    },
  });
  return null;
}

// Controller to handle initial fit and resize events
function MapController({ bounds }) {
  const map = useMap();

  useEffect(() => {
    const initialFit = () => {
      map.invalidateSize();
      map.fitBounds(bounds, { padding: [20, 20] });
    };

    const timer = setTimeout(initialFit, 100);

    const handleResize = () => {
      map.invalidateSize();
      map.fitBounds(bounds, { padding: [20, 20] });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [map, bounds]);

  return (
    <div className="leaflet-top leaflet-left mt-20 ml-2">
      <div className="leaflet-bar custom-control-button">
        <a
          href="#"
          title="Recenter Map"
          onClick={(e) => {
            e.preventDefault();
            map.fitBounds(bounds, { padding: [20, 20] });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function FloorplanMap({ activeUnitId, onSelectUnit }) {
  const bounds = [
    [0, 0],
    [MAP_CONFIG.height, MAP_CONFIG.width],
  ];

  return (
    <MapContainer
      crs={L.CRS.Simple}
      bounds={bounds}
      minZoom={-5}
      zoomSnap={0}
      attributionControl={false}
      zoomControl={false}
      className="h-full w-full bg-[#f8fafc]"
    >
      <ZoomControl position="topleft" />
      <ImageOverlay url={MAP_CONFIG.url} bounds={bounds} />
      <MapController bounds={bounds} />

      {/* Enable this to see click coordinates in the console */}
      <CoordinateDebugger />

      {floorplans.map((unit) => {
        const isActive = activeUnitId === unit.id;

        // Only render the polygon if coordinates are defined in data/floorplans.js
        if (!unit.polygon) return null;

        return (
          <Polygon
            key={unit.id}
            positions={unit.polygon}
            eventHandlers={{
              click: () => onSelectUnit(unit),
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.6,
                  weight: 2,
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                if (unit.id !== activeUnitId) {
                  layer.setStyle({
                    fillOpacity: 0.2,
                    weight: 1,
                  });
                }
              },
            }}
            pathOptions={{
              fillColor: isActive ? "#3b82f6" : "#94a3b8",
              fillOpacity: isActive ? 0.4 : 0.2,
              color: isActive ? "#2563eb" : "#64748b",
              weight: isActive ? 3 : 1,
            }}
          />
        );
      })}
    </MapContainer>
  );
}
