// src/components/BuildingView.jsx
import React from "react";
import { useBuilding } from "../context/BuildingContext";
import BuildingMap from "./BuildingMap";

export default function BuildingView() {
  const { data, selectFloor } = useBuilding();

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-8 left-8 z-[1000] bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-2xl max-w-md hidden md:block">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">{data.name}</h1>
        <p className="text-xs font-bold text-slate-400 uppercase mb-2">
          {data.address}
        </p>
        <p className="text-sm text-slate-600">
          Select a floor on the building to view available units and floorplans.
        </p>
      </div>

      <BuildingMap
        config={data.config}
        floors={data.config.floors}
        onSelect={(floor) => selectFloor(floor.id)}
      />
    </div>
  );
}
