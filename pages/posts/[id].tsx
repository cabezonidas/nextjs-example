import React, { useState, useEffect, Fragment } from "react";
import Layout from "../../components/Layout";
import { initializeApollo } from "../../lib/apolloClient";
import {
  GetPublicPostQuery,
  GetPublicPostDocument,
  GetLatestPublicPostsQuery,
  GetLatestPublicPostsDocument,
  useGetLatestPublicPostsLazyQuery,
  Post,
} from "../../graphql-queries";
import {
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import { usePostMapping } from "../../utils/helpers";
import { useTranslation, H1, Box, Anchor } from "@cabezonidas/shop-ui";
import { PostView } from "../../components/PostView";
import { companyName } from "../../utils/config";
import Link from "next/link";
import { PostPreview } from "../../components/PostPreview";
import { useRouter } from "next/router";

const enUs = {
  notFound: "Entry not found",
  otherPosts: "Other entries",
};
const esAr = {
  notFound: "Entrada no encontrada",
  otherPosts: "Otras entradas",
};

export const PostDetail = ({
  item,
  errors,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { getTranslatedPost } = usePostMapping();
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { post: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { post: esAr }, true, true);
  const translatedPost = getTranslatedPost(item);
  const title = getTranslatedPost(item)?.title ?? companyName;

  const [otherPostsTotal, setOtherPostsTotal] = useState<number>();
  const [otherPosts, setOtherPosts] = useState<Post[]>([]);
  const [fetchMore, { loading, data }] = useGetLatestPublicPostsLazyQuery();

  useEffect(() => {
    if (data?.getLatestPublicPosts) {
      setOtherPosts((op) => [...op, ...data.getLatestPublicPosts.posts]);
      setOtherPostsTotal(Math.max(data.getLatestPublicPosts.total - 1, 0));
    }
  }, [data]);

  useEffect(() => {
    if (!loading && otherPostsTotal === undefined) {
      fetchMore({ variables: { skip: otherPosts.length + 1, take: 3 } });
    }
  }, [otherPostsTotal, fetchMore, otherPosts.length]);

  const onScroll = () => {
    if (
      !loading &&
      (otherPostsTotal === undefined || otherPosts.length < otherPostsTotal)
    ) {
      fetchMore({ variables: { skip: otherPosts.length + 1, take: 3 } });
    }
  };

  const { asPath } = useRouter();

  const otherPostsBlock = (
    <>
      {otherPosts.length > 0 && (
        <>
          <H1 mt="6" mb="2">
            {t("post.otherPosts")}
          </H1>
          <Box display="grid" gridGap="6" mb="6">
            {otherPosts.map((old, index) => {
              const translatedOld = getTranslatedPost(old);
              return (
                <Fragment key={index}>
                  {translatedOld && old._id !== item?._id && (
                    <Link
                      href="/posts/[id]"
                      as={`/posts/${old._id}`}
                      passHref={true}
                      scroll={true}
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
    </>
  );

  if (errors) {
    return (
      <Layout title={title} onMainScrollBottom={onScroll}>
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
        {otherPostsBlock}
      </Layout>
    );
  }
  if (translatedPost) {
    return (
      <Layout title={title} onMainScrollBottom={onScroll} key={asPath}>
        <PostView data={translatedPost} />
        {otherPostsBlock}
      </Layout>
    );
  }
  return (
    <Layout title={title} onMainScrollBottom={onScroll}>
      <p>
        <span style={{ color: "red" }}>Error:</span> {t("post.notFound")}
      </p>
      {otherPostsBlock}
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
    return { props: { item: post }, revalidate: 1 };
  } catch (err) {
    return { props: { errors: err.message }, revalidate: 1 };
  }
};
