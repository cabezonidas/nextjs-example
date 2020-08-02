import {
  useTranslation,
  H1,
  Box,
  useBreakpoint,
  Paragraph,
} from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { Section } from "./Section";
import { useInView } from "react-intersection-observer";

const esAr = {};

const enUs = {};

export const Section2 = () => {
  const { i18n } = useTranslation();

  i18n.addResourceBundle("en-US", "translation", { index: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { index: esAr }, true, true);
  const { isMediumSmall } = useBreakpoint();
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <>
      <StyledSection ref={ref}>
        <Box
          py="8"
          zIndex={1}
          display="grid"
          gridTemplateRows="auto 1fr"
          height="100%"
        >
          <Title
            my="4"
            py="4"
            pl="6"
            bg="#3b4852"
            width={"80%"}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0px)" : "translateY(-30px)",
              transition: "all 1s",
            }}
          >
            Inverte en USA
          </Title>
          <Box display="flex">
            <UnorderedList
              inView={inView}
              px="4"
              py="6"
              alignSelf="center"
              width="80%"
              m="auto"
              bg="#c5c5c5ed"
              borderRadius="5px"
              color="#000000"
            >
              <Paragraph mb="2">
                Invertimos en inmuebles de primera calidad y con alto potencial
                de revalorización en el estado de Florida, USA. Obtenemos una
                renta en dólares segura, rápida y sostenible.
              </Paragraph>

              <Paragraph>
                Creamos un crowdfunding para facilitar el acceso para pequeños y
                medianos inversores brindamos contratos válidos
                internacionalmente, resguardando el capital y las rentabilidades
              </Paragraph>
            </UnorderedList>
          </Box>
        </Box>

        <ImgContainer
          width={
            inView
              ? !isMediumSmall
                ? "100%"
                : "22%"
              : isMediumSmall
              ? "20%"
              : "100%"
          }
          position="relative"
          style={{
            transition: isMediumSmall ? "all 1s" : undefined,
          }}
        >
          <Img
            zIndex={0}
            src="https://ik.imagekit.io/syuhz8bmxl/Fondos/miami.jpg"
          />
        </ImgContainer>
      </StyledSection>
    </>
  );
};

const UnorderedList = styled(Box.withComponent("ul"))<{ inView?: boolean }>(
  ({ inView }) => ({
    li: {
      opacity: inView === false ? 0 : 1,
      transform: inView === false ? "translateY(200%)" : "translateY(0%)",
      transition: "all 0.6s ease",
      transitionDelay: "0.55s",
    },
    "li:nth-of-type(1)": { transitionDelay: "0.15s" },
    "li:nth-of-type(2)": { transitionDelay: "0.25s" },
  })
);

const ImgContainer = styled(Box)(() => ({
  height: "100%",
  position: "absolute",
  right: 0,
  top: 0,
  zIndex: 0,
}));
const Img = styled(Box)(() => ({
  height: "100%",
  objectFit: "cover",
  right: 0,
  top: 0,
})).withComponent("img");

const StyledSection = styled(Section)(({ theme: { colors } }) => ({
  textAlign: "left",
  background: colors.neutral.dark,
  color: colors.neutral.light,
  position: "relative",
}));

const Title = styled(H1)((props) => ({
  fontSize: props.theme.fontSizes[6],
}));
