import React from "react";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        
          <img
          src={logo}
          alt="USA Auto Zone"
          className="logo"
        />
        
      </div>

      {/* Navigation Links */}
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#cars">Cars</a></li>
        <li><a href="#admin">Admin</a></li>
        <li><a href="#contact">Contact Us</a></li>
      </ul>

      {/* Search Button */}
      <button className="navbar-search-btn">
        <FaSearch className="search-icon" /> Search
      </button>
    </nav>
  );
};
// JavaScript to add 'scrolled' class on scroll
window.onscroll = function() {
  var navbar = document.querySelector('.navbar');
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};


export default Navbar;
