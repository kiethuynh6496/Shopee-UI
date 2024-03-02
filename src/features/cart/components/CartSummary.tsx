import { Button, Checkbox } from 'antd';
import orderApi from 'api/orderApi';
import { CoinIcon, VoucherIcon } from 'components/Icons';
import { OrderGetInformation } from 'models';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface CartSummaryProps {
  setIsCheckedAll: (val: boolean) => void;
  isCheckedAll: boolean;
  isFixed?: boolean;
  forwardedRef?: React.RefObject<HTMLDivElement>;
  orderData: OrderGetInformation;
}

const CartSummary: React.FunctionComponent<CartSummaryProps> = ({
  setIsCheckedAll,
  isCheckedAll,
  isFixed,
  forwardedRef,
  orderData,
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheckAll = () => {
    setIsCheckedAll(!isCheckedAll);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    updateOrderStatus(orderData);
  };

  const updateOrderStatus = useCallback(async (data) => {
    try {
      const res = await orderApi.updateOrderStatus(token, data.id, { status: 'PENDING' });
      res && navigate(`/checkout?state=${orderData.id}`);
    } catch (error) {
      console.log('Error to update order status');
    }
    setIsLoading(false);
  }, []);

  const handleDelete = () => {
    navigate(`/product/${orderData.productInfo.id}`);
    // deleteOrder(orderData);
  };

  const deleteOrder = useCallback(async (data) => {
    try {
      await orderApi.deleteOrder(token, data.id);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div ref={forwardedRef} className={`cart-summary ${isFixed ? 'cart-summary--fixed' : ''}`}>
      <div className="cart-summary__voucher-wrapper">
        <span>
          <VoucherIcon />
          Shopee Voucher
        </span>
        <span>{t('cart.voucher')}</span>
      </div>

      <div className="cart-summary__checkout-container">
        <div className="cart-summary__checkout-options">
          <Checkbox
            className="cart-summary__checkbox"
            checked={isCheckedAll}
            onClick={handleCheckAll}
          >
            {t('cart.select_all')}
          </Checkbox>
          <button className="cart-summary__checkout__option" onClick={handleDelete}>
            {t('cart.delete')}
          </button>
          <button className="cart-summary__checkout__option">{t('cart.save')}</button>
        </div>

        <div className="cart-summary__price">
          <span>{`${t('cart.summary')} (${1} ${t('cart.product')}):`}</span>
          <span>
            <CoinIcon /> {`${orderData.productInfo.price * orderData.quantity}`}
          </span>
        </div>

        <Button className="cart-summary__submit-btn" onClick={handleSubmit} loading={isLoading}>
          {t('cart.submit_btn')}
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
