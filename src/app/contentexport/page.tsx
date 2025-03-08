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

export default function InstanceSetupPage() {
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

          <div className="advanced open open-default" id="divConfiguration">
            <a className="advanced-btn">Configuration</a>
            <div className="advanced-inner">
              <div className="inner-section">
                <h3>Configuration</h3>
                <div className="container">
                  <b>EXPORT settings:</b>
                  <div className="row">
                    <span className="header">GQL Endpoint</span>
                    <textarea id="txtGqlEndpoint" />
                  </div>
                  <div className="row">
                    <span className="header">GQL API Key</span>
                    <textarea id="txtSCApiKey" />
                  </div>

                  <b>IMPORT settings (requires GQL Endpoint above):</b>
                  <div className="row">
                    <span className="header">Identity Server URL</span>
                    <textarea id="txtIdentityServerUrl" />
                  </div>
                  <div className="row">
                    <span className="header">Sitecore Username</span>
                    <textarea id="txtUsername" />
                  </div>
                  <div className="row">
                    <span className="header">Sitecore Password</span>
                    <textarea id="txtPassword" />
                  </div>
                  <div className="row">
                    <span className="header">Client ID</span>
                    <textarea id="txtClientId" />
                  </div>
                  <div className="row">
                    <span className="header">Client Secret</span>
                    <textarea id="txtClientSecret" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="advanced open open-default" id="divFilters">
            <a className="advanced-btn">Export</a>
            <div className="advanced-inner">
              <div className="inner-section">
                <h3>Export</h3>
                <div className="container">
                  <div className="row">
                    <span className="header" id="startitems">
                      Start Item(s)
                    </span>
                    <a className="clear-btn" data-id="inputStartitem">
                      clear
                    </a>
                    <textarea
                      placeholder="Start Item ID(s)"
                      id="inputStartitem"
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
                    <textarea id="inputTemplates"></textarea>
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
                    <span className="header">Fields</span>
                    <a className="clear-btn" data-id="inputFields">
                      clear
                    </a>
                    <textarea id="inputFields" cols={60} rows={5}></textarea>

                    <button
                      id="btnBrowseFields"
                      //onClick={() => alert('click!')}
                    >
                      Browse Fields
                    </button>

                    <span className="border-notes">
                      Enter field names separated by commas.
                    </span>

                    <div className="">
                      <input type="checkbox" id="chkAllFields"></input>
                      <span className="notes">
                        <b>All Fields</b> - This will export the values of{' '}
                        <b>all fields</b> of every included item.{' '}
                        <b>
                          Note that this requires the Template names to be
                          entered below
                        </b>
                      </span>{' '}
                      <br />
                      <textarea
                        id="txtFieldTemplates"
                        cols={60}
                        rows={5}
                      ></textarea>
                      <span className="border-notes">
                        Enter template NAMES separated by commas. This will not
                        filter; it will only retrieve fields
                      </span>
                    </div>

                    <button
                    // onClick={() => alert('Run Export')}
                    >
                      Run Export
                    </button>
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
