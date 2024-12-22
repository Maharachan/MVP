import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar"; // Import the scrollbar styles
import "swiper/css/autoplay"; // Import the autoplay styles
import "./Section5.css";

// Import images
import image1 from "../assets/images/12.png";
import image2 from "../assets/images/13.png";
import image3 from "../assets/images/14.png";
import image4 from "../assets/images/15.png";
import image5 from "../assets/images/16.png";

const Section5 = () => {
  const images = [image1, image2, image3, image4, image5];

  return (
    <div className="section5-container">
      <h2 className="section5-title">IMAGE CAROUSEL</h2>
      <Swiper
        slidesPerView={1} // Default to 1 image on mobile devices
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 3000, // Time in ms between slides (3 seconds in this case)
          disableOnInteraction: false, // Keep autoplay even after user interaction
        }}
        scrollbar={{ draggable: true }} // Enable draggable scrollbar
        className="section5-carousel"
        breakpoints={{
          1024: {
            slidesPerView: 4, // For screens larger than 1024px, show 4 images
          },
          768: {
            slidesPerView: 1, // For mobile devices, show only 1 image at a time
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="carousel-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Section5;
