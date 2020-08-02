import React from "react";
import Layout from "../components/Layout";
import { useGetStaffQuery } from "../graphql-queries";
import {
  useTranslation,
  H1,
  Paragraph,
  H2,
  ProfileCard,
  Box,
} from "@cabezonidas/shop-ui";

// TODO: Translate english texts!
const enUs = {
  title: "Us",
  mission: "Mission",
  missionBody:
    "Proporcionar acceso al sistema financiero del mundo en un solo clic. Juntos trabajamos en invertir el dinero para mejorar la vida cotidiana de las personas.",
  vision: "Vision",
  visionBody:
    "Ser un empresa global, responsable maximizando el rendimiento para los inversores y aportando para un mundo mejor.",
  values: "Valores",
  valuesBody:
    "Excelencia, Honestidad, Transparencia, responsabilidad y pasión.",
  team: "Our team",
};
const esAr = {
  title: "Nosotros",
  mission: "Misión",
  missionBody:
    "Proporcionar acceso al sistema financiero del mundo en un solo clic. Juntos trabajamos en invertir el dinero para mejorar la vida cotidiana de las personas.",
  vision: "Visión",
  visionBody:
    "Ser un empresa global, responsable maximizando el rendimiento para los inversores y aportando para un mundo mejor.",
  values: "Valores",
  valuesBody:
    "Excelencia, Honestidad, Transparencia, responsabilidad y pasión.",
  team: "Nuestro equipo",
};

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { about: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { about: esAr }, true, true);
  const { data } = useGetStaffQuery();
  return (
    <Layout documentTitle={t("about.title")}>
      <H1 mb="4">{t("about.title")}</H1>
      <Box display="grid" gridGap="4">
        <H2>{t("about.mission")}</H2>
        <Paragraph>{t("about.missionBody")}</Paragraph>
        <H2>{t("about.vision")}</H2>
        <Paragraph>{t("about.visionBody")}</Paragraph>
        <H2>{t("about.values")}</H2>
        <Paragraph>{t("about.valuesBody")}</Paragraph>
        <H2>{t("about.team")}</H2>
        <Box display="grid" gridGap="6">
          {data?.getStaff.map((s) => (
            <ProfileCard key={s._id} author={s as any} />
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default AboutPage;
