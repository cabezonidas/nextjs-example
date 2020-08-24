import Cookie from "js-cookie";

type DarkMode = "dark" | "light";
type Language = "en-US" | "es-AR";
let darkMode: DarkMode = "dark";
let appLanguage: Language = "es-AR";
const locales: Language[] = ["es-AR", "en-US"];

export const toggleDarkMode = () => {
  darkMode = darkMode === "dark" ? "light" : "dark";
  Cookie.set("darkMode", darkMode);
  return darkMode;
};

export const getLanguage = () => {
  if (typeof localStorage !== "undefined" && typeof window !== "undefined") {
    appLanguage =
      locales.find((m) => m === localStorage.getItem("language")) ??
      locales.find((locale) =>
        locale.startsWith((window.navigator?.language ?? "").slice(0, 2))
      ) ??
      "es-AR";
  }
  return appLanguage;
};

export const setLanguage = (localeId: string) => {
  appLanguage = locales.find((f) => f === localeId) ?? appLanguage;
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("language", localeId);
  }
  return appLanguage;
};

export const prependLocaleFlag = (localeId: string, name: string) => {
  const nameSuffix = name.split(" ")[0];
  const flag = localeId
    .split("-")[1]
    ?.toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
  return flag ? `${flag} ${nameSuffix}` : nameSuffix;
};
