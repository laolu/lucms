import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { MainNav } from "@/components/nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={30}
              height={30}
              className="rounded-lg"
            />
            <span className="font-bold">LuCMS</span>
          </Link>
        </div>

        {/* 移动端菜单 */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">切换菜单</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="px-7">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={30}
                  height={30}
                  className="rounded-lg"
                />
                <span className="font-bold">LuCMS</span>
              </Link>
            </div>
            <nav className="flex flex-col space-y-4 px-7 pt-8">
              <Link
                href="/list"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                资源
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                博客
              </Link>
              <Link
                href="/tutorials"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                教程
              </Link>
              <Link
                href="/community"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                社区
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                关于
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* 移动端 Logo */}
        <div className="flex md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={30}
              height={30}
              className="rounded-lg"
            />
            <span className="font-bold">LuCMS</span>
          </Link>
        </div>

        {/* 桌面端导航 */}
        <div className="hidden md:flex">
          <MainNav />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link
              href="/auth/login"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              登录
            </Link>
            <span className="text-sm text-muted-foreground">/</span>
            <Link
              href="/auth/register"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              注册
            </Link>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
} 