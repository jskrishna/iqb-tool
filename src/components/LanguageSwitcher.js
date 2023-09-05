import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button className={i18n?.language == "en" ? 'active':''} onClick={() => changeLanguage('en')}>EN</button>
      <button className={i18n?.language == "nl" ? 'active':''} onClick={() => changeLanguage('nl')}>NL</button>
    </div>
  );
};

export default LanguageSwitcher;
