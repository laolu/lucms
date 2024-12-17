"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "LuCMS",
      logo: GalleryVerticalEnd,
      plan: "企业版",
    },
    {
      name: "LuCMS Corp.",
      logo: AudioWaveform,
      plan: "专业版",
    },
    {
      name: "LuCMS Inc.",
      logo: Command,
      plan: "免费版",
    },
  ],
  navMain: [
    {
      title: "仪表盘",
      url: "/admin",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "概览",
          url: "/admin",
        },
        {
          title: "统计",
          url: "/admin/stats",
        },
        {
          title: "设置",
          url: "/admin/settings",
        },
      ],
    },
    {
      title: "内容管理",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "内容分类",
          url: "/admin/content-categories",
        },
        {
          title: "内容列表",
          url: "/admin/contents",
        },
      ],
    },
    {
      title: "文档中心",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "介绍",
          url: "#",
        },
        {
          title: "快速开始",
          url: "#",
        },
        {
          title: "教程",
          url: "#",
        },
        {
          title: "更新日志",
          url: "#",
        },
      ],
    },
    {
      title: "系统设置",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "基本设置",
          url: "/admin/settings",
        },
        {
          title: "团队管理",
          url: "/admin/teams",
        },
        {
          title: "账单管理",
          url: "/admin/billing",
        },
        {
          title: "限制管理",
          url: "/admin/limits",
        },
      ],
    },
  ],
  projects: [
    {
      name: "设计工程",
      url: "#",
      icon: Frame,
    },
    {
      name: "销售营销",
      url: "#",
      icon: PieChart,
    },
    {
      name: "旅游项目",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
} 