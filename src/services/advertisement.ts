import client from '@/lib/api-client'
import { API_ENDPOINTS } from '@/lib/api-config'

export type AdPosition = 'HOME_BANNER' | 'SIDEBAR' | 'CONTENT_TOP' | 'CONTENT_BOTTOM' | 'POPUP'
export type AdType = 'single' | 'multiple' | 'carousel'

export interface AdContent {
  id?: number
  imageUrl: string
  title?: string
  description?: string
  link?: string
  order?: number
}

export interface Advertisement {
  id: number
  title: string
  type: AdType
  contents: AdContent[]
  position: AdPosition
  isActive: boolean
  startDate?: string
  endDate?: string
  order: number
  createdAt: string
  updatedAt: string
}

export interface AdCreateInput {
  title: string
  type: AdType
  contents: AdContent[]
  position: AdPosition
  isActive?: boolean
  startDate?: string
  endDate?: string
  order?: number
}

export interface AdUpdateInput extends Partial<AdCreateInput> {
  id: number
}

export interface AdQuery {
  position?: AdPosition
  type?: AdType
  isActive?: boolean
  search?: string
  sortBy?: string
  sort?: 'ASC' | 'DESC'
  page?: number
  pageSize?: number
}

export interface AdListResponse {
  items: Advertisement[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

interface ApiResponse<T> {
  data: T
  code: number
  message: string
  timestamp: string
}

export const advertisementService = {
  // 获取广告位列表
  getAll: async (query: AdQuery = {}): Promise<AdListResponse> => {
    const response = await client.get<ApiResponse<AdListResponse>>(API_ENDPOINTS.ADVERTISEMENTS, { params: query })
    return response.data.data
  },

  // 获取单个广告位
  getById: async (id: number): Promise<Advertisement> => {
    const response = await client.get<ApiResponse<Advertisement>>(API_ENDPOINTS.ADVERTISEMENT_DETAIL(id))
    return response.data.data
  },

  // 创建广告位
  create: async (input: AdCreateInput): Promise<Advertisement> => {
    const response = await client.post<ApiResponse<Advertisement>>(API_ENDPOINTS.ADVERTISEMENTS, input)
    return response.data.data
  },

  // 更新广告位
  update: async (input: AdUpdateInput): Promise<Advertisement> => {
    const response = await client.put<ApiResponse<Advertisement>>(API_ENDPOINTS.ADVERTISEMENT_DETAIL(input.id), input)
    return response.data.data
  },

  // 删除广告位
  delete: async (id: number): Promise<void> => {
    await client.delete(API_ENDPOINTS.ADVERTISEMENT_DETAIL(id))
  },

  // 更新广告位状态
  updateStatus: async (id: number, isActive: boolean): Promise<Advertisement> => {
    const response = await client.patch<ApiResponse<Advertisement>>(API_ENDPOINTS.ADVERTISEMENT_STATUS(id), { isActive })
    return response.data.data
  },

  // 更新广告位排序
  updateOrder: async (id: number, order: number): Promise<Advertisement> => {
    const response = await client.patch<ApiResponse<Advertisement>>(API_ENDPOINTS.ADVERTISEMENT_ORDER(id), { order })
    return response.data.data
  }
} 