import React from "react";
import Layout from "../../components/Layout";
import { initializeApollo } from "../../lib/apolloClient";
import { PinnedPostsDocument, PinnedPostsQuery } from "../../graphql-queries";
import {
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";

export const PinnedDetail = ({
  item,
  errors,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
};

export default PinnedDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const apollo = initializeApollo();
  const { data } = await apollo.query<PinnedPostsQuery>({
    query: PinnedPostsDocument,
  });

  const paths = data.getPinnedPublicPosts.map((p) => ({
    params: { id: p._id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const apollo = initializeApollo();
  const {
    data: { getPinnedPublicPosts: pinned },
  } = await apollo.query<PinnedPostsQuery>({
    query: PinnedPostsDocument,
  });

  try {
    const id = params?.id;
    const item = pinned.find((p) => p._id === id);
    return { props: { item }, unstable_revalidate: 1 };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
