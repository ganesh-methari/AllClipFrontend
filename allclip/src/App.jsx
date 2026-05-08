import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./Home/Hero";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white">

        {/* ALWAYS VISIBLE */}
        <Navbar />

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Hero />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;