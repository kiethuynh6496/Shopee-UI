import { Button, Checkbox } from 'antd';
import orderApi from 'api/orderApi';
import { CoinIcon, VoucherIcon } from 'components/Icons';
import { ShoppingCartItems } from 'models/shoppingCart/shoppingCartInfo';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface CartSummaryProps {
  setIsCheckedAll: (val: boolean) => void;
  isCheckedAll: boolean;
  cartData: ShoppingCartItems[];
}

const CartSummary: React.FunctionComponent<CartSummaryProps> = ({
  setIsCheckedAll,
  isCheckedAll,
  cartData,
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quantityTotal, setquantityTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const handleCheckAll = () => {
    setIsCheckedAll(!isCheckedAll);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // updateOrderStatus(orderData);
  };

  const calculateQuantityTotal = () => {
    let quantitySum = 0;
    cartData.forEach((data) => {
      quantitySum += data.quantity;
    });
    setquantityTotal(quantitySum);
  };

  const calculateTotal = () => {
    let Sum = 0;
    cartData.forEach((data) => {
      Sum += data.item.price * data.quantity;
    });
    setTotal(Sum);
  };

  useEffect(() => {
    calculateQuantityTotal();
    calculateTotal();
  }, [cartData]);

  const updateOrderStatus = useCallback(async (data) => {
    try {
      const res = await orderApi.updateOrderStatus(token, data.id, { status: 'PENDING' });
    } catch (error) {
      console.log('Error to update order status');
    }
    setIsLoading(false);
  }, []);

  const handleDelete = () => {
    // navigate(`/product/${orderData.productInfo.id}`);
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
    <div className="cart-summary">
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
          <span>{`${t('cart.summary')} (${quantityTotal} ${t('cart.product')}):`}</span>
          <span>
            <CoinIcon /> {`${total}`}
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
