import { useTranslation } from 'react-i18next';
import landingLogoConfirmFooter from 'assets/images/congthuongdadangky.png';

export interface LandingLayoutFooterProps {}

export const LandingLayoutFooter: React.FunctionComponent<LandingLayoutFooterProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className="landing-footer">
      <div className="container">
        <div className="landing__nav-container">
          <div className="landing__nav-item">PRIVACY POLICY</div>
          <div className="landing__nav-item">TERM OF SERVICE</div>
          <div className="landing__nav-item">SHIPPING POLICY</div>
          <div className="landing__nav-item">VIOLATION</div>
        </div>
        <div className="landing__logo-register--confirmed">
          <img src={landingLogoConfirmFooter} alt="" />
          <img src={landingLogoConfirmFooter} alt="" />
        </div>
      </div>
    </div>
  );
};
