import { InputNumber } from 'antd';
import React, { useState } from 'react';

interface CustomInputNumberProps {
  value: number;
  onChange?: (text: string, value: number) => void;
}

const CustomInputNumber: React.FunctionComponent<CustomInputNumberProps> = ({
  value,
  onChange,
}) => {
  const handleIncrease = () => {
    if (onChange) {
      onChange('+', 1);
    }
  };

  const handleDecrease = () => {
    if (onChange) {
      onChange('-', 1);
    }
  };

  const handleOnchange = (newValue: number | null | undefined) => {
    if (newValue !== null) {
      if (typeof newValue === 'number' && onChange) {
        onChange('*', newValue);
      }
    }
  };

  return (
    <div className="custom-input-number">
      {
        <button className="custom-input-number-button" onClick={handleDecrease}>
          <svg
            enableBackground="new 0 0 10 10"
            viewBox="0 0 10 10"
            x="0"
            y="0"
            className="shopee-svg-icon"
          >
            <polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon>
          </svg>
        </button>
      }

      <InputNumber min={1} max={9999} defaultValue={1} value={value} onChange={handleOnchange} />

      {
        <button className="custom-input-number-button" onClick={handleIncrease}>
          <svg
            enableBackground="new 0 0 10 10"
            viewBox="0 0 10 10"
            x="0"
            y="0"
            className="shopee-svg-icon icon-plus-sign"
          >
            <polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon>
          </svg>
        </button>
      }
    </div>
  );
};

export default CustomInputNumber;
