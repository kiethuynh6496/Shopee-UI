import React from 'react';
import { Rate } from 'antd';
import { StarFilled } from '@ant-design/icons';

interface RateSummaryProps {
  rateNumber: number;
}

const RateSummary: React.FunctionComponent<RateSummaryProps> = ({ rateNumber }) => {
  return (
    <div className="rate-container">
      <div className="rate__star">
        <span className="rate__amount">{rateNumber}</span>
        <Rate allowHalf disabled value={rateNumber} character={<StarFilled />} />
      </div>
    </div>
  );
};

export default RateSummary;
