import React from 'react';

interface AvatarIconProps {
  [val: string]: any;
}

const AvatarIcon: React.FunctionComponent<AvatarIconProps> = (props) => {
  const svgStyle: React.CSSProperties = {
    stroke: '#c6c6c6',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: '2rem',
    WebkitFontSmoothing: 'antialiased',
  };
  return (
    <svg
      enableBackground="new 0 0 15 15"
      viewBox="0 0 15 15"
      x="0"
      y="0"
      className="shopee-svg-icon icon-headshot"
      {...props}
      style={svgStyle}
    >
      <g>
        <circle cx="7.5" cy="4.5" fill="none" r="3.8" strokeMiterlimit="10"></circle>
        <path
          d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6"
          fill="none"
          strokeLinecap="round"
          strokeMiterlimit="10"
        ></path>
      </g>
    </svg>
  );
};

export { AvatarIcon };
