import client from '@/lib/api-client'
import { API_ENDPOINTS } from '@/lib/api-config'

export interface SystemConfig {
  id: number
  key: string
  value: string
  type: string
  description: string
  sort: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface ApiResponse<T> {
  data: T
  code: number
  message: string
  timestamp: string
}

class SettingService {
  // 获取所有配置
  async getConfigs(): Promise<SystemConfig[]> {
    try {
      const response = await client.get<ApiResponse<SystemConfig[]>>(API_ENDPOINTS.SETTINGS)
      return response.data?.data || []
    } catch (error) {
      console.error('获取配置失败:', error)
      return []
    }
  }

  // 获取基础配置
  async getBasicConfigs(): Promise<SystemConfig[]> {
    try {
      const response = await client.get<ApiResponse<SystemConfig[]>>(API_ENDPOINTS.SETTINGS_BASIC)
      return response.data?.data || []
    } catch (error) {
      console.error('获取基础配置失败:', error)
      return []
    }
  }

  // 获取邮件配置
  async getEmailConfigs(): Promise<SystemConfig[]> {
    try {
      const response = await client.get<ApiResponse<SystemConfig[]>>(API_ENDPOINTS.SETTINGS_EMAIL)
      return response.data?.data || []
    } catch (error) {
      console.error('获取邮件配置失败:', error)
      return []
    }
  }

  // 获取存储配置
  async getStorageConfigs(): Promise<SystemConfig[]> {
    try {
      const response = await client.get<ApiResponse<SystemConfig[]>>(API_ENDPOINTS.SETTINGS_STORAGE)
      return response.data?.data || []
    } catch (error) {
      console.error('获取存储配置失败:', error)
      return []
    }
  }

  // 获取短信配置
  async getSmsConfigs(): Promise<SystemConfig[]> {
    try {
      const response = await client.get<ApiResponse<SystemConfig[]>>(API_ENDPOINTS.SETTINGS_SMS)
      return response.data?.data || []
    } catch (error) {
      console.error('获取短信配置失败:', error)
      return []
    }
  }

  // 获取支付配置
  async getPaymentConfigs(): Promise<SystemConfig[]> {
    try {
      const response = await client.get<ApiResponse<SystemConfig[]>>(API_ENDPOINTS.SETTINGS_PAYMENT)
      return response.data?.data || []
    } catch (error) {
      console.error('获取支付配置失败:', error)
      return []
    }
  }

  // 获取第三方登录配置
  async getOauthConfigs(): Promise<SystemConfig[]> {
    try {
      const response = await client.get<ApiResponse<SystemConfig[]>>(API_ENDPOINTS.SETTINGS_OAUTH)
      return response.data?.data || []
    } catch (error) {
      console.error('获取第三方登录配置失败:', error)
      return []
    }
  }

  // 获取安全配置
  async getSecurityConfigs(): Promise<SystemConfig[]> {
    try {
      const response = await client.get<ApiResponse<SystemConfig[]>>(API_ENDPOINTS.SETTINGS_SECURITY)
      return response.data?.data || []
    } catch (error) {
      console.error('获取安全配置失败:', error)
      return []
    }
  }

  // 更新配置
  async updateConfig(key: string, value: string): Promise<void> {
    await client.put(`${API_ENDPOINTS.SETTINGS}/${key}`, { value })
  }

  // 测试邮件配置
  async testEmailConfig(): Promise<void> {
    await client.post(API_ENDPOINTS.SETTINGS_EMAIL_TEST)
  }

  // 刷新配置缓存
  async refreshConfigs(): Promise<void> {
    await client.post(API_ENDPOINTS.SETTINGS_REFRESH)
  }
}

export const settingService = new SettingService() 