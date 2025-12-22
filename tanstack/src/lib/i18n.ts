import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import FsBackend from 'i18next-fs-backend';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const isServer = typeof window === 'undefined';

const i18nInstance = i18n;

if (!isServer) {
    i18nInstance
        .use(Backend)
        .use(LanguageDetector);
} else {
    // Use FileSystem backend on server
    i18nInstance.use(FsBackend);
}

i18nInstance
    .use(initReactI18next)
    .init({
        lng: isServer ? 'en' : undefined,
        fallbackLng: 'en',
        supportedLngs: ['en', 'fr'],
        nonExplicitSupportedLngs: true,
        load: 'languageOnly',

        // Configure backends based on environment
        backend: isServer
            ? {
                // FsBackend resolves relative to process.cwd() (project root)
                loadPath: './public/locales/{{lng}}.json',
            }
            : {
                loadPath: '/locales/{{lng}}.json'
            },

        interpolation: { escapeValue: false },

        detection: isServer ? undefined : {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
        },

        debug: false,
    });

export default i18n;