import React from "react";
import Layout from "../components/Layout";
import {
  useMeQuery,
  useLogoutMutation,
  MeQuery,
  MeDocument,
} from "../graphql-queries";
import { useTranslation, H1, Dialog, Box, Button } from "@cabezonidas/shop-ui";
import { Authenticate } from "../components/profile/Authenticate";
import { setAccessToken } from "../lib/accessToken";
import { useRouter } from "next/router";
import AboutYou from "../components/profile/AboutYou";

const enUs = {
  title: "Profile",
  modalFooter: "If you don't have an account, it will create one for you",
  logOut: "Log out",
};
const esAr = {
  title: "Perfil",
  modalFooter: "Si no posees una cuenta, se creará una ahora",
  logOut: "Salir",
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
              <Box>Solo queda que nos confirmes la siguiente información: </Box>
              <AboutYou user={data.me} />
            </>
          ) : (
            <Box>
              <Box>
                Muchas gracias {data.me.name} por haberte registrado con
                nosotros. A la brevedad estaremos en contactor contigo.
              </Box>
            </Box>
          )}
          <Box width="100%" justifyContent="space-around" display="flex">
            <Button
              mt="4"
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
          </Box>
        </>
      )}
    </Layout>
  );
};

export default ProfilePage;
