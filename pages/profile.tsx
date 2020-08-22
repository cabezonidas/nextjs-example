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

  const [logout, { loading: loggingOut }] = useLogoutMutation();

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
        <Box>
          <Box>{data.me.email}</Box>
          <Button
            mt="4"
            disabled={loggingOut}
            onClick={async () => {
              await logout({
                update: (store, { data }) => {
                  if (data) {
                    store.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: { me: null },
                    });
                  }
                },
              });
              router.push("/");
              setAccessToken("");
            }}
          >
            {t("profile.logOut")}
          </Button>
        </Box>
      )}
    </Layout>
  );
};

export default ProfilePage;
