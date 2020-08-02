import {
  useTranslation,
  H1,
  Box,
  Span,
  Paragraph,
  useBreakpoint,
} from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { Section } from "./Section";
import { useInView } from "react-intersection-observer";
import { useState, useRef, useEffect, Fragment } from "react";
import { keyframes } from "@emotion/core";

const esAr = {
  step1: "Nuevos inversores",
  step2: "Acceden al crowdfunding inmobiliario de Renta Fija",
  step3: "Realizan el aporte a Latam Trading Club",
  step4: "Latam Trading Club adquiere el inmueble",
  step5: "Latam Trading Club le brinda un contrato legal en USA",
  step6: "El inmueble se pone en alquiler",
  step7: "Distribución de la renta de alquileres a inversores",
};

const enUs = {};

const totalTime = 2500;
const breath = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

export const Section6 = () => {
  const { t, i18n } = useTranslation();

  i18n.addResourceBundle("en-US", "translation", { index: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { index: esAr }, true, true);
  const [ref, inView] = useInView({ threshold: 0.2 });

  const [growing, setGrowing] = useState(true);
  const [step, setStep] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const { isMediumLarge } = useBreakpoint();
  const scale = isMediumLarge ? 1.5 : 1;

  const steps = [
    { text: t("index.step1"), color: "#c48875" },
    { text: t("index.step2"), color: "#ee9564" },
    { text: t("index.step3"), color: "#ec8483" },
    { text: t("index.step4"), color: "#677482" },
    { text: t("index.step5"), color: "#7ac0b9" },
    { text: t("index.step6"), color: "#b07ba2" },
    { text: t("index.step7"), color: "#b1ba71" },
  ];

  useEffect(() => {
    const breathing = () => {
      setGrowing(false);
      setTimeout(() => {
        setGrowing(true);
      }, holdTime + breath);
      setStep((s) => s + 1);
    };

    breathing();
    const interval = setInterval(() => {
      breathing();
    }, totalTime);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const currentStep = step % steps.length;
  const nextStep = (step + 1) % steps.length;

  return (
    <>
      <StyledSection
        ref={ref}
        px="5"
        py="6"
        display="flex"
        flexDirection="column"
        flex="1 auto"
      >
        <Title
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0px)" : "translateY(-30px)",
            transition: "all 1s",
          }}
        >
          Proceso
        </Title>
        <Box m="auto">
          <Box style={{ transform: `scale(${scale})` }}>
            <Container ref={containerRef} growing={growing}>
              <Circle background={steps[currentStep].color} />
              <Box
                ref={textRef}
                display="grid"
                gridTemplateRows="45% 55%"
                height="100%"
              >
                <Steps mt="2">{currentStep + 1}</Steps>
                <Text>{steps[currentStep].text}</Text>
              </Box>
              <PointerContainer>
                <Pointer background={steps[nextStep].color} />
              </PointerContainer>
            </Container>
          </Box>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="30px 1fr"
          gridTemplateRows={`repeat(auto-fit, minmax(20px, auto))`}
          gridGap="2"
          mb="2"
          px={["0", "2", "4", "6"]}
        >
          {steps.map((step, i) => (
            <Fragment key={i}>
              <Box
                alignSelf="center"
                style={{ transition: "width 1s ease" }}
                width={i === currentStep ? "30px" : "10px"}
                height="5px"
                borderRadius={4}
                bg={step.color}
              />
              <StepText fontSize={[1, 2, 3]} px="1">
                {step.text}
              </StepText>
            </Fragment>
          ))}
        </Box>
      </StyledSection>
    </>
  );
};
const grow = keyframes`
  from {
    transform: scale(0.71);
  }
  to {
    transform: scale(0.7);
  }
`;

const shrink = keyframes`
  from {
    transform: scale(0.7);
  }
  to {
    transform: scale(0.71);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled(Box)<{ growing: boolean }>(({ growing }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  height: "250px",
  width: "250px",
  position: "relative",
  transform: "scale(0.5)",
  animation: `${growing ? grow : shrink} 1s ease forwards`,
}));

const Steps = styled(Box)(({ theme: { fontSizes } }) => ({
  fontSize: fontSizes[6],
  fontWeight: "bold",
  color: "#000",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  flexDirection: "column",
}));

const StepText = styled(Box)(() => ({
  alignSelf: "center",
  display: "flex",
  justifyContent: "flex-start",
  alignContent: "left",
  flexDirection: "column",
  textAlign: "left",
}));

const Circle = styled(Box)(() => ({
  height: "100%",
  width: "100%",
  borderRadius: "50%",
  position: "absolute",
  top: 0,
  left: 0,
  zOndex: -1,
}));
const Text = styled(Paragraph)(({ theme: { fontSizes, space } }) => ({
  color: "#000",
  fontSize: fontSizes[4],
  padding: space[3],
}));
const PointerContainer = styled(Box)(() => ({
  position: "absolute",
  top: "-25px",
  left: "115px",
  width: "20px",
  height: "150px",
  animation: `${rotate} 2.5s linear forwards infinite`,
  transformOrigin: "bottom center",
}));
const Pointer = styled(Span)(() => ({
  borderRadius: "50%",
  height: "20px",
  width: "20px",
  display: "block",
  transition: "background 2.5s ease",
}));

const StyledSection = styled(Section)(({ theme: { colors } }) => ({
  textAlign: "center",
  background: colors.neutral.dark,
  color: colors.neutral.light,
  position: "relative",
}));

const Title = styled(H1)((props) => ({
  fontSize: props.theme.fontSizes[5],
}));
