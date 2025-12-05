import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

// Check if we're on the server side
const isServer = typeof window === 'undefined';

const i18nInstance = i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
    .use(Backend);

// Only use language detector on client side to avoid SSR/client mismatch
if (!isServer) {
    i18nInstance.use(LanguageDetector);
}

i18nInstance
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        lng: isServer ? 'en' : undefined, // Force English on server, let client detect
        fallbackLng: 'en',
        supportedLngs: ['en', 'fr'],
        nonExplicitSupportedLngs: true,   // maps en-US > en, fr-FR > fr
        load: 'languageOnly',             // ensures we request /locales/en/...    
        backend: { loadPath: '/locales/{{lng}}.json' }, // Configure backend for loading translations
        interpolation: { escapeValue: false }, // not needed for react as it escapes by default

        // Language detection configuration (client-side only)
        detection: isServer ? undefined : {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
        },

        debug: false, // Disable debug in production
    });

export default i18n;