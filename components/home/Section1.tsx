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

export const Section1 = () => {
  const { t, i18n } = useTranslation();
  const { isMediumSmall, isLarge } = useBreakpoint();
  const landingBackground =
    "https://ik.imagekit.io/syuhz8bmxl/Fondos/atlanta.jpeg";

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
            <Title mb="4">{t("index.landingPhrase")}</Title>
            <SubTitle>{t("index.crowdFundingRealState")}</SubTitle>
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
  "&:before": {
    content: '""',
    backgroundImage: `url('${url}')`,
    backgroundSize: "cover",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: "0.15",
  },
}));

const ScrollButton = styled(Button.withComponent("a"))(({ theme }) => ({
  width: "max-content",
  alignSelf: "center",
  padding: `${theme.space[4]} ${theme.space[8]}`,
  borderRadius: theme.space[2],
}));

const Title = styled(H1)((props) => ({
  fontSize: props.theme.fontSizes[6],
}));

const SubTitle = styled(H2)((props) => ({
  fontSize: props.theme.fontSizes[4],
  fontWeight: "bold",
  textTransform: "uppercase",
  color: props.theme.colors.warning.medium,
}));
