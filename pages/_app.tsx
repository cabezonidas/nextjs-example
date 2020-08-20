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

function MyApp({
  Component,
  pageProps,
  apolloClient,
}: AppProps & { apolloClient: any }) {
  return (
    <ApolloProvider client={apolloClient}>
      <UiProvider suspense={false}>
        <Component {...pageProps} />
      </UiProvider>
    </ApolloProvider>
  );
}

export default withApollo(MyApp);
