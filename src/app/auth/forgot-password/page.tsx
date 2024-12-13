"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { userService } from "@/services/user"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const { toast } = useToast()
  const router = useRouter()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      await userService.forgotPassword({ email })
      toast({
        title: "邮件已发送",
        description: "请检查您的邮箱，按照邮件中的说明重置密码",
      })
      // 发送成功后跳转到登录页
      router.push("/auth/login")
    } catch (error) {
      toast({
        title: "发送失败",
        description: "该邮箱未注册或系统错误，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">忘记密码</CardTitle>
          <CardDescription className="text-center">
            输入您的注册邮箱，我们将发送重置密码的链接
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                placeholder="请输入注册邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              )}
              发送重置链接
            </Button>
            <div className="text-sm text-center">
              记起密码了？{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-800"
              >
                返回登录
              </Link>
            </div>
            <div className="text-xs text-center text-muted-foreground">
              继续即表示您同意我们的{" "}
              <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                服务条款
              </Link>
              {" "}和{" "}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
                隐私政策
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 