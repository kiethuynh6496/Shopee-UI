import * as React from 'react';
import SlideShow from './SlideShow';

interface BannerProps {
  [val: string]: any;
}

const Banner: React.FunctionComponent<BannerProps> = (props) => {
  return (
    <div className="banner">
      <div className="banner__slider">
        <SlideShow />
      </div>
      <div className="banner__container">
        <div className="banner-item">
          <img src={props.banner1} alt="" />
        </div>
        <div className="banner-item">
          <img src={props.banner2} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
