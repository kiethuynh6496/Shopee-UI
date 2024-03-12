import { t } from 'i18next';
import { ShoppingCartItems } from 'models/shoppingCart/shoppingCartInfo';
import React from 'react';
import { price } from 'utils/commonUtil';

interface CheckoutItemProps {
  info: ShoppingCartItems;
}

const CheckoutItem: React.FunctionComponent<CheckoutItemProps> = (props) => {
  const { info } = props;
  return (
    <div className="checkout__product-detail">
      <div className="checkout__product-info">
        <div className="checkout__product-image-wrapper">
          <img src={info.item.pictureUrl} alt="" />
        </div>
        <div className="checkout__product-name">{info.item.name}</div>
      </div>
      <div className="checkout__variation">
        <span>
          {t('checkout.type')}: {info.item.category.name}
        </span>
      </div>
      <span className="checkout__unit-price">{price(info.item.price)}</span>
      <span className="checkout__quantity">{info.quantity}</span>
      <span className="checkout__product-price">{price(info.item.price * info.quantity)}</span>
    </div>
  );
};

export { CheckoutItem };
