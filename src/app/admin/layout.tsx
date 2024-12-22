"use client"

import * as React from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { Breadcrumb } from "@/components/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <AppSidebar variant="inset" />
        <SidebarInset className="flex-1 w-0">
          <div className="p-6">
            <div className="flex gap-2 items-center mb-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-4" />
              <Breadcrumb />
            </div>
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
} 