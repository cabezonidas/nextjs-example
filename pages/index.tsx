import Layout from "../components/Layout";
import { companyName } from "../utils/config";
import { HomeLanding } from "../components/home/HomeLanding";
import { HomeFlorida } from "../components/home/HomeFlorida";
import { HomeProcess } from "../components/home/HomeProcess";
import { HomeHow } from "../components/home/HomeHow";
import "intersection-observer";

const IndexPage = () => {
  return (
    <>
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
        <HomeProcess />
        <HomeFlorida />
        {/* <HomeClients /> */}
        <HomeHow />
      </Layout>
    </>
  );
};

export default IndexPage;
