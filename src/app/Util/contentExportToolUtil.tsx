import { GetSearchQuery } from './CreateGQLQuery';

export const GetContentExportResults = (
  gqlEndpoint?: string,
  gqlApiKey?: string,
  startItem?: string,
  templates?: string,
  fields?: string
): void => {
  // show loading modal
  const loadingModal = document.getElementById('loading-modal');
  if (loadingModal) {
    loadingModal.style.display = 'block';
  }

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

      //let converter = require('json-2-csv');
      //converter.json2csv(data).then((result: any) => {
      //  console.log(result);
      //});

      let csvString = '';
      for (let i = 0; i < csvData.length; i++) {
        csvString += csvData[i] + '\n';
      }

      console.log(csvString);

      const element = document.createElement('a');
      const file = new Blob([csvString], { type: 'text/csv' });
      element.href = URL.createObjectURL(file);
      element.download = 'ContentExport.csv';
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();

      if (loadingModal) {
        loadingModal.style.display = 'none';
      }

      alert('Done - check your downloads!');
    })
    .catch((error) => {
      console.error('Error:', error);
      if (loadingModal) {
        loadingModal.style.display = 'none';
      }
    });
};
