// CustomNextArrow.tsx
import React, { PropsWithChildren } from 'react';

interface CustomNextArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const CustomNextArrow: React.FC<CustomNextArrowProps> = ({
  className,
  style,
  onClick,
}: PropsWithChildren<CustomNextArrowProps>) => {
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <svg enableBackground="new 0 0 13 21" viewBox="0 0 13 21" role="img">
        <path
          fill="white"
          stroke="none"
          d="m11.1 9.9l-9-9-2.2 2.2 8 7.9-8 7.9 2.2 2.1 9-9 1-1z"
        ></path>
      </svg>
    </div>
  );
};

export default CustomNextArrow;
