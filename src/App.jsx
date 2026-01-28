import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import GenderSelection from "./pages/GenderSelection";
import PersonalitySelection from "./pages/PersonalitySelection";
import Chat from "./pages/Chat";
import About from "./pages/About";
import Safety from "./pages/Safety";
import Community from "./pages/Community";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/gender-selection" element={<GenderSelection />} />
        <Route path="/personality-selection" element={<PersonalitySelection />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/about" element={<About />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/community" element={<Community />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
