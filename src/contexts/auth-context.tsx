'use client'

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)
  const router = useRouter()

  // 检查认证状态
  const checkAuth = React.useCallback(async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setUser(null)
        return
      }

      const userData = await userService.getUserInfo()
      setUser(userData)
    } catch (error) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // 登录
  const login = async (identifier: string, password: string, redirectUrl?: string) => {
    const response = await userService.login({ identifier, password })
    localStorage.setItem("token", response.token)
    localStorage.setItem("user", JSON.stringify(response.user))
    setUser(response.user)
    router.push("/")
  }

  // 登出
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    router.push("/login")
  }

  // 初始化时检查认证状态
  React.useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const value = {
    user,
    loading,
    login,
    logout,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 