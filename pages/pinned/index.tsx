import Layout from "../../components/Layout";
import { InferGetStaticPropsType } from "next";
import { initializeApollo } from "../../lib/apolloClient";
import { PinnedPostsQuery, PinnedPostsDocument } from "../../graphql-queries";
import { Box } from "@cabezonidas/shop-ui";
import Link from "next/link";

const Pinned = ({ items }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="Pinned">
      <h1>Pinned</h1>
      {items?.map((i, index) => (
        <Box key={i._id}>
          <Link href="/pinned/[id]" as={`/pinned/${i._id}`}>
            <a>
              Post # {index}: {i.title}
            </a>
          </Link>
        </Box>
      ))}
    </Layout>
  );
};

export const getStaticProps = async () => {
  const apollo = initializeApollo();
  const {
    data: { getPinnedPublicPosts: pinned },
  } = await apollo.query<PinnedPostsQuery>({
    query: PinnedPostsDocument,
  });

  return { props: { items: pinned }, unstable_revalidate: 1 };
};

export default Pinned;
