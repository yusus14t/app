import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import slide1 from '../assets.app/images/1920x1280-1.jpg'
import slide2 from '../assets.app/images/1920x1280-2.jpg'
import slide3 from '../assets.app/images/1920x1280-3.jpg'




function Slider() {
    return (
      
        <Carousel
        
          dynamicHeight={100}
          autoPlay={true}
          showThumbs={false}
          infiniteLoop={true}
          showStatus={false}
          onChange={true}
          interval={50}
        >
          <div className="slide">
            <img src={slide1} alt="slide-1" />
          </div>
          <div className="slide">
            <img src={slide2} alt="slide-2" />
          </div>
          <div className="slide">
            <img src={slide3} alt="slide-3" />
          </div>
        </Carousel>
    );
}

export default Slider;