import { Button, Checkbox } from 'antd';
import { CoinIcon, VoucherIcon } from 'components/Icons';
import { ShoppingCartInfo, ShoppingCartItems } from 'models/shoppingCart/shoppingCartInfo';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { price } from 'utils/commonUtil';

interface CartSummaryProps {
  setIsCheckedAll: (val: boolean) => void;
  isCheckedAll: boolean;
  cartData: ShoppingCartInfo;
}

const CartSummary: React.FunctionComponent<CartSummaryProps> = ({
  setIsCheckedAll,
  isCheckedAll,
  cartData,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quantityTotal, setquantityTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const handleCheckAll = () => {
    setIsCheckedAll(!isCheckedAll);
  };

  const calculateQuantityTotal = () => {
    let quantitySum = 0;
    cartData.shoppingCartItems.forEach((data) => {
      quantitySum += data.quantity;
    });
    setquantityTotal(quantitySum);
  };

  const calculateTotal = () => {
    let Sum = 0;
    cartData.shoppingCartItems.forEach((data) => {
      Sum += data.item.price * data.quantity;
    });
    setTotal(Sum);
  };

  useEffect(() => {
    calculateQuantityTotal();
    calculateTotal();
  }, [cartData]);

  const handleSubmit = () => {
    setIsLoading(true);
    navigateToCheckout();
  };
  const navigateToCheckout = useCallback(async () => {
    navigate(`/checkout`);
    setIsLoading(false);
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
          <button className="cart-summary__checkout__option">{t('cart.save')}</button>
        </div>

        <div className="cart-summary__price">
          <span>{`${t('cart.summary')} (${quantityTotal} ${t('cart.product')}):`}</span>
          <span>
            <CoinIcon /> {`${price(total)}`}
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
