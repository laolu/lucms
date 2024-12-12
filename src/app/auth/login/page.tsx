"use client"

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
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          欢迎回来
        </h1>
        <p className="text-sm text-muted-foreground">
          输入您的账号信息以登录
        </p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline" className="w-full" disabled={isLoading}>
            <Icons.wechat className="mr-2 h-4 w-4" />
            微信登录
          </Button>
          <Button variant="outline" className="w-full" disabled={isLoading}>
            <Icons.qq className="mr-2 h-4 w-4" />
            QQ登录
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              或使用账号密码登录
            </span>
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">账号</Label>
              <Input
                id="identifier"
                name="identifier"
                placeholder="邮箱/手机号"
                type="text"
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
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
                disabled={isLoading}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              登录
            </Button>
          </div>
        </form>
      </div>
      <div className="text-center text-sm">
        还没有账号？{" "}
        <Link href="/auth/register" className="text-primary hover:underline">
          立即注册
        </Link>
      </div>
      <div className="text-center text-xs text-muted-foreground">
        登录即表示您同意我们的
        <Link href="/terms" className="text-primary hover:underline mx-1">
          服务条款
        </Link>
        和
        <Link href="/privacy" className="text-primary hover:underline mx-1">
          隐私政策
        </Link>
      </div>
    </div>
  )
} 