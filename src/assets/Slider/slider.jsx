import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from '@mui/material';

const SliderComponent = ({ children }) => {
  const sliderRef = useRef(null);
  const [sliderHeight, setSliderHeight] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNext = () => {
    if (currentSlide < React.Children.count(children) - 1) {
      sliderRef.current.slickNext();
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPrev = () => {
    if (currentSlide > 0) {
      sliderRef.current.slickPrev();
      setCurrentSlide(currentSlide - 1);
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    draggable: false,
    swipe: false,
    initialSlide: currentSlide,
    slidesToScroll: 1,
    onReInit: () => {
      const tallestChildHeight = Math.max(
        ...Array.from(
          sliderRef.current.innerSlider.list.querySelectorAll('.slick-slide')
        ).map((slide) => slide.offsetHeight)
      );
      setSliderHeight(tallestChildHeight);
    },
  };

  const sliderContainerStyles = {
    backgroundColor: '#ffffff', 
    height: sliderHeight,
  };

  const renderChildrenWithProps = () => {
    return React.Children.map(children, (child, index) => (
      <div key={index}>{React.cloneElement(child, { goToNext })}</div>
    ));
  };

  const handleSliderClick = (event) => {
    if (event.target.tagName === 'BUTTON') return;
    stopContinuousSliding();
  };

  return (
    <>
      <Slider
        {...settings}
        ref={sliderRef}
        style={sliderContainerStyles}
        onClick={handleSliderClick}
      >
        {renderChildrenWithProps()}
      </Slider>
      <Button variant="contained" onClick={goToPrev} disabled={currentSlide === 0}>
        Previous
      </Button>
      <Button
        variant="contained"
        onClick={goToNext}
        disabled={currentSlide === React.Children.count(children) - 1}
      >
        Next
      </Button>
    </>
  );
};

export default SliderComponent;
