import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CvProvider } from "./context/CvContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CvProvider>
      <App />
    </CvProvider>
  </StrictMode>
);
