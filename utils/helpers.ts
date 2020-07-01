import { useTranslation } from "@cabezonidas/shop-ui";
import { Title, Post, PostData } from "../graphql-queries";

export const usePostTranslation = () => {
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
  return { getPostTitle, getTranslatedPost };
};
