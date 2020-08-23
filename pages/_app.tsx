import { AppProps } from "next/app";
import { ApolloProvider } from "react-apollo";
import { UiProvider } from "@cabezonidas/shop-ui";
import React from "react";
import "@reach/dialog/styles.css";
import "@reach/combobox/styles.css";
import "highlight.js/styles/default.css";
import "@cabezonidas/shop-ui/assets/style.css";
import "./../styles.css";
import { withApollo } from "../lib/apolloClient";
import { getDarkMode } from "../lib/localStorage";
import "../utils/i18n";

function MyApp({
  Component,
  pageProps,
  apolloClient,
}: AppProps & { apolloClient: any }) {
  return (
    <ApolloProvider client={apolloClient}>
      <UiProvider suspense={false} mode={getDarkMode()}>
        <Component {...pageProps} />
      </UiProvider>
    </ApolloProvider>
  );
}

export default withApollo(MyApp);
