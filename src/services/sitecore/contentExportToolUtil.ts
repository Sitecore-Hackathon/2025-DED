import { GetSearchQuery } from './createGqlQuery';
import { CreateQueryTemplate, UpdateQueryTemplate } from './updateTemplate.query';

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
            let cleanFieldValue = fieldValue.replace(/[\n\r\t]/gm, '');
            // double quote to escape commas
            if (cleanFieldValue.indexOf(',') > -1) {
              cleanFieldValue = '"' + cleanFieldValue + '"';
            }
            resultRow += (cleanFieldValue ?? 'n/a') + ',';
          }
        }

        csvData.push(resultRow);
      }

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
      alert('Something went wrong. Check the console for errors');
      if (loadingModal) {
        loadingModal.style.display = 'none';
      }
    });
};

let errorHasBeenDisplayed = false;

export const PostMutationQuery = (update: boolean, gqlEndpoint?: string, authToken?: string, csvData?: any[]): void => {
  errorHasBeenDisplayed = false;
  // show loading modal
  const loadingModal = document.getElementById('loading-modal');
  if (loadingModal) {
    loadingModal.style.display = 'block';
  }

  if (!gqlEndpoint || !authToken) {
    alert('Select an Instance with an Auth token');
    return;
  }

  if (!csvData) {
    alert('No file data found');
    return;
  }

  let queries = [];

  // iterate through requests
  for (var i = 0; i < csvData.length; i++) {
    let query = '';

    if (update) {
      query = UpdateQueryTemplate;
    } else {
      query = CreateQueryTemplate;
    }

    const row = csvData[i];
    // basic data
    query = query.replace('pathFragment', row['Item Path']);
    query = query.replace('ItemName', row['Name']);
    query = query.replace('ItemTemplate', row['Template']);

    if (!update && (!row['Item Path'] || !row['Name'] || !row['Template'])) {
      alert('Missing required columns. Please make sure your CSV includes columns for Item Path, Template, and Name');
      if (loadingModal) {
        loadingModal.style.display = 'none';
      }
      return;
    }

    if (row['Language']) {
      const languageFragment = `language: "` + row['Language'] + `"`;
      query = query.replace('languageFragment', languageFragment);
    } else {
      query = query.replace('languageFragment', '');
    }

    let fieldFragments = '';
    for (var property in row) {
      if (
        property === 'Item Path' ||
        property === 'Template' ||
        property === 'ID' ||
        property === 'Name' ||
        property === 'Language' ||
        property === ''
      ) {
        continue;
      }

      const value = row[property];
      const fieldFragment =
        `
        { name: "` +
        property +
        `", value: "` +
        value.replace('"', '&quot;') +
        `" }`;

      fieldFragments += fieldFragment;
    }

    query = query.replace('fieldsFragment', fieldFragments);

    const jsonQuery = {
      query: query,
    };

    console.log(jsonQuery);
    queries.push(jsonQuery);
  }

  Promise.all(queries.map((query) => PostUpdateQuery(gqlEndpoint, authToken, JSON.stringify(query)))).then(
    (results) => {
      if (loadingModal) {
        loadingModal.style.display = 'none';
      }

      results.forEach((result) => console.log(result));
    }
  );
};

export const PostUpdateQuery = (gqlEndpoint: string, authToken: string, jsonQuery: string) => {
  fetch(gqlEndpoint, {
    method: 'POST',
    headers: new Headers({ Authorization: 'Bearer ' + authToken, 'content-type': 'application/json' }),
    body: JSON.stringify(jsonQuery),
  })
    .then((response) => response.json())
    .then((data) => {
      // parse data
      const results = data;
      console.log(results);
    })
    .catch((error) => {
      console.error('Error:', error);

      if (!errorHasBeenDisplayed) {
        alert('Something went wrong. Check the console for errors.');
      }
      errorHasBeenDisplayed = true;
    });
};
