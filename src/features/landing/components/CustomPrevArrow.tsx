// CustomPrevArrow.tsx
import React, { PropsWithChildren } from 'react';

interface CustomPrevArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const CustomPrevArrow: React.FC<CustomPrevArrowProps> = ({
  className,
  style,
  onClick,
}: PropsWithChildren<CustomPrevArrowProps>) => {
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <svg enableBackground="new 0 0 13 20" viewBox="0 0 13 20" role="img">
        <path
          fill="white"
          stroke="none"
          d="m4.2 10l7.9-7.9-2.1-2.2-9 9-1.1 1.1 1.1 1 9 9 2.1-2.1z"
        ></path>
      </svg>
    </div>
  );
};

export default CustomPrevArrow;
