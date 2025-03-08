export const GetGqlQuery = (
  gqlEndpoint?: string,
  gqlApiKey?: string,
  startItems?: string,
  templates?: string,
  fields?: string
): string => {
  if (!gqlEndpoint || !gqlApiKey) {
    return 'GQL Endpoint and API Key are required. Please see Configuration section';
  }

  return gqlEndpoint + gqlApiKey + startItems + templates + fields;
};
