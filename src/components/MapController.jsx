import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { MAP_VIEW_SETTINGS } from "../config/viewConfigs";

/**
 * MapController component handles the logic for fitting the map image
 * to the container based on different fit types (cover vs. contain).
 */
export default function MapController({
  mode,
  bounds,
  imageWidth,
  imageHeight,
}) {
  const map = useMap();
  const config = MAP_VIEW_SETTINGS[mode];

  useEffect(() => {
    if (!map || !config) return;

    const handleSizing = () => {
      // Ensure the map container size is updated before calculating zooms
      map.invalidateSize();
      const container = map.getContainer();

      if (config.fitType === "cover") {
        /**
         * BUILDING VIEW: Static Cover Logic
         * Calculates the zoom level required to fill the container,
         * ensuring the image overflows rather than showing white space.
         */
        const zoomW = Math.log2(container.offsetWidth / imageWidth);
        const zoomH = Math.log2(container.offsetHeight / imageHeight);
        const coverZoom = Math.max(zoomW, zoomH);

        // Center the view and lock zoom levels to keep it static
        map.setView([imageHeight / 2, imageWidth / 2], coverZoom, {
          animate: true,
        });
        map.setMinZoom(coverZoom + config.minZoomOffset);
        map.setMaxZoom(coverZoom + config.maxZoomOffset);
      } else {
        /**
         * FLOORPLAN VIEW: Contain Logic
         * Uses fitBounds to ensure the entire SVG/Floorplan is visible
         * within the container on all screen sizes.
         */
        map.fitBounds(bounds, {
          padding: config.padding,
          animate: true,
          duration: MAP_VIEW_SETTINGS.animationDuration,
        });

        // Set limits based on the current calculated fit bounds
        const minZoom = map.getBoundsZoom(bounds);
        map.setMinZoom(minZoom + config.minZoomOffset);
        map.setMaxZoom(minZoom + config.maxZoomOffset);
      }
    };

    // Initialize and attach listener for window resizing
    handleSizing();
    window.addEventListener("resize", handleSizing);

    return () => window.removeEventListener("resize", handleSizing);
  }, [map, mode, bounds, imageWidth, imageHeight, config]);

  return null;
}
