import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import Shell from "./Shell";
import { useTranslation, Box, styled } from "@cabezonidas/shop-ui";

type Props = {
  title?: string;
};

const enUsRoutes = {
  routes: {
    home: "Home",
    about: "About",
    usersList: "Users list",
    usersApi: "Users API",
  },
  footer: "I'm here to stay!",
};
const esArRoutes = {
  routes: {
    home: "Inicio",
    about: "Acerca",
    usersList: "Lista de usuarios",
    usersApi: "API de usuarios",
  },
  footer: "Estoy para quedarme!",
};

const Nav = styled(Box)(
  ({ theme }) => `
padding: ${theme.space[4]} ${theme.space[4]};
background: ${theme.colors.neutral.dark};
color: ${theme.colors.neutral.lightest};
`
).withComponent("nav");

const Footer = Nav.withComponent(Nav);

const Layout: React.FunctionComponent<Props> = (props) => {
  const { title, children } = props;
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle(
    "en-US",
    "translation",
    { layout: enUsRoutes },
    true,
    true
  );
  i18n.addResourceBundle(
    "es-AR",
    "translation",
    { layout: esArRoutes },
    true,
    true
  );
  return (
    <Shell display="grid" gridTemplateRows="auto 1fr auto">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Nav display="flex" justifyContent="space-between">
          <Box display="grid" gridGap="2" gridTemplateColumns="repeat(4, auto)">
            <Link href="/">
              <a>{t("layout.routes.home")}</a>
            </Link>
            <Link href="/about">
              <a>{t("layout.routes.about")}</a>
            </Link>
            <Link href="/users">
              <a>{t("layout.routes.usersList")}</a>
            </Link>
          </Box>
          <a href="/api/users">{t("layout.routes.usersApi")}</a>
        </Nav>
      </header>
      <Box>{children}</Box>
      <Footer>{t("layout.footer")}</Footer>
    </Shell>
  );
};

export default Layout;
