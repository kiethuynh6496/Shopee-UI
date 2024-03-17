import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Space, notification } from 'antd';
import { SearchIcon, ShopLogo } from 'components/Icons';
import { recommentProductTagInfo } from 'constants/landing/recommentProductTagInfo';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderTopNav from './HeaderTopNav';
import { Button } from 'antd';
import shoppingCartApi from 'api/shoppingCartApi';
import { getCookie } from 'utils';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setShoppingCart } from 'features/cart/pages/shoppingCartSlice';
import { selectIsLoggedIn } from 'features/auth/authSlice';
import { useTranslation } from 'react-i18next';
import productApi from 'api/productApi';
import { setProductList } from 'features/product/pages/productSlice';
import { setInputSearch } from 'features/product/pages/inputSearchSlice';

export interface LandingLayoutHeaderProps {}

export const LandingLayoutHeader: React.FunctionComponent<LandingLayoutHeaderProps> = (props) => {
  const navigate = useNavigate();
  const [countProduct, setCountProduct] = useState<number>(0);
  const [input, setInput] = useState<string>('');
  const [api, contextHolder] = notification.useNotification();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { shoppingCart } = useAppSelector((state) => state.shoppingCart);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const getCount = useCallback(async () => {
    console.log('count');
    const res = await shoppingCartApi.getShoppingCart();
    if (res.data === null) {
      setCountProduct(0);
    } else {
      setCountProduct(getNumber());
    }
    dispatch(setShoppingCart(res.data));
  }, [dispatch]);

  const getNumber = (): number => {
    if (shoppingCart == null) {
      return 0;
    }
    let quantitySum = 0;
    shoppingCart.shoppingCartItems.forEach((data) => {
      quantitySum += data.quantity;
    });
    return quantitySum;
  };

  useEffect(() => {
    const userId = getCookie('userId') ?? '';
    if (userId) {
      getCount();
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setCountProduct(getNumber());
    }
  }, [shoppingCart]);

  const handleOpenCart = () => {
    if (!isLoggedIn) {
      api.warning({
        message: t('landing.header.right_side.warning'),
        description: t('landing.header.right_side.warning-description'),
      });
      return;
    }
    navigate('/cart');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearchProduct = async () => {
    const res = await productApi.getFilterProduct(input, 1, 12);
    if (res.statusCode === 200) {
      dispatch(setInputSearch(input));
      dispatch(setProductList(res));
    }
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
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchProduct();
                  }
                }}
              />
              <Button className="landing-header__search-btn" onClick={handleSearchProduct}>
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
              {contextHolder}
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
