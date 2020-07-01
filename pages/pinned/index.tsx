import Layout from "../../components/Layout";
import { InferGetStaticPropsType } from "next";
import { initializeApollo } from "../../lib/apolloClient";
import {
  GetPinnedPublicPostsDocument,
  GetPinnedPublicPostsQuery,
} from "../../graphql-queries";
import { Box, useTranslation, Paragraph, H1, H3 } from "@cabezonidas/shop-ui";
import Link from "next/link";
import { usePostTranslation } from "../../utils/helpers";
import { Fragment } from "react";
import { PostPreview } from "../../components/PostPreview";

const enUs = {
  title: "Investment catalog",
};
const esAr = {
  title: "Catálogo de inversiones",
};

const Pinned = ({ items }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle(
    "en-US",
    "translation",
    { pinnedIndex: enUs },
    true,
    true
  );
  i18n.addResourceBundle(
    "es-AR",
    "translation",
    { pinnedIndex: esAr },
    true,
    true
  );
  const { getTranslatedPost } = usePostTranslation();
  return (
    <Layout title="Pinned">
      <H1>{t("pinnedIndex.title")}</H1>
      <Paragraph my="4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum,
        tempora? Voluptatum, accusamus repudiandae? Similique, doloribus!
      </Paragraph>
      <H3 mb="4">Lorem ipsum dolor sit amet.</H3>
      <Box display="grid" gridGap="6" mt="2">
        {items?.map((pinned, index) => {
          const translatedPinned = getTranslatedPost(pinned);
          return (
            <Fragment key={index}>
              {translatedPinned && (
                <Link href="/pinned/[id]" as={`/pinned/${pinned._id}`}>
                  <PostPreview
                    p="4"
                    style={{ cursor: "pointer" }}
                    data={translatedPinned}
                  />
                </Link>
              )}
            </Fragment>
          );
        })}
      </Box>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const apollo = initializeApollo();
  const { data } = await apollo.query<GetPinnedPublicPostsQuery>({
    query: GetPinnedPublicPostsDocument,
  });

  return {
    props: { items: data.getPinnedPublicPosts },
    unstable_revalidate: 1,
  };
};

export default Pinned;
