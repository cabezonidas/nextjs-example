import React, { forwardRef, ComponentProps } from "react";
import { Box, useTranslation } from "@cabezonidas/shop-ui";
import { DateTime } from "luxon";

interface IPostDate extends Omit<ComponentProps<typeof Box>, "children"> {
  data: { created?: number | null; updated?: number | null };
}

const enUs = {
  created: "Created:",
  updated: "Updated:",
};

const esAr = {
  created: "Creado:",
  updated: "Modificado:",
};

export const PostDate = forwardRef<HTMLDivElement, IPostDate>((props, ref) => {
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
    <>
      {(data.created || data.updated) && (
        <Box
          display="grid"
          width="max-content"
          gridTemplateColumns="auto 1fr"
          gridGap="2"
          ref={ref}
          {...boxProps}
        >
          {data.created && (
            <>
              <Box>{t("postView.created")}</Box>
              <Box>
                {DateTime.fromMillis(data.created).toLocaleString(
                  DateTime.DATETIME_SHORT
                )}
              </Box>
            </>
          )}
          {data.updated && data.updated !== data.created && (
            <>
              <Box>{t("postView.updated")}</Box>
              <Box>
                {DateTime.fromMillis(data.updated).toLocaleString(
                  DateTime.DATETIME_SHORT
                )}
              </Box>
            </>
          )}
        </Box>
      )}
    </>
  );
});
