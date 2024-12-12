'use client'

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Search, User } from "lucide-react"
import { MainNav } from "@/components/nav"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { getCurrentUser, logout } from "@/lib/auth"
import type { User as UserType } from "@/lib/auth"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export function Header() {
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [user, setUser] = React.useState<UserType | null>(null)

  React.useEffect(() => {
    // 检查登录状态
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center h-16">
        {/* PC端 Logo + 导航 */}
        <div className="hidden items-center md:flex md:flex-1">
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
        <div className="hidden items-center space-x-4 md:flex">
          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <Search className="w-5 h-5" />
                <span className="sr-only">搜索</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-0">
              <div className="p-4 border-b">
                <div className="flex gap-2 items-center">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="搜索课程、文章、教程..."
                    className="text-base border-0 focus-visible:ring-0"
                  />
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">热门搜索</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">Unreal Engine</Button>
                      <Button variant="outline" size="sm">Maya</Button>
                      <Button variant="outline" size="sm">建模</Button>
                      <Button variant="outline" size="sm">动画</Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium">最近搜索</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Search className="mr-2 w-4 h-4" />
                        角色建模
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Search className="mr-2 w-4 h-4" />
                        材质贴图
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
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
                  onSelect={handleLogout}
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
              className="px-0 mr-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
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
            <div className="flex flex-col px-7 pt-8 space-y-4">
              {user ? (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">{user.name}</p>
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
                    onClick={handleLogout}
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
              <div className="h-px bg-border my-4" />
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