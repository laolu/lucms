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
          title: "属性管理",
          url: "/admin/content-attributes",
        },
        {
          title: "模型管理",
          url: "/admin/content-models",
        },
        {
          title: "内容列表",
          url: "/admin/contents",
        },
      ],
    },
    {
      title: "运营管理",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "订单管理",
          url: "/admin/orders",
        },
        {
          title: "广告管理",
          url: "/admin/advertisements",
        },
        {
          title: "菜单管理",
          url: "/admin/menus",
        },
        {
          title: "会员等级",
          url: "/admin/vip-levels",
        },
        {
          title: "会员管理",
          url: "/admin/users",
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
  // projects: [
  //   {
  //     name: "系统设置",
  //     url: "#",
  //     icon: Settings2,
  //     items: [
  //       {
  //         name: "UI 设计",
  //         url: "#ui-design"
  //       },
  //       {
  //         name: "平面设计",
  //         url: "#graphic-design"
  //       }
  //     ]
  //   },
  //   {
  //     name: "销售营销",
  //     url: "#",
  //     icon: PieChart,
  //     items: [
  //       {
  //         name: "数据分析",
  //         url: "#data-analysis"
  //       },
  //       {
  //         name: "市场调研",
  //         url: "#market-research"
  //       }
  //     ]
  //   },
  //   {
  //     name: "旅游项目",
  //     url: "#",
  //     icon: Map,
  //     items: [
  //       {
  //         name: "景点规划",
  //         url: "#attractions"
  //       },
  //       {
  //         name: "路线设计",
  //         url: "#routes"
  //       }
  //     ]
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
} 