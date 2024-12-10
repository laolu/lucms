import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

export default function Register() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          创建新账号
        </h1>
        <p className="text-sm text-muted-foreground">
          加入我们的社区，开启您的创作之旅
        </p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline" className="w-full">
            <Icons.wechat className="mr-2 h-4 w-4" />
            微信注册
          </Button>
          <Button variant="outline" className="w-full">
            <Icons.qq className="mr-2 h-4 w-4" />
            QQ注册
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              或使用邮箱注册
            </span>
          </div>
        </div>
        <form>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="至少6位字符"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">确认密码</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="再次输入密码"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              注册
            </Button>
          </div>
        </form>
      </div>
      <div className="text-center text-sm">
        已有账号？{" "}
        <Link href="/auth/login" className="text-primary hover:underline">
          立即登录
        </Link>
      </div>
      <div className="text-center text-xs text-muted-foreground">
        注册即表示您同意我们的
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