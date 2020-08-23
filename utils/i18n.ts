import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { Settings } from "luxon";
import { getLanguage } from "../lib/localStorage";

const locale = getLanguage();

Settings.defaultLocale = locale;

i18next.use(initReactI18next).init({
  lng: locale,
  fallbackLng: locale,
});
