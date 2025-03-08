import { AppSidebar } from "@/components/app-sidebar";
import { ItemListingComponent } from "@/components/items/item-listing";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { ITreeItem } from "@/models/ITreeItem";
import { Separator } from "@radix-ui/react-separator";

const initialData: ITreeItem[] = [
    {
        id: "1",
        name: "Home",
        children: [
            {
                id: "1-1",
                name: "About Us",
            },
            {
                id: "1-2",
                name: "Product Development",
                children: [
                    { id: "1-2-1", name: "Engineering" },
                    {
                        id: "1-2-2",
                        name: "Design",
                        children: [
                            { id: "1-2-2-1", name: "UI Design" },
                            { id: "1-2-2-2", name: "UX Research" },
                        ],
                    },
                    { id: "1-2-3", name: "QA" },
                ],
            },
            {
                id: "1-3",
                name: "Marketing",
                children: [
                    { id: "1-3-1", name: "Digital Marketing" },
                    { id: "1-3-2", name: "Content Creation" },
                ],
            },
        ],
    },
    {
        id: "2",
        name: "Project Roadmap",
        children: [
            { id: "2-1", name: "Q1 Goals" },
            { id: "2-2", name: "Q2 Goals" },
            { id: "2-3", name: "Q3 Goals" },
            { id: "2-4", name: "Q4 Goals" },
        ],
    },
];

export default function Home() {
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
                                    <BreadcrumbLink href="#">
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <ItemListingComponent data={initialData} />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
