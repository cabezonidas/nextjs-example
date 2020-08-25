import {
  useTranslation,
  Box,
  Paragraph,
  useTheme,
  Button,
} from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { Section } from "./Section";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const esAr = {
  home: {
    florida: {
      florida_oportunity: "Oportunidades en Florida",
      florida_features:
        "Clima espléndido, con playas paradisíacas, vida nocturna y ambiente artístico y cultural diverso todo el año.",
      invest_now: "Invertir ahora",
      anual_rates_from: "Retornos desde el 8% anual",
      process:
        "Compramos propiedades en Florida, administramos los alquileres y distribuimos la rentra entre los inversores",
      simple_transparent: "Simple y transparente",
      brand_phrase:
        "Somos la única empresa del mercado que te asegura el 100% de tu capital y de los retornos. Contratos desde 2 años y desde cualquier país.",
    },
  },
};

const enUs = {
  home: {
    florida: {
      florida_oportunity: "Oportunities in Florida",
      florida_features:
        "Outstanding weather, paradise landscapes, nightlife and diverse and artistic atmospherey all year round.",
      invest_now: "Invest now",
      anual_rates_from: "Interests from 8% annually",
      process:
        "We buy properties in Florida, manage the rents and distribute the gains with the investors",
      simple_transparent: "Easy and reliable",
      brand_phrase:
        "The only company in the market that guarantees 100% of for capital and profits. Contracts from 2 years no matter your country.",
    },
  },
};

export const HomeFlorida = () => {
  const { t, i18n } = useTranslation();
  const { colors, mode } = useTheme();

  i18n.addResourceBundle("en-US", "translation", { index: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { index: esAr }, true, true);

  const [ref, inView] = useInView({ threshold: 0.2 });

  const bg =
    "https://ik.imagekit.io/syuhz8bmxl/Fondos/ccd8d54b987a4f7137dea03ced923f1fa90c8b7c980eb2e13fe6935bcfee0598.jpg";

  return (
    <StyledSection
      ref={ref}
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
      gridTemplateRows={"1fr"}
    >
      <Box
        backgroundImage={`url('${bg}')`}
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
        display="grid"
        gridTemplateRows="1fr auto"
      >
        <Box
          alignSelf="center"
          zIndex={1}
          color={colors.neutral.lightest}
          fontSize={[1, 2]}
          display="grid"
          gridTemplateRows="auto 1fr"
          height="100%"
          maxWidth="400px"
          ml="auto"
          p={[4, 5, 6, 7, 8]}
        >
          <Box
            as="h1"
            my={[4, 5]}
            fontSize={[4, 5]}
            style={{ textOverflow: "ellipsis", overflow: "hidden" }}
          >
            {t("index.home.florida.florida_oportunity")}
          </Box>
          <UnorderedList
            display="flex"
            flexDirection="column"
            height="100%"
            inView={inView}
          >
            <Paragraph as="li" fontSize={[1, 2]} alignSelf="flex-start" mb="2">
              {t("index.home.florida.florida_features")}
            </Paragraph>
          </UnorderedList>
        </Box>
        <Link href="/pinned" passHref={true}>
          <Box
            justifyContent="space-between"
            display="flex"
            height="100%"
            width="100%"
            maxWidth="400px"
            ml="auto"
            p={[4, 5, 6, 7, 8]}
          >
            <Link href="/pinned" passHref={true}>
              <Button
                variant="primary"
                zIndex={1}
                width="min-content"
                my={[4, 5, 6, 7]}
                mx="auto"
                as="a"
              >
                {t("index.home.florida.invest_now")}
              </Button>
            </Link>
          </Box>
        </Link>
        <Box
          zIndex={0}
          position="absolute"
          bottom={0}
          right={0}
          left={0}
          top={0}
          bg="#171717de"
        />
      </Box>
      <Box height="100%" display="grid">
        <Box
          bg={
            mode === "light"
              ? colors.neutral.lightest
              : colors.neutral.mediumDark
          }
          color={
            mode === "light" ? colors.neutral.darkest : colors.neutral.lightest
          }
          fontSize={[1, 2]}
          display="flex"
          p={[4, 5, 6, 7, 8]}
        >
          <Box alignSelf={"center"} maxWidth="400px">
            <Box
              as="h1"
              mb="2"
              style={{ textTransform: "uppercase" }}
              fontSize={[2, 3, 4]}
            >
              {t("index.home.florida.anual_rates_from")}
            </Box>
            <Paragraph>{t("index.home.florida.process")}</Paragraph>
          </Box>
        </Box>
        <Box
          bg={mode === "light" ? colors.neutral.light : colors.neutral.dark}
          color={
            mode === "light" ? colors.neutral.dark : colors.neutral.lightest
          }
          fontSize={[1, 2]}
          display="flex"
          p={[4, 5, 6, 7, 8]}
        >
          <Box alignSelf={"center"} maxWidth="400px">
            <Box
              as="h1"
              mb="2"
              style={{ textTransform: "uppercase" }}
              fontSize={[2, 3, 4]}
            >
              {t("index.home.florida.simple_transparent")}
            </Box>
            <Paragraph>{t("index.home.florida.brand_phrase")}</Paragraph>
          </Box>
        </Box>
      </Box>
    </StyledSection>
  );
};

const UnorderedList = styled(Box.withComponent("ul"))<{ inView?: boolean }>(
  ({ inView }) => ({
    li: {
      opacity: inView === false ? 0 : 1,
      transform: inView === false ? "translateY(200%)" : "translateY(0%)",
      transition: "transform 0.6s ease, opacity 0.6s ease",
      transitionDelay: "0.55s",
    },
    "li:nth-of-type(1)": { transitionDelay: "0.15s" },
    "li:nth-of-type(2)": { transitionDelay: "0.25s" },
    "li:nth-of-type(3)": { transitionDelay: "0.35s" },
    "li:nth-of-type(4)": { transitionDelay: "0.45s" },
  })
);

const StyledSection = styled(Section)(({ theme: { colors } }) => ({
  textAlign: "left",
  background: colors.neutral.dark,
  color: colors.neutral.light,
  position: "relative",
}));
