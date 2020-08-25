import { useTranslation, H1, Box } from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { companyName } from "../../utils/config";

const esAr = {
  about: {
    title: "Compromiso",
    li1: `${companyName} selecciona unidades premium y con mayor potencial de crecimiento y oportunidad de negocio.`,
    li2:
      "Creamos un crowdfunding para facilitar el acceso a inversiones inmobiliarias.",
    li3:
      "La propiedad se alquila beneficiando a todos los participantes según la proporción de dinero invertido.",
    li4:
      "Enviamos contratos legales internacionalmente detallando montos, pagos y rentabilidad",
    li5:
      "Rentabilidad inmediata, contratos comerciales, plazos prolongados y administración delegada.",
  },
};

const enUs = {
  about: {
    title: "Commitment",
    li1: `${companyName} selects premium houses with best growing potential.`,
    li2: "We create a fund to ease the process of investing in real state.",
    li3: "The units becomes a rental property, giving returns to investors.",
    li4:
      "You will sign a legal international contract that state term, payments and interests.",
    li5: "Immediate profit, comercial contracts, delegated administration",
  },
};

export const AboutCommitment = () => {
  const { t, i18n } = useTranslation();

  i18n.addResourceBundle("en-US", "translation", { index: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { index: esAr }, true, true);
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [inViewOnce, setInViewOnce] = useState(inView);
  useEffect(() => {
    inView && setInViewOnce(true);
  }, [inView]);

  return (
    <>
      <StyledSection
        ref={ref}
        display="flex"
        flexDirection="column"
        flex="1 auto"
      >
        <Title
          style={{
            opacity: inViewOnce ? 1 : 0,
            transform: inViewOnce ? "translateY(0px)" : "translateY(-30px)",
            transition: "all 1s",
          }}
        >
          {t("index.about.title")}
        </Title>
        <UnorderedList
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
          pt="2"
          maxWidth="600px"
          alignSelf="center"
          inView={inViewOnce}
        >
          <ListItem children={t("index.about.li1")} />
          <ListItem children={t("index.about.li2")} />
          <ListItem children={t("index.about.li3")} />
          <ListItem children={t("index.about.li4")} />
          <ListItem children={t("index.about.li5")} />
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

const ListItem = styled(Box.withComponent("li"))(
  ({ theme: { colors, mode } }) => ({
    background:
      mode === "dark" ? colors.neutral.mediumDark : colors.neutral.light,
    margin: "5px 0",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  })
);

const StyledSection = styled(Box)(() => ({
  position: "relative",
})).withComponent("section");

const Title = styled(H1)((props) => ({
  fontSize: props.theme.fontSizes[4],
}));
