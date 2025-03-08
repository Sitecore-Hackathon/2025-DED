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

    const csvData = GetContentExportResults(
      activeInstance.graphQlEndpoint,
      activeInstance.apiToken,
      startItem,
      templates,
      fields
    );

    // output csvData!
  };

  const browseFields = () => {
    if (!templateNames) {
      alert('Enter Template Names (below the Fields input) to get available fields');
      return;
    }
    const queries = GetAvailableFields(templateNames);
    console.log(queries);
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
