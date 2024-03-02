import { Checkbox, Skeleton } from 'antd';
import orderApi from 'api/orderApi';
import discountLogo from 'assets/images/free_ship_logo.png';
import { LandingLayoutFooter } from 'components/Common';
import HeaderComponent from 'components/Common/HeaderComponent';
import { OrderGetInformation } from 'models/order/orderGetInformation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { useTranslation } from 'react-i18next';

interface CartPageProps {}

const CartPage: React.FunctionComponent<CartPageProps> = (props) => {
  const [orderData, setOrderData] = useState<OrderGetInformation>();
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<number>();
  const summaryRef = useRef<any>(null);
  const fixedSummaryRef = useRef<any>(null);
  const token = useRef(localStorage.getItem('token')).current || '';
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (location.search) {
      const orderId = queryParams.get('state');
      if (orderId) {
        setOrderId(Number(orderId));
      }
    }
  }, []);

  useEffect(() => {
    if (orderId !== null && orderId !== 0) {
      getOrderData(orderId);
      setIsCheckedAll(true);
    }
  }, [orderId]);

  const getOrderData = useCallback(async (orderid) => {
    const res = await orderApi.getOrder(token, orderid);
    if (res) {
      setOrderData(res);
    }
  }, []);

  const handleCheckAll = () => {
    setIsCheckedAll(!isCheckedAll);
  };

  const onScroll = () => {
    if (summaryRef.current) {
      const top = summaryRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (top < windowHeight - 110) {
        fixedSummaryRef.current.style.display = 'none';
      } else {
        fixedSummaryRef.current.style.display = 'block';
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <div className="cart">
        <HeaderComponent title={t('cart.cart')} />

        <div className="cart-main-container">
          <div className="cart-main__content">
            <div className="cart-notification">
              <img src={discountLogo} alt="free-ship-logo" />

              <span>{t('cart.notification')}</span>
            </div>

            <div className="cart__list-header">
              <Checkbox checked={isCheckedAll} onClick={handleCheckAll}>
                {t('cart.title1')}
              </Checkbox>

              <span>{t('cart.title2')}</span>
              <span>{t('cart.title3')}</span>
              <span>{t('cart.title4')}</span>
              <span>{t('cart.title5')}</span>
            </div>

            <div className="cart__list">
              {orderData ? (
                <CartItem isChecked={isCheckedAll} disableQuantity itemData={orderData} />
              ) : (
                <Skeleton active />
              )}
            </div>
          </div>

          {orderData ? (
            <CartSummary
              forwardedRef={summaryRef}
              setIsCheckedAll={setIsCheckedAll}
              isCheckedAll={isCheckedAll}
              orderData={orderData}
            />
          ) : (
            <Skeleton active />
          )}
        </div>

        {!orderId && orderData && (
          <CartSummary
            forwardedRef={fixedSummaryRef}
            isFixed={true}
            setIsCheckedAll={setIsCheckedAll}
            isCheckedAll={isCheckedAll}
            orderData={orderData}
          />
        )}
      </div>

      <LandingLayoutFooter />
    </>
  );
};

export default CartPage;
