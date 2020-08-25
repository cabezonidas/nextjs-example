import React from "react";
import Layout from "../components/Layout";
import { useMeQuery, useLogoutMutation } from "../graphql-queries";
import { useTranslation, H1, Dialog, Box, Button } from "@cabezonidas/shop-ui";
import { Authenticate } from "../components/profile/Authenticate";
import { setAccessToken } from "../lib/accessToken";
import { useRouter } from "next/router";
import AboutYou from "../components/profile/AboutYou";

const enUs = {
  title: "Profile",
  modalFooter: "If you don't have an account, it will create one for you",
  logOut: "Log out",
  please_complete: "Solo queda que nos confirmes la siguiente información:",
  thanks: `Muchas gracias {{name}} por haberte registrado con nosotros. A la brevedad estaremos en contactor contigo.`,
};
const esAr = {
  title: "Perfil",
  modalFooter: "Si no posees una cuenta, se creará una ahora",
  logOut: "Salir",
  please_complete:
    "We're almost there! Please, confirm the following information:",
  thanks: `Thanks {{name}} for joining us. We'll get back to you asap..`,
};

const ProfilePage = () => {
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { profile: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { profile: esAr }, true, true);

  const router = useRouter();

  const { data, loading } = useMeQuery();

  const [logout, { loading: loggingOut, client }] = useLogoutMutation();

  return (
    <Layout documentTitle={t("profile.title")}>
      <H1 mb="4">{t("profile.title")}</H1>

      <Dialog
        aria-label={t("profile.modalTitle")}
        isOpen={!loading && data && !data.me}
        footer={t("profile.modalFooter")}
      >
        <Authenticate />
      </Dialog>
      {data?.me && (
        <>
          {!data.me.name ? (
            <>
              <Box>{t("profile.please_complete")}</Box>
              <AboutYou user={data.me} />
            </>
          ) : (
            <Box>
              <Box>{t("profile.thanks", { name: data.me.name })}</Box>
            </Box>
          )}
          <Button
            mt="8"
            disabled={loggingOut}
            onClick={async () => {
              await logout();
              if (client) {
                await client.clearStore();
              }
              router.push("/");
              setAccessToken("");
            }}
          >
            {t("profile.logOut")}
          </Button>
        </>
      )}
    </Layout>
  );
};

export default ProfilePage;
