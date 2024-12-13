"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

type LoginType = "email" | "phone"

export default function LoginPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [loginType, setLoginType] = React.useState<LoginType>("email")
  const [identifier, setIdentifier] = React.useState("")
  const [password, setPassword] = React.useState("")
  const { login, socialLogin } = useAuth()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirectUrl") || undefined

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      await login(identifier, password, redirectUrl)
      toast({
        title: "登录成功",
        description: "欢迎回来！",
      })
    } catch (error) {
      toast({
        title: "登录失败",
        description: "账号或密码错误",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSocialLogin(type: 'wechat' | 'qq') {
    try {
      await socialLogin(type, redirectUrl)
    } catch (error) {
      toast({
        title: "登录失败",
        description: "第三方登录失败，请稍后重试",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-[90%] sm:w-[580px] md:w-[680px] lg:w-[780px] xl:w-[880px] 2xl:w-[980px] mx-auto">
      <div className="relative">
        {/* 装饰性背景元素 */}
        <div className="absolute w-32 h-32 rounded-full -top-10 -left-10 bg-primary/5 blur-3xl" />
        <div className="absolute w-32 h-32 rounded-full -bottom-10 -right-10 bg-primary/5 blur-3xl" />
        
        {/* 主要内容 */}
        <div className="relative border border-gray-100 shadow-2xl bg-white/80 backdrop-blur-xl rounded-2xl">
          <div className="grid gap-0 lg:grid-cols-2">
            {/* 左侧装饰区域 */}
            <div className="flex-col justify-center hidden p-12 lg:flex bg-gradient-to-b from-primary/5 via-transparent to-transparent">
              <div className="w-full max-w-[480px] mx-auto space-y-6">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">欢迎回来</h1>
                  <p className="text-lg text-gray-600">登录您的账号以继续访问</p>
                </div>
              </div>
            </div>

            {/* 右侧登录表单 */}
            <div className="p-8 sm:p-12">
              <div className="w-full max-w-[440px] mx-auto space-y-8">
                {/* 登录表单 */}
                <Tabs defaultValue="email" className="w-full" onValueChange={(value) => setLoginType(value as LoginType)}>
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="email">邮箱登录</TabsTrigger>
                    <TabsTrigger value="phone">手机号登录</TabsTrigger>
                  </TabsList>
                  <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="identifier" className="text-sm font-medium">
                          {loginType === "email" ? "邮箱" : "手机号"}
                        </Label>
                        <Input
                          id="identifier"
                          type={loginType === "email" ? "email" : "tel"}
                          placeholder={loginType === "email" ? "请输入邮箱" : "请输入手机号"}
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          disabled={isLoading}
                          required
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">密码</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="请输入密码"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isLoading}
                          required
                          className="h-12"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="remember" className="w-4 h-4 border-gray-300 rounded text-primary" />
                          <Label htmlFor="remember" className="text-sm font-medium">记住我</Label>
                        </div>
                        <Link
                          href="/auth/forgot-password"
                          className="text-sm font-medium text-primary hover:text-primary/90"
                        >
                          忘记密码？
                        </Link>
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-12"
                        disabled={isLoading}
                      >
                        {isLoading && (
                          <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                        )}
                        登录
                      </Button>
                    </div>
                  </form>
                </Tabs>

                {/* 分隔线 */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 bg-background text-muted-foreground">
                      其他登录方式
                    </span>
                  </div>
                </div>

                {/* 社交登录按钮 */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-12"
                    onClick={() => handleSocialLogin('wechat')}
                    disabled={isLoading}
                  >
                    <Icons.wechat className="w-5 h-5 mr-2" />
                    微信登录
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12"
                    onClick={() => handleSocialLogin('qq')}
                    disabled={isLoading}
                  >
                    <Icons.qq className="w-5 h-5 mr-2" />
                    QQ登录
                  </Button>
                </div>

                {/* 底部链接 */}
                <div className="space-y-4">
                  <div className="text-sm text-center">
                    还没有账号？{" "}
                    <Link
                      href="/auth/register"
                      className="font-medium text-primary hover:text-primary/90"
                    >
                      立即注册
                    </Link>
                  </div>
                  <div className="text-xs text-center text-muted-foreground">
                    登录即表示您同意我们的{" "}
                    <Link href="/terms" className="text-primary hover:text-primary/90">
                      服务条款
                    </Link>
                    {" "}和{" "}
                    <Link href="/privacy" className="text-primary hover:text-primary/90">
                      隐私政策
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 