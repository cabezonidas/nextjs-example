import Layout from "../components/Layout";
import { companyName } from "../utils/config";
import { Section1 } from "../components/home/Section1";
import { Section2 } from "../components/home/Section2";
import { Section3 } from "../components/home/Section3";
import { Section4 } from "../components/home/Section4";
import { Section5 } from "../components/home/Section5";
import { Section6 } from "../components/home/Section6";
import { Section7 } from "../components/home/Section7";
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
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
      </Layout>
    </>
  );
};

export default IndexPage;
