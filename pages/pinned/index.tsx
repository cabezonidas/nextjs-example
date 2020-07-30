import Layout from "../../components/Layout";
import { InferGetStaticPropsType } from "next";
import { initializeApollo } from "../../lib/apolloClient";
import {
  GetPinnedPublicPostsDocument,
  GetPinnedPublicPostsQuery,
} from "../../graphql-queries";
import {
  Box,
  useTranslation,
  Paragraph,
  H1,
  H3,
  Anchor,
} from "@cabezonidas/shop-ui";
import Link from "next/link";
import { usePostMapping } from "../../utils/helpers";
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
  const { getTranslatedPost } = usePostMapping();
  // TODO Add description to investments
  return (
    <Layout title="Pinned">
      <H1>{t("pinnedIndex.title")}</H1>
      <Paragraph my="4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum,
        tempora? Voluptatum, accusamus repudiandae? Similique, doloribus!
      </Paragraph>
      <H3 mb="4">Lorem ipsum dolor sit amet.</H3>
      <Box display="grid" gridGap="6" my="2">
        {items?.map((pinned, index) => {
          const translatedPinned = getTranslatedPost(pinned);
          return (
            <Fragment key={index}>
              {translatedPinned && (
                <Link
                  href="/pinned/[id]"
                  as={`/pinned/${pinned._id}`}
                  passHref={true}
                >
                  <Anchor>
                    <PostPreview
                      p="4"
                      style={{ cursor: "pointer" }}
                      data={translatedPinned}
                    />
                  </Anchor>
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
    revalidate: 1,
  };
};

export default Pinned;
