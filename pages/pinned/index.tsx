import Layout from "../../components/Layout";
import { GetStaticProps } from "next";
import { initializeApollo } from "../../lib/apolloClient";
import {
  PinnedPostsQuery,
  PinnedPostsDocument,
  PostFragment,
} from "../../graphql-queries";
import { Box } from "@cabezonidas/shop-ui";
import Link from "next/link";

type Props = {
  items?: PostFragment[];
};

const WithStaticProps = ({ items }: Props) => (
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

export default WithStaticProps;

export const getStaticProps: GetStaticProps = async () => {
  const apollo = initializeApollo();
  const {
    data: { getPinnedPublicPosts: pinned },
  } = await apollo.query<PinnedPostsQuery>({
    query: PinnedPostsDocument,
  });

  return { props: { items: pinned } };
};
