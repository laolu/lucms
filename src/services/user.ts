import { api } from '@/lib/api-client'
import { API_ENDPOINTS } from '@/lib/api-config'

export interface User {
  id: number
  username: string
  email: string
  avatar?: string
  nickname?: string
  role: 'user' | 'vip' | 'admin'
  vipExpireTime?: string
  createdAt: string
  updatedAt: string
}

export interface LoginParams {
  identifier: string // 邮箱/手机号
  password: string
}

export interface RegisterParams {
  email: string
  password: string
  nickname?: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface UpdateUserParams {
  nickname?: string
  avatar?: string
  email?: string
  password?: string
}

export interface ForgotPasswordParams {
  email: string
}

export interface ResetPasswordParams {
  token: string
  password: string
}

export interface SocialLoginParams {
  type: 'wechat' | 'qq'
}

export interface SocialLoginResponse {
  url: string
}

export interface VipPlan {
  id: number
  name: string
  price: number
  duration: number // 天数
  features: string[]
}

export const userService = {
  // 登录
  login: (params: LoginParams) =>
    api.post<LoginResponse>(API_ENDPOINTS.LOGIN, params),

  // 社交登录
  socialLogin: (params: SocialLoginParams) =>
    api.post<SocialLoginResponse>(API_ENDPOINTS.SOCIAL_LOGIN, params),

  // 社交登录回调
  socialLoginCallback: (params: { code: string; state: string; type: 'wechat' | 'qq' }) =>
    api.post<LoginResponse>(API_ENDPOINTS.SOCIAL_LOGIN_CALLBACK, params),

  // 注册
  register: (params: RegisterParams) =>
    api.post<LoginResponse>(API_ENDPOINTS.REGISTER, params),

  // 获取用户信息
  getUserInfo: () =>
    api.get<User>(API_ENDPOINTS.USER_INFO),

  // 更新用户信息
  updateUser: (params: UpdateUserParams) =>
    api.put<User>(API_ENDPOINTS.USER_UPDATE, params),

  // 忘记密码
  forgotPassword: (params: ForgotPasswordParams) =>
    api.post(API_ENDPOINTS.FORGOT_PASSWORD, params),

  // 重置密码
  resetPassword: (params: ResetPasswordParams) =>
    api.post(API_ENDPOINTS.RESET_PASSWORD, params),

  // 获取VIP套餐列表
  getVipPlans: () =>
    api.get<VipPlan[]>(API_ENDPOINTS.VIP_PLANS),

  // 购买VIP
  purchaseVip: (planId: number) =>
    api.post(API_ENDPOINTS.VIP_PURCHASE, { planId }),

  // 获取VIP状态
  getVipStatus: () =>
    api.get(API_ENDPOINTS.VIP_STATUS)
} 