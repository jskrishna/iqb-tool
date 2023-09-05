import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';



i18n.use(initReactI18next).init({
  lng: 'en', // Set the default language
  fallbackLng: 'en', // Fallback language in case translation is missing
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
