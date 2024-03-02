import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductDetailPage from '../pages/ProductDetailPage';
import ProductPage from '../pages/ProductPage';

interface ProductLayoutProps {}

const ProductLayout: React.FunctionComponent<ProductLayoutProps> = (props) => {
  return (
    <Routes>
      <Route path="" element={<ProductPage />} />
      <Route path=":id" element={<ProductDetailPage />} />
    </Routes>
  );
};

export default ProductLayout;
