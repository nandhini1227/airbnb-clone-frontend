import  { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CardSlider = ({ children, settings = {}, onSlideChange }) => {
  const sliderRef = useRef(null);
  const [isSliderMounted, setIsSliderMounted] = useState(false);
  let intervalId = null;

  // Merge default settings with custom settings
  const mergedSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    draggable: true,
    swipe: true,
    slidesToScroll: 1,
    ...settings,
  };

  // Function to start continuous sliding
  const startContinuousSliding = () => {
    sliderRef.current?.slickNext();
    intervalId = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 2000);
  };

  // Function to stop continuous sliding
  const stopContinuousSliding = () => {
    clearInterval(intervalId);
  };

  // Effect to set slider mounted state and clean up interval
  useEffect(() => {
    setIsSliderMounted(true);
    return () => clearInterval(intervalId);
  }, [intervalId]);

  // Handler for slider click event
  const handleSliderClick = () => {
    stopContinuousSliding();
    if (onSlideChange) onSlideChange('clicked');
  };

  return (
    <>
      {isSliderMounted && (
        <div
          onClick={handleSliderClick}
          onMouseEnter={startContinuousSliding}
          onMouseLeave={stopContinuousSliding}
          role="region"
          aria-labelledby="slider-label"
          tabIndex="0"
        >
          <Slider {...mergedSettings} ref={sliderRef}>
            {children}
          </Slider>
        </div>
      )}
    </>
  );
};

// PropTypes validation for props
CardSlider.propTypes = {
  children: PropTypes.node.isRequired,
  settings: PropTypes.object, 
  onSlideChange: PropTypes.func, 
};

export default CardSlider;
