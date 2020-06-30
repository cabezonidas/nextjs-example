import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import {
  useTranslation,
  Box,
  ResponsiveLayout,
  TradingClubLatam,
  HeaderLink,
  NavLink,
  FooterLink,
  Whatsapp,
  Instagram,
  Facebook,
  Messenger,
} from "@cabezonidas/shop-ui";
import { usePinnedPostsQuery } from "../graphql-queries";

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
  const { data } = usePinnedPostsQuery();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ResponsiveLayout
        header={
          <Box display="grid" gridTemplateColumns="1fr auto">
            <TradingClubLatam />
            <Box alignSelf="center">
              <Link href="/">
                <HeaderLink>{t("layout.routes.home")}</HeaderLink>
              </Link>
              <Link href="/pinned">
                <HeaderLink>Pinned</HeaderLink>
              </Link>
              <Link href="/about">
                <HeaderLink>{t("layout.routes.about")}</HeaderLink>
              </Link>
              <Link href="/users">
                <HeaderLink>{t("layout.routes.usersList")}</HeaderLink>
              </Link>
              <HeaderLink href="/api/users">
                {t("layout.routes.usersApi")}
              </HeaderLink>
            </Box>
          </Box>
        }
        nav={
          <>
            {data?.getPinnedPublicPosts.map((p) => (
              <Link key={p._id} href={"/pinned/[id]"} as={`/pinned/${p._id}`}>
                <NavLink>{p.title}</NavLink>
              </Link>
            ))}
          </>
        }
        footer={
          <Box display="flex">
            <Box
              display="grid"
              gridTemplateColumns="repeat(4, 50px)"
              width="max-width"
              ml="auto"
            >
              <FooterLink href="#3">
                <Whatsapp />
              </FooterLink>
              <FooterLink href="#4">
                <Instagram />
              </FooterLink>
              <FooterLink href="#5">
                <Facebook />
              </FooterLink>
              <FooterLink href="#6">
                <Messenger />
              </FooterLink>
            </Box>
          </Box>
        }
      >
        {children}
      </ResponsiveLayout>
    </>
  );
};

export default Layout;
