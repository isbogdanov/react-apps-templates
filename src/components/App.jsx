import "../scss/styles.scss";
import * as bootstrap from "bootstrap";

import { createRoot } from "react-dom/client";
import { useState } from "react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./Index";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
