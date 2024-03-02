import { LeftOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbProps {}

const Breadcrumb: React.FunctionComponent<BreadcrumbProps> = (props) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };
  return (
    <div className="breadcrumb" onClick={handleBack}>
      <LeftOutlined />
      <span>Back</span>
    </div>
  );
};

export { Breadcrumb };
