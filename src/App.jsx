import React, { useState } from "react";
import BuildingView from "./components/BuildingView";
import FloorplanView from "./components/FloorplanView";
import GalleryModal from "./components/GalleryModal";

function App() {
  const [view, setView] = useState("building");
  const [activeFloor, setActiveFloor] = useState(null);
  const [activeUnit, setActiveUnit] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleFloorSelect = (floor) => {
    setActiveFloor(floor);
    setView("floorplan");
    if (floor.units?.length > 0) {
      setActiveUnit(floor.units[0]);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50">
      {view === "building" ? (
        <BuildingView onFloorSelect={handleFloorSelect} />
      ) : (
        <FloorplanView
          activeFloor={activeFloor}
          activeUnit={activeUnit}
          onUnitSelect={setActiveUnit}
          onFloorChange={handleFloorSelect}
          onBack={() => setView("building")}
          onOpenGallery={() => setIsGalleryOpen(true)}
        />
      )}

      <GalleryModal
        isOpen={isGalleryOpen}
        images={activeUnit?.gallery}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}

export default App;
