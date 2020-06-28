import Layout from "../components/Layout";
import Head from "next/head";
import { useTranslation, H1 } from "@cabezonidas/shop-ui";

const enUs = {
  title: "Welcome to Latam Trading Club",
};

const esAr = {
  title: "Bienvenidos a Latam Trading Club",
};

const IndexPage = () => {
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { index: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { index: esAr }, true, true);

  return (
    <Layout title="Latam Trading Club">
      <Head>
        <title>{"Latam Trading Club"}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <H1>{t("index.title")}</H1>
    </Layout>
  );
};

export default IndexPage;
