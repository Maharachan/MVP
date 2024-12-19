import React from "react";
import Navbar from "./components/Navbar"; // Import the Navbar component
import HeroSection from "./components/Hero"; // Import the HeroSection component
import Section1 from "./components/Section1";
import "./App.css";
import Section2 from "./components/Section2";

function App() {
  return (
    <div className="App">
      <Navbar /> {/* Render Navbar at the top */}
      <HeroSection /> {/* Render HeroSection below the Navbar */}
      <Section1/>
      <Section2/>
    </div>
  );
}

export default App;
