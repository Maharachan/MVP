import React, { useState, useEffect, useCallback } from 'react';
import './Section2.css';

// Import local images
import img1 from '../assets/6.png';
import img2 from '../assets/7.png';
import img3 from '../assets/8.png';
import img4 from '../assets/9.png';
import img5 from '../assets/10.png';
import img6 from '../assets/11.png';
import img7 from '../assets/12.png';
import img8 from '../assets/13.png';
import img9 from '../assets/14.png';
import img10 from '../assets/15.png';
import img11 from '../assets/16.png';
import img12 from '../assets/17.png';

const Section2 = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];  // Array of images
  const [currentIndex, setCurrentIndex] = useState(0);

  // Memoize nextSlide to avoid unnecessary re-renders
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop back to the first image
  }, [images.length]); // Dependency on images.length to prevent stale closures

  // Memoize prevSlide to avoid unnecessary re-renders
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // Loop back to the last image
  }, [images.length]); // Dependency on images.length to prevent stale closures

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Auto-scroll every 3 seconds
    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, [nextSlide]); // Add nextSlide to the dependency array

  return (
    <section className="section2">
      <div className="carousel-container">
        <button className="carousel-btn prev" onClick={prevSlide}>
          &#10094;
        </button>

        <div className="carousel-images" style={{ transform: `translateX(-${currentIndex * 25}%)` }}>
          {images.concat(images).map((image, index) => ( // Duplicate the images to create the infinite loop effect
            <div className="carousel-image" key={index}>
              <img src={image} alt={`carousel-${index}`} />
            </div>
          ))}
        </div>

        <button className="carousel-btn next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default Section2;
