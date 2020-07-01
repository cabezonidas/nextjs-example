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

    const [mainImage] = listImagesFromRawMarkdown(data.body ?? "");

    const sizedMainImage = mainImage
      ? transform(mainImage, { height: "150px", width: "150px" })
      : undefined;

    return (
      <Box
        ref={ref}
        borderRadius="4px"
        border="1px solid"
        display={sizedMainImage ? "grid" : undefined}
        gridGap={sizedMainImage ? "2" : undefined}
        gridTemplateColumns={sizedMainImage ? "1fr auto" : undefined}
        {...boxProps}
      >
        <Box>
          {data.title && <H3 mb="4">{data.title}</H3>}
          {data.description && <Box>{data.description}</Box>}
          {data.author && (
            <Box my="4">
              <PostDate data={data} my="6" />
            </Box>
          )}
        </Box>
        {sizedMainImage && <img src={sizedMainImage} />}
      </Box>
    );
  }
);
