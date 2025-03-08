import { GetSearchQuery } from './CreateGQLQuery';

export const GetContentExportResults = (
  gqlEndpoint?: string,
  gqlApiKey?: string,
  startItem?: string,
  templates?: string,
  fields?: string
): any => {
  const query = GetSearchQuery(gqlEndpoint, gqlApiKey, startItem, templates, fields);

  if (!gqlEndpoint || !gqlApiKey) {
    return;
  }

  fetch(gqlEndpoint, {
    method: 'POST',
    headers: new Headers({ sc_apikey: gqlApiKey, 'content-type': 'application/json' }),
    body: query,
  })
    .then((response) => response.json())
    .then((data) => {
      // parse data
      const results = data.data.pageOne.results;

      let csvData = [];

      // first row of CSV
      const fieldStrings = fields?.split(',');
      let headerRow = 'Item Path,Name,ID,';
      if (fieldStrings) {
        for (var i = 0; i < fieldStrings.length; i++) {
          headerRow += fieldStrings[i].trim() + ',';
        }
      }
      csvData.push(headerRow);

      for (var i = 0; i < results.length; i++) {
        const result = results[i];

        let resultRow = result.url.path + ',' + result.name + ',' + result.id + ',';

        if (fieldStrings) {
          for (var j = 0; j < fieldStrings.length; j++) {
            const field = fieldStrings[j].trim();
            const fieldValue = result[field]?.value;
            resultRow += (fieldValue ?? 'n/a') + ',';
          }
        }

        csvData.push(resultRow);
      }

      console.log(csvData);
      return csvData;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
