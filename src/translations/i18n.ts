import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./languages/en";
import { sw } from "./languages/sw";

i18n.use(initReactI18next).init({
  resources: {
    en,
    sw,
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
