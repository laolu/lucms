"use client"

import * as React from "react"
import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

interface NavProjectsProps extends React.HTMLAttributes<HTMLDivElement> {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}

export function NavProjects({ className, projects, ...props }: NavProjectsProps) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className={cn("group-data-[collapsible=icon]:hidden", className)} {...props}>
      <SidebarGroupLabel>项目</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon className="size-4" />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">更多</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="mr-2 size-4 text-muted-foreground" />
                  <span>查看项目</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="mr-2 size-4 text-muted-foreground" />
                  <span>分享项目</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="mr-2 size-4 text-muted-foreground" />
                  <span>删除项目</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-muted-foreground">
            <MoreHorizontal className="size-4" />
            <span>更多项目</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
} 