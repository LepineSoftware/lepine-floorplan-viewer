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
      map.invalidateSize({ animate: false });
      const container = map.getContainer();

      if (config.fitType === "cover") {
        /**
         * BUILDING VIEW: Static Cover Logic
         */
        const zoomW = Math.log2(container.offsetWidth / imageWidth);
        const zoomH = Math.log2(container.offsetHeight / imageHeight);
        const coverZoom = Math.max(zoomW, zoomH);

        map.setView([imageHeight / 2, imageWidth / 2], coverZoom, {
          animate: false,
        });
        map.setMinZoom(coverZoom + config.minZoomOffset);
        map.setMaxZoom(coverZoom + config.maxZoomOffset);
      } else {
        /**
         * FLOORPLAN VIEW: Contain Logic
         */
        map.fitBounds(bounds, {
          padding: config.padding,
          animate: false,
          duration: 0,
        });

        const minZoom = map.getBoundsZoom(bounds);
        map.setMinZoom(minZoom + config.minZoomOffset);
        map.setMaxZoom(minZoom + config.maxZoomOffset);
      }
    };

    // Initial sizing attempt
    handleSizing();

    // Production/Docker Fix: Re-run after a short delay to ensure
    // the container has reached its final CSS dimensions.
    const timer = setTimeout(() => {
      handleSizing();
    }, 100);

    window.addEventListener("resize", handleSizing);

    return () => {
      window.removeEventListener("resize", handleSizing);
      clearTimeout(timer);
    };
  }, [map, mode, bounds, imageWidth, imageHeight, config]);

  return null;
}