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
import { useGetPinnedPublicPathsQuery } from "../graphql-queries";
import { usePostTranslation } from "../utils/helpers";

type Props = {
  title?: string | null;
  onMainScrollBottom?: () => void;
};

const enUsRoutes = {
  routes: {
    home: "Home",
    about: "Us",
    pinned: "Investements",
  },
  footer: "I'm here to stay!",
};
const esArRoutes = {
  routes: {
    home: "Inicio",
    about: "Nosotros",
    pinned: "Inversiones",
  },
  footer: "Estoy para quedarme!",
};

const Layout: React.FunctionComponent<Props> = (props) => {
  const { title, children, onMainScrollBottom } = props;
  const { t, i18n } = useTranslation();
  const { getPostTitle } = usePostTranslation();
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
  const { data } = useGetPinnedPublicPathsQuery();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <ResponsiveLayout
        header={
          <Box display="grid" gridTemplateColumns="1fr auto">
            <Link href="/">
              <TradingClubLatam style={{ cursor: "pointer" }} />
            </Link>
            <Box alignSelf="center">
              <Link href="/pinned">
                <HeaderLink>{t("layout.routes.pinned")}</HeaderLink>
              </Link>
              <Link href="/about">
                <HeaderLink>{t("layout.routes.about")}</HeaderLink>
              </Link>
            </Box>
          </Box>
        }
        nav={
          <>
            <Link href="/">
              <NavLink>{t("layout.routes.home")}</NavLink>
            </Link>
            <Link href={"/about"}>
              <NavLink>{t("layout.routes.about")}</NavLink>
            </Link>
            {data?.getPinnedPublicPaths.map((i) => {
              return (
                <Link key={i._id} href={"/pinned/[id]"} as={`/pinned/${i._id}`}>
                  <NavLink>{getPostTitle(i.titles)}</NavLink>
                </Link>
              );
            })}
          </>
        }
        footer={
          <Box display="flex" justifyContent="space-between">
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
        onMainScrollBottom={onMainScrollBottom}
      >
        <Box maxWidth="600px" mx="auto" px="2" pt="4">
          {children}
        </Box>
      </ResponsiveLayout>
    </>
  );
};

export default Layout;
