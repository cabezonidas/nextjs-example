import React from "react";
import Layout from "../../components/Layout";
import { initializeApollo } from "../../lib/apolloClient";
import {
  PinnedPostsDocument,
  PinnedPostsQuery,
  PostFragment,
} from "../../graphql-queries";
import { GetStaticPaths, GetStaticProps } from "next";

type Props = {
  item?: PostFragment;
  errors?: string;
};

export default class StaticPropsDetail extends React.Component<Props> {
  render() {
    const { item, errors } = this.props;
    if (errors) {
      return (
        <Layout title={`Error | Next.js + TypeScript Example`}>
          <p>
            <span style={{ color: "red" }}>Error:</span> {errors}
          </p>
        </Layout>
      );
    }
    return <Layout title={`Pinned Posts`}>{item?.title}</Layout>;
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apollo = initializeApollo();
  const { data } = await apollo.query<PinnedPostsQuery>({
    query: PinnedPostsDocument,
  });

  const paths = data.getPinnedPublicPosts.map((p) => ({
    params: { id: p._id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apollo = initializeApollo();
  const {
    data: { getPinnedPublicPosts: pinned },
  } = await apollo.query<PinnedPostsQuery>({
    query: PinnedPostsDocument,
  });

  try {
    const id = params?.id;
    const item = pinned.find((p) => p._id === id);
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { item } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
