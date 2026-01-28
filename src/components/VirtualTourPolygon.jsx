import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { POLYGON_STYLES } from "../config/mapStyles";

// Eyeball SVG Icon Template
const eyeballIcon = L.divIcon({
  html: `
    <div style="
      background-color: ${POLYGON_STYLES.virtualTour.fillColor};
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    </div>
  `,
  className: "virtual-tour-marker",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

export default function VirtualTourPolygon({ tour, onSelect }) {
  return (
    <Marker
      position={tour.position}
      icon={eyeballIcon}
      eventHandlers={{
        click: (e) => {
          L.DomEvent.stopPropagation(e);
          if (typeof onSelect === "function") {
            onSelect(tour);
          }
        },
      }}
    />
  );
}
