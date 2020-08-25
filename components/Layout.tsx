import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import {
  useTranslation,
  Box,
  ResponsiveLayout,
  InvestingClubLatam,
  HeaderLink,
  NavLink,
  FooterLink,
  Whatsapp,
  Instagram,
  Facebook,
  Messenger,
  Email,
  SvgIcon,
  Svg,
  Toggle,
  useTheme,
  LanguageButton,
} from "@cabezonidas/shop-ui";
import { useGetPinnedPublicPathsQuery, useMeQuery } from "../graphql-queries";
import { usePostMapping } from "../utils/helpers";
import { companyName } from "../utils/config";
import { toggleDarkMode } from "../lib/darkMode";
import Cookie from "js-cookie";

type Props = {
  documentTitle?: string | null;
  onMainScrollBottom?: () => void;
};

const enUsRoutes = {
  routes: {
    home: "Home",
    about: "Us",
    pinned: "Investements",
    profile: "Profile",
    blog: "Blog",
  },
  footer: {
    darkMode: "Dark mode",
    language: "Language",
  },
};
const esArRoutes = {
  routes: {
    home: "Inicio",
    about: "Nosotros",
    pinned: "Inversiones",
    perfil: "Perfil",
    profile: "Profile",
    blog: "Blog",
  },
  footer: {
    darkMode: "Modo oscuro",
    language: "Language",
  },
};

