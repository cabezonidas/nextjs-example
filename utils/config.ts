export const env = process?.env?.NEXT_PUBLIC_ENV;
const baseDomain = (() => {
  if (env === "development") {
    return { api: "http://localhost:8899", website: "http://localhost:3000" };
  } else if (env === "development") {
    return {
      api: "https://api.javascript.kiwi",
      website: "https://javascript.kiwi",
    };
  } else {
    return {
      api: "https://api.latamtradingclub.com",
      website: "https://latamtradingclub.com",
    };
  }
})();
export const websiteUrl = baseDomain.website;
export const graphqlUrl = `${baseDomain.api}/graphql`;
export const companyName = "Latam Trading Club";
