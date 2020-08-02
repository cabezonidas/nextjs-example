import { useTranslation, H1, Box } from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { Section } from "./Section";
import { useInView } from "react-intersection-observer";

const esAr = {};

const enUs = {};

export const Section5 = () => {
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
          Nuestro compromiso
        </Title>
        <UnorderedList
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
          py="6"
          maxWidth="600px"
          alignSelf="center"
          inView={inView}
        >
          <ListItem>
            Latam Trading Club selecciona unidades premium y con mayor potencial
            de crecimiento y oportunidad de negocio.
          </ListItem>
          <ListItem>
            Creamos un crowdfunding para facilitar el acceso a inversiones
            inmobiliarias.
          </ListItem>
          <ListItem>
            La propiedad se alquila beneficiando a todos los participantes segun
            la proporción de dinero invertido.
          </ListItem>
          <ListItem>
            Enviamos contratos legales internacionalmente detallando montos,
            pagos y rentabilidad
          </ListItem>
          <ListItem>
            Fortalezas del sistema: a) Rentabilidad inmediata. b) Contratos
            comerciales c) Plazos prolongados d) Administración delegada.
          </ListItem>
        </UnorderedList>
      </StyledSection>
    </>
  );
};

const UnorderedList = styled(Box.withComponent("ul"))<{ inView?: boolean }>(
  ({ inView }) => ({
    li: {
      opacity: inView === false ? 0 : 1,
      transform: inView === false ? "translateX(10%)" : "translateX(0%)",
      transition: "all 0.6s ease",
      transitionDelay: "0.55s",
    },
    "li:nth-of-type(1)": { transitionDelay: "0.15s" },
    "li:nth-of-type(2)": { transitionDelay: "0.25s" },
    "li:nth-of-type(3)": { transitionDelay: "0.35s" },
    "li:nth-of-type(4)": { transitionDelay: "0.45s" },
  })
);

const ListItem = styled(Box.withComponent("li"))(({ theme: { colors } }) => ({
  background: colors.neutral.mediumDark,
  margin: 5,
  padding: 10,
  borderRadius: "5px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
}));

const StyledSection = styled(Section)(({ theme: { colors } }) => ({
  textAlign: "center",
  background: colors.neutral.dark,
  color: colors.neutral.light,
  position: "relative",
}));

const Title = styled(H1)((props) => ({
  fontSize: props.theme.fontSizes[4],
}));
