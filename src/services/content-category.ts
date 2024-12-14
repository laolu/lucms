import client from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-config';

export interface ContentCategory {
  id: number;
  name: string;
  description: string;
  parentId: number;
  sort: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  parent: ContentCategory | null;
  children: ContentCategory[];
}

interface ApiResponse<T> {
  data: T;
  code: number;
  message: string;
  timestamp: string;
}

export interface CreateContentCategoryDto {
  name: string;
  description?: string;
  parentId?: number;
  sort?: number;
  isActive?: boolean;
}

export interface UpdateContentCategoryDto extends Partial<CreateContentCategoryDto> {
  id: number;
}

export const contentCategoryService = {
  // 获取分类树
  getTree: async () => {
    try {
      const response = await client.get<ApiResponse<ContentCategory[]>>(API_ENDPOINTS.CONTENT_CATEGORIES_TREE);
      if (!Array.isArray(response.data.data)) {
        console.error('API返回的数据不是数组:', response.data);
        return [];
      }
      return response.data.data;
    } catch (error) {
      console.error('获取分类树失败:', error);
      return [];
    }
  },

  // 获取所有分类（平铺结构）
  getAll: async () => {
    try {
      const response = await client.get<ApiResponse<ContentCategory[]>>(API_ENDPOINTS.CONTENT_CATEGORIES);
      if (!Array.isArray(response.data.data)) {
        console.error('API返回的数据不是数组:', response.data);
        return [];
      }
      return response.data.data;
    } catch (error) {
      console.error('获取分类列表失败:', error);
      return [];
    }
  },

  // 获取单个分类
  getById: async (id: number) => {
    const response = await client.get<ApiResponse<ContentCategory>>(API_ENDPOINTS.CONTENT_CATEGORY_DETAIL(id));
    return response.data.data;
  },

  // 创建分类
  create: async (dto: CreateContentCategoryDto) => {
    const response = await client.post<ApiResponse<ContentCategory>>(API_ENDPOINTS.CONTENT_CATEGORIES, dto);
    return response.data.data;
  },

  // 更新分类
  update: async (id: number, dto: Partial<CreateContentCategoryDto>) => {
    const response = await client.patch<ApiResponse<ContentCategory>>(API_ENDPOINTS.CONTENT_CATEGORY_DETAIL(id), dto);
    return response.data.data;
  },

  // 删除分类
  delete: async (id: number) => {
    await client.delete<ApiResponse<void>>(API_ENDPOINTS.CONTENT_CATEGORY_DETAIL(id));
  },

  // 更新分类排序
  updateSort: async (id: number, sort: number) => {
    const response = await client.patch<ApiResponse<ContentCategory>>(API_ENDPOINTS.CONTENT_CATEGORY_SORT(id), { sort });
    return response.data.data;
  },

  // 更新分类状态
  updateStatus: async (id: number, isActive: boolean) => {
    const response = await client.patch<ApiResponse<ContentCategory>>(API_ENDPOINTS.CONTENT_CATEGORY_STATUS(id), { isActive });
    return response.data.data;
  },

  // 移动分类（更改父级）
  move: async (id: number, parentId: number) => {
    const response = await client.patch<ApiResponse<ContentCategory>>(API_ENDPOINTS.CONTENT_CATEGORY_MOVE(id), { parentId });
    return response.data.data;
  }
}; 