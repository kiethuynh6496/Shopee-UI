// Carousel.tsx

import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import slide1 from 'assets/images/banner_slider1.png';
import slide2 from 'assets/images/banner_slider2.png';
import slide3 from 'assets/images/banner_slider3.png';
import slide4 from 'assets/images/banner_slider4.png';
import slide5 from 'assets/images/banner_slider5.png';
import CustomNextArrow from './CustomNextArrow';
import CustomPrevArrow from './CustomPrevArrow';

interface SlideShowProps {}

const arrSlide = [slide1, slide2, slide3, slide4, slide5];

const SlideShow: React.FC<SlideShowProps> = (props) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    autoplay: true,
    autoplaySpeed: 6000,
    dots: true,
  };

  return (
    <div className="slide-container">
      <Slider {...settings}>
        {arrSlide.map((val, index) => (
          <div key={index} className="slide__item">
            <img src={val} alt={`slide`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlideShow;
