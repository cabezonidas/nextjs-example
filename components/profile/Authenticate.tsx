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
  useToast,
} from "@cabezonidas/shop-ui";
import { setAccessToken } from "../../lib/accessToken";

const enUs = {
  email1: "Email",
  invalid_email: "Invalid email",
  email_required: "Email is required",
  continue1: "Continue",
  code: "Code",
  code_instruction: "Copy and paste the code we've just sent to your email",
  continue2: "Continue",
  email2: "Email",
  password: "Password",
  pass_required: "Password is required",
  dont_remember: "Don't remember?",
  continue3: "Continue",
  success_toast: "Congratulations! You're email has been validated 🎉",
};
const esAr = {
  email1: "Email",
  invalid_email: "Email inválido",
  email_required: "Ingresa tu email",
  continue1: "Continuar",
  code: "Código",
  code_instruction: "Copia y pega el código que enviamos a tu email",
  continue2: "Continuar",
  email2: "Email",
  password: "Password",
  pass_required: "Ingresa tu password",
  dont_remember: "No lo recuerdo",
  continue3: "Continuar",
  success_toast: "Muy bien! Ya haz validado tu email 🎉",
};

const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const Authenticate = forwardRef<
  HTMLFormElement,
  ComponentProps<typeof Form>
>((props, ref) => {
  const { t, i18n } = useTranslation();
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

  const { notify } = useToast();

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
            <Label htmlFor="email">{t("profile.authenticate.email1")}</Label>
            <Input
              id="email"
              value={email}
              type="username"
              onChange={(e) => setEmail(e.target.value.trim())}
            />
            {!validEmail && email && (
              <Alert variant="danger">
                {t("profile.authenticate.invalid_email")}
              </Alert>
            )}
            {!email && (
              <Alert variant="info">
                {t("profile.authenticate.email_required")}
              </Alert>
            )}
          </Box>
          <Button
            justifySelf="flex-end"
            type="submit"
            variant="primary"
            disabled={!validEmail || checkingMail}
          >
            {checkingMail ? <Loading /> : t("profile.authenticate.continue1")}
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
                  notify(t("profile.authenticate.success_toast"), {
                    variant: "success",
                  });
                  if (data) {
                    store.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        me: data.loginWithToken.user,
                      },
                    });
                    setAccessToken(data.loginWithToken.accessToken);
                  }
                },
              });
            }
          }}
        >
          <Box>
            <Label htmlFor="token">{t("profile.authenticate.code")}</Label>
            <Input
              id="token"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Alert variant="info">
              {t("profile.authenticate.code_instruction")}
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
            {checkingToken ? <Loading /> : t("profile.authenticate.continue2")}
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
                    setAccessToken(data.login.accessToken);
                  }
                },
              });
            }
          }}
        >
          <Box>
            <Label htmlFor="email">{t("profile.authenticate.email2")}</Label>
            <Input id="email" type="email" value={email} />
            <Label htmlFor="password">
              {t("profile.authenticate.password")}
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
            {!password && (
              <Alert variant="info">
                {t("profile.authenticate.pass_required")}
              </Alert>
            )}
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
              {t("profile.authenticate.dont_remember")}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!password || loggingIn}
            >
              {loggingIn ? <Loading /> : t("profile.authenticate.continue2")}
            </Button>
          </Box>
        </Form>
      )}
    </>
  );
});

export default Authenticate;
