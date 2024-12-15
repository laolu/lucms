'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { userService } from "@/services/user"
import type { User } from "@/services/user"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (identifier: string, password: string, redirectUrl?: string) => Promise<void>
  socialLogin: (type: 'wechat' | 'qq', redirectUrl?: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)
  const router = useRouter()

  // 检查认证状态
  const checkAuth = React.useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token")
      if (!token) {
        setUser(null)
        setLoading(false)
        return
      }

      // 获取最新的用户数据
      const userData = await userService.getUserInfo()
      if (userData.data) {
        setUser(userData.data)
        // 更新localStorage中的用户数据
        localStorage.setItem("user", JSON.stringify(userData.data))
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem("access_token")
      localStorage.removeItem("user")
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // 登录
  const login = async (identifier: string, password: string, redirectUrl?: string) => {
    try {
      const response = await userService.login({ identifier, password })
      
      if (response.data?.data?.access_token && response.data?.data?.user) {
        localStorage.setItem("access_token", response.data.data.access_token)
        localStorage.setItem("user", JSON.stringify(response.data.data.user))
        setUser(response.data.data.user)
        
        router.push(redirectUrl || "/")
      } else {
        throw new Error('Invalid login response')
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  // 社交登录
  const socialLogin = async (type: 'wechat' | 'qq', redirectUrl?: string) => {
    const response = await userService.socialLogin({ type })
    if (response.data?.url) {
      // 存储重定向URL，用于社交登录回调后跳转
      if (redirectUrl) {
        localStorage.setItem("socialLoginRedirect", redirectUrl)
      }
      // 跳转到第三方登录页面
      window.location.href = response.data.url
    }
  }

  // 登出
  const logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
    setUser(null)
    router.push("/auth/login")
  }

  // 初始化时检查认证状态
  React.useEffect(() => {
    setMounted(true)
    try {
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        if (userData && typeof userData === 'object') {
          setUser(userData)
        }
      }
    } catch (error) {
      console.error('Failed to parse saved user:', error)
      localStorage.removeItem("user")
    }
    checkAuth()
  }, [checkAuth])

  // 避免服务端渲染时的状态不匹配
  if (!mounted) {
    return null
  }

  const value = {
    user,
    loading,
    login,
    socialLogin,
    logout,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 