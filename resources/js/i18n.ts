import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import HttpBackend from "i18next-http-backend";
import LocalStorageBackend from "i18next-localstorage-backend";

i18n
    .use(initReactI18next)
    .use(HttpBackend)
    .init({
        fallbackLng: 'en',
        backend: {
            backends: [
                LocalStorageBackend,
                HttpBackend
            ],
            backendOptions: [{
                expirationTime: 7 * 24 * 60 * 60 * 1000 // 7 days
            }, {}],
            loadPath: '/i18next/fetch',
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
