import { useTranslation, H1, H2, Box, Paragraph } from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { Section } from "./Section";
import { useInView } from "react-intersection-observer";

const esAr = {};

const enUs = {};

export const HomeHow = () => {
  const { i18n } = useTranslation();

  i18n.addResourceBundle("en-US", "translation", { index: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { index: esAr }, true, true);
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <>
      <StyledSection
        ref={ref}
        px="5"
        py={[2, 3, 4, 8]}
        display="flex"
        flexDirection="column"
        flex="1 auto"
      >
        <Box
          as="h1"
          fontSize={[4, 5, 6]}
          my={[6, 7, 8]}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0px)" : "translateY(-30px)",
            transition: "transform 1s, opacity 1s",
          }}
        >
          ¿Cómo comenzar a invertir?
        </Box>
        <SubTitle
          my={[1, 2, 4, 6, 8]}
          fontSize={[1, 2]}
          maxWidth="80%"
          m="auto"
        >
          Te proponemos que comiences a rentabilizar tus ahorros con nuestro
          Crowdfunding Inmobiliario.
        </SubTitle>
        <UnorderedList
          inView={inView}
          gridGap={[4, 5]}
          maxWidth={["max-content", "max-content", "800px"]}
        >
          <Card>
            <Paragraph>
              Se registra en nuestra plataforma web rápido y seguro.
            </Paragraph>
            <Paragraph>Elige el plan de Inversion.</Paragraph>
          </Card>
          <Card>
            <Paragraph>
              Se envía el dinero a la cuenta corporativa de Latam Investing Club
              en USA.
            </Paragraph>
            <Paragraph>Se firma el contrato digital.</Paragraph>
          </Card>
          <Card>
            <Paragraph>
              Disfruta de una renta segura, en dólares y sustentable en el
              tiempo.
            </Paragraph>
          </Card>
        </UnorderedList>
      </StyledSection>
    </>
  );
};

const StyledSection = styled(Section)(({ theme: { colors } }) => ({
  textAlign: "center",
  color: colors.neutral.dark,
  position: "relative",
  backgroundColor: "#f5f5f5",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='693' height='693' viewBox='0 0 200 200'%3E%3Cpolygon fill='%23f0f0f0' points='100 0 0 100 100 100 100 200 200 100 200 0'/%3E%3C/svg%3E")`,
}));

const UnorderedList = styled(Box.withComponent("ul"))<{ inView?: boolean }>(
  ({ inView }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    margin: "auto",
    li: {
      opacity: inView === false ? 0 : 1,
      transform: inView === false ? "translateX(10%)" : "translateX(0%)",
      transition: "transform 0.6s ease, opacity 0.6s ease",
      transitionDelay: "0.55s",
    },
    "li:nth-of-type(1)": { transitionDelay: "0.15s" },
    "li:nth-of-type(2)": { transitionDelay: "0.25s" },
    "li:nth-of-type(3)": { transitionDelay: "0.35s" },
    "li:nth-of-type(4)": { transitionDelay: "0.45s" },
  })
);

const Card = styled(Box.withComponent("li"))(
  ({ theme: { colors, space } }) => ({
    height: "100%",
    alignSelf: "center",
    border: `1px solid ${colors.secondary.darkest}`,
    background: colors.neutral.lightest,
    borderRadius: 5,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    display: "grid",
    justifyContent: "center",
    alignContent: "center",
    gridRowGap: space[3],
    borderBottom: `6px solid ${colors.secondary.darkest}`,
  })
);

Card.defaultProps = {
  p: [3, 4, 5, 6],
  minHeight: ["auto", "auto", "500px"],
};

const SubTitle = styled(H2)(() => ({ fontSize: "unset" }));
