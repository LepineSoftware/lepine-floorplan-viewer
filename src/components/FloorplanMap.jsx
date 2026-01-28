import React, { useEffect, useState } from "react";
import {
  MapContainer,
  ImageOverlay,
  Polygon,
  ZoomControl,
  useMap,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { POLYGON_STYLES } from "../config/mapStyles";
import { MAP_VIEW_SETTINGS } from "../config/viewConfigs";
import "leaflet/dist/leaflet.css";

function MapController({ bounds, imageWidth, imageHeight }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !bounds) return;

    const fitImage = () => {
      map.invalidateSize();
      const container = map.getContainer();

      // Calculate the zoom level required to fit the entire image in the container
      const zoomW = Math.log2(container.offsetWidth / imageWidth);
      const zoomH = Math.log2(container.offsetHeight / imageHeight);
      const perfectZoom = Math.min(zoomW, zoomH);

      // Dynamically set minZoom to prevent zooming out further than the initial "fit"
      map.setMinZoom(perfectZoom);

      // Set the maxBounds to the asset size to restrict panning
      map.setMaxBounds(bounds);

      map.setView([imageHeight / 2, imageWidth / 2], perfectZoom, {
        animate: true,
        duration: MAP_VIEW_SETTINGS.animationDuration,
      });
    };

    // Geoman Debugging Logic (preserved from original)
    if (MAP_VIEW_SETTINGS.debug) {
      map.pm.addControls({
        position: "topright",
        drawMarker: false,
        drawCircle: false,
        drawPolyline: false,
        drawRectangle: true,
        drawPolygon: true,
        editMode: true,
        dragMode: true,
        removalMode: true,
      });

      const logPolygon = (e) => {
        const layer = e.layer || e.target;
        if (layer instanceof L.Polygon) {
          const latlngs = layer.getLatLngs()[0];
          const coords = latlngs.map(
            (ll) => `[${Math.round(ll.lat)}, ${Math.round(ll.lng)}]`,
          );
          console.log("Updated Polygon Coordinates:", coords);
        }
      };

      map.on("pm:create", (e) => {
        logPolygon(e);
        e.layer.on("pm:edit", logPolygon);
        e.layer.on("pm:dragend", logPolygon);
      });
    }

    fitImage();
    window.addEventListener("resize", fitImage);
    return () => window.removeEventListener("resize", fitImage);
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
      // Start with a generic minZoom; MapController will override this dynamically
      minZoom={-5}
      maxZoom={2}
      // Strict snapping to bounds
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
      attributionControl={false}
      zoomControl={false}
      className="h-full w-full"
      style={{ background: MAP_VIEW_SETTINGS.defaultBackground }}
    >
      <ZoomControl position="topleft" />
      <ImageOverlay url={config.url} bounds={bounds} />

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
          >
            <Tooltip permanent direction="center" className="polygon-label">
              {item.name}
            </Tooltip>
          </Polygon>
        );
      })}
    </MapContainer>
  );
}
