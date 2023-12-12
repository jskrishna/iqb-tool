import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
     <li  className={i18n?.language === "en" ? 'active':''}>
     <button onClick={() => changeLanguage('en')}>EN</button>
     </li>
      <li className={i18n?.language === "nl" ? 'active':''}>
      <button onClick={() => changeLanguage('nl')}>NL</button>
      </li>
    </>
  );
};

export default LanguageSwitcher;
