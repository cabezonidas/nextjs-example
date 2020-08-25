import {
  useTranslation,
  Box,
  Paragraph,
  Svg,
  SvgIcon,
} from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { Section } from "./Section";
import { useInView } from "react-intersection-observer";
import { forwardRef } from "react";

const esAr = {
  home: {
    workflow: {
      benefits: "Nuestras ventajas",
      head1: "Fondos colaborativos",
      p1:
        "Creamos un crowdfunding para facilitar el acceso a multiples inversionistas.",
      head2: "Productos premium",
      p2:
        "Seleccionamos unidades de primera calidad y con alto potencial  de revalorizacion en USA.",
      head3: "Renta inmediata",
      p3: "Obtenga ganancias seguras y sostenibles en el tiempo",
      head4: "Contratos internacionales",
      p4: "Garantizamos el resguardo del capital y rentabilidades",
    },
  },
};

const enUs = {
  home: {
    workflow: {
      benefits: "Benefits",
      head1: "Collaborative funds",
      p1: "We open a crowdfund to get to multiple investors.",
      head2: "Premium houses",
      p2:
        "Selection of units with the heighest standards with best potential in the US.",
      head3: "Immediate rent",
      p3: "You get your profit and passive income in the long term",
      head4: "International contracts",
      p4: "We make sure your capital gains are guaranteed",
    },
  },
};

export const HomeWorkflow = () => {
  const { t, i18n } = useTranslation();

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
          {t("index.home.workflow.benefits")}
        </Box>
        <UnorderedList
          inView={inView}
          gridGap={[4, 5]}
          maxWidth={["max-content", "max-content", "800px"]}
        >
          <Card>
            <ImageBox>
              <CollaborativeSvg />
            </ImageBox>

            <Box>
              <ParagraphHeader>
                {t("index.home.workflow.head1")}
              </ParagraphHeader>
              <Text>{t("index.home.workflow.p1")}</Text>
            </Box>
          </Card>
          <Card>
            <ImageBox>
              <PremiumSvg />
            </ImageBox>
            <Box>
              <ParagraphHeader>
                {t("index.home.workflow.head2")}
              </ParagraphHeader>
              <Text>{t("index.home.workflow.p2")}</Text>
            </Box>
          </Card>
          <Card>
            <ImageBox>
              <ProfitSvg />
            </ImageBox>
            <Box>
              <ParagraphHeader>
                {t("index.home.workflow.head3")}
              </ParagraphHeader>
              <Text>{t("index.home.workflow.p3")}</Text>
            </Box>
          </Card>
          <Card>
            <ImageBox>
              <ContractSvg />
            </ImageBox>
            <Box>
              <ParagraphHeader>
                {t("index.home.workflow.head4")}
              </ParagraphHeader>
              <Text>{t("index.home.workflow.p4")}</Text>
            </Box>
          </Card>
        </UnorderedList>
      </StyledSection>
    </>
  );
};

const StyledSection = styled(Section)(({ theme: { mode } }) => ({
  textAlign: "center",
  position: "relative",
  backgroundColor: mode === "light" ? "#f5f5f5" : `#363a3ee6`,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='693' height='693' viewBox='0 0 200 200'%3E%3Cpolygon fill='${
    mode === "light" ? "%23f0f0f0" : "%23363a3e"
  }' points='100 0 0 100 100 100 100 200 200 100 200 0'/%3E%3C/svg%3E")`,
}));

