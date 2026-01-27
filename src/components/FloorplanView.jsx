import React from "react";
import FloorplanMap from "./FloorplanMap";
import Sidebar from "./Sidebar";
import { BUILDING_CONFIG } from "../data/floorplans";

export default function FloorplanView({
  activeFloor,
  activeUnit,
  onUnitSelect,
  onFloorChange,
  onBack,
  onOpenGallery,
}) {
  const currentIndex = activeFloor.units.findIndex(
    (u) => u.id === activeUnit?.id,
  );

  const navigateUnit = (dir) => {
    const units = activeFloor.units;
    let nextIndex = currentIndex + dir;
    if (nextIndex >= units.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = units.length - 1;
    onUnitSelect(units[nextIndex]);
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <div className="flex-1 relative z-0">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 z-[1000] bg-white px-4 py-2 rounded-lg shadow-md hover:bg-slate-100 font-bold text-slate-700 transition-colors border border-slate-200"
        >
          ← Back
        </button>

        {/* FloorSwitcher Overlay */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] flex bg-white/90 backdrop-blur-sm p-1 rounded-full shadow-xl border border-slate-200">
          {BUILDING_CONFIG.floors.map((floor) => (
            <button
              key={floor.id}
              onClick={() => onFloorChange(floor)}
              className={`px-6 py-2 rounded-full transition-all duration-200 text-sm font-semibold ${
                activeFloor?.id === floor.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {floor.name}
            </button>
          ))}
        </div>

        <FloorplanMap
          mode="floorplan"
          config={activeFloor.config}
          items={activeFloor.units}
          activeId={activeUnit?.id}
          onSelect={onUnitSelect}
        />
      </div>

      <Sidebar
        unit={activeUnit}
        onNext={() => navigateUnit(1)}
        onPrev={() => navigateUnit(-1)}
        currentIndex={currentIndex}
        total={activeFloor.units.length}
        onOpenGallery={onOpenGallery}
      />
    </div>
  );
}
