import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { parseCookies } from "./helpers";
import { Settings } from "luxon";

export const languages = [
  { localeId: "es-AR", name: "Español (argentino)" },
  { localeId: "en-US", name: "English (USA)" },
];

const defaultLng =
  parseCookies("").language ?? languages[0]?.localeId ?? "es-AR";

const resources = languages.reduce<{ [key: string]: { translation: object } }>(
  (res, language) => {
    if (language.localeId) {
      res[language.localeId] = { translation: {} };
    }
    return res;
  },
  {}
);

Settings.defaultLocale = defaultLng;

i18next.use(initReactI18next).init({
  resources,
  lng: defaultLng,
  fallbackLng: defaultLng,
});
