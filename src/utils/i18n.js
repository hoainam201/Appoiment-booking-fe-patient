// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const languageFromStorage = localStorage.getItem('language') || 'vi';

i18n
  .use(HttpApi) // Load translation using http
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass the i18n instance to react-i18next.
  .init({
    supportedLngs: ['en', 'vi'], // List of languages you support
    fallbackLng: languageFromStorage, // Default language
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
