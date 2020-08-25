import { AppProps } from "next/app";
import { ApolloProvider } from "react-apollo";
import { UiProvider } from "@cabezonidas/shop-ui";
import React from "react";
import "@reach/dialog/styles.css";
import "@reach/combobox/styles.css";
import "highlight.js/styles/default.css";
import "@cabezonidas/shop-ui/assets/style.css";
import "@reach/menu-button/styles.css";
import "./../styles.css";
import { withApollo } from "../lib/apolloClient";
import "../utils/i18n";
import { languages } from "../utils/i18n";
import { getState } from "../utils/helpers";

function MyApp({
  Component,
  pageProps,
  apolloClient,
}: AppProps & { apolloClient: any }) {
  const { darkMode } = getState();
  return (
    <ApolloProvider client={apolloClient}>
      <UiProvider suspense={false} mode={darkMode} languages={languages}>
        <Component {...pageProps} />
      </UiProvider>
    </ApolloProvider>
  );
}

export default withApollo(MyApp);
