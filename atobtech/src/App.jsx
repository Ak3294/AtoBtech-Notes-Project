import React from "react";

import Home from "./components/Home";
import About from "./components/About";
import Docs from "./components/Docs";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
            <Route path="docs" element={<Docs />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
