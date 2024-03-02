import { ShoppingCartOutlined } from '@ant-design/icons';
import { SearchIcon, ShopLogo } from 'components/Icons';
import { recommentProductTagInfo } from 'constants/landing/recommentProductTagInfo';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderTopNav from './HeaderTopNav';
import { Button } from 'antd';

export interface LandingLayoutHeaderProps {}

export const LandingLayoutHeader: React.FunctionComponent<LandingLayoutHeaderProps> = (props) => {
  const navigate = useNavigate();

  const handleOpenCart = () => {
    // navigate('/cart');
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
            <ShoppingCartOutlined onClick={handleOpenCart} />
          </div>
        </div>
      </div>
    </>
  );
};
