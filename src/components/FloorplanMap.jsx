import React, { useEffect } from "react";
import { MapContainer, ImageOverlay, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import FloorPolygon from "./FloorPolygon";
import UnitPolygon from "./UnitPolygon";
import VirtualTourPolygon from "./VirtualTourPolygon";
import { MAP_VIEW_SETTINGS } from "../config/viewConfigs";
import "leaflet/dist/leaflet.css";

function MapController({ bounds, imageWidth, imageHeight }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !bounds) return;

    const fitImage = () => {
      map.invalidateSize();
      const container = map.getContainer();
      const zoomW = Math.log2(container.offsetWidth / imageWidth);
      const zoomH = Math.log2(container.offsetHeight / imageHeight);
      const perfectZoom = Math.min(zoomW, zoomH);

      map.setMinZoom(perfectZoom);
      map.setMaxBounds(bounds);
      map.setView([imageHeight / 2, imageWidth / 2], perfectZoom, {
        animate: true,
        duration: MAP_VIEW_SETTINGS.animationDuration,
      });
    };

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
  vrTours = [],
  activeId,
  onSelect,
  onTourSelect,
}) {
  const bounds = [
    [0, 0],
    [config.height, config.width],
  ];

  return (
    <MapContainer
      crs={L.CRS.Simple}
      minZoom={-5}
      maxZoom={2}
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

      {mode === "building" &&
        items.map((floor) => (
          <FloorPolygon key={floor.id} floor={floor} onSelect={onSelect} />
        ))}

      {mode === "floorplan" && (
        <>
          {items.map((unit) => (
            <UnitPolygon
              key={unit.id}
              unit={unit}
              isActive={activeId === unit.id}
              onSelect={onSelect}
            />
          ))}
          {vrTours.map((tour) => (
            <VirtualTourPolygon
              key={tour.id}
              tour={tour}
              onSelect={onTourSelect}
            />
          ))}
        </>
      )}
    </MapContainer>
  );
}
