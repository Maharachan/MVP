import React from "react";
import "./Hero.css"; // Import the CSS file for styling

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="search-container">
        <div className="filter-group">
          <select className="filter">
            <option>Brand</option>
            <option>Brand</option>
            <option>Brand</option>
            <option>Brand</option>
            <option>Brand</option>
            {/* Add more options as needed */}
          </select>
          <select className="filter">
            <option>Model</option>
            <option>Brand</option>
            <option>Brand</option>
            <option>Brand</option>
            <option>Brand</option>
            <option>Brand</option>
            {/* Add more options as needed */}
          </select>
          <select className="filter">
            <option>Price</option>
            <option>Brand</option>
            <option>Brand</option>
            <option>Brand</option>
            <option>Brand</option>
            <option>Brand</option>
            {/* Add more options as needed */}
          </select>
          <button className="search-button">
            <i className="fa fa-search"></i> {/* Font Awesome search icon */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
