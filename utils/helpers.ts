import {
  useTranslation,
  listImagesFromRawMarkdown,
  transform,
} from "@cabezonidas/shop-ui";
import { Title, Post, PostData } from "../graphql-queries";

export const usePostMapping = () => {
  const {
    i18n: { language },
  } = useTranslation();
  const getPostTitle = (titles?: Title[]) =>
    (titles
      ? titles.find((title) => title.localeId === language) || titles[0]
      : undefined
    )?.title ?? "";

  const getTranslatedPost = (post?: Post) => {
    if (!post) {
      return;
    }
    let result: Omit<PostData, "__typename"> | undefined = undefined;
    const { __typename, _id, ...parentPostData } = post;
    if (post.language === language) {
      result = parentPostData;
    } else {
      const translation = post.translations.find(
        (tr) => tr.language === language
      );
      if (translation) {
        result = translation;
      } else {
        result = post.language ? parentPostData : post.translations[0];
      }
    }
    return result;
  };

  const getFirstPostImage = (post?: Post | string | null) => {
    if (post) {
      const [mainImage] = listImagesFromRawMarkdown(
        typeof post === "string" ? post : getTranslatedPost(post)?.body ?? ""
      );
      return mainImage;
    }
    return;
  };

  const getPreviewImage = (post?: Post | string | null) => {
    const mainImage = getFirstPostImage(post);
    return mainImage
      ? transform(mainImage, { width: "150px", height: "150px" })
      : undefined;
  };

  const getMetaImage = (post?: Post | string | null) => {
    const mainImage = getFirstPostImage(post);
    return mainImage
      ? transform(mainImage, { width: "600px", height: "315px" })
      : undefined;
  };

  return { getPostTitle, getTranslatedPost, getPreviewImage, getMetaImage };
};
