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

const enUs = {};
const esAr = {};

export const AboutYou = forwardRef<
  HTMLFormElement,
  ComponentProps<typeof Form> & { user: Partial<User> }
>(({ user, ...props }, ref) => {
  const { i18n } = useTranslation();
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
        <Label htmlFor="name">Nombre completo</Label>
        <Input
          id="name"
          value={name ?? ""}
          onChange={(e) => setName(e.target.value)}
          required={true}
        />
        {submitted && !name && (
          <Alert variant="danger">Ingresa tu nombre completo</Alert>
        )}
      </Box>
      <Box>
        <Label htmlFor="country">País</Label>
        <Input
          id="country"
          value={country ?? ""}
          onChange={(e) => setCountry(e.target.value)}
          required={true}
        />
        {submitted && !country && (
          <Alert variant="danger">Ingresa tu país</Alert>
        )}
      </Box>
      <Box>
        <Label htmlFor="phone">Teléfono de contacto</Label>
        <Input
          id="phone"
          value={phone ?? ""}
          onChange={(e) => setPhone(e.target.value)}
        />
        {submitted && !phone && (
          <Alert variant="danger">Ingresa un teléfono de contacto</Alert>
        )}
      </Box>
      <Box>
        <Label htmlFor="sponsor">¿Tienes asesor/a?</Label>
        <Select
          value={sponsor}
          disabled={loadingNetworkers}
          onChange={(e) => setSponsor(e.target.value)}
        >
          <Option value="" children={"Selecciona tu asesor"} disabled={true} />
          {networkersData?.getNetworkers.map((n) => (
            <Option key={n._id} value={n._id} children={n.name || n.email} />
          ))}
          <Option value="no-sponsor" children={"No tengo asesor"} />
        </Select>
        {submitted && !sponsor && (
          <Alert variant="danger">Ingresa tu asesor</Alert>
        )}
      </Box>
      <Box>
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          value={password ?? ""}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        {submitted && password.length < 8 && (
          <Alert variant="danger">
            Elige una contraseña de más de 8 caracteres
          </Alert>
        )}
      </Box>
      <Button
        justifySelf="flex-end"
        type="submit"
        variant="primary"
        disabled={(disabled && submitted) || loading}
      >
        {loading ? <Loading /> : "Guardar"}
      </Button>
    </Form>
  );
});

export default AboutYou;
