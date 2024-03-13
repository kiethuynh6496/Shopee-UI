import { Checkbox } from 'antd';
import itemPromotionlogo from 'assets/images/cart_item_promotion.png';
import { CoinIcon } from 'components/Icons';
import CustomInputNumber from 'features/product/components/CustomInputNumber';
import { ShoppingCartItems } from 'models/shoppingCart/shoppingCartInfo';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'redux/hooks';
import { setShoppingCart } from '../pages/shoppingCartSlice';
import shoppingCartApi from 'api/shoppingCartApi';
import { price } from 'utils/commonUtil';

interface ICartItemProps {
  isChecked: boolean;
  itemData: ShoppingCartItems;
}

const CartItem: React.FunctionComponent<ICartItemProps> = ({ isChecked, itemData }) => {
  const [item, setItem] = useState<ShoppingCartItems>(itemData);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleChangeQuantity = async (text: string, value: number) => {
    const res =
      text === '+'
        ? await shoppingCartApi.createShoppingCartItem(itemData.itemId, value)
        : text === '-'
        ? await shoppingCartApi.deleteShoppingCartItem(itemData.itemId, value)
        : await shoppingCartApi.createShoppingCartItem(itemData.itemId, value - itemData.quantity);
    if (res) {
      const index = res.data.shoppingCartItems.findIndex((item) => item.itemId == itemData.itemId);

      if (index >= 0) {
        setItem(res.data.shoppingCartItems[index]);
      }
      dispatch(setShoppingCart(res.data));
    }
  };

  return (
    <div className="cart__item">
      <Checkbox checked={isChecked} />

      <div className="cart-item__info-wrapper">
        <div className="cart-item__img-cover">
          <img src={itemData.item.pictureUrl ?? '#'} alt="" />
        </div>

        <div className="cart-item__info-detail">
          <p className="cart-item__name">{itemData.item.name}</p>
          <img src={itemPromotionlogo} alt="" />
        </div>

        <div className="cart-item__category-wrapper">
          <span>{`${t('cart.type')}: ${itemData.item.category?.name ?? ''}`}</span>
        </div>
      </div>

      <div className="cart-item__unit-price">
        <CoinIcon /> {price(itemData.item.price)}
      </div>

      <div className="cart-item__quantity">
        <CustomInputNumber value={item.quantity} onChange={handleChangeQuantity} />
      </div>

      <span className="cart-item__price">
        <CoinIcon /> {price(itemData.item.price * item.quantity)}
      </span>

      <span
        className="cart-item__option--remove"
        onClick={() => {
          handleChangeQuantity('-', item.quantity);
        }}
      >
        {t('cart.delete')}
      </span>
    </div>
  );
};

export default CartItem;
