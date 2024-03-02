import { UserOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import authApi from 'api/authApi';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import appQrcode from 'assets/images/shopee_qrcode.png';
import { DownIcon, HelpIcon, NotificationIcon, TranslateIcon } from 'components/Icons';
import { CoinIcon } from 'components/Icons/CoinIcon';
import { authActions, selectIsLoggedIn } from 'features/auth/authSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import userApi from 'api/userApi';
import { UserInformation } from 'models/user/userInformation';

interface HeaderTopNavProps {}

const HeaderTopNav: React.FunctionComponent<HeaderTopNavProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userDetail, setUserDetail] = useState<UserInformation>();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { t, i18n } = useTranslation();

  const getUserDetail = useCallback(async () => {
    const res = await userApi.getUserDetail(localStorage.getItem('token') || '').catch(() => {
      dispatch(authActions.setIsLoggedIn(false));
      localStorage.removeItem('token');
    });

    if (res) {
      setUserDetail(res);
      dispatch(authActions.setIsLoggedIn(true));
    }
  }, []);

  useEffect(() => {
    getUserDetail();
  }, []);

  const handlePopover = (value: boolean) => {
    getUserDetail();
  };

  const logout = useCallback(async () => {
    const res = await authApi.logout(localStorage.getItem('token') || '').catch(() => {
      localStorage.removeItem('token');
      navigate('/');
    });

    if (res === 'success') {
      dispatch(authActions.setIsLoggedIn(false));
      localStorage.removeItem('token');
      navigate('/login');
    } else {
      localStorage.removeItem('token');
      navigate('/');
    }
  }, []);

  const content = (
    <div className="landing-header__option-container">
      <div className="auth-option">
        {t('landing.header.right_side.balance')}
        <span>
          <CoinIcon /> "balance"
        </span>
      </div>

      <div className="auth-option" onClick={() => handleNav('/user-detail')}>
        {t('landing.header.right_side.acc_detail')}
      </div>

      <div className="auth-option" onClick={logout}>
        {t('landing.header.right_side.logout')}
      </div>
    </div>
  );

  const downloadContent = (
    <div className="shopee-qrcode">
      <img src={appQrcode} alt="app-qrcode" />
    </div>
  );

  const handleNav = (val: string) => {
    navigate(val);
  };

  const handleChangeLang = (value: string) => {
    i18n.changeLanguage(value);
    localStorage.setItem('lang', value);
  };

  const langContent = (
    <div className="language-container">
      <p className="language" onClick={() => handleChangeLang('vi')}>
        Tiếng Việt
      </p>
      <p className="language" onClick={() => handleChangeLang('en')}>
        English
      </p>
    </div>
  );

  return (
    <div className="header-top__navbar">
      <div className="container">
        <div className="header-top__group">
          <span className="header-top__nav">{t('landing.header.left_side.tag1')}</span>
          <div className="header-top__divider" />
          {!isLoggedIn && (
            <>
              <span className="header-top__nav">{t('landing.header.left_side.tag2')}</span>
              <div className="header-top__divider" />
            </>
          )}
          <Popover content={downloadContent} placement="bottomLeft">
            <span className="header-top__nav">{t('landing.header.left_side.tag3')}</span>
          </Popover>
          <div className="header-top__divider" />
          <span className="header-top__nav">{t('landing.header.left_side.tag4')}</span>
        </div>

        <div className="header-top__group">
          <span className="header-top__nav">
            <NotificationIcon style={{ width: '14px', height: '18px' }} />
            {t('landing.header.right_side.tag1')}
          </span>
          <span className="header-top__nav">
            <HelpIcon style={{ width: '18px', height: '18px' }} />
            {t('landing.header.right_side.tag2')}
          </span>
          <span className="header-top__nav">
            <Popover placement="bottomRight" title={''} content={langContent}>
              <TranslateIcon style={{ width: '16px', height: '16px' }} />
              {t('landing.header.right_side.tag3')}
              <DownIcon />
            </Popover>
          </span>

          {!isLoggedIn ? (
            <>
              <span className="header-top__nav" onClick={() => navigate('/register')}>
                {t('landing.header.right_side.tag5')}
              </span>
              <div className="header-top__divider" />
              <span className="header-top__nav" onClick={() => navigate('/login')}>
                {t('landing.header.right_side.tag6')}
              </span>
            </>
          ) : (
            <Popover
              style={{ width: '600px' }}
              onVisibleChange={handlePopover}
              placement="bottomRight"
              title={<span>{userDetail?.email}</span>}
              content={content}
              // trigger="click"

              className="header-top-avatar__container"
            >
              <div className="header-top-avatar__logo">
                <UserOutlined />
              </div>
              <span className="header-top-avatar__name">{userDetail?.email.split('@')[0]}</span>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTopNav;
