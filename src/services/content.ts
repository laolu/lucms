import client from '@/lib/api-client'
import { API_ENDPOINTS } from '@/lib/api-config'

export interface Content {
  id: number
  title: string
  content: string
  categoryId: number
  category: {
    id: number
    name: string
  }
  isActive: boolean
  viewCount: number
  commentCount: number
  sort: number
  createdAt: string
  updatedAt: string
  attributeValues: Array<{
    id: number
    attributeId: number
    valueId: number
    attribute: {
      id: number
      name: string
    }
    value: {
      id: number
      value: string
    }
  }>
}

export interface ContentCreateInput {
  title: string
  content: string
  categoryId: number
  isActive: boolean
  sort?: number
  attributeValues: Array<{
    attributeId: number
    valueId: number
  }>
}

export interface ContentUpdateInput extends Partial<ContentCreateInput> {
  id: number
}

export interface ContentQuery {
  search?: string
  categoryId?: string
  isActive?: boolean
  sort?: 'ASC' | 'DESC'
  sortBy?: string
  page?: number
  pageSize?: number
}

export interface ContentListResponse {
  items: Content[]
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

export const contentService = {
  // 获取内容列表
  getAll: async (query: ContentQuery = {}) => {
    try {
      const response = await client.get<ApiResponse<ContentListResponse>>(API_ENDPOINTS.CONTENTS, { params: query })
      return response.data?.data || { items: [], total: 0, page: 1, pageSize: 10, totalPages: 0 }
    } catch (error) {
      console.error('获取内容列表失败:', error)
      return { items: [], total: 0, page: 1, pageSize: 10, totalPages: 0 }
    }
  },

  // 获取内容详情
  getById: async (id: number) => {
    const response = await client.get<ApiResponse<Content>>(API_ENDPOINTS.CONTENT_DETAIL(id))
    return response.data?.data
  },

  // 创建内容
  create: async (input: ContentCreateInput) => {
    const response = await client.post<ApiResponse<Content>>(API_ENDPOINTS.CONTENTS, input)
    return response.data?.data
  },

  // 更新内容
  update: async (input: ContentUpdateInput) => {
    const response = await client.patch<ApiResponse<Content>>(API_ENDPOINTS.CONTENT_DETAIL(input.id), input)
    return response.data?.data
  },

  // 删除内容
  delete: async (id: number) => {
    await client.delete(API_ENDPOINTS.CONTENT_DETAIL(id))
  },

  // 更新内容排序
  updateSort: async (id: number, sort: number) => {
    const response = await client.patch<ApiResponse<Content>>(API_ENDPOINTS.CONTENT_DETAIL(id), { sort })
    return response.data?.data
  },

  // 更新内容状态
  updateStatus: async (id: number, isActive: boolean) => {
    const response = await client.patch<ApiResponse<Content>>(API_ENDPOINTS.CONTENT_DETAIL(id), { isActive })
    return response.data?.data
  },

  // 增加浏览量
  view: async (id: number) => {
    await client.post(API_ENDPOINTS.CONTENT_VIEW(id))
  }
} 