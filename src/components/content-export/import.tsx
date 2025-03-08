import { IInstance } from '@/models/IInstance';
import { PostMutationQuery } from '@/services/sitecore/contentExportToolUtil';
import Papa from 'papaparse';
import { FC, useState } from 'react';

interface ImportToolProps {
  activeInstance: IInstance | undefined;
}

export const ImportTool: FC<ImportToolProps> = ({ activeInstance }) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const onFileChange = (event: any) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    if (!selectedFile) {
      alert('No file selected');
      return;
    }

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data);

        PostMutationQuery(activeInstance?.graphQlEndpoint, activeInstance?.apiToken, results.data);
      },
    });
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>

          <p>File Type: {selectedFile.type}</p>

          <p>
            Last Modified:
            {selectedFile.lastModified}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  return (
    <div className="advanced open open-default" id="contentImport">
      <a className="advanced-btn">Import</a>
      <div className="advanced-inner">
        <div className="row advanced-search">
          <span className="uploadResponse"></span>

          <div>
            <input type="file" accept=".csv" onChange={onFileChange} />
            <button onClick={onFileUpload}>Import!</button>
          </div>
          {fileData()}

          <br />
          <span className="">
            <b>Getting Started</b>
            <br />
            To create new items, CSV must include the following columns: <b>Item Path</b>, <b>Template</b>, <b>Name</b>.
            In the Item Path field, put in the path of the parent item.
            <br />
            <br />
            To edit existing items, CSV must include <b>Item Path</b>
            <br />
            <br />
            By default, the import will NOT overwrite exising items, but will only create new items.
            <br />
            To overwrite existing items, uncheck the checkbox below
            <br />
            <br />
            <br />
            <br />
          </span>

          <br />
          <br />

          <h3>READ ME!</h3>
          <p>
            Use the import tool carefully! Make sure to review all modified items in Sitecore before publishing.
            <br />
            <br />
            The <b>Update</b> option will only edit existing items (found using the Item Path) and will ignore items
            that are not found.
            <br />
            <br />
            The <b>Import</b> button will create new items under the Item Path. An item will not be created if an item
            with the same path and template already exists, unless you uncheck "Do not create duplicates"
          </p>

          <h3>Tips:</h3>
          <ul>
            <li>
              Files should be uploaded in <b>csv</b> format
            </li>
            <li>Item Path and Template can be either a full Sitecore path or a Guid ID</li>
            <li>
              Add a column for every field that you want to add/change content for with the field name or ID (e.g.
              replace Field1 in the example template with a valid field name)
              <ul>
                <li>
                  If you are editing content, it is recommended to export all the items with all fields you want to
                  modify first, edit that file and then upload it
                </li>
              </ul>
            </li>
            <li>
              If you are modifying existing content, for best results run an export on that content first, make your
              changes in the downloaded file and re-upload that file to import.
            </li>
            <li>
              To <b>edit</b> content, Item Path must be the path of the item you with to edit.
              <br />
            </li>
            <li>
              To <b>create</b> content, the Item Path must be the path of the parent item you wish to create the new
              item under (parent item must already exist);
              <ul>
                <li>Make sure to include Name and Template when creating items</li>
                <li>Name and Template are not necessary for editing items</li>
              </ul>
            </li>
            <li>
              Note: The import function currently supports string, image, and link fields. It does not support more
              complex field types, such as droplists or multilists.
            </li>

            <li>
              <b>Language Versions</b>: To specify language, add a <b>Language</b> column. If no language is specified,
              all items will be created/edited in the default language
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
