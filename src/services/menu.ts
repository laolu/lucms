import client from '@/lib/api-client'
import { API_ENDPOINTS } from '@/lib/api-config'

export interface Menu {
  id: number
  name: string
  icon?: string
  path?: string
  visible: boolean
  adminOnly: boolean
  sort: number
  parentId?: number
  createdAt: string
  updatedAt: string
}

export interface MenuCreateInput {
  name: string
  icon?: string
  path?: string
  visible?: boolean
  adminOnly?: boolean
  sort?: number
  parentId?: number
}

export interface MenuUpdateInput extends Partial<MenuCreateInput> {
  id: number
}

export interface MenuQuery {
  search?: string
  parentId?: number
  visible?: boolean
  adminOnly?: boolean
  sortBy?: string
  sort?: 'ASC' | 'DESC'
}

export interface MenuListResponse {
  items: Menu[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export const menuService = {
  // 获取菜单列表
  getAll: async (query: MenuQuery = {}): Promise<MenuListResponse> => {
    const response = await client.get<any>(API_ENDPOINTS.MENUS, { params: query })
    return {
      items: response.data?.data || [],
      total: response.data?.data?.length || 0,
      page: 1,
      pageSize: 10,
      totalPages: Math.ceil((response.data?.data?.length || 0) / 10)
    }
  },

  // 获取菜单树
  getTree: async (): Promise<Menu[]> => {
    const response = await client.get<any>(API_ENDPOINTS.MENUS_TREE)
    return response.data?.data || []
  },

  // 获取单个菜单
  getById: async (id: number): Promise<Menu> => {
    const response = await client.get<any>(API_ENDPOINTS.MENU_DETAIL(id))
    return response.data?.data
  },

  // 创建菜单
  create: async (input: MenuCreateInput): Promise<Menu> => {
    const response = await client.post<any>(API_ENDPOINTS.MENUS, input)
    return response.data?.data
  },

  // 更新菜单
  update: async (input: MenuUpdateInput): Promise<Menu> => {
    const response = await client.patch<any>(API_ENDPOINTS.MENU_DETAIL(input.id), input)
    return response.data?.data
  },

  // 删除菜单
  delete: async (id: number): Promise<void> => {
    await client.delete(API_ENDPOINTS.MENU_DETAIL(id))
  },

  // 更新菜单状态
  updateStatus: async (id: number, visible: boolean): Promise<Menu> => {
    const response = await client.patch<any>(API_ENDPOINTS.MENU_STATUS(id), { visible })
    return response.data?.data
  },

  // 更新菜单排序
  updateSort: async (id: number, sort: number): Promise<Menu> => {
    const response = await client.patch<any>(API_ENDPOINTS.MENU_SORT(id), { sort })
    return response.data?.data
  }
} 