import { AppProps } from "next/app";
import { UiProvider } from "@cabezonidas/shop-ui";
import { createContext, useContext, useState } from "react";
import "@cabezonidas/shop-ui/lib/style.css";

const StateContext = createContext<{
  text?: string;
  setText: (t?: string) => void;
}>(undefined as any);
export const useAppContext = () => useContext(StateContext);

function MyApp({ Component, pageProps }: AppProps) {
  const [text, setText] = useState<string>();
  return (
    <UiProvider suspense={false}>
      <StateContext.Provider value={{ text, setText }}>
        <Component {...pageProps} />
      </StateContext.Provider>
    </UiProvider>
  );
}

export default MyApp;
