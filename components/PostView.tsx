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
  return (
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
  );
});
