import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { MAP_VIEW_SETTINGS } from "../config/viewConfigs";

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
      map.invalidateSize();
      const container = map.getContainer();

      if (config.fitType === "cover") {
        // Calculate zoom required to fill container (object-fit: cover)
        const zoomW = Math.log2(container.offsetWidth / imageWidth);
        const zoomH = Math.log2(container.offsetHeight / imageHeight);
        const coverZoom = Math.max(zoomW, zoomH);

        map.setView([imageHeight / 2, imageWidth / 2], coverZoom, {
          animate: false,
        });

        // Lock zoom to the cover level
        map.setMinZoom(coverZoom + config.minZoomOffset);
        map.setMaxZoom(coverZoom + config.maxZoomOffset);
      } else {
        // Calculate zoom required to show full image (object-fit: contain)
        map.fitBounds(bounds, {
          padding: config.padding,
          animate: true,
          duration: MAP_VIEW_SETTINGS.animationDuration,
        });

        const minZoom = map.getBoundsZoom(bounds);
        map.setMinZoom(minZoom + config.minZoomOffset);
        map.setMaxZoom(minZoom + config.maxZoomOffset);
      }
    };

    handleSizing();
    window.addEventListener("resize", handleSizing);
    return () => window.removeEventListener("resize", handleSizing);
  }, [map, mode, bounds, imageWidth, imageHeight, config]);

  return null;
}
