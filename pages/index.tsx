import Layout from "../components/Layout";
import { companyName } from "../utils/config";
import { HomeLanding } from "../components/home/HomeLanding";
import { HomeFlorida } from "../components/home/HomeFlorida";
import { HomeProcess } from "../components/home/HomeProcess";
import { HomeHow } from "../components/home/HomeHow";
import "intersection-observer";
import { HomeWorkflow } from "../components/home/HomeWorkflow";
import Head from "next/head";

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>{companyName}</title>
        <meta property="og:title" content={companyName} />
        <meta property="og:description" content={"Crowdfunding inmobiliario"} />
        <meta property="article:author" content={"Hernán Alvarado"} />
        <meta property="og:url" content={"https://lataminvestingclub.com/"} />
        <meta
          property="og:image"
          content={
            "https://ik.imagekit.io/syuhz8bmxl/Fondos/363385-1.jpg?tr=w-600px,h-315px"
          }
        />
      </Head>
      <Layout
        title={companyName}
        minHeight="100%"
        maxWidth="100%"
        mx="auto"
        px={0}
        pt={0}
        height="100%"
        width="100%"
        overflow="auto"
        style={{ scrollSnapType: "y mandatory" }}
      >
        <HomeLanding />
        <HomeWorkflow />
        <HomeFlorida />
        <HomeProcess />
        {/* <HomeClients /> */}
        <HomeHow />
      </Layout>
    </>
  );
};

export default IndexPage;
