import {
  useTranslation,
  H1,
  H2,
  Box,
  useBreakpoint,
  transform,
  Button,
} from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { Section } from "./Section";
import Link from "next/link";

const esAr = {
  crowdFundingRealState: "Construye el futuro que quieras",
  landingPhrase: "Inversión segura en inmuebles",
  investInUsa: "Invertir en USA",
  view_projects: "Ver proyectos",
  blog: "Blog",
};

const enUs = {
  crowdFundingRealState: "Real state crowdfunding",
  landingPhrase: "Real state safe investment",
  investInUsa: "Invest in the US",
  view_projects: "View projects",
  blog: "Blog",
};

export const HomeLanding = () => {
  const { t, i18n } = useTranslation();
  const { isMediumSmall, isLarge } = useBreakpoint();
  const landingBackground =
    "https://ik.imagekit.io/syuhz8bmxl/Fondos/363385-1.jpg";

  const dimensions = () => {
    if (isLarge) {
      return { width: "1000px", height: "800px" };
    }
    if (!isMediumSmall) {
      return { width: "600px", height: "600px" };
    }
    return { width: "300px", height: "600px" };
  };

  const resizedLandingBackground = transform(landingBackground, {
    ...dimensions(),
  });

  i18n.addResourceBundle("en-US", "translation", { index: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { index: esAr }, true, true);

  return (
    <>
      <StyledSection url={resizedLandingBackground}>
        <Box
          zIndex={0}
          position="absolute"
          bottom={0}
          right={0}
          left={0}
          top={0}
          bg="#5766b540"
        />
        <Box
          zIndex={1}
          position="absolute"
          px="8"
          py="10%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
          width="100%"
          textAlign="center"
        >
          <Box>
            <Title mb="4" fontSize={[5, 6, 7]}>
              {t("index.landingPhrase")}
            </Title>
            <SubTitle fontSize={[2, 3, 4, 5]} py={[2, 3, 4, 5]}>
              {t("index.crowdFundingRealState")}
            </SubTitle>
          </Box>
          <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gridGap="2"
            width="max-content"
            m="auto"
          >
            <Link href="/pinned" passHref={true}>
              <Button variant="default" as="a">
                {t("index.view_projects")}
              </Button>
            </Link>
            <Link href="/posts" passHref={true}>
              <Button variant="primary" as="a">
                {t("index.blog")}
              </Button>
            </Link>
          </Box>
        </Box>
      </StyledSection>
    </>
  );
};

const StyledSection = styled(Section)<{ url: string }>(({ url }) => ({
  position: "relative",
  "&:before": {
    content: '""',
    backgroundImage: `url('${url}')`,
    backgroundSize: "cover",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: "1",
  },
}));

const Title = styled(H1)(({ theme: { mode, colors } }) => ({
  textTransform: "uppercase",
  fontWeight: "bold",
  color: mode === "light" ? colors.neutral.light : colors.neutral.darkest,
  textShadow:
    mode === "light" ? "0px 2px 2px rgb(103 102 102 / 37%)" : undefined,
}));

const SubTitle = styled(H2)(({ theme: { space, mode, colors } }) => ({
  fontWeight: "bold",
  textTransform: "uppercase",
  color: mode === "light" ? colors.neutral.light : colors.neutral.darkest,
  textShadow:
    mode === "light" ? "0px 2px 2px rgb(103 102 102 / 37%)" : undefined,
  padding: space[3],
  fontSize: "unset",
}));
