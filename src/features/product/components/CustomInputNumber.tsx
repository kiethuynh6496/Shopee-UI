import { InputNumber } from 'antd';
import React from 'react';

interface CustomInputNumberProps {
  value: number;
  onChange?: (value: number) => void;
  isDisable?: boolean;
}

const CustomInputNumber: React.FunctionComponent<CustomInputNumberProps> = ({
  value,
  onChange,
  isDisable,
}) => {
  const handleIncrease = () => {
    if (onChange) {
      onChange((value || 0) + 1);
    }
  };

  const handleDecrease = () => {
    if (onChange) {
      onChange((value || 0) - 1);
    }
  };

  return (
    <div className="custom-input-number">
      {!isDisable && (
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
      )}

      <InputNumber
        disabled={isDisable}
        min={1}
        max={9999}
        defaultValue={1}
        value={value}
        onChange={onChange}
      />

      {!isDisable && (
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
      )}
    </div>
  );
};

export default CustomInputNumber;
