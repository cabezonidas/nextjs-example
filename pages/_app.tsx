import { AppProps } from "next/app";
import { ApolloProvider } from "react-apollo";
import withApollo from "../lib/withApollo";
import { UiProvider } from "@cabezonidas/shop-ui";
import React from "react";
import "@reach/dialog/styles.css";
import "@reach/combobox/styles.css";
import "highlight.js/styles/default.css";
import "@cabezonidas/shop-ui/assets/style.css";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";

function MyApp({
  Component,
  pageProps,
  apolloClient,
}: AppProps & { apolloClient: ApolloClient<NormalizedCacheObject> }) {
  return (
    <ApolloProvider client={apolloClient}>
      <UiProvider suspense={false}>
        <Component {...pageProps} />
      </UiProvider>
    </ApolloProvider>
  );
}

export default withApollo(MyApp);
