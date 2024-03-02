import { Checkbox } from 'antd';
import orderApi from 'api/orderApi';
import itemPromotionlogo from 'assets/images/cart_item_promotion.png';
import { CoinIcon } from 'components/Icons';
import CustomInputNumber from 'features/product/components/CustomInputNumber';
import { OrderGetInformation } from 'models/order/orderGetInformation';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface ICartItemProps {
  isChecked: boolean;
  itemData: OrderGetInformation;
  disableQuantity?: boolean;
}

const CartItem: React.FunctionComponent<ICartItemProps> = ({
  isChecked,
  itemData,
  disableQuantity,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';
  const { t } = useTranslation();

  const handleChangeQuantity = (value: number) => {
    value >= 1 && setQuantity(value);
  };

  const deleteOrder = useCallback(async (data) => {
    try {
      await orderApi.deleteOrder(token, data.id);
    } catch (error) {}
  }, []);

  const handleDelete = () => {
    navigate(`/product/${itemData.productInfo.id}`);
  };

  return (
    <div className="cart__item">
      <Checkbox checked={isChecked} />

      <div className="cart-item__info-wrapper">
        <div className="cart-item__img-cover">
          <img src={itemData.productInfo.image} alt="" />
        </div>

        <div className="cart-item__info-detail">
          <p className="cart-item__name">{itemData.productInfo.name}</p>
          <img src={itemPromotionlogo} alt="" />
        </div>

        <div className="cart-item__category-wrapper">
          <span>{`${t('cart.type')}: ${itemData.productInfo.category}`}</span>
        </div>
      </div>

      <div className="cart-item__unit-price">
        <CoinIcon /> {itemData.productInfo.price}
      </div>

      <div className="cart-item__quantity">
        <CustomInputNumber
          value={disableQuantity ? itemData.quantity : quantity}
          isDisable={disableQuantity}
          onChange={handleChangeQuantity}
        />
      </div>

      <span className="cart-item__price">
        <CoinIcon /> {itemData.productInfo.price * itemData.quantity}
      </span>

      <span className="cart-item__option--remove" onClick={handleDelete}>
        {t('cart.delete')}
      </span>
    </div>
  );
};

export default CartItem;
