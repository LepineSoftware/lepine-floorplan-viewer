// src/App.jsx
import React from "react";
import { useBuilding } from "./context/BuildingContext";
import BuildingView from "./components/BuildingView";
import FloorplanView from "./components/FloorplanView";

function App() {
  const { loading, activeFloor } = useBuilding();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center font-bold text-slate-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50">
      {activeFloor ? <FloorplanView /> : <BuildingView />}
    </div>
  );
}

export default App;
