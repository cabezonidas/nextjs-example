import React, { forwardRef, ComponentProps } from "react";
import {
  useLoginRequiresCodeLazyQuery,
  useLoginWithTokenMutation,
  useLoginMutation,
  useRenewCodeLoginMutation,
  MeQuery,
  MeDocument,
} from "../../graphql-queries";
import {
  useTranslation,
  Form,
  Label,
  Input,
  Box,
  Button,
  Alert,
  Loading,
} from "@cabezonidas/shop-ui";

const enUs = {};
const esAr = {};

const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const Authenticate = forwardRef<
  HTMLFormElement,
  ComponentProps<typeof Form>
>((props, ref) => {
  const { i18n } = useTranslation();
  i18n.addResourceBundle(
    "en-US",
    "translation",
    { profile: { authenticate: enUs } },
    true,
    true
  );
  i18n.addResourceBundle(
    "es-AR",
    "translation",
    { profile: { authenticate: esAr } },
    true,
    true
  );

  const [email, setEmail] = React.useState("");
  const validEmail = emailRegex.test(email);
  const [
    checkMail,
    { data: mailData, loading: checkingMail },
  ] = useLoginRequiresCodeLazyQuery();

  const [code, setCode] = React.useState("");
  const [
    loginWithToken,
    { loading: checkingToken, error: tokenError },
  ] = useLoginWithTokenMutation();

  const [password, setPassword] = React.useState("");
  const [login, { loading: loggingIn, error: loginError }] = useLoginMutation();

  const [
    renewCode,
    { loading: renewingCode, data: renewData },
  ] = useRenewCodeLoginMutation();

  return (
    <>
      {!mailData ? (
        <Form
          ref={ref}
          {...props}
          onSubmit={(e) => {
            e.preventDefault();
            if (validEmail) {
              checkMail({ variables: { email } });
            }
          }}
        >
          <Box>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              type="username"
              onChange={(e) => setEmail(e.target.value)}
            />
            {!validEmail && email && (
              <Alert variant="danger">Email inválido</Alert>
            )}
            {!email && <Alert variant="info">Ingresa tu email</Alert>}
          </Box>
          <Button
            justifySelf="flex-end"
            type="submit"
            variant="primary"
            disabled={!validEmail || checkingMail}
          >
            {checkingMail ? <Loading /> : "Continuar"}
          </Button>
        </Form>
      ) : mailData.loginRequiresCode || renewData?.renewCodeLogin ? (
        <Form
          ref={ref}
          {...props}
          onSubmit={(e) => {
            e.preventDefault();
            if (code) {
              loginWithToken({
                variables: { email, token: code },
                update: (store, { data }) => {
                  if (data) {
                    store.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        me: data.loginWithToken.user,
                      },
                    });
                  }
                },
              });
            }
          }}
        >
          <Box>
            <Label htmlFor="token">Code</Label>
            <Input
              id="token"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Alert variant="info">
              Copia y pega el código que enviamos a tu email
            </Alert>
            {tokenError && (
              <Alert variant="danger">
                {tokenError.graphQLErrors.map((e, i) => (
                  <Box key={i}>{e.message}</Box>
                ))}
              </Alert>
            )}
          </Box>
          <Button
            justifySelf="flex-end"
            type="submit"
            variant="primary"
            disabled={!code || checkingToken}
          >
            {checkingToken ? <Loading /> : "Continuar"}
          </Button>
        </Form>
      ) : (
        <Form
          ref={ref}
          {...props}
          onSubmit={(e) => {
            e.preventDefault();
            if (password) {
              login({
                variables: { email, password },
                update: (store, { data }) => {
                  if (data) {
                    store.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        me: data.login.user,
                      },
                    });
                  }
                },
              });
            }
          }}
        >
          <Box>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} />
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
            {!password && <Alert variant="info">Ingresa tu password</Alert>}
            {loginError && (
              <Alert variant="danger">
                {loginError.graphQLErrors.map((e, i) => (
                  <Box key={i}>{e.message}</Box>
                ))}
              </Alert>
            )}
          </Box>
          <Box display="grid" gridGap="2" gridTemplateColumns="1fr auto">
            <Button
              justifySelf="flex-end"
              disabled={renewingCode || loggingIn}
              variant="default"
              onClick={() => renewCode({ variables: { email } })}
            >
              No sé mi contraseña
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!password || loggingIn}
            >
              {loggingIn ? <Loading /> : "Continuar"}
            </Button>
          </Box>
        </Form>
      )}
    </>
  );
});

export default Authenticate;
