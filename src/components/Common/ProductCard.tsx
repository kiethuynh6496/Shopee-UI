import { Card } from 'antd';
import { CoinIcon } from 'components/Icons';
import { ProductInfo } from 'models/product/productInfo';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { price } from 'utils/commonUtil';

interface ProductCardProps {
  info: ProductInfo;
  isEdit?: boolean;
  [val: string]: any;
}

const cardStyle = {
  border: '1px solid transparent',
};

const ProductCard: React.FunctionComponent<ProductCardProps> = (props) => {
  const { info, isEdit } = props;
  const navigate = useNavigate();
  const handleSelect = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <Card
      hoverable
      style={{ ...cardStyle }}
      cover={
        <img
          alt="example"
          src={
            info.pictureUrl ??
            'https://res.cloudinary.com/donrlyxgv/image/upload/v1708182115/cld-sample-5.jpg'
          }
        />
      }
      onClick={() => handleSelect(info.id || 0)}
      className={!isEdit ? 'product-card' : 'product-card product-card--edit'}
      {...props}
    >
      <div className="product-card__title">{info.name}</div>
      <div className="product-card__discount-info">
        <div className="product-card__discount-flag">
          <svg width="4px" viewBox="-0.5 -0.5 4 16">
            <path
              d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3"
              fill="#f69113"
            ></path>
          </svg>

          <div className="product-card__discount-amount">Giảm ₫219k</div>

          <svg width="4px" viewBox="-0.5 -0.5 4 16">
            <path
              d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3"
              transform="rotate(180) translate(-3 -15)"
              fill="#f69113"
            ></path>
          </svg>
        </div>
        <span className="product-card__category">Flash Sale</span>
      </div>
      <div className="product-card__description">
        <span className="product-card__price">
          <CoinIcon /> {price(info.price)}
        </span>
        <span className="product-card__quantity-sold">Đã bán 4,3k</span>
      </div>
      <div className="product-card__favourite">Yêu thích</div>
      <div className="product-card__discount-box">
        <div className="product-card__discount-detail">
          34% <span>giảm</span>
        </div>
      </div>
    </Card>
  );
};

export { ProductCard };
