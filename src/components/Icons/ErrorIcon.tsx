import React from 'react';

interface ErrorIconProps {
  [val: string]: any;
}

const ErrorIcon: React.FunctionComponent<ErrorIconProps> = (props) => {
  return (
    <svg {...props} viewBox="0 0 16 16" className="fJb11i">
      <path
        fill="none"
        stroke="#FF424F"
        d="M8 15A7 7 0 108 1a7 7 0 000 14z"
        clipRule="evenodd"
      ></path>
      <rect
        stroke="none"
        width="7"
        height="1.5"
        x="6.061"
        y="5"
        fill="#FF424F"
        rx=".75"
        transform="rotate(45 6.06 5)"
      ></rect>
      <rect
        stroke="none"
        width="7"
        height="1.5"
        fill="#FF424F"
        rx=".75"
        transform="scale(-1 1) rotate(45 -11.01 -9.51)"
      ></rect>
    </svg>
  );
};

export { ErrorIcon };
