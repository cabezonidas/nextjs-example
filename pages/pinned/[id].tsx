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
import { usePostMapping } from "../../utils/helpers";
import { useTranslation } from "@cabezonidas/shop-ui";
import { PostView } from "../../components/PostView";

const enUs = {
  noTitle: "Untitled",
  notFound: "Entry not found",
};
const esAr = {
  noTitle: "Sin título",
  notFound: "Entrada no encontrada",
};

export const PinnedDetail = ({
  item,
  errors,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { getTranslatedPost } = usePostMapping();
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { pinned: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { pinned: esAr }, true, true);
  const translatedPost = getTranslatedPost(item);
  const title = getTranslatedPost(item)?.title ?? t("pinned.noTitle");
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
        <span style={{ color: "red" }}>Error:</span> {t("pinned.notFound")}
      </p>
    </Layout>
  );
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
    return { props: { item: pinned }, revalidate: 1 };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
