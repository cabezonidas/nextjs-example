import Layout from "../../components/Layout";
import { InferGetStaticPropsType } from "next";
import { initializeApollo } from "../../lib/apolloClient";
import {
  GetPinnedPublicPathsQuery,
  GetPinnedPublicPathsDocument,
} from "../../graphql-queries";
import { Box, useTranslation } from "@cabezonidas/shop-ui";
import Link from "next/link";

const Pinned = ({ items }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Layout title="Pinned">
      <h1>Pinned</h1>
      {items?.map((i, index) => {
        const postTitle =
          (i.titles.find((title) => title.localeId === language) || i.titles[0])
            ?.title ?? "";
        return (
          <Box key={i._id}>
            <Link href="/pinned/[id]" as={`/pinned/${i._id}`}>
              <a>
                Post # {index}: {postTitle}
              </a>
            </Link>
          </Box>
        );
      })}
    </Layout>
  );
};

export const getStaticProps = async () => {
  const apollo = initializeApollo();
  const { data } = await apollo.query<GetPinnedPublicPathsQuery>({
    query: GetPinnedPublicPathsDocument,
  });

  return {
    props: { items: data.getPinnedPublicPaths },
    unstable_revalidate: 1,
  };
};

export default Pinned;
