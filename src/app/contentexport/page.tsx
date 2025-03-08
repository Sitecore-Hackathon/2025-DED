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
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import { useState } from 'react';
import { GetAvailableFields, GetSearchQuery } from '../Util/CreateGQLQuery';

export default function InstanceSetupPage() {
  const [configurationOpen, setConfigurationOpen] = useState<boolean>(true);
  const [exportOpen, setExportOpen] = useState<boolean>(true);
  const [gqlEndpoint, setGqlEndpoint] = useState<string>();
  const [gqlApiKey, setGqlApiKey] = useState<string>();
  const [startItem, setStartItem] = useState<string>();
  const [templates, setTemplates] = useState<string>();
  const [templateNames, setTemplateNames] = useState<string>();
  const [fields, setFields] = useState<string>();
  const [idServer, setIdServer] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [clientId, setClientId] = useState<string>();
  const [clientSecret, setClientSecret] = useState<string>();

  const handleGqlEndpoint = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGqlEndpoint(event.target.value);
  };
  const handleApiKey = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGqlApiKey(event.target.value);
  };
  const handleStartItem = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStartItem(event.target.value);
  };
  const handleTemplates = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTemplates(event.target.value);
  };
  const handleFields = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFields(event.target.value);
  };
  const handleTemplateNames = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTemplateNames(event.target.value);
  };
  const handleIdentityServer = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setIdServer(event.target.value);
  };
  const handleUsername = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPassword(event.target.value);
  };
  const handleClientId = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setClientId(event.target.value);
  };
  const handleClientSecret = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setClientSecret(event.target.value);
  };

  const runExport = () => {
    const query = GetSearchQuery(
      gqlEndpoint,
      gqlApiKey,
      startItem,
      templates,
      fields
    );
    console.log(query);
  };

  const browseFields = () => {
    if (!templateNames) {
      alert(
        'Enter Template Names (below the Fields input) to get available fields'
      );
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
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
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

          <div
            className={
              'advanced ' + (configurationOpen ? 'open open-default' : '')
            }
            id="divConfiguration"
          >
            <a
              className="advanced-btn"
              onClick={() => setConfigurationOpen(!configurationOpen)}
            >
              Configuration
            </a>
            <div className="advanced-inner">
              <div className="inner-section">
                <h3>Configuration</h3>
                <div className="container">
                  <b>EXPORT settings:</b>
                  <div className="row">
                    <span className="header">GQL Endpoint</span>
                    <textarea
                      id="txtGqlEndpoint"
                      onInput={handleGqlEndpoint}
                      onChange={handleGqlEndpoint}
                      placeholder={
                        'e.g. https://edge.sitecorecloud.io/api/graphql/v1'
                      }
                    />
                  </div>
                  <div className="row">
                    <span className="header">GQL API Key</span>
                    <textarea
                      id="txtSCApiKey"
                      onInput={handleApiKey}
                      onChange={handleApiKey}
                      placeholder={'e.g. ALXQKzlpcVJrQX1aNmE1M2RzSHo'}
                    />
                  </div>

                  <b>IMPORT settings (requires GQL Endpoint above):</b>
                  <div className="row">
                    <span className="header">Identity Server URL</span>
                    <textarea
                      id="txtIdentityServerUrl"
                      onInput={handleIdentityServer}
                      onChange={handleIdentityServer}
                      placeholder={'e.g. https://id.mysite.com'}
                    />
                  </div>
                  <div className="row">
                    <span className="header">Sitecore Username</span>
                    <textarea
                      id="txtUsername"
                      onInput={handleUsername}
                      onChange={handleUsername}
                      placeholder={'e.g. admin'}
                    />
                  </div>
                  <div className="row">
                    <span className="header">Sitecore Password</span>
                    <textarea
                      id="txtPassword"
                      onInput={handlePassword}
                      onChange={handlePassword}
                      placeholder={'e.g. b'}
                    />
                  </div>
                  <div className="row">
                    <span className="header">Client ID</span>
                    <textarea
                      id="txtClientId"
                      placeholder={'e.g. SitecoreClient'}
                      onInput={handleClientId}
                      onChange={handleClientId}
                    />
                  </div>
                  <div className="row">
                    <span className="header">Client Secret</span>
                    <textarea
                      id="txtClientSecret"
                      placeholder={'e.g. SitecorePassword'}
                      onInput={handleClientSecret}
                      onChange={handleClientSecret}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={'advanced ' + (exportOpen ? 'open open-default' : '')}
            id="divConfiguration"
          >
            <a
              className="advanced-btn"
              onClick={() => setExportOpen(!exportOpen)}
            >
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
                      Enter the ID of each starting node separated by commas
                      (MUST BE GUIDs).
                      <br />
                      Only content beneath and including this node will be
                      exported. If field is left blank, the starting node will
                      be /sitecore/content.
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
                      Items will only be exported if their template is in this
                      list. If this field is left blank, all templates will be
                      included.
                    </span>
                    <div className="hints">
                      <a className="show-hints">Hints</a>
                      <span className="notes">
                        {
                          'Example: Standard Page, {12345678-901-2345-6789-012345678901}'
                        }
                      </span>
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

                    <span className="border-notes">
                      Enter field names separated by commas.
                    </span>

                    <div className="">
                      <br />
                      <br />
                      <span className="header">
                        <b>
                          Browse Fields - input template names below, then click
                          button to see available fields
                        </b>
                      </span>
                      <span className="header">
                        Template Names (for browse):
                      </span>
                      <textarea
                        id="txtFieldTemplates"
                        cols={60}
                        rows={5}
                        onInput={handleTemplateNames}
                        onChange={handleTemplateNames}
                        placeholder={'e.g. Person, Whitepaper, LandingPage'}
                      ></textarea>
                      <button
                        id="btnBrowseFields"
                        onClick={() => browseFields()}
                      >
                        Browse Fields
                      </button>
                      <span className="border-notes">
                        Enter template NAMES separated by commas. This will not
                        filter; it will only retrieve fields
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
