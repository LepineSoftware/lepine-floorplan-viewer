import React from "react";
import { MapContainer, ImageOverlay, useMap } from "react-leaflet";
import L from "leaflet";
import MapController from "./MapController";
import FloorPolygon from "./FloorPolygon";
import UnitPolygon from "./UnitPolygon";
import VirtualTourPolygon from "./VirtualTourPolygon";
import { MAP_VIEW_SETTINGS } from "../config/viewConfigs";
import "leaflet/dist/leaflet.css";

// Helper for the Recenter button in Floorplan mode
function RecenterControl({ bounds, padding }) {
  const map = useMap();
  return (
    <div
      className="leaflet-top leaflet-right"
      style={{ marginTop: "10px", marginRight: "10px" }}
    >
      <button
        onClick={() => map.fitBounds(bounds, { padding })}
        className="bg-white p-2 rounded shadow-md hover:bg-gray-100 flex items-center gap-2 text-sm font-bold border border-gray-200"
        style={{ pointerEvents: "auto" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        Recenter View
      </button>
    </div>
  );
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
  const viewSettings = MAP_VIEW_SETTINGS[mode];

  return (
    <div className="h-full w-full relative overflow-hidden">
      <MapContainer
        key={mode} // Forces fresh initialization when switching modes
        crs={L.CRS.Simple}
        className="h-full w-full"
        style={{ background: MAP_VIEW_SETTINGS.defaultBackground }}
        attributionControl={false}
        // Interaction settings pulled from config
        zoomControl={viewSettings.zoomControl}
        dragging={viewSettings.dragging}
        scrollWheelZoom={viewSettings.scrollWheelZoom}
        doubleClickZoom={viewSettings.doubleClickZoom}
        touchZoom={viewSettings.touchZoom}
      >
        <ImageOverlay url={config.url} bounds={bounds} />

        <MapController
          mode={mode}
          bounds={bounds}
          imageWidth={config.width}
          imageHeight={config.height}
        />

        {mode === "floorplan" && (
          <RecenterControl bounds={bounds} padding={viewSettings.padding} />
        )}

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
    </div>
  );
}
