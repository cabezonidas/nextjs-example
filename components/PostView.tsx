import React, { forwardRef, ComponentProps } from "react";
import { PostData } from "../graphql-queries";
import {
  Box,
  PillsBox,
  Markdown,
  ProfileCard,
  useTranslation,
} from "@cabezonidas/shop-ui";
import { PostDate } from "./PostDate";
import Head from "next/head";
import { usePostMapping } from "../utils/helpers";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import { websiteUrl } from "../utils/config";

interface IPostView extends Omit<ComponentProps<typeof Box>, "children"> {
  data: Omit<PostData, "__typename">;
}

const enUs = {
  aboutTheAuthor: "About the author",
};

const esAr = {
  aboutTheAuthor: "Escrito por",
};

export const PostView = forwardRef<HTMLDivElement, IPostView>((props, ref) => {
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle(
    "en-US",
    "translation",
    { postView: enUs },
    true,
    true
  );
  i18n.addResourceBundle(
    "es-AR",
    "translation",
    { postView: esAr },
    true,
    true
  );

  const { data, ...boxProps } = props;

  const { getMetaImage } = usePostMapping();
  const previewImage = getMetaImage(data.body);

  const author = data.author
    ? data.author.name ?? data.author.email
    : undefined;

  const { asPath } = useRouter();

  return (
    <>
      <Head>
        {data.title && (
          <>
            <title>{data.title}</title>
            <meta property="og:title" content={data.title} />
          </>
        )}
        <meta property="og:type" content="article" />
        {data.published && (
          <meta
            property="article:published_time"
            content={DateTime.fromMillis(data.published).toISO()}
          />
        )}
        {data.updated && (
          <meta
            property="article:modified_time"
            content={DateTime.fromMillis(data.updated).toISO()}
          />
        )}
        {data.tags?.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
        {data.description && (
          <meta property="og:description" content={data.description} />
        )}

        {author && <meta property="article:author" content={author} />}
        <meta property="og:url" content={websiteUrl + asPath} />
        {previewImage && <meta property="og:image" content={previewImage} />}
      </Head>
      <Box ref={ref} {...boxProps}>
        <Markdown body={data.body ?? ""} />
        {data.tags && <PillsBox my="1" tags={data.tags} />}
        {data.author && (
          <Box my="4" borderTop="1px solid">
            <PostDate data={data} my="6" />
            <Box>{t("postView.aboutTheAuthor")}</Box>
            <ProfileCard author={data.author as any} />
          </Box>
        )}
      </Box>
    </>
  );
});
