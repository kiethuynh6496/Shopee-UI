import React from 'react';

interface PlusIconProps {}

const PlusIcon: React.FC<PlusIconProps> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 10 10">
      <path stroke="none" d="m10 4.5h-4.5v-4.5h-1v4.5h-4.5v1h4.5v4.5h1v-4.5h4.5z"></path>
    </svg>
  );
};

export { PlusIcon };
