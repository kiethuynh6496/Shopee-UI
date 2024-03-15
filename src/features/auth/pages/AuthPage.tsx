import { Divider, notification } from 'antd';
import authApi from 'api/authApi';
import { useAppDispatch } from 'redux/hooks';
import { LandingLayoutFooter } from 'components/Common';
import { ErrorIcon, QrCodeIcon, ShopeeLogo } from 'components/Icons';
import { AuthInformation } from 'models';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../authSlice';
import { AuthForm } from '../components/AuthForm';
import { useTranslation } from 'react-i18next';

interface AuthPageProps {
  isLogin?: boolean;
}

const initialValue = {
  email: '',
  password: '',
};

const AuthPage: React.FunctionComponent<AuthPageProps> = ({ isLogin }) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [api, contextHolder] = notification.useNotification();

  const handleNavigate = () => {
    navigate('/');
  };

  const handleNavSignup = () => {
    navigate('/register');
  };

  const handleNavSignin = () => {
    navigate('/login');
  };

  useEffect(() => {
    setError('');
  }, [isLogin]);

  const handleFail = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleSubmit = (values: any) => {
    setIsLoading(true);
    isLogin ? handleLogin(values) : handleRegister(values);
  };

  const handleLogin = useCallback(async (body: AuthInformation) => {
    setIsLoading(true);
    const res = await authApi.login(body).catch((error: any) => {
      if (error.response) setError(t('auth.wrong_user_pass'));
    });

    if (res) {
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      localStorage.setItem('expiresAt', res.data.expiresAt);
      dispatch(authActions.setIsLoggedIn(true));
      navigate('/');
    }

    setIsLoading(false);
  }, []);

  const handleRegister = useCallback(
    async (body: AuthInformation) => {
      const res = await authApi.register(body).catch((error: any) => {
        if (error.response) setError(t('auth.account_existed'));
      });
      if (res) {
        api.success({
          message: t('auth.register-success'),
        });
        navigate('/login');
      }
      setIsLoading(false);
    },
    [navigate]
  );

  return (
    <div className="auth">
      <div className="auth-header">
        <div className="auth-header__left-side">
          <div className="auth-header__img-container">
            <ShopeeLogo onClick={handleNavigate} />
          </div>
          <span>{isLogin ? t('auth.login.signin') : t('auth.register.signup')}</span>
        </div>
        <div className="auth-header__right-side">{t('auth.support')}</div>
      </div>

      <div className="auth-content">
        <div className="auth-content__wrapper">
          <div className="auth-content__container">
            <div className="auth-content__header">
              <span className="auth-content__title">
                {isLogin ? t('auth.login.signin') : t('auth.register.signup')}
              </span>

              {isLogin && (
                <div className="auth-content__option">
                  <div
                    className="auth-content__option-alert"
                    dangerouslySetInnerHTML={{ __html: t('auth.login.qrlabel') }}
                  />
                  <QrCodeIcon />
                </div>
              )}
            </div>

            {error && (
              <div className="auth__error">
                <ErrorIcon /> {error}
              </div>
            )}

            <div className="auth-content__form">
              {contextHolder}
              <AuthForm
                initialValue={initialValue}
                onSubmit={handleSubmit}
                onFail={handleFail}
                isLoading={isLoading}
                submitType={isLogin ? t('auth.login.signin') : t('auth.register.signup')}
              />
            </div>

            <div className="auth-content__navs">
              {isLogin && (
                <>
                  <span>{t('auth.login.fogot')}</span>
                  <span>{t('auth.login.sms')}</span>
                </>
              )}
            </div>

            <Divider plain>{t('auth.or')}</Divider>

            <div className="auth-content__option-box">
              <button>
                <div className="auth-content__option-logo auth-facebook"></div> Facebook
              </button>
              <button>
                <div className="auth-content__option-logo auth-google"></div> Google
              </button>
            </div>

            {isLogin ? (
              <p className="auth-content_other-option">
                {t('auth.login.other_option_label')}{' '}
                <span onClick={handleNavSignup}>{t('auth.register.signup')}</span>
              </p>
            ) : (
              <p className="auth-content_other-option">
                {t('auth.register.other_option_label')}{' '}
                <span onClick={handleNavSignin}>{t('auth.register.login')}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="auth-footer">
        <LandingLayoutFooter />
      </div>
    </div>
  );
};

export default AuthPage;
