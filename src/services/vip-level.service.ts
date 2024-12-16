import { API_ENDPOINTS } from '@/lib/api-config'
import { client } from '@/lib/api-client'

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
  page?: number
  pageSize?: number
}

export interface GetVipLevelsResponse {
  items: VipLevel[]
  total: number
}

class VipLevelService {
  async getAll(params: GetVipLevelsParams = {}) {
    return client.get<GetVipLevelsResponse>(API_ENDPOINTS.VIP_LEVELS, { params })
  }

  async getById(id: number) {
    return client.get<VipLevel>(API_ENDPOINTS.VIP_LEVEL_DETAIL(id))
  }

  async create(data: CreateVipLevelData) {
    return client.post<VipLevel>(API_ENDPOINTS.VIP_LEVELS, data)
  }

  async update(id: number, data: UpdateVipLevelData) {
    return client.patch<VipLevel>(API_ENDPOINTS.VIP_LEVEL_DETAIL(id), data)
  }

  async delete(id: number) {
    return client.delete(API_ENDPOINTS.VIP_LEVEL_DETAIL(id))
  }
}

export const vipLevelService = new VipLevelService() 