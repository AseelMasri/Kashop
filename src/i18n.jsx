import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';

i18n.use(initReactI18next).use(Backend) // passes i18n down to react-i18next
  .init({
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
  });