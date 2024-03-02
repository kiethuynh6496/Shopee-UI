import React from 'react';
import { useTranslation } from 'react-i18next';

interface NotFoundPageProps {}

const NotFoundPage: React.FunctionComponent<NotFoundPageProps> = (props) => {
  const { t } = useTranslation();
  return <>{t('Not Found')}</>;
};

export default NotFoundPage;
