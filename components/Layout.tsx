import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import { UiProvider } from "@cabezonidas/shop-ui";
import Shell from "./Shell";

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = (props) => (
  <UiProvider suspense={false}>
    <LayoutInternal {...props} />
  </UiProvider>
);

const LayoutInternal: React.FunctionComponent<Props> = (props) => {
  const { title, children } = props;
  return (
    <Shell display="grid" gridTemplateRows="auto 1fr auto">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{" "}
          |{" "}
          <Link href="/about">
            <a>About</a>
          </Link>{" "}
          |{" "}
          <Link href="/users">
            <a>Users List</a>
          </Link>{" "}
          | <a href="/api/users">Users API</a>
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </Shell>
  );
};

export default Layout;
