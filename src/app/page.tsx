import { AppSidebar } from '@/components/app-sidebar';
import { ContentExportStats } from '@/components/stats/content-export';
import { CopilotRequestStats } from '@/components/stats/copilot-requests';
import { InstanceStats } from '@/components/stats/instance';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';

export default function Home() {
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
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="container mx-auto py-6">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InstanceStats />
            <ContentExportStats />
            <CopilotRequestStats />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
