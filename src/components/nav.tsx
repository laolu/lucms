"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "首页",
    href: "/",
  },
  {
    title: "资源",
    href: "/list",
  },
  {
    title: "博客",
    href: "/blog",
  },
  {
    title: "教程",
    href: "/tutorials",
  },
  {
    title: "社区",
    href: "/community",
  },
  {
    title: "关于",
    href: "/about",
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === item.href
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
} 