const Layout = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Box> & Props
>((props, ref) => {
  const { documentTitle, children, onMainScrollBottom, ...boxProps } = props;
  const { t, i18n } = useTranslation();
  const { getPostTitle } = usePostMapping();
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

  const { data: meData } = useMeQuery();

  const logged = !!meData?.me;

  const { mode, setThemeMode } = useTheme();

  React.useEffect(() => {
    Cookie.set("language", i18n.language);
  }, [i18n.language]);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap"
          rel="stylesheet"
        ></link>
        {documentTitle && <title>{documentTitle}</title>}
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta property="og:locale" content="es_AR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:site_name" content={companyName} />
      </Head>
      <ResponsiveLayout
        header={
          <Box display="grid" gridTemplateColumns="1fr auto">
            <Link href="/" passHref={true}>
              <Box
                display="flex"
                alignItems="center"
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                <InvestingClubLatam />
                <Box
                  style={{
                    textTransform: "uppercase",
                    fontSize: "8px",
                    marginLeft: "4px",
                    maxWidth: "50px",
                    maxHeight: "30px",
                    overflow: "hidden",
                    fontWeight: "bold",
                  }}
                >
                  <Box style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                    Latam
                  </Box>
                  <Box style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                    Investing
                  </Box>
                  <Box style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                    Club
                  </Box>
                </Box>
              </Box>
            </Link>
            <Box alignSelf="center" display="flex">
              <Link href="/pinned" passHref={true}>
                <HeaderLink>{t("layout.routes.pinned")}</HeaderLink>
              </Link>
              <Link href="/about" passHref={true}>
                <HeaderLink>{t("layout.routes.about")}</HeaderLink>
              </Link>
              <Link href="/profile" passHref={true}>
                <HeaderLink
                  display="flex"
                  aria-label={t("layout.routes.profile")}
                >
                  {logged ? (
                    <UserSvg alignSelf="center" width="16" height="16" />
                  ) : (
                    <KeySvg alignSelf="center" width="16" height="16" />
                  )}
                </HeaderLink>
              </Link>
            </Box>
          </Box>
        }
        nav={
          <>
            <Link href="/" passHref={true}>
              <NavLink>{t("layout.routes.home")}</NavLink>
            </Link>
            <Link href={"/about"} passHref={true}>
              <NavLink>{t("layout.routes.about")}</NavLink>
            </Link>
            <Link href={"/posts"} passHref={true}>
              <NavLink>{t("layout.routes.blog")}</NavLink>
            </Link>
            {data?.getPinnedPublicPaths.map((i) => {
              return (
                <Link
                  key={i._id}
                  href={"/pinned/[id]"}
                  as={`/pinned/${i._id}`}
                  passHref={true}
                >
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
              gridTemplateColumns="auto 1fr 50px 50px 50px 50px 50px"
              width="100%"
              alignItems="center"
            >
              <Toggle
                style={{ transform: "scale(0.8)" }}
                aria-label={t("layout.footer.darkMode")}
                variant={"dark-mode"}
                checked={mode === "dark"}
                onChange={() => {
                  const newMode = toggleDarkMode();
                  setThemeMode(newMode);
                }}
              />
              <LanguageButton style={{ maxWidth: "max-content" }} />
              <FooterLink href="mailto:latamtradingclub@gmail.com">
                <Email />
              </FooterLink>
              <FooterLink href="https://api.whatsapp.com/send?phone=+5491151398747">
                <Whatsapp />
              </FooterLink>
              <FooterLink href="https://www.instagram.com/tradingclublatam">
                <Instagram />
              </FooterLink>
              <FooterLink href="https://www.facebook.com/latamtradingclub">
                <Facebook />
              </FooterLink>
              <FooterLink href="https://www.messenger.com/t/latamtradingclub">
                <Messenger />
              </FooterLink>
            </Box>
          </Box>
        }
        onMainScrollBottom={onMainScrollBottom}
      >
        <Box ref={ref} maxWidth="600px" mx="auto" px="2" pt="4" {...boxProps}>
          {children}
        </Box>
      </ResponsiveLayout>
    </>
  );
});

export default Layout;

export const KeySvg = React.forwardRef<SVGSVGElement, SvgIcon>((props, ref) => {
  return (
    <Svg viewBox="0 0 50 50" fill="currentColor" {...props} ref={ref}>
      <path
        d="M46.5,14.2c-0.3-0.4-0.7-0.7-1-1c-2.6-2.6-2.6-2.6-0.1-5.2c0.7-0.7,0.7-1.1,0-1.7c-1.1-1-2.2-2-3.1-3.1
	c-0.8-1-1.3-0.9-2.2,0c-6.7,6.8-13.5,13.5-20.2,20.3c-0.9,0.9-1.6,1.2-3,0.8C9.2,21.9,1.4,28,1.6,35.9C1.8,43,8.1,48.5,15,47.5
	c8.1-1.2,12.6-9.3,9.3-16.8c-0.3-0.8-0.5-1.2,0.2-1.9c2.5-2.4,5-4.9,7.4-7.4c0.6-0.6,0.9-0.5,1.4,0c1.4,1.5,2.9,3,4.4,4.4
	c0.4,0.4,0.6,0.8,1.3,0.3c3-2.3,3.1-2.6,0.5-5.2c-0.4-0.4-0.8-0.8-1.2-1.2c-2.5-2.5-2.5-2.5,0.1-5c0.7-0.7,1.1-0.6,1.7,0
	c1.4,1.5,2.8,2.9,4.3,4.3c0.3,0.3,0.6,1,1.2,0.3c0.9-1,2.2-1.8,2.7-2.9C48.7,15.8,47.1,15,46.5,14.2z M13.5,40.4
	c-2.5,0-4.7-2.2-4.7-4.6c0-2.5,2.2-4.8,4.7-4.9c2.5,0,4.8,2.2,4.8,4.8C18.3,38.3,16.1,40.4,13.5,40.4z"
      />
    </Svg>
  );
});

export const UserSvg = React.forwardRef<SVGSVGElement, SvgIcon>(
  (props, ref) => {
    return (
      <Svg viewBox="0 0 32 32" {...props} ref={ref}>
        <circle
          stroke="currentColor"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          cx="16"
          cy="16"
          r="14"
        />
        <circle
          stroke="currentColor"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          cx="16"
          cy="13"
          r="5"
        />
        <path
          stroke="currentColor"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          d="M5.4,25.1c1.8-4.1,5.8-7,10.6-7c4.8,0,8.9,2.9,10.6,7"
        />
      </Svg>
    );
  }
);
