import { API_ENDPOINTS } from '@/lib/api-config'
import client from '@/lib/api-client'

export interface VipLevel {
  id: number
  name: string
  description: string
  price: number
  duration: number
  benefits: string[]
  isActive: boolean
  sort: number
  createdAt: string
  updatedAt: string
}

export interface CreateVipLevelData {
  name: string
  description: string
  price: number
  duration: number
  benefits: string[]
  isActive?: boolean
  sort?: number
}

export interface UpdateVipLevelData extends Partial<CreateVipLevelData> {}

export interface GetVipLevelsParams {
  search?: string
}

export interface GetVipLevelsResponse {
  items: VipLevel[]
  total: number
}

class VipLevelService {
  async getAll(params: GetVipLevelsParams = {}) {
    try {
      console.log('发送获取VIP等级列表请求，参数:', params);
      const response = await client.get<GetVipLevelsResponse>(API_ENDPOINTS.VIP_LEVELS, { params });
      console.log('获取VIP等级列表响应:', response.data);
      return response;
    } catch (error) {
      console.error('获取VIP等级列表失败:', error);
      throw error;
    }
  }

  async getById(id: number) {
    return client.get<VipLevel>(API_ENDPOINTS.VIP_LEVEL_DETAIL(id))
  }

  async create(data: CreateVipLevelData) {
    try {
      console.log('发送创建VIP等级请求，数据:', data);
      const response = await client.post<VipLevel>(API_ENDPOINTS.VIP_LEVELS, data);
      console.log('创建VIP等级响应:', response.data);
      return response.data;
    } catch (error) {
      console.error('创建VIP等级失败:', error);
      throw error;
    }
  }

  async update(id: number, data: UpdateVipLevelData) {
    return client.patch<VipLevel>(API_ENDPOINTS.VIP_LEVEL_DETAIL(id), data)
  }

  async delete(id: number) {
    return client.delete(API_ENDPOINTS.VIP_LEVEL_DETAIL(id))
  }
}

export const vipLevelService = new VipLevelService() 