import React from "react";
import Layout from "../components/Layout";
import { initializeApollo } from "../lib/apolloClient";
import {
  GetPublicPostQuery,
  GetPublicPostDocument,
  GetLatestPublicPostsQuery,
  GetLatestPublicPostsDocument,
} from "../graphql-queries";
import {
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import { usePostTranslation } from "../utils/helpers";
import { useTranslation } from "@cabezonidas/shop-ui";
import { PostView } from "../components/PostView";

const enUs = {
  noTitle: "Untitled",
  notFound: "Entry not found",
};
const esAr = {
  noTitle: "Sin título",
  notFound: "Entrada no encontrada",
};

export const PostDetail = ({
  item,
  errors,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { getTranslatedPost } = usePostTranslation();
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { post: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { post: esAr }, true, true);
  const translatedPost = getTranslatedPost(item);
  const title = getTranslatedPost(item)?.title ?? t("post.noTitle");
  if (errors) {
    return (
      <Layout title={title}>
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }
  if (translatedPost) {
    return (
      <Layout title={title}>
        <PostView data={translatedPost} />
      </Layout>
    );
  }
  return (
    <Layout title={title}>
      <p>
        <span style={{ color: "red" }}>Error:</span> {t("post.notFound")}
      </p>
    </Layout>
  );
};

export default PostDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const apollo = initializeApollo();
  const { data } = await apollo.query<GetLatestPublicPostsQuery>({
    query: GetLatestPublicPostsDocument,
    variables: { skip: 1, take: 4 },
  });

  const paths = data.getLatestPublicPosts.posts.map((p) => ({
    params: { id: p._id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const apollo = initializeApollo();
  try {
    const {
      data: { getPublicPost: post },
    } = await apollo.query<GetPublicPostQuery>({
      query: GetPublicPostDocument,
      variables: { _id: params?.id },
    });
    return { props: { item: post }, unstable_revalidate: 1 };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
