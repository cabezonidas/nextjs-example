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

const esAr = {
  crowdFundingRealState: "Crowdfunding inmobiliario",
  landingPhrase: "Inversión segura en inmuebles",
  investInUsa: "Invertir en USA",
};

const enUs = {
  crowdFundingRealState: "Real state crowdfunding",
  landingPhrase: "Real state safe investment",
  investInUsa: "Invest in the US",
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
        >
          <Box>
            <Title mb="4" fontSize={[5, 6, 7]}>
              {t("index.landingPhrase")}
            </Title>
            <SubTitle fontSize={[2, 3, 4, 5]}>
              {t("index.crowdFundingRealState")}
            </SubTitle>
          </Box>
          <ScrollButton variant="default">
            {t("index.investInUsa")}
          </ScrollButton>
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

const ScrollButton = styled(Button.withComponent("a"))(({ theme }) => ({
  width: "max-content",
  alignSelf: "center",
  padding: `${theme.space[4]} ${theme.space[8]}`,
  borderRadius: theme.space[2],
}));

const Title = styled(H1)(() => ({
  textTransform: "uppercase",
  fontWeight: "bold",
  textShadow: "0px 2px 2px rgb(103 102 102 / 37%)",
}));

const SubTitle = styled(H2)((props) => ({
  fontWeight: "bold",
  textTransform: "uppercase",
  textShadow: "0px 2px 2px rgb(103 102 102 / 37%)",
  color: props.theme.colors.primary.lightest,
  background: props.theme.colors.primary.dark,
  width: "min-content",
  padding: props.theme.space[3],
  fontSize: "unset",
}));
