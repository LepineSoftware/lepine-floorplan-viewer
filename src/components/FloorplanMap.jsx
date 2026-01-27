// src/components/FloorplanMap.jsx
import React, { useEffect } from "react";
import {
  MapContainer,
  ImageOverlay,
  Polygon,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// This controller forces the map to contain the entire image within the viewport
function MapController({ bounds }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !bounds) return;

    const fitImageToScreen = () => {
      // invalidateSize ensures Leaflet has the correct container dimensions
      map.invalidateSize();

      // fitBounds snaps the view to the image dimensions
      // padding: [20, 20] adds a small margin so the image isn't flush against the edges
      map.fitBounds(bounds, {
        padding: [20, 20],
        animate: true,
        duration: 0.5,
      });
    };

    // Run immediately on mount or when bounds change
    fitImageToScreen();

    // Re-run if the user resizes their browser window
    window.addEventListener("resize", fitImageToScreen);
    return () => window.removeEventListener("resize", fitImageToScreen);
  }, [map, bounds]);

  return null;
}

export default function FloorplanMap({
  mode,
  config,
  items,
  activeId,
  onSelect,
}) {
  // Define coordinates based on the current configuration's dimensions
  const bounds = [
    [0, 0],
    [config.height, config.width],
  ];

  return (
    <MapContainer
      crs={L.CRS.Simple}
      bounds={bounds}
      maxBounds={bounds} // Restricts panning outside the image
      maxBoundsViscosity={1.0} // Prevents "bouncing" away from edges
      attributionControl={false}
      zoomControl={false}
      className="h-full w-full bg-[#f8fafc]"
    >
      <ZoomControl position="topleft" />

      <ImageOverlay url={config.url} bounds={bounds} />

      {/* The MapController handles the automatic sizing logic */}
      <MapController bounds={bounds} />

      {items.map((item) => (
        <Polygon
          key={item.id}
          positions={item.polygon}
          pathOptions={{
            fillColor: activeId === item.id ? "#3b82f6" : "#94a3b8",
            fillOpacity: mode === "building" ? 0.3 : 0.2,
            color: activeId === item.id ? "#2563eb" : "#64748b",
            weight: activeId === item.id ? 2 : 1,
          }}
          eventHandlers={{
            click: (e) => {
              // Stop the click from bubbling to the map itself
              L.DomEvent.stopPropagation(e);
              onSelect(item);
            },
          }}
        />
      ))}
    </MapContainer>
  );
}
