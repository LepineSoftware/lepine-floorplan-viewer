// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BuildingProvider } from "./context/BuildingContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BuildingProvider>
      <App />
    </BuildingProvider>
  </StrictMode>,
);
