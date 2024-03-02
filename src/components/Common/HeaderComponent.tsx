import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderTopNav from './HeaderTopNav';
import { SearchIcon, ShopeeLogo } from 'components/Icons';

interface HeaderComponentProps {
  title: string;
  disableSearch?: boolean;
}

const HeaderComponent: React.FunctionComponent<HeaderComponentProps> = ({
  title,
  disableSearch,
}) => {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate('/');
  };

  return (
    <>
      <HeaderTopNav />
      <div className="header">
        <div className="container">
          <div className="header-logo__wrapper">
            <ShopeeLogo onClick={handleNav} />
            <div className="header-logo__page-name">{title}</div>
          </div>

          {!disableSearch && (
            <div className="header__page-searchbar">
              <input type="text" placeholder="SHOPEE LIVE -50%" />
              <button>
                <SearchIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
