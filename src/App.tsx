import { ChatIcon } from 'components/Icons';
import { LandingLayout } from 'components/Layout';
import AuthPage from 'features/auth/pages/AuthPage';
import CartPage from 'features/cart/pages/CartPage';
import CheckoutPage from 'features/checkout/pages/CheckoutPage';
import LandingPage from 'features/landing/pages/LandingPage';
import ProductLayout from 'features/product/layout/ProductLayout';
import NotFoundPage from 'features/static/pages/NotFoundPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = (props) => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<LandingLayout />}>
          <Route path="" element={<LandingPage />} />
          <Route path="product/*" element={<ProductLayout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="login" element={<AuthPage isLogin />} />
        <Route path="register" element={<AuthPage />} />

        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <div className="support-chat">
        <ChatIcon fill="#ee4d2d" />
        <span>Chat</span>
      </div>
    </>
  );
};

export default App;
