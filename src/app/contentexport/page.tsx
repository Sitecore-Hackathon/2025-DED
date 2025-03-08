'use client';
import { AppSidebar } from '@/components/app-sidebar';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import ContentExportSearchStyles from '@/components/ui/ContentExportStyles';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { enumInstanceType, IInstance } from '@/models/IInstance';
import { Separator } from '@radix-ui/react-separator';
import { useState } from 'react';
import { GetContentExportResults } from '../Util/contentExportToolUtil';
import { GetAvailableFields } from '../Util/CreateGQLQuery';

export default function InstanceSetupPage() {
  const [instances, setInstances] = useState<IInstance[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('instances');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [activeInstance, setActiveInstance] = useState<IInstance>();

  const [configurationOpen, setConfigurationOpen] = useState<boolean>(true);
  const [exportOpen, setExportOpen] = useState<boolean>(true);
  const [startItem, setStartItem] = useState<string>();
  const [templates, setTemplates] = useState<string>();
  const [templateNames, setTemplateNames] = useState<string>();
  const [fields, setFields] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleStartItem = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStartItem(event.target.value);
  };
  const handleTemplates = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTemplates(event.target.value);
  };
  const handleFields = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFields(event.target.value);
  };
  const handleTemplateNames = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTemplateNames(event.target.value);
  };

  const handleInstanceSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const instanceName = event.target.value;
    for (var i = 0; i < instances.length; i++) {
      var instance = instances[i];
      if (instance.name === instanceName) {
        setActiveInstance(instance);
        return;
      }
    }

    // no instance selected
    const emptyInstance: IInstance = {
      name: '',
      instanceType: enumInstanceType.xmc,
      clientId: '',
      clientSecret: '',
      graphQlEndpoint: '',
      apiToken: '',
      id: '',
    };
    setActiveInstance(emptyInstance);
  };

  const runExport = () => {
    if (!activeInstance || !activeInstance.name) {
      alert('Please select an instance. If you do not have any instances, configure one now');
      return;
    }

    GetContentExportResults(activeInstance.graphQlEndpoint, activeInstance.apiToken, startItem, templates, fields);
  };

  const browseFields = () => {
    if (!templateNames) {
      alert('Enter Template Names (below the Fields input) to get available fields');
      return;
    }
    const queries = GetAvailableFields(templateNames);
    console.log(queries);
  };

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

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e?.target?.result;
      console.log(text);
      alert(text);
    };
    reader.readAsText(selectedFile);
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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Content Export Tool</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="contentExportTool">
          <ContentExportSearchStyles />
          <h1 className="text-2xl font-bold">Content Export Tool</h1>

          <div className="loading-modal" id="loading-modal">
            <div className="loading-box">
              <div className="lds-default">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>

          <div className="advanced-inner">
            <div className="inner-section">
              <div className="container">
                <div className="row">
                  <span className="header">
                    <h2>
                      <b>Instance</b>
                    </h2>

                    {instances && instances.length > 0 && (
                      <>
                        <select onChange={handleInstanceSelect}>
                          <option>-- select instance --</option>
                          {instances.map((instance) => {
                            return (
                              <option key={instance.id} value={instance.name}>
                                {instance.name}
                              </option>
                            );
                          })}
                        </select>
                        <br />
                        <p>
                          <a href="/settings/instance">Configure instances</a>
                        </p>
                      </>
                    )}
                    {instances?.length === 0 && (
                      <p>
                        No instances configured. <a href="/settings/instance">Configure your instances here</a>
                      </p>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <br />

          <div className={'advanced ' + (exportOpen ? 'open open-default' : '')} id="divConfiguration">
            <a className="advanced-btn" onClick={() => setExportOpen(!exportOpen)}>
              Export
            </a>
            <div className="advanced-inner">
              <div className="inner-section">
                <h3>Export</h3>
                <div className="container">
                  <div className="row">
                    <span className="header" id="startitems">
                      <b>Start Item(s)</b>
                    </span>
                    <a className="clear-btn" data-id="inputStartitem">
                      clear
                    </a>
                    <textarea
                      id="inputStartitem"
                      onInput={handleStartItem}
                      onChange={handleStartItem}
                      placeholder={
                        'e.g. {D4D93D21-A8B4-4C0F-8025-251A38D9A04D}, {2745F1E8-1B06-4B08-9628-DEAE336F64F6}'
                      }
                    />
                    <span className="border-notes">
                      Enter the ID of each starting node separated by commas (MUST BE GUIDs).
                      <br />
                      Only content beneath and including this node will be exported. If field is left blank, the
                      starting node will be /sitecore/content.
                    </span>
                  </div>

                  <div className="row">
                    <span className="header">
                      <b>Templates</b>
                    </span>
                    <a className="clear-btn" data-id="inputTemplates">
                      clear
                    </a>
                    <textarea
                      id="inputTemplates"
                      onInput={handleTemplates}
                      onChange={handleTemplates}
                      placeholder={
                        'e.g. {CC92A3D8-105C-4016-8BD7-22162C1ED919}, {8C80272B-1910-4F3D-9A78-27012F04CEB0}'
                      }
                    ></textarea>
                    <span className="border-notes">
                      Enter template IDs separated by commas (MUST BE GUIDs)
                      <br />
                      Items will only be exported if their template is in this list. If this field is left blank, all
                      templates will be included.
                    </span>
                    <div className="hints">
                      <a className="show-hints">Hints</a>
                      <span className="notes">{'Example: Standard Page, {12345678-901-2345-6789-012345678901}'}</span>
                    </div>
                  </div>

                  <div className="row">
                    <span className="header">
                      <b>Fields</b>
                    </span>
                    <a className="clear-btn" data-id="inputFields">
                      clear
                    </a>
                    <textarea
                      id="inputFields"
                      cols={60}
                      rows={5}
                      onInput={handleFields}
                      onChange={handleFields}
                      placeholder={'e.g. title, image, taxonomies'}
                    ></textarea>

                    <span className="border-notes">Enter field names separated by commas.</span>

                    <div className="">
                      <br />
                      <br />
                      <span className="header">
                        <b>Browse Fields - input template names below, then click button to see available fields</b>
                      </span>
                      <span className="header">Template Names (for browse):</span>
                      <textarea
                        id="txtFieldTemplates"
                        cols={60}
                        rows={5}
                        onInput={handleTemplateNames}
                        onChange={handleTemplateNames}
                        placeholder={'e.g. Person, Whitepaper, LandingPage'}
                      ></textarea>
                      <button id="btnBrowseFields" onClick={() => browseFields()}>
                        Browse Fields
                      </button>
                      <span className="border-notes">
                        Enter template NAMES separated by commas. This will not filter; it will only retrieve fields
                      </span>
                    </div>

                    <button onClick={() => runExport()}>Run Export</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                  To create new items, CSV must include the following columns: <b>Item Path</b>, <b>Template</b>,{' '}
                  <b>Name</b>. In the Item Path field, put in the path of the parent item.
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
                  The <b>Update</b> option will only edit existing items (found using the Item Path) and will ignore
                  items that are not found.
                  <br />
                  <br />
                  The <b>Import</b> button will create new items under the Item Path. An item will not be created if an
                  item with the same path and template already exists, unless you uncheck "Do not create duplicates"
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
                        If you are editing content, it is recommended to export all the items with all fields you want
                        to modify first, edit that file and then upload it
                      </li>
                    </ul>
                  </li>
                  <li>
                    If you are modifying existing content, for best results run an export on that content first, make
                    your changes in the downloaded file and re-upload that file to import.
                  </li>
                  <li>
                    To <b>edit</b> content, Item Path must be the path of the item you with to edit.
                    <br />
                  </li>
                  <li>
                    To <b>create</b> content, the Item Path must be the path of the parent item you wish to create the
                    new item under (parent item must already exist);
                    <ul>
                      <li>Make sure to include Name and Template when creating items</li>
                      <li>Name and Template are not necessary for editing items</li>
                    </ul>
                  </li>
                  <li>
                    Note: The import function currently supports string, image, and link fields. It does not support
                    more complex field types, such as droplists or multilists.
                  </li>

                  <li>
                    <b>Language Versions</b>: To specify language, add a <b>Language</b> column. If no language is
                    specified, all items will be created/edited in the default language
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
