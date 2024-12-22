import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/images/2.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarBackground, setNavbarBackground] = useState(false);

  // Toggle the menu on mobile view
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close the menu when a link is clicked
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarBackground(true); // Add background after scrolling 50px
      } else {
        setNavbarBackground(false); // Remove background at the top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${navbarBackground ? "scrolled" : ""}`}>
      {/* Logo linked to home */}
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>

      {/* Hamburger button */}
      <button className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Navigation links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={closeMenu}>Home</Link>
        </li>
        <li>
          <a href="#services" onClick={closeMenu}>Services</a>
        </li>
        <li>
          <a href="#contact" onClick={closeMenu}>Contact Us</a>
        </li>
        <li>
          <Link to="/admin" onClick={closeMenu}>Admin</Link>
        </li>
        <li>
          <Link to="/appointment" className="appointment-btn" onClick={closeMenu}>
            Book An Appointment
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
