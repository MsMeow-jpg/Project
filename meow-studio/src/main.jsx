
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

function TestPage() {
  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>MEOW STUDIO</h1>
      <p>React Router работает!</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