const UnorderedList = styled(Box.withComponent("ul"))<{ inView?: boolean }>(
  ({ inView, theme: { colors } }) => ({
    color: colors.neutral.dark,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
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
  ({ theme: { colors, space, mode } }) => ({
    height: "100%",
    alignSelf: "center",
    border: `1px solid ${colors.secondary.darkest}`,
    background: mode === "light" ? colors.neutral.lightest : "#dcdcdc",
    borderRadius: 5,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    justifyContent: "center",
    gridRowGap: space[3],
    borderBottom: `6px solid ${colors.secondary.darkest}`,
    display: "grid",
    alignContent: "flex-start",
  })
);

const ParagraphHeader = styled(Paragraph.withComponent("h3"))(
  ({ theme: { colors } }) => ({
    textTransform: "uppercase",
    color: colors.primary.mediumDark,
  })
);

ParagraphHeader.defaultProps = {
  mb: [2, 3, 4, 5],
};

const ImageBox = styled(Box)(() => ({
  margin: "0 auto",
  alignSelf: "flex-end",
}));

ImageBox.defaultProps = {
  width: ["30px", "30px", "50px"],
  height: ["30px", "30px", "50px"],
};

Card.defaultProps = {
  p: [3, 4, 5, 6],
  minHeight: "auto",
};

const Text = styled(Paragraph)(() => ({}));
Text.defaultProps = {
  fontSize: [1, 2],
};

export const ContractSvg = forwardRef<SVGSVGElement, SvgIcon>((props, ref) => {
  return (
    <Svg
      viewBox="0 0 36.8 38.4"
      width="100%"
      height="100%"
      {...props}
      ref={ref}
    >
      <g>
        <polygon
          fill="#616E7D"
          points="20.1,6.4 20.1,3.3 10.1,3.3 10.1,6.4 12.1,6.4 12.1,5.9 12.7,5.9 12.7,6.4 17.5,6.4 17.5,5.9 
		18.2,5.9 18.2,6.4 	"
        />
        <path
          fill="#AAD3C7"
          d="M18.2,7.8V7.3h2.4c0.1,0,0.2,0,0.3-0.1C21,7.1,21,7,21,6.9V3.1V2.9c0-0.1,0-0.2-0.1-0.3
		c-0.1-0.1-0.2-0.1-0.3-0.1H9.7c-0.1,0-0.2,0-0.3,0.1C9.3,2.6,9.2,2.7,9.2,2.9v0.2v3.8c0,0.1,0,0.2,0.1,0.3c0.1,0.1,0.2,0.1,0.3,0.1
		h2.4v0.5h0.7V7.3h4.8v0.5H18.2z M12.7,6.4V5.9h-0.7v0.5h-1.9V3.3h10v3.1h-1.9V5.9h-0.7v0.5H12.7z"
        />
        <path
          fill="#FFFFFF"
          d="M32.6,35.9V10.8H14.1v25.1H32.6z M16.5,14h15v1.7h-15V14z M15.2,18h16.3v1.7H15.2V18z M15.2,21.9h16.3v1.7
		H15.2V21.9z M15.2,25.9h16.3v1.7H15.2V25.9z M15.2,29.9h14v1.7h-14V29.9z"
        />
        <path
          fill="#616E7D"
          d="M13.2,36.8c0.1,0.1,0.2,0.2,0.4,0.2h19.6c0.1,0,0.3-0.1,0.4-0.2c0.1-0.1,0.2-0.2,0.2-0.4V10.3
		c0-0.1-0.1-0.3-0.2-0.4c-0.1-0.1-0.2-0.2-0.4-0.2h-6.6V4.7c0-0.4-0.2-0.9-0.5-1.2c-0.3-0.3-0.7-0.5-1.2-0.5H21v3.8
		c0,0.1,0,0.2-0.1,0.3c-0.1,0.1-0.2,0.1-0.3,0.1h-2.4v0.5h-0.7V7.3h-4.8v0.5h-0.7V7.3H9.7c-0.1,0-0.2,0-0.3-0.1
		C9.3,7.1,9.2,7,9.2,6.9V3.1H5.3c-0.4,0-0.9,0.2-1.2,0.5C3.9,3.9,3.7,4.3,3.7,4.7v27.5c0,0.4,0.2,0.9,0.5,1.2
		c0.3,0.3,0.7,0.5,1.2,0.5H13v2.5C13,36.6,13.1,36.7,13.2,36.8z M14.1,10.8h18.5v25.1H14.1V10.8z"
        />
        <rect x="16.5" y="14" fill="#82BFAB" width="15" height="1.7" />
        <rect x="15.2" y="18" fill="#82BFAB" width="16.3" height="1.7" />
        <rect x="15.2" y="21.9" fill="#82BFAB" width="16.3" height="1.7" />
        <rect x="15.2" y="25.9" fill="#82BFAB" width="16.3" height="1.7" />
        <rect x="15.2" y="29.9" fill="#82BFAB" width="14" height="1.7" />
      </g>
    </Svg>
  );
});

export const ProfitSvg = forwardRef<SVGSVGElement, SvgIcon>((props, ref) => {
  return (
    <Svg
      viewBox="0 0 37.5 37.4"
      width="100%"
      height="100%"
      {...props}
      ref={ref}
    >
      <g>
        <path
          fill="#616E7D"
          d="M8.3,10.7c0,4.1,3.3,7.4,7.4,7.4c4.1,0,7.4-3.3,7.4-7.4c0-4.1-3.3-7.4-7.4-7.4C11.7,3.3,8.3,6.6,8.3,10.7z
		 M21.5,10.7c0,3.1-2.5,5.7-5.7,5.7c-3.1,0-5.7-2.5-5.7-5.7c0-3.1,2.5-5.7,5.7-5.7C18.9,5,21.5,7.5,21.5,10.7z"
        />
        <path
          fill="#FFFFFF"
          d="M15.6,15h0.7c0.2,0,0.4-0.2,0.4-0.4V14c0.5-0.1,1-0.2,1.4-0.5c0.6-0.4,0.9-1,0.9-1.7c0-0.4-0.1-0.8-0.4-1.1
		c-0.4-0.5-1.1-0.8-1.9-0.9V8.6c0.2,0.1,0.3,0.2,0.4,0.3C17.1,9,17.2,9,17.4,9C17.4,9,17.6,9,17.6,9l0,0l0.7-0.5
		c0.1-0.1,0.1-0.1,0.2-0.2c0-0.1,0-0.1-0.1-0.2c-0.5-0.5-1-0.8-1.8-1V6.4c0-0.2-0.2-0.4-0.4-0.4h-0.7c-0.2,0-0.4,0.2-0.4,0.4v0.7
		c-0.3,0-0.6,0.1-0.9,0.3c-0.9,0.4-1.3,1-1.3,1.8c0,0.4,0.1,0.7,0.3,1c0.4,0.5,1,0.8,1.8,1v1.5c-0.4-0.1-0.7-0.4-1-0.7
		c-0.1-0.1-0.2-0.1-0.3-0.1c-0.1,0-0.2,0.1-0.2,0.1l0,0l-0.7,0.4c-0.1,0.1-0.2,0.2-0.2,0.3c0,0.1,0,0.1,0.1,0.2
		c0.2,0.2,0.4,0.5,0.7,0.7c0.5,0.4,1,0.6,1.6,0.7v0.6C15.2,14.8,15.4,15,15.6,15z M16.6,11.3c0.4,0.1,0.5,0.3,0.5,0.6
		c0,0.3-0.1,0.5-0.4,0.6c0,0-0.1,0.1-0.1,0.1V11.3z M14.8,9.1c0-0.2,0.1-0.4,0.4-0.5l0,0v1.1C15,9.6,14.8,9.4,14.8,9.1z"
        />
        <path
          fill="#AAD3C7"
          d="M14.8,9.1c0,0.3,0.1,0.4,0.4,0.6V8.6l0,0C14.9,8.7,14.8,8.9,14.8,9.1z"
        />
        <path
          fill="#AAD3C7"
          d="M16.6,12.6c0,0,0.1,0,0.1-0.1c0.3-0.2,0.4-0.4,0.4-0.6c0-0.3-0.2-0.5-0.5-0.6V12.6z"
        />
        <path
          fill="#AAD3C7"
          d="M10.1,10.7c0,3.1,2.5,5.7,5.7,5.7c3.1,0,5.7-2.5,5.7-5.7c0-3.1-2.5-5.7-5.7-5.7C12.7,5,10.1,7.5,10.1,10.7z
		 M16.6,6.4v0.7c0.7,0.1,1.3,0.4,1.8,1c0.1,0.1,0.1,0.1,0.1,0.2c0,0.1-0.1,0.2-0.2,0.2L17.6,9l0,0c0,0-0.1,0.1-0.2,0.1
		c-0.1,0-0.2,0-0.3-0.1c-0.1-0.1-0.3-0.2-0.4-0.3v1.2c0.9,0.1,1.5,0.4,1.9,0.9c0.3,0.3,0.4,0.7,0.4,1.1c0,0.7-0.3,1.3-0.9,1.7
		c-0.4,0.3-0.8,0.4-1.4,0.5v0.6c0,0.2-0.2,0.4-0.4,0.4h-0.7c-0.2,0-0.4-0.2-0.4-0.4V14c-0.6-0.1-1.1-0.3-1.6-0.7
		c-0.3-0.2-0.5-0.5-0.7-0.7c-0.1-0.1-0.1-0.1-0.1-0.2c0-0.1,0.1-0.2,0.2-0.3l0.7-0.4l0,0c0,0,0.1-0.1,0.2-0.1c0.1,0,0.2,0,0.3,0.1
		c0.3,0.4,0.7,0.6,1,0.7v-1.5c-0.9-0.1-1.5-0.5-1.8-1c-0.2-0.3-0.3-0.6-0.3-1c0-0.8,0.4-1.4,1.3-1.8c0.3-0.1,0.6-0.2,0.9-0.3V6.4
		c0-0.2,0.2-0.4,0.4-0.4h0.7C16.4,6,16.6,6.2,16.6,6.4z"
        />
        <path
          fill="#616E7D"
          d="M36.7,23.1L36.7,23.1c-2.5,0-4-1.6-5.9-2.8c-1.3-0.9-2.8-1.7-5-1.7c-1,0-1.8,0-2.5,0h-5.1
		c-0.7,0-1.4,0.6-1.4,1.4c0,0.7,0.6,1.4,1.4,1.4h2.9H23c1,0.2,1.7,1,1.7,2c0,0.8-0.4,1.4-1.1,1.8c-0.2,0-0.9,0.2-1.9,0.5
		c-0.6,0.2-1.2,0.3-1.8,0.5l-0.1,0c-2.1,0.6-4.4,1.2-4.8,1.3c-0.3,0-0.5,0-0.7-0.1l-7.5-4.9l-1.4-1v0c-0.1,0-0.1-0.1-0.2-0.1
		c-0.1-0.1-0.2-0.1-0.3-0.1c-0.1,0-0.2,0-0.3-0.1c-0.1,0-0.2,0-0.3,0c-0.1,0-0.3,0-0.4,0c-1.1,0.1-2,1-2,2.2c0,0.6,0.3,1.1,0.6,1.5
		l0,0l0,0c0.2,0.2,0.3,0.3,0.5,0.4l0.5,0.4l11.8,8.6v0c0,0,0.1,0,0.1,0.1c0.3,0.1,0.5,0.2,0.8,0.2c0.2,0,0.3,0,0.5-0.1l0.1,0
		c4-1,12.3-3.1,16.2-4.1c0.1,0,0.2-0.1,0.3-0.1c1-0.2,2.3-0.5,3.2-0.5V29l0,0l0-0.8v-4.9V23.1z"
        />
      </g>
    </Svg>
  );
});

export const PremiumSvg = forwardRef<SVGSVGElement, SvgIcon>((props, ref) => {
  return (
    <Svg viewBox="0 0 58 58" width="100%" height="100%" {...props} ref={ref}>
      <polygon
        style={{ fill: "#E7ECED" }}
        points="29,1.682 6,23.039 6,27.682 6,57.682 52,57.682 52,27.682 52,23.039 "
      />
      <rect
        x="14"
        y="22.682"
        style={{ fill: "#25AE88" }}
        width="12"
        height="12"
      />
      <rect
        x="32"
        y="22.682"
        style={{ fill: "#25AE88" }}
        width="12"
        height="12"
      />
      <rect
        x="14"
        y="40.682"
        style={{ fill: "#25AE88" }}
        width="12"
        height="12"
      />
      <rect
        x="32"
        y="40.682"
        style={{ fill: "#25AE88" }}
        width="12"
        height="12"
      />
      <polyline
        style={{
          fill: "none",
          stroke: "#556080",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeMiterlimit: 10,
        }}
        points="1,27.682 29,1.682 
	57,27.682 "
      />
    </Svg>
  );
});

export const CollaborativeSvg = forwardRef<SVGSVGElement, SvgIcon>(
  (props, ref) => {
    return (
      <Svg
        viewBox="0 0 38.8 37.5"
        width="100%"
        height="100%"
        {...props}
        ref={ref}
      >
        <g>
          <path
            fill="#AAD3C7"
            d="M19.4,20.9c0.3,0,0.5-0.2,0.5-0.5v-3.2l4.3-3.3c0.2-0.2,0.2-0.5,0-0.7c-0.2-0.2-0.5-0.2-0.7,0l-4.1,3
		l-4.1-3c-0.2-0.2-0.5-0.2-0.7,0c-0.2,0.2-0.2,0.5,0,0.7l4.3,3.2v3.2C18.9,20.7,19.1,20.9,19.4,20.9z"
          />
          <path
            fill="#616E7D"
            d="M15.6,27.9c0,0.7-0.4,1.4-1,1.6c0,0,0,0.1,0,0.1h4.5c0.1,0,0.1,0,0.2,0c2.2,0,3.9-1.8,3.8-4
		c-0.1-1.9-1.7-3.4-3.5-3.5c-2.2-0.1-4,1.6-4,3.8l0,0.1h0V27.9z"
          />
          <path
            fill="#616E7D"
            d="M17.2,29.9c-2,0-3.6,1.6-3.6,3.6v1.7h11.5v-1.7c0-2-1.6-3.6-3.6-3.6H17.2z M20.3,31.5l-0.9,2.8l0,0
		l-0.9-2.8L20.3,31.5z M20.3,32.2l0.7,0.7l-1.7,1.8l-1.7-1.8l0.7-0.7c0,0-1.1-1-1.1-1.1C17.2,31,18,30.5,18,30.5l1.4,4.2l1.4-4.2
		c0,0,0.8,0.5,0.7,0.7C21.4,31.2,20.3,32.2,20.3,32.2z"
          />
          <polygon
            fill="#AAD3C7"
            points="19.4,34.3 20.3,31.5 18.4,31.5 19.4,34.3 	"
          />
          <path
            fill="#FFFFFF"
            d="M21.5,31.1c0.1-0.2-0.7-0.7-0.7-0.7l-1.4,4.2l1.7-1.8l-0.7-0.7C20.3,32.2,21.4,31.2,21.5,31.1z"
          />
          <path
            fill="#FFFFFF"
            d="M19.4,34.7L18,30.5c0,0-0.8,0.5-0.7,0.7c0,0.1,1.1,1.1,1.1,1.1l-0.7,0.7L19.4,34.7z"
          />
          <path
            fill="#616E7D"
            d="M29.3,10.8c-2,0-3.6,1.6-3.6,3.6v1.7h11.5v-1.7c0-2-1.6-3.6-3.6-3.6H29.3z M32.9,15.5h-0.5l-0.4-2.9h0
		l0.4-0.8h-1.7l0.4,0.8h0l-0.4,2.9h-0.5l-0.8-4.3c0.1,0,0.2,0,0.2,0h4c0.1,0,0.2,0,0.2,0L32.9,15.5z"
          />
          <path
            fill="#FFFFFF"
            d="M31.9,12.6l0.4,2.9h0.5l0.8-4.3c-0.1,0-0.2,0-0.2,0h-4c-0.1,0-0.2,0-0.2,0l0.8,4.3h0.5l0.4-2.9h0l-0.4-0.8
		h1.7L31.9,12.6L31.9,12.6z"
          />
          <circle fill="#616E7D" cx="31.5" cy="6.6" r="3.8" />
          <path
            fill="#616E7D"
            d="M5,10.8c-2,0-3.6,1.6-3.6,3.6v1.7h11.5v-1.7c0-2-1.6-3.6-3.6-3.6H5z M8.6,15.5H8.1H6.3H5.8l-0.8-4.3
		c0.1,0,0.2,0,0.2,0h4c0.1,0,0.2,0,0.2,0L8.6,15.5z"
          />
          <path
            fill="#FFFFFF"
            d="M7.6,12.6l0.4,2.9h0.5l0.8-4.3c-0.1,0-0.2,0-0.2,0h-4c-0.1,0-0.2,0-0.2,0l0.8,4.3h0.5l0.4-2.9h0l-0.4-0.8H8
		L7.6,12.6L7.6,12.6z"
          />
          <polygon
            fill="#AAD3C7"
            points="6.3,15.5 8.1,15.5 7.6,12.6 7.6,12.6 8,11.8 6.3,11.8 6.7,12.6 6.7,12.6 	"
          />
          <circle fill="#616E7D" cx="7.2" cy="6.6" r="3.8" />
        </g>
      </Svg>
    );
  }
);
