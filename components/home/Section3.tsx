import { useTranslation, H1, Box } from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { Section } from "./Section";
import { useInView } from "react-intersection-observer";

const esAr = {};

const enUs = {};

export const Section3 = () => {
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
          ¿Por qué Florida?
        </Title>
        <UnorderedList
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
          py="6"
          inView={inView}
        >
          <ListItem>
            Un clima espléndido, playas paradisíacas, vida nocturna y un
            ambiente artístico y cultural diverso.
          </ListItem>
          <ListItem>
            Inversión en dólares con excelente rentabilidad, con un mercado
            inmobiliario pujante y en crecimiento.
          </ListItem>
          <ListItem>
            Concentra las 3 ciudades mas importantes del sureste de USA.
            Atlanta, Miami y Orlando.
          </ListItem>
          <ListItem>
            Amplia seguridad jurídica, baja carga impositiva y grandes
            incentivos a inversiones extranjeras
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
      transform: inView === false ? "translateY(200%)" : "translateY(0%)",
      transition: "all 0.6s ease",
      transitionDelay: "0.55s",
    },
    "li:nth-of-type(1)": { transitionDelay: "0.15s" },
    "li:nth-of-type(2)": { transitionDelay: "0.25s" },
    "li:nth-of-type(3)": { transitionDelay: "0.35s" },
    "li:nth-of-type(4)": { transitionDelay: "0.45s" },
  })
);

const ListItem = Box.withComponent("li");

const StyledSection = styled(Section)(({ theme: { colors } }) => ({
  textAlign: "center",
  background: colors.neutral.dark,
  color: colors.neutral.light,
  position: "relative",
}));

const Title = styled(H1)((props) => ({
  fontSize: props.theme.fontSizes[6],
}));
