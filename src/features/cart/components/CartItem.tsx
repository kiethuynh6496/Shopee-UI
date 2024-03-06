import { Checkbox } from 'antd';
import orderApi from 'api/orderApi';
import itemPromotionlogo from 'assets/images/cart_item_promotion.png';
import { CoinIcon } from 'components/Icons';
import CustomInputNumber from 'features/product/components/CustomInputNumber';
import { ShoppingCartItems } from 'models/shoppingCart/shoppingCartInfo';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface ICartItemProps {
  isChecked: boolean;
  itemData: ShoppingCartItems;
}

const CartItem: React.FunctionComponent<ICartItemProps> = ({ isChecked, itemData }) => {
  const [quantity, setQuantity] = useState<number>(itemData.quantity);
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';
  const { t } = useTranslation();

  const handleChangeQuantity = (value: number) => {
    console.log('cartitem');
    value >= 1 && setQuantity(value);
  };

  const deleteOrder = useCallback(async (data) => {
    try {
      await orderApi.deleteOrder(token, data.id);
    } catch (error) {}
  }, []);

  const handleDelete = () => {
    navigate(`/product/${itemData}`);
  };

  return (
    <div className="cart__item">
      <Checkbox checked={isChecked} />

      <div className="cart-item__info-wrapper">
        <div className="cart-item__img-cover">
          <img src={itemData.item.pictureUrl} alt="" />
        </div>

        <div className="cart-item__info-detail">
          <p className="cart-item__name">{itemData.item.name}</p>
          <img src={itemPromotionlogo} alt="" />
        </div>

        <div className="cart-item__category-wrapper">
          <span>{`${t('cart.type')}: ${itemData.item.category.name}`}</span>
        </div>
      </div>

      <div className="cart-item__unit-price">
        <CoinIcon /> {itemData.item.price}
      </div>

      <div className="cart-item__quantity">
        <CustomInputNumber value={quantity} onChange={handleChangeQuantity} />
      </div>

      <span className="cart-item__price">
        <CoinIcon /> {itemData.item.price * quantity}
      </span>

      <span className="cart-item__option--remove" onClick={handleDelete}>
        {t('cart.delete')}
      </span>
    </div>
  );
};

export default CartItem;
