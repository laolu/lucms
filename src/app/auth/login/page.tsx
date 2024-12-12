'use client'

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { login } from "@/lib/auth"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/components/ui/use-toast"

export default function Login() {
  const router = useRouter()
  const { setUser } = useAuth()
  const [isLoading, setIsLoading] = React.useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const identifier = formData.get('identifier') as string
      const password = formData.get('password') as string

      const response = await login(identifier, password)
      
      // 更新全局状态
      setUser(response.user)
      
      toast({
        title: "登录成功",
        description: "正在跳转到首页...",
      })

      // 登录成功后跳转
      router.push('/')
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "登录失败",
        description: error instanceof Error ? error.message : "请检查账号密码是否正确",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-8" />
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "LuCMS 让我找到了最适合自己的学习方式，优质的课程内容和良好的学习氛围帮助我快速提升专业技能。"
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              欢迎回来
            </h1>
            <p className="text-sm text-muted-foreground">
              输入您的账号信息以登录
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={onSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="identifier">账号</Label>
                  <Input
                    id="identifier"
                    name="identifier"
                    placeholder="邮箱/手机号"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">密码</Label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      忘记密码？
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="请输入密码"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    disabled={isLoading}
                    required
                  />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  登录
                </Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  或使用第三方账号
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" disabled={isLoading}>
                <Icons.wechat className="mr-2 h-4 w-4" />
                微信登录
              </Button>
              <Button variant="outline" type="button" disabled={isLoading}>
                <Icons.qq className="mr-2 h-4 w-4" />
                QQ登录
              </Button>
            </div>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            还没有账号？{" "}
            <Link
              href="/auth/register"
              className="underline underline-offset-4 hover:text-primary"
            >
              立即注册
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 