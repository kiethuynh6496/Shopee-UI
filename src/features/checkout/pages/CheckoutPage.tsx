import { Button, Skeleton } from 'antd';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { LandingLayoutFooter } from 'components/Common';
import HeaderComponent from 'components/Common/HeaderComponent';
import { CoinIcon, LocationMarkerIcon, VoucherIcon } from 'components/Icons';
import { AddressResponseInfo } from 'models';
import React, { useCallback, useEffect, useState } from 'react';
import { checkoutActions, selectIsOpenAddressModal } from '../checkoutSlice';
import AddressModal from '../components/AddressModal';
import ConfirmModal from '../components/ConfirmModal';
import { useTranslation } from 'react-i18next';
import shoppingCartApi from 'api/shoppingCartApi';
import { setShoppingCart } from 'features/cart/pages/shoppingCartSlice';
import { CheckoutItem } from './CheckoutItem';
import { ShoppingCartItems } from 'models/shoppingCart/shoppingCartInfo';
import { addressApi } from 'api/addressApi';
import { useSelector } from 'react-redux';
import { price } from 'utils/commonUtil';
import MoMo from 'assets/images/MoMo.png';

interface CheckoutPageProps {}

const CheckoutPage: React.FunctionComponent<CheckoutPageProps> = (props) => {
  const [userAddress, setUserAddress] = useState<AddressResponseInfo>();
  const [total, setTotal] = useState(0);
  const { shoppingCart } = useAppSelector((state) => state.shoppingCart);
  const isOpenAddressModal = useSelector(selectIsOpenAddressModal);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChangeAddress = () => {
    dispatch(checkoutActions.setIsOpenAddressModal(true));
  };

  const getUserAddress = useCallback(async () => {
    const res = await addressApi.getAddress().catch(() => {});
    if (res) {
      const getDefault = res.data.filter((a) => a.isDefault === true)[0] ?? '';
      setUserAddress(getDefault);
    }
  }, []);

  useEffect(() => {
    getUserAddress();
  }, [isOpenAddressModal]);

  useEffect(() => {
    getCartData();
  }, []);

  const getCartData = useCallback(async () => {
    const res = await shoppingCartApi.getShoppingCart();
    if (res.statusCode === 200) {
      dispatch(setShoppingCart(res.data));
      calculateTotal(res.data.shoppingCartItems);
    }
  }, []);

  const calculateTotal = (cartData: ShoppingCartItems[]) => {
    let Sum = 0;
    cartData.forEach((data) => {
      Sum += data.item.price * data.quantity;
    });
    setTotal(Sum);
  };

  const handleCheckout = () => {
    dispatch(checkoutActions.setIsConfirmModal(true));
  };

  return (
    <>
      <section className="checkout">
        <HeaderComponent title={t('checkout.header')} disableSearch />
        <>
          <div className="checkout__dash-line" />
          <div className="checkout__delivery">
            <p className="checkout__title">
              <LocationMarkerIcon />
              {t('checkout.address')}
            </p>

            <div className="checkout__contact-container">
              {userAddress && (
                <>
                  <div className="checkout__contact">
                    <p className="checkout__contact-name">
                      {userAddress ? userAddress.nickName : ''}{' '}
                      {userAddress ? userAddress.phone : ''}
                    </p>
                  </div>

                  <p className="checkout__address">
                    {userAddress ? (
                      <>
                        {userAddress.addressName}
                        <span>{t('checkout.default')}</span>
                      </>
                    ) : (
                      ''
                    )}
                  </p>
                </>
              )}

              <span className="checkout__change-btn" onClick={handleChangeAddress}>
                {userAddress !== undefined && userAddress != null
                  ? t('checkout.change')
                  : t('checkout.add_new')}
              </span>
            </div>
          </div>

          <div className="checkout__products">
            <div className="checkout__products-header">
              <span className="checkout__products-title">{t('checkout.title1')}</span>
              <span className="checkout__column-name" />
              <span className="checkout__column-name">{t('checkout.title2')}</span>
              <span className="checkout__column-name">{t('checkout.title3')}</span>
              <span className="checkout__column-name">{t('checkout.title4')}</span>
            </div>

            <div className="checkout__product">
              {shoppingCart != null ? (
                shoppingCart.shoppingCartItems.map((e, i) => <CheckoutItem key={i} info={e} />)
              ) : (
                <Skeleton active />
              )}

              <div className="checkout__other-option">
                <div className="checkout__option-container">
                  <span className="checkout__option-label">{t('checkout.e_bill')}</span>
                  <span className="checkout__option-btn">{t('checkout.require')}</span>
                </div>

                <div className="checkout__option-container">
                  <span className="checkout__option-label">
                    <VoucherIcon /> {t('checkout.voucher')}
                  </span>
                  <span className="checkout__option-btn">{t('checkout.select_voucher')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="checkout__summary">
            <div className="checkout__payment-container">
              <div className="checkout__payment-header">
                <h3 className="checkout__payment-title">{t('checkout.payment_title')}</h3>
              </div>

              <div className="checkout__payment-option">
                <p className="checkout__payment-label">{t('checkout.payment_label')}</p>
                <button className="checkout__payment-select-btn">{t('checkout.change')}</button>
              </div>
            </div>

            <div className="checkout__total-container">
              <div className="checkout__momo">
                <img src={MoMo} alt="" />
              </div>
              <div className="checkout__total">
                <p className="checkout__total-label">{t('checkout.total_price')}:</p>

                <p className="checkout__total-price">
                  <CoinIcon /> {shoppingCart != null ? price(total) : 0}
                </p>
              </div>
            </div>

            <div className="checkout__order-btn-wrapper">
              <p className="checkout__btn-description">
                {t('checkout.summary_label')} <span>{t('checkout.summary_label_nav')}</span>
              </p>
              <Button className="checkout__order-btn" onClick={handleCheckout}>
                {t('checkout.order')}
              </Button>
            </div>
          </div>
        </>
      </section>

      <LandingLayoutFooter />

      <AddressModal setUserAddress={setUserAddress} />

      <ConfirmModal userAddress={userAddress} />
    </>
  );
};

export default CheckoutPage;
