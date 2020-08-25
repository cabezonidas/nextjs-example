import Cookie from "js-cookie";

type DarkMode = "dark" | "light";
let darkMode: DarkMode = "dark";

export const toggleDarkMode = () => {
  darkMode = darkMode === "dark" ? "light" : "dark";
  Cookie.set("darkMode", darkMode);
  return darkMode;
};
