import React, { forwardRef, ComponentProps } from "react";
import {
  useTranslation,
  Form,
  Label,
  Input,
  Box,
  Button,
  Alert,
  Select,
  Option,
  Loading,
} from "@cabezonidas/shop-ui";
import {
  User,
  useGetNetworkersQuery,
  useSetUpInvestorProfileMutation,
  MeQuery,
  MeDocument,
} from "../../graphql-queries";

const enUs = {
  full_name: "Full name",
  name_alert: "Name is required",
  country: "Country",
  country_alert: "Country is required",
  phone: "Contact number",
  phone_alert: "Contact number is required",
  has_sponsor: "Do you have an assistant?",
  select_sponsor: "Select your assistant",
  no_sponsor: "I don't have one",
  input_sponsor: "Select your assistant",
  pass: "Password",
  unsafe_pass: "Please, make sure your password contains at least 8 chars",
  save: "Save",
};
const esAr = {
  full_name: "Nombre completo",
  name_alert: "Ingresa tu nombre completo",
  country: "País",
  country_alert: "Ingresa tu país",
  phone: "Teléfono de contacto",
  phone_alert: "Ingresa un teléfono de contacto",
  has_sponsor: "¿Tienes asesor/a?",
  select_sponsor: "Selecciona tu asesor",
  no_sponsor: "No tengo asesor",
  input_sponsor: "Ingresa tu asesor",
  pass: "Contraseña",
  unsafe_pass: "Elige una contraseña de más de 8 caracteres",
  save: "Guardar",
};

export const AboutYou = forwardRef<
  HTMLFormElement,
  ComponentProps<typeof Form> & { user: Partial<User> }
>(({ user, ...props }, ref) => {
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle(
    "en-US",
    "translation",
    { profile: { AboutYou: enUs } },
    true,
    true
  );
  i18n.addResourceBundle(
    "es-AR",
    "translation",
    { profile: { AboutYou: esAr } },
    true,
    true
  );

  const [name, setName] = React.useState(user.name ?? "");
  const [country, setCountry] = React.useState("");
  const [sponsor, setSponsor] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const [submitted, setSubmitted] = React.useState(false);

  const disabled = !name || !country || !sponsor || password.length < 8;

  const {
    data: networkersData,
    loading: loadingNetworkers,
  } = useGetNetworkersQuery();

  const [updateProfile, { loading }] = useSetUpInvestorProfileMutation();

  return (
    <Form
      ref={ref}
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
        if (disabled) {
          return;
        }
        const networker = networkersData?.getNetworkers.find(
          (n) => n._id === sponsor
        );
        updateProfile({
          variables: {
            input: {
              name,
              country,
              password,
              phone,
              sponsor: networker
                ? {
                    _id: networker._id,
                    name: networker.name ?? "",
                    email: networker.email,
                  }
                : undefined,
            },
          },
          update: (store, { data }) => {
            if (data) {
              store.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  me: data.setUpInvestorProfile,
                },
              });
            }
          },
        });
      }}
    >
      <Box>
        <Label htmlFor="name">{t("profile.AboutYou.full_name")}</Label>
        <Input
          id="name"
          value={name ?? ""}
          onChange={(e) => setName(e.target.value)}
          required={true}
        />
        {submitted && !name && (
          <Alert variant="danger">{t("profile.AboutYou.name_alert")}</Alert>
        )}
      </Box>
      <Box>
        <Label htmlFor="country">{t("profile.AboutYou.country")}</Label>
        <Input
          id="country"
          value={country ?? ""}
          onChange={(e) => setCountry(e.target.value)}
          required={true}
        />
        {submitted && !country && (
          <Alert variant="danger">{t("profile.AboutYou.country_alert")}</Alert>
        )}
      </Box>
      <Box>
        <Label htmlFor="phone">{t("profile.AboutYou.phone")}</Label>
        <Input
          id="phone"
          value={phone ?? ""}
          onChange={(e) => setPhone(e.target.value)}
        />
        {submitted && !phone && (
          <Alert variant="danger">{t("profile.AboutYou.phone_alert")}</Alert>
        )}
      </Box>
      <Box>
        <Label htmlFor="sponsor">{t("profile.AboutYou.has_sponsor")}</Label>
        <Select
          value={sponsor}
          disabled={loadingNetworkers}
          onChange={(e) => setSponsor(e.target.value)}
        >
          <Option
            value=""
            children={t("profile.AboutYou.select_sponsor")}
            disabled={true}
          />
          {networkersData?.getNetworkers.map((n) => (
            <Option key={n._id} value={n._id} children={n.name || n.email} />
          ))}
          <Option
            value="no-sponsor"
            children={t("profile.AboutYou.no_sponsor")}
          />
        </Select>
        {submitted && !sponsor && (
          <Alert variant="danger">{t("profile.AboutYou.input_sponsor")}</Alert>
        )}
      </Box>
      <Box>
        <Label htmlFor="password">{t("profile.AboutYou.pass")}</Label>
        <Input
          id="password"
          type="password"
          value={password ?? ""}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        {submitted && password.length < 8 && (
          <Alert variant="danger">{t("profile.AboutYou.unsafe_pass")}</Alert>
        )}
      </Box>
      <Button
        justifySelf="flex-end"
        type="submit"
        variant="primary"
        disabled={(disabled && submitted) || loading}
      >
        {loading ? <Loading /> : t("profile.AboutYou.save")}
      </Button>
    </Form>
  );
});

export default AboutYou;
