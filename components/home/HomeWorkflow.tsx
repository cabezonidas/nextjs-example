import { useTranslation, H1, H2, Box, Paragraph } from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { Section } from "./Section";
import { useInView } from "react-intersection-observer";

const esAr = {};

const enUs = {};

export const HomeWorkflow = () => {
  const { i18n } = useTranslation();

  i18n.addResourceBundle("en-US", "translation", { index: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { index: esAr }, true, true);
  const [ref, inView] = useInView({ threshold: 0.2 });

  const crowdfundingImg =
    "https://ik.imagekit.io/syuhz8bmxl/Real%20Estate/pngegg%20(5).png";
  const productsImg =
    "https://ik.imagekit.io/syuhz8bmxl/Real%20Estate/pngegg%20(4).png";
  const profitImg =
    "https://ik.imagekit.io/syuhz8bmxl/Real%20Estate/pngegg%20(7).png";
  const contractsImg =
    "https://ik.imagekit.io/syuhz8bmxl/Real%20Estate/pngegg%20(8).png";

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
        <Title
          my="4"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0px)" : "translateY(-30px)",
            transition: "transform 1s, opacity 1s",
          }}
          fontSize={[4, 5, 6, 7]}
        >
          Nuestras ventajas
        </Title>
        <UnorderedList
          inView={inView}
          gridGap={[4, 5]}
          maxWidth={["max-content", "max-content", "800px"]}
        >
          <Card>
            <ImageBox
              backgroundImage={`url('${crowdfundingImg}')`}
              backgroundSize="cover"
              backgroundPosition="center"
            />
            <Box>
              <ParagraphHeader>Fondos colaborativos</ParagraphHeader>
              <Text>
                Creamos un crowdfunding para facilitar el acceso a multiples
                inversionistas.
              </Text>
            </Box>
          </Card>
          <Card>
            <ImageBox
              backgroundImage={`url('${productsImg}')`}
              backgroundSize="cover"
              backgroundPosition="center"
            />
            <Box>
              <ParagraphHeader>Productos premium</ParagraphHeader>
              <Text>
                Seleccionamos unidades de primera calidad y con alto potencial
                de revalorizacion en USA.
              </Text>
            </Box>
          </Card>
          <Card>
            <ImageBox
              backgroundImage={`url('${profitImg}')`}
              backgroundSize="cover"
              backgroundPosition="center"
            />
            <Box>
              <ParagraphHeader>Renta inmediata</ParagraphHeader>
              <Text>Obtenga ganancias seguras y sostenibles en el tiempo</Text>
            </Box>
          </Card>
          <Card>
            <ImageBox
              backgroundImage={`url('${contractsImg}')`}
              backgroundSize="cover"
              backgroundPosition="center"
            />
            <Box>
              <ParagraphHeader>Contratos internacionales</ParagraphHeader>
              <Text>
                Garantizamos el resguardo del capital y rentabilidades
              </Text>
            </Box>
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
  ({ theme: { colors, space } }) => ({
    height: "100%",
    alignSelf: "center",
    border: `1px solid ${colors.secondary.darkest}`,
    background: colors.neutral.lightest,
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

const ImageBox = styled(Box)(({ theme }) => ({
  borderRadius: "50%",
  margin: "0 auto",
  border: `1px solid ${theme.colors.primary.dark}`,
  alignSelf: "flex-end",
  filter: "opacity(0.1)",
}));

ImageBox.defaultProps = {
  width: ["30px", "30px", "50px"],
  height: ["30px", "30px", "50px"],
  position: ["absolute", "absolute", "relative"],
  top: ["10px", "10px", "unset"],
  left: ["10px", "10px", "unset"],
};

Card.defaultProps = {
  p: [3, 4, 5, 6],
  minHeight: "auto",
};

const Title = styled(H1)(() => ({}));
const Text = styled(Paragraph)(() => ({}));
Text.defaultProps = {
  fontSize: [1, 2],
};