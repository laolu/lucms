'use client'

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Search, User, ChevronDown } from "lucide-react"
import { MainNav } from "@/components/nav"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/contexts/auth-context"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center h-16">
        {/* PC端 Logo + 导航 */}
        <div className="items-center hidden md:flex md:flex-1">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={0}
              height={40}
              className="h-[40px] w-auto mr-10"
              style={{ width: 'auto' }}
              priority
            />
          </Link>
          <MainNav />
        </div>

        {/* PC端右侧功能区 */}
        <div className="items-center hidden space-x-4 md:flex">
          <Button variant="ghost" size="icon" className="hover:bg-transparent">
            <Search className="w-5 h-5" />
            <span className="sr-only">搜索</span>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative flex items-center space-x-2 hover:bg-transparent">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user.username}</span>
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.username}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/user">
                    会员中心
                  </Link>
                </DropdownMenuItem>
                {user.isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">
                      管理后台
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={logout}
                >
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
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
          )}
          <ModeToggle />
        </div>

        {/* 移动端菜单按钮 */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="w-6 h-6" />
              <span className="sr-only">切换菜单</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="px-7">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={0}
                  height={40}
                  className="h-[40px] w-auto mr-10"
                  style={{ width: 'auto' }}
                  priority
                />
              </Link>
            </div>
            <div className="flex flex-col pt-8 space-y-4 px-7">
              {user ? (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.username}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/user"
                    className="text-base font-medium transition-colors hover:text-primary"
                  >
                    会员中心
                  </Link>
                  {user.isAdmin && (
                    <Link
                      href="/admin"
                      className="text-base font-medium transition-colors hover:text-primary"
                    >
                      管理后台
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="text-base font-medium text-left transition-colors hover:text-primary"
                  >
                    退出登录
                  </button>
                </>
              ) : (
                <div className="flex gap-4">
                  <Link
                    href="/auth/login"
                    className="text-base font-medium transition-colors hover:text-primary"
                  >
                    登录
                  </Link>
                  <Link
                    href="/auth/register"
                    className="text-base font-medium transition-colors hover:text-primary"
                  >
                    注册
                  </Link>
                </div>
              )}
              <div className="h-px my-4 bg-border" />
              <Link
                href="/list"
                className="text-base font-medium transition-colors hover:text-primary"
              >
                资源
              </Link>
              <Link
                href="/blog"
                className="text-base font-medium transition-colors hover:text-primary"
              >
                博客
              </Link>
              <Link
                href="/tutorials"
                className="text-base font-medium transition-colors hover:text-primary"
              >
                教程
              </Link>
              <Link
                href="/community"
                className="text-base font-medium transition-colors hover:text-primary"
              >
                社区
              </Link>
              <Link
                href="/about"
                className="text-base font-medium transition-colors hover:text-primary"
              >
                关于
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
} 