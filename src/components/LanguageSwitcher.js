import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('lang', lng);
    
    window.history.replaceState({}, '', currentUrl.toString());
    window.history.replaceState({}, '', currentUrl.pathname);

    i18n.changeLanguage(lng);
    localStorage.setItem('lang',lng);
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
