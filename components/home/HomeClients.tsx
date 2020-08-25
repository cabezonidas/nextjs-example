import {
  useTranslation,
  H1,
  Box,
  Paragraph,
  useBreakpoint,
  transform,
} from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { Section } from "./Section";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const esAr = {};

const enUs = {};

// TODO: NOT PUBLISHED
export const HomeClients = () => {
  const { i18n } = useTranslation();

  i18n.addResourceBundle("en-US", "translation", { index: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { index: esAr }, true, true);
  const [ref, inView] = useInView({ threshold: 0.2 });

  const { isLarge, isMediumSmall } = useBreakpoint();
  const landingBackground =
    "https://ik.imagekit.io/syuhz8bmxl/Fondos/dollars.jpg";

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

  return (
    <>
      <StyledSection
        ref={ref}
        style={{
          backgroundImage: `url('${resizedLandingBackground}')`,
          backgroundSize: "cover",
        }}
        position="relative"
      >
        <Box
          position="absolute"
          px="5"
          py="8"
          display="grid"
          gridTemplateRows="auto 1fr auto"
          bg="#f5f5dce0"
          top={0}
          bottom={0}
          left={0}
          right={0}
        >
          <Title
            mb="4"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0px)" : "translateY(-30px)",
              transition: "all 1s",
            }}
            textAlign="center"
          >
            Hasta el momento tenemos
          </Title>

          <Box
            display="grid"
            gridTemplateColumns="repeat(3, auto)"
            height="max-content"
            alignSelf="center"
          >
            <Box>
              <Box fontWeight="bold" fontSize={[4, 6, 8]}>
                <CountUp end={inView ? 80 : 0} duration={inView ? 1 : 0} />
              </Box>
              <Box>Usuarios registrados</Box>
            </Box>
            <Box>
              <Box fontWeight="bold" fontSize={[4, 6, 8]}>
                US$
                <CountUp end={inView ? 450 : 0} duration={inView ? 1 : 0} />m
              </Box>
              <Box>Invertidos</Box>
            </Box>
            <Box>
              <Box fontWeight="bold" fontSize={[4, 6, 8]}>
                <CountUp end={inView ? 3 : 0} duration={inView ? 2 : 0} />
              </Box>
              <Box>Propiedades financiadas</Box>
            </Box>
          </Box>
          <Text my="4">
            Oportunidades seguras respaldadas por activos elegidos especialmente
            para ti
          </Text>
        </Box>
      </StyledSection>
    </>
  );
};

const StyledSection = styled(Section)(({ theme: { colors } }) => ({
  textAlign: "center",
  color: colors.neutral.darkest,
  position: "relative",
}));

const Title = styled(H1)((props) => ({
  fontSize: props.theme.fontSizes[6],
}));

const Text = styled(Paragraph)((props) => ({
  fontSize: props.theme.fontSizes[3],
}));
