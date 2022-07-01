import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";


//Standard React workflow 
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
