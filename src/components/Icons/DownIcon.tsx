import * as React from 'react';

interface DownIconProps {
  [val: string]: any;
}

const DownIcon: React.FunctionComponent<DownIconProps> = (props) => {
  return (
    <svg {...props} viewBox="0 0 12 12" fill="none" width="12" height="12" color="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 8.146L11.146 3l.707.707-5.146 5.147a1 1 0 01-1.414 0L.146 3.707.854 3 6 8.146z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export { DownIcon };
