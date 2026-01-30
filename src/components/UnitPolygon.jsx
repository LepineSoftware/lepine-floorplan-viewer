import React, { memo } from "react";
import { Polygon, Tooltip } from "react-leaflet";
import L from "leaflet";
import { POLYGON_STYLES } from "../config/mapStyles";

const UnitPolygon = memo(({ unit, isActive, onSelect }) => {
  const currentStyle = isActive
    ? POLYGON_STYLES.active
    : POLYGON_STYLES.inactive;

  return (
    <Polygon
      positions={unit.polygon}
      pathOptions={currentStyle}
      eventHandlers={{
        click: (e) => {
          L.DomEvent.stopPropagation(e);
          onSelect(unit);
        },
        mouseover: (e) => e.target.setStyle(POLYGON_STYLES.hover),
        mouseout: (e) => e.target.setStyle(currentStyle),
      }}
    >
      <Tooltip permanent direction="center" className="polygon-label">
        {unit.title}
      </Tooltip>
    </Polygon>
  );
});

export default UnitPolygon;
