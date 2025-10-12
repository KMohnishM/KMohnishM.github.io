import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeAnalytics } from "./firebase";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Performance measurement
reportWebVitals();

// Initialize Firebase Analytics (non-blocking)
(async () => {
  await initializeAnalytics();
})();
