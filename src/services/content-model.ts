import client from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-config';

export interface ContentModel {
  id: number;
  name: string;
  description: string;
  attributes: Array<{
    id: number;
    name: string;
    type: string;
    values: Array<{
      id: number;
      value: string;
      sort: number;
      isActive: boolean;
    }>;
  }>;
  sort: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContentModelDto {
  name: string;
  description?: string;
  attributeIds: number[];
  sort?: number;
  isActive?: boolean;
}

export interface UpdateContentModelDto extends Partial<CreateContentModelDto> {
  id: number;
}

interface ApiResponse<T> {
  data: T;
  code: number;
  message: string;
  timestamp: string;
}

export const contentModelService = {
  // 获取所有内容模型
  getAll: async () => {
    try {
      const response = await client.get<ApiResponse<ContentModel[]>>(API_ENDPOINTS.CONTENT_MODELS);
      return response.data?.data || [];
    } catch (error) {
      console.error('获取内容模型列表失败:', error);
      return [];
    }
  },

  // 获取单个内容模型
  getById: async (id: number) => {
    const response = await client.get<ApiResponse<ContentModel>>(API_ENDPOINTS.CONTENT_MODEL_DETAIL(id));
    return response.data?.data;
  },

  // 创建内容模型
  create: async (dto: CreateContentModelDto) => {
    const response = await client.post<ApiResponse<ContentModel>>(API_ENDPOINTS.CONTENT_MODELS, dto);
    return response.data?.data;
  },

  // 更新内容模型
  update: async (id: number, dto: Partial<CreateContentModelDto>) => {
    const response = await client.put<ApiResponse<ContentModel>>(API_ENDPOINTS.CONTENT_MODEL_DETAIL(id), dto);
    return response.data?.data;
  },

  // 删除内容模型
  delete: async (id: number) => {
    await client.delete(API_ENDPOINTS.CONTENT_MODEL_DETAIL(id));
  },

  // 获取内容模型的属性
  getModelAttributes: async (id: number) => {
    try {
      const response = await client.get<ApiResponse<any[]>>(API_ENDPOINTS.CONTENT_MODEL_ATTRIBUTES(id));
      return response.data?.data || [];
    } catch (error) {
      console.error('获取内容模型属性失败:', error);
      return [];
    }
  },

  // 更新内容模型的属性
  updateModelAttributes: async (id: number, attributeIds: number[]) => {
    try {
      const response = await client.put<ApiResponse<ContentModel>>(
        API_ENDPOINTS.CONTENT_MODEL_ATTRIBUTES(id),
        { attributeIds }
      );
      return response.data?.data;
    } catch (error) {
      console.error('更新内容模型属性失败:', error);
      throw error;
    }
  }
}; 