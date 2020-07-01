import Layout from "../components/Layout";
import { useTranslation, H1, Box } from "@cabezonidas/shop-ui";
import { initializeApollo } from "../lib/apolloClient";
import {
  GetLatestPublicPostsDocument,
  GetLatestPublicPostsQuery,
  useGetLatestPublicPostsLazyQuery,
} from "../graphql-queries";
import { InferGetStaticPropsType } from "next";
import { PostView } from "../components/PostView";
import { usePostTranslation } from "../utils/helpers";
import { Fragment, useState, useEffect, useMemo } from "react";
import { PostPreview } from "../components/PostPreview";
import { companyName } from "../utils/config";
import Link from "next/link";

const enUs = {
  olderPosts: "Previous entries",
};

const esAr = {
  olderPosts: "Últimas entradas",
};

const IndexPage = ({
  items,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t, i18n } = useTranslation();
  const { getTranslatedPost } = usePostTranslation();
  i18n.addResourceBundle("en-US", "translation", { index: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { index: esAr }, true, true);

  const [latest, ...rest] = items.posts;
  const oldPostsTotal = useMemo(() => Math.max(items.total - 1, 0), []);
  const translatedLatest = getTranslatedPost(latest);

  const [olderPosts, setOlderPosts] = useState(rest);

  const [fetchMore, { loading, data }] = useGetLatestPublicPostsLazyQuery();
  useEffect(() => {
    if (data?.getLatestPublicPosts) {
      setOlderPosts((op) => [...op, ...data.getLatestPublicPosts.posts]);
    }
  }, [data]);

  const onScroll = () => {
    if (!loading && olderPosts.length < oldPostsTotal) {
      fetchMore({ variables: { skip: olderPosts.length + 1, take: 1 } });
    }
  };

  return (
    <Layout title={companyName} onMainScrollBottom={onScroll}>
      <Box>
        {translatedLatest && <PostView data={translatedLatest} />}
        {olderPosts.length > 0 && (
          <>
            <H1 mt="6" mb="2">
              {t("index.olderPosts")}
            </H1>
            <Box display="grid" gridGap="6" mb="6">
              {olderPosts.map((old, index) => {
                const translatedOld = getTranslatedPost(old);
                return (
                  <Fragment key={index}>
                    {translatedOld && (
                      <Link href="/[id]" as={`/${old._id}`}>
                        <PostPreview
                          p="4"
                          data={translatedOld}
                          style={{ cursor: "pointer" }}
                        />
                      </Link>
                    )}
                  </Fragment>
                );
              })}
            </Box>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps = async () => {
  const apollo = initializeApollo();
  const { data } = await apollo.query<GetLatestPublicPostsQuery>({
    query: GetLatestPublicPostsDocument,
    variables: { skip: 0, take: 4 },
  });

  return {
    props: { items: data.getLatestPublicPosts },
    unstable_revalidate: 1,
  };
};
