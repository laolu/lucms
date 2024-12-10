import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

export default function Login() {
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
          <Button variant="outline" className="w-full">
            <Icons.wechat className="mr-2 h-4 w-4" />
            微信登录
          </Button>
          <Button variant="outline" className="w-full">
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
        <form>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">账号</Label>
              <Input
                id="identifier"
                placeholder="邮箱/手机号"
                type="text"
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
                type="password"
                placeholder="请输入密码"
                required
              />
            </div>
            <Button type="submit" className="w-full">
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