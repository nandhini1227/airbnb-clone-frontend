import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ListingDashboardSlider = ({ children, settings = {} }) => {
  const sliderRef = useRef(null);
  const [isSliderMounted, setIsSliderMounted] = useState(false);
  let intervalId = useRef(null);

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

  const startContinuousSliding = () => {
    try {
      sliderRef.current.slickNext();
      intervalId.current = setInterval(() => {
        if (sliderRef.current) {
          sliderRef.current.slickNext();
        }
      }, 2000);
    } catch (error) {
      console.error('Error during slide transition:', error);
    }
  };

  const stopContinuousSliding = () => {
    clearInterval(intervalId.current);
  };

  useEffect(() => {
    setIsSliderMounted(true);
    return () => clearInterval(intervalId.current);
  }, []);

  const handleSliderClick = () => {
    stopContinuousSliding();
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

// Add prop type validation
ListingDashboardSlider.propTypes = {
  children: PropTypes.node.isRequired,
  settings: PropTypes.object,
};

export default ListingDashboardSlider;
