"use client";

import { useState } from "react";
import { Outlet } from "react-router";
import { useMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardHeader } from "./dashboard-header";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMobile();

  return (
    <div className='flex flex-col h-screen overflow-y-auto bg-background'>
      {/* Header + Main container */}
      <div className='flex min-h-screen'>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className='w-64 border-r border-sidebar-border bg-sidebar'>
            <DashboardSidebar />
          </div>
        )}

        {/* Mobile Sidebar */}
        {isMobile && (
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='fixed top-4 left-4 z-50 md:hidden'
              >
                <Menu className='h-5 w-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-64 p-0'>
              <DashboardSidebar onNavigate={() => setSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
        )}

        {/* Main Content */}
        <div className='flex-1 flex flex-col'>
          <DashboardHeader />
          <main className='flex-1 p-6'>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
