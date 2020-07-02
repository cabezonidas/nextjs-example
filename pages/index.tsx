import Layout from "../components/Layout";
import { useTranslation, H1, Box, Anchor } from "@cabezonidas/shop-ui";
import { initializeApollo } from "../lib/apolloClient";
import {
  GetLatestPublicPostsDocument,
  GetLatestPublicPostsQuery,
  useGetLatestPublicPostsLazyQuery,
} from "../graphql-queries";
import { InferGetStaticPropsType } from "next";
import { PostView } from "../components/PostView";
import { usePostMapping } from "../utils/helpers";
import { Fragment, useState, useEffect } from "react";
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
  const { getTranslatedPost } = usePostMapping();
  i18n.addResourceBundle("en-US", "translation", { index: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { index: esAr }, true, true);

  const [latest, ...rest] = items.posts;
  const [oldPostsTotal, setOldPostsTotal] = useState(
    Math.max(items.total - 1, 0)
  );
  const translatedLatest = getTranslatedPost(latest);

  const [olderPosts, setOlderPosts] = useState(rest);
  const [hasRefetchedOnce, setHasRefetchedOnce] = useState(false);

  const [fetchMore, { loading, data }] = useGetLatestPublicPostsLazyQuery();
  useEffect(() => {
    if (data?.getLatestPublicPosts) {
      setOlderPosts((op) => [...op, ...data.getLatestPublicPosts.posts]);
      setOldPostsTotal(Math.max(data.getLatestPublicPosts.total - 1, 0));
    }
  }, [data]);

  const onScroll = () => {
    if (!loading && olderPosts.length < oldPostsTotal) {
      fetchMore({ variables: { skip: olderPosts.length + 1, take: 1 } });
    }
  };

  useEffect(() => {
    if (!hasRefetchedOnce) {
      setHasRefetchedOnce(true);
      onScroll();
    }
  }, [onScroll, hasRefetchedOnce]);

  const title = getTranslatedPost(latest)?.title ?? companyName;

  return (
    <Layout title={title} onMainScrollBottom={onScroll}>
      <Box>
        {translatedLatest && <PostView data={translatedLatest} />}
        {!!olderPosts.length && (
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
                      <Link
                        href="/posts/[id]"
                        as={`/posts/${old._id}`}
                        passHref={true}
                        replace={true}
                      >
                        <Anchor>
                          <PostPreview p="4" data={translatedOld} />
                        </Anchor>
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
