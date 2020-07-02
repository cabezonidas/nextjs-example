import React, { forwardRef, ComponentProps } from "react";
import { PostData } from "../graphql-queries";
import {
  Box,
  useTranslation,
  H3,
  listImagesFromRawMarkdown,
  transform,
} from "@cabezonidas/shop-ui";
import { PostDate } from "./PostDate";
import { usePostMapping } from "../utils/helpers";

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

    const { getPreviewImage } = usePostMapping();

    const sizedMainImage = getPreviewImage(data.body);

    return (
      <Box
        ref={ref}
        borderRadius="4px"
        border="1px solid"
        display={sizedMainImage ? "grid" : undefined}
        gridGap={sizedMainImage ? "2" : undefined}
        gridTemplateColumns={sizedMainImage ? "1fr auto" : undefined}
        overflow="hidden"
        {...boxProps}
      >
        <Box overflow="hidden">
          {data.title && <H3 mb="4">{data.title}</H3>}
          {data.description && <Box>{data.description}</Box>}
          {data.author && (
            <Box my="4" overflow="hidden">
              <PostDate data={data} my="6" />
            </Box>
          )}
        </Box>
        {sizedMainImage && <img src={sizedMainImage} />}
      </Box>
    );
  }
);
