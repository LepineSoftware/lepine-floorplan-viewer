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
import { POLYGON_STYLES } from "../config/mapStyles";
import { MAP_VIEW_SETTINGS } from "../config/viewConfigs";
import "leaflet/dist/leaflet.css";

function MapController({ bounds, imageWidth, imageHeight }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !bounds) return;

    const calculatePerfectFit = () => {
      // Force Leaflet to recognize the current container size
      map.invalidateSize();

      const container = map.getContainer();
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      // Calculate required zoom levels for both dimensions (Log2 for Leaflet zoom levels)
      const zoomW = Math.log2(containerWidth / imageWidth);
      const zoomH = Math.log2(containerHeight / imageHeight);

      // Use Math.min to 'Contain' (show full image) or Math.max to 'Cover' (fill screen)
      const perfectZoom = Math.min(zoomW, zoomH);

      // Re-center and snap to the calculated zoom level
      map.setView([imageHeight / 2, imageWidth / 2], perfectZoom, {
        animate: true,
        duration: MAP_VIEW_SETTINGS.animationDuration,
      });
    };

    calculatePerfectFit();
    window.addEventListener("resize", calculatePerfectFit);
    return () => window.removeEventListener("resize", calculatePerfectFit);
  }, [map, bounds, imageWidth, imageHeight]);

  return null;
}
export default function FloorplanMap({
  mode,
  config,
  items,
  activeId,
  onSelect,
}) {
  const bounds = [
    [0, 0],
    [config.height, config.width],
  ];

  return (
    <MapContainer
      crs={L.CRS.Simple}
      minZoom={-5} // Crucial for scaling down high-res assets on smaller screens
      maxZoom={2}
      attributionControl={false}
      zoomControl={false}
      className="h-full w-full"
      style={{ background: MAP_VIEW_SETTINGS.defaultBackground }}
    >
      <ZoomControl position="topleft" />
      <ImageOverlay url={config.url} bounds={bounds} />

      {/* Pass the specific config dimensions (SVG or JPG) to the controller */}
      <MapController
        bounds={bounds}
        imageWidth={config.width}
        imageHeight={config.height}
      />

      {items.map((item) => {
        const isActive = activeId === item.id;
        const baseStyle = isActive
          ? POLYGON_STYLES.active
          : POLYGON_STYLES.inactive;

        return (
          <Polygon
            key={item.id}
            positions={item.polygon}
            pathOptions={baseStyle}
            eventHandlers={{
              click: (e) => {
                L.DomEvent.stopPropagation(e);
                onSelect(item);
              },
              mouseover: (e) => e.target.setStyle(POLYGON_STYLES.hover),
              mouseout: (e) => e.target.setStyle(baseStyle),
            }}
          />
        );
      })}
    </MapContainer>
  );
}
