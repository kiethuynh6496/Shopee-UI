import React from 'react';
import { useTranslation } from 'react-i18next';

interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = (props) => {
  const { t } = useTranslation();
  return <>{t('Home')}</>;
};

export default HomePage;
