import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Space } from 'antd';
import { SearchIcon, ShopLogo } from 'components/Icons';
import { recommentProductTagInfo } from 'constants/landing/recommentProductTagInfo';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderTopNav from './HeaderTopNav';
import { Button } from 'antd';
import shoppingCartApi from 'api/shoppingCartApi';
import { getCookie } from 'utils';
import { useAppDispatch } from 'redux/hooks';
import { setShoppingCart } from 'features/cart/pages/shoppingCartSlice';

export interface LandingLayoutHeaderProps {}

export const LandingLayoutHeader: React.FunctionComponent<LandingLayoutHeaderProps> = (props) => {
  const navigate = useNavigate();
  const [countProduct, setCountProduct] = useState<number>(0);
  const dispatch = useAppDispatch();

  const getCount = useCallback(async () => {
    const res = await shoppingCartApi.getShoppingCart();
    console.log(res);
    if (res) {
      dispatch(setShoppingCart(res.data));
      let quantitySum = 0;
      res.data.shoppingCartItems.forEach((data) => {
        quantitySum += data.quantity;
      });
      setCountProduct(quantitySum);
    }
  }, [dispatch]);

  useEffect(() => {
    const userId = getCookie('userId');
    if (userId) {
      getCount();
    }
  }, []);

  const handleOpenCart = () => {
    navigate('/cart');
  };

  return (
    <>
      <HeaderTopNav />
      <div className="landing-header">
        <div className="container">
          <div className="landing-header__left-side">
            <ShopLogo onClick={() => navigate('')} />
          </div>
          <div className="landing-header__middle">
            <div className="landing-header__searchbar">
              <input
                type="text"
                className="landing-header__input"
                placeholder="TẶNG MÁY TĂM NƯỚC 2.490.000Đ"
              />
              <Button className="landing-header__search-btn">
                <SearchIcon />
              </Button>
            </div>

            <ul className="landing-header__tag-list">
              {recommentProductTagInfo.map((val, index) => (
                <li key={index} className="landing-header__tag">
                  {val.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="landing-header__right-side">
            <Space size="large">
              <Badge count={countProduct}>
                <ShoppingCartOutlined onClick={handleOpenCart} />
              </Badge>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};
