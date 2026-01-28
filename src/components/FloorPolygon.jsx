import React from "react";
import { Polygon, Tooltip } from "react-leaflet";
import L from "leaflet";
import { POLYGON_STYLES } from "../config/mapStyles";

export default function FloorPolygon({ floor, onSelect }) {
  return (
    <Polygon
      positions={floor.polygon}
      pathOptions={POLYGON_STYLES.inactive}
      eventHandlers={{
        click: (e) => {
          L.DomEvent.stopPropagation(e);
          onSelect(floor);
        },
        mouseover: (e) => e.target.setStyle(POLYGON_STYLES.hover),
        mouseout: (e) => e.target.setStyle(POLYGON_STYLES.inactive),
      }}
    >
      <Tooltip permanent direction="center" className="polygon-label">
        {floor.name}
      </Tooltip>
    </Polygon>
  );
}
