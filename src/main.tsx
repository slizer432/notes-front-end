import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Sidebar from "./components/Sidebar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <App />
    </div>
  </StrictMode>,
);
