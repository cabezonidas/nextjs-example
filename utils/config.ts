export const env = process?.env?.NODE_ENV;
export const baseUrl =
  env === "development"
    ? "http://localhost:8899"
    : "https://api.javascript.kiwi";
export const graphqlUrl = `${baseUrl}/graphql`;
export const companyName = "Latam Trading Club";
