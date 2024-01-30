import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const urlParams = new URLSearchParams(window.location.search);
const defaultLanguage = urlParams.get('lang') || 'nl';

i18n.use(initReactI18next).init({
  lng: defaultLanguage, // Set the default language
  fallbackLng: 'nl', // Fallback language in case translation is missing
  resources: {
    en: {
      translation: "EN", // English translations
    },
    NL: {
      translation: "NL", // French translations
    },
  },
  // Add other configuration options as needed
});

export default i18n;
