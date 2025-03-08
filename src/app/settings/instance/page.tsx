'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { ListingTable } from '@/components/instances/listing-table';
import { RegistrationGenModal } from '@/components/instances/registration-gen-modal';
import { RegistrationTokenModal } from '@/components/instances/registration-token-modal';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { IInstance } from '@/models/IInstance';
import { Separator } from '@radix-ui/react-separator';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

export default function InstanceSetupPage() {
  const [instances, setInstances] = useState<IInstance[]>([]);
  const [isGenModalOpen, setIsGenModalOpen] = useState(true);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);

  const handleAddInstance = (newInstance: Omit<IInstance, 'id' | 'createdAt'>) => {
    const instance: IInstance = {
      ...newInstance,
      id: Math.random().toString(36).substring(2, 9),
    };

    setInstances([...instances, instance]);
    setIsGenModalOpen(false);
    setIsTokenModalOpen(false);
  };

  const handleDeleteInstance = (id: string) => {
    setInstances(instances.filter((instance) => instance.id !== id));
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
                  <BreadcrumbPage>Instance Configuration</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="container mx-auto py-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Instance Configuration</h1>
            <div className="flex gap-2">
              <Button onClick={() => setIsTokenModalOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add API Token
              </Button>
              <Button onClick={() => setIsGenModalOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Generate Token
              </Button>
            </div>
          </div>

          <RegistrationTokenModal
            open={isTokenModalOpen}
            onOpenChange={setIsTokenModalOpen}
            onSubmit={handleAddInstance}
          />
          <RegistrationGenModal open={isGenModalOpen} onOpenChange={setIsGenModalOpen} onSubmit={handleAddInstance} />

          <ListingTable instances={instances} onDelete={handleDeleteInstance} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
