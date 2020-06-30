import React from "react";
import Layout from "../components/Layout";
import { GetStaffDocument, GetStaffQuery } from "../graphql-queries";
import { initializeApollo } from "../lib/apolloClient";
import { InferGetStaticPropsType } from "next";
import {
  useTranslation,
  H1,
  Paragraph,
  H2,
  ProfileCard,
  Box,
} from "@cabezonidas/shop-ui";

const enUs = {
  title: "Us",
  mission: "Mission",
  vision: "Vision",
  team: "Our team",
};
const esAr = {
  title: "Nosotros",
  mission: "Misión",
  vision: "Visión",
  team: "Nuestro equipo",
};

const AboutPage = ({
  staff,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { about: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { about: esAr }, true, true);
  return (
    <Layout title={t("about.title")}>
      <H1 mb="4">{t("about.title")}</H1>
      <Box display="grid" gridGap="4">
        <H2>{t("about.mission")}</H2>
        <Paragraph>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum,
          tempora? Voluptatum, accusamus repudiandae? Similique, doloribus!
        </Paragraph>
        <H2>{t("about.vision")}</H2>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Reprehenderit velit repudiandae ullam corrupti vitae veniam
          praesentium cupiditate reiciendis officiis suscipit?
        </Paragraph>
        <H2>{t("about.team")}</H2>
        <Box display="grid">
          {staff.map((s) => (
            <ProfileCard key={s._id} author={s as any} />
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default AboutPage;

export const getStaticProps = async () => {
  const apollo = initializeApollo();
  const { data } = await apollo.query<GetStaffQuery>({
    query: GetStaffDocument,
  });

  return { props: { staff: data.getStaff }, unstable_revalidate: 1 };
};
