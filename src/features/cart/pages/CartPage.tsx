import { Checkbox, Skeleton } from 'antd';
import discountLogo from 'assets/images/free_ship_logo.png';
import { LandingLayoutFooter } from 'components/Common';
import HeaderComponent from 'components/Common/HeaderComponent';
import React, { useCallback, useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { useTranslation } from 'react-i18next';
import shoppingCartApi from 'api/shoppingCartApi';
import { getCookie } from 'utils';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setShoppingCart } from './shoppingCartSlice';

interface CartPageProps {}

const CartPage: React.FunctionComponent<CartPageProps> = (props) => {
  const dispatch = useAppDispatch();
  const { shoppingCart } = useAppSelector((state) => state.shoppingCart);
  const { t } = useTranslation();
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);

  const getProduct = useCallback(async () => {
    const res = await shoppingCartApi.getShoppingCart();
    if (res) {
      dispatch(setShoppingCart(res.data));
    }
  }, [dispatch]);

  useEffect(() => {
    const userId = getCookie('userId') ?? '';
    if (userId) {
      getProduct();
      setIsCheckedAll(true);
    }
  }, []);

  const handleCheckAll = () => {
    setIsCheckedAll(!isCheckedAll);
  };

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
              {shoppingCart?.shoppingCartItems ? (
                shoppingCart?.shoppingCartItems.map((e, i) => (
                  <CartItem isChecked={isCheckedAll} key={i} itemData={e} />
                ))
              ) : (
                <Skeleton active />
              )}
            </div>
          </div>

          {shoppingCart?.shoppingCartItems ? (
            <CartSummary
              setIsCheckedAll={setIsCheckedAll}
              isCheckedAll={isCheckedAll}
              cartData={shoppingCart}
            />
          ) : (
            <Skeleton active />
          )}
        </div>
      </div>

      <LandingLayoutFooter />
    </>
  );
};

export default CartPage;
