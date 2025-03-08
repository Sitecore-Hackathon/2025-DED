import { SearchQueryTemplate } from './SearchQueryTemplate';

export const GetSearchQuery = (
  gqlEndpoint?: string,
  gqlApiKey?: string,
  startItems?: string,
  templates?: string,
  fields?: string
): string => {
  if (!gqlEndpoint || !gqlApiKey) {
    return 'GQL Endpoint and API Key are required. Please see Configuration section';
  }

  let pathFragment = '';
  if (startItems) {
    const paths = startItems.split(',');
    for (var i = 0; i < paths.length; i++) {
      const path = paths[i].trim();
      pathFragment +=
        `{
            name: "_path"
            value: "` +
        path +
        `"
            operator: CONTAINS
        }`;
    }
  }

  let templateFragment = '';
  if (templates) {
    const templateStrings = templates.split(',');
    for (var i = 0; i < templateStrings.length; i++) {
      const template = templateStrings[i].trim();
      templateFragment +=
        `{
            name: "_templates"
            value: "` +
        template +
        `"
            operator: CONTAINS
          }`;
    }
  }

  let fieldsFragment = '';
  if (fields) {
    var fieldStrings = fields.split(',');
    for (var i = 0; i < fieldStrings.length; i++) {
      const field = fieldStrings[i].trim();
      if (field === 'id' || field === 'name' || field === 'url') {
        continue;
      }

      fieldsFragment +=
        field +
        `: field(name: "` +
        field +
        `") {
                value
            }
            `;
    }
  }

  const query = SearchQueryTemplate.replace('pathsFragment', pathFragment)
    .replace('templatesFragment', templateFragment)
    .replace('fieldsFragment', fieldsFragment);

  const jsonQuery = {
    query: query,
  };

  return JSON.stringify(jsonQuery);
};
