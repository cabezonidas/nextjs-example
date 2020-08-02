import { useTranslation, H1, Box } from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { Section } from "./Section";
import { useInView } from "react-intersection-observer";

const esAr = {};

const enUs = {};

export const Section7 = () => {
  const { i18n } = useTranslation();

  i18n.addResourceBundle("en-US", "translation", { index: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { index: esAr }, true, true);
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <>
      <StyledSection
        ref={ref}
        px="5"
        py="8"
        display="flex"
        flexDirection="column"
        flex="1 auto"
      >
        <Title
          mb="4"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0px)" : "translateY(-30px)",
            transition: "all 1s",
          }}
        >
          Planes de inversión
        </Title>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          gridGap="8"
          m="auto"
        >
          <Card>
            Invertí en propiedades con un retorno anual promedio desde del 10%.
          </Card>
          <Card>Podés acceder desde 2000 dólares.</Card>
          <Card>Contratos renovables por 2 años.</Card>
          <Card>Pagos semestrales</Card>
        </Box>
      </StyledSection>
    </>
  );
};

const StyledSection = styled(Section)(({ theme: { colors } }) => ({
  textAlign: "center",
  color: colors.neutral.dark,
  position: "relative",
  background: colors.neutral.lightest,
}));

const Card = styled(Box)(({ theme: { colors } }) => ({
  height: "100%",
  alignSelf: "center",
  padding: 20,
  border: "1px solid #00000010",
  background: colors.neutral.light,
  borderRadius: 5,
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  flexDirection: "column",
}));

const Title = styled(H1)((props) => ({
  fontSize: props.theme.fontSizes[4],
}));
