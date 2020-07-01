import React, { forwardRef, ComponentProps } from "react";
import { PostData } from "../graphql-queries";
import { Box, useTranslation, H3 } from "@cabezonidas/shop-ui";
import { PostDate } from "./PostDate";

interface IPostView extends Omit<ComponentProps<typeof Box>, "children"> {
  data: Omit<PostData, "__typename">;
}

const enUs = {};

const esAr = {};

export const PostPreview = forwardRef<HTMLDivElement, IPostView>(
  (props, ref) => {
    const { i18n } = useTranslation();
    i18n.addResourceBundle(
      "en-US",
      "translation",
      { postPreview: enUs },
      true,
      true
    );
    i18n.addResourceBundle(
      "es-AR",
      "translation",
      { postPreview: esAr },
      true,
      true
    );

    const { data, ...boxProps } = props;
    return (
      <Box ref={ref} borderRadius="4px" border="1px solid" {...boxProps}>
        {data.title && <H3 my="4">{data.title}</H3>}
        {data.description && <Box>{data.description}</Box>}
        {data.author && (
          <Box my="4">
            <PostDate data={data} my="6" />
          </Box>
        )}
      </Box>
    );
  }
);
