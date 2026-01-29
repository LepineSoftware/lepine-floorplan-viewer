// src/context/BuildingContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

const BuildingContext = createContext();

export function BuildingProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFloorId, setActiveFloorId] = useState(null);
  const [activeUnitId, setActiveUnitId] = useState(null);

  // Load data once on mount
  useEffect(() => {
    fetch("/data/building.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load building data");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Derived state for easy access
  const activeFloor = useMemo(() => {
    if (!data || !activeFloorId) return null;
    return data.config.floors.find((f) => f.id === activeFloorId);
  }, [data, activeFloorId]);

  const activeUnit = useMemo(() => {
    if (!activeFloor) return null;
    // If no unit is selected, default to the first one in the floor
    if (!activeUnitId) return activeFloor.units[0];
    return (
      activeFloor.units.find((u) => u.id === activeUnitId) ||
      activeFloor.units[0]
    );
  }, [activeFloor, activeUnitId]);

  // Actions
  const selectFloor = (id) => {
    setActiveFloorId(id);
    setActiveUnitId(null); // Reset unit when floor changes
  };

  const selectUnit = (id) => {
    setActiveUnitId(id);
  };

  const goBackToBuilding = () => {
    setActiveFloorId(null);
    setActiveUnitId(null);
  };

  const value = {
    data,
    loading,
    activeFloor,
    activeUnit,
    selectFloor,
    selectUnit,
    goBackToBuilding,
    floors: data?.config?.floors || [],
  };

  return (
    <BuildingContext.Provider value={value}>
      {children}
    </BuildingContext.Provider>
  );
}

export const useBuilding = () => {
  const context = useContext(BuildingContext);
  if (!context)
    throw new Error("useBuilding must be used within a BuildingProvider");
  return context;
};
