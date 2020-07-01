import React from "react";
import Layout from "../../components/Layout";
import { initializeApollo } from "../../lib/apolloClient";
import {
  GetPinnedPublicPathsDocument,
  GetPinnedPublicPathsQuery,
  GetPinnedPublicPostQuery,
  GetPinnedPublicPostDocument,
} from "../../graphql-queries";
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
  const { data } = await apollo.query<GetPinnedPublicPathsQuery>({
    query: GetPinnedPublicPathsDocument,
  });

  const paths = data.getPinnedPublicPaths.map((p) => ({
    params: { id: p._id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const apollo = initializeApollo();
  try {
    const {
      data: { getPinnedPublicPost: pinned },
    } = await apollo.query<GetPinnedPublicPostQuery>({
      query: GetPinnedPublicPostDocument,
      variables: { _id: params?.id },
    });
    return { props: { item: pinned }, unstable_revalidate: 1 };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
