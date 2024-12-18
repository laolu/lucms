import client from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-config';

export interface ContentAttribute {
  id: number;
  name: string;
  type: 'single' | 'multiple';
  values: Array<{
    id: number;
    value: string;
  }>;
}

export interface ContentModel {
  id: number;
  name: string;
  description: string;
  sort: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  attributes: Array<{
    modelId: number;
    attributeId: number;
    attributeName: string;
    attributeType: string;
    values: Array<{
      id: number;
      value: string;
      isChecked: boolean;
    }>;
  }>;
}

interface ApiResponse<T> {
  data: T;
  code: number;
  message: string;
  timestamp: string;
}

export const contentModelService = {
  getAll: async () => {
    try {
      console.log('开始获取内容模型列表');
      const response = await client.get<ApiResponse<ContentModel[]>>(API_ENDPOINTS.CONTENT_MODELS);
      console.log('获取到的内容模型数据:', response.data);
      return response.data?.data || [];
    } catch (error) {
      console.error('获取内容模��列表失败:', error);
      return [];
    }
  },

  getById: async (id: number) => {
    try {
      const response = await client.get<ApiResponse<ContentModel>>(API_ENDPOINTS.CONTENT_MODEL_DETAIL(id));
      return response.data?.data;
    } catch (error) {
      console.error('获取内容模型详情失败:', error);
      throw error;
    }
  },

  create: async (data: {
    name: string;
    description?: string;
    sort?: number;
    isActive?: boolean;
    attributeIds: number[];
    attributeValues: {
      attributeId: number;
      attributeValueId: number;
      isChecked?: boolean;
    }[];
  }) => {
    try {
      console.log('发送创建请求数据:', data);
      const response = await client.post<ApiResponse<ContentModel>>(API_ENDPOINTS.CONTENT_MODELS, data);
      console.log('创建响应数据:', response.data);
      return response.data?.data;
    } catch (error) {
      console.error('创建内容模型失败:', error);
      throw error;
    }
  },

  update: async (id: number, data: {
    name: string;
    description?: string;
    sort?: number;
    isActive?: boolean;
    attributeIds: number[];
    attributeValues: {
      attributeId: number;
      attributeValueId: number;
      isChecked?: boolean;
    }[];
  }) => {
    try {
      console.log('更新内容模型请求数据:', { id, data });
      const response = await client.put<ApiResponse<ContentModel>>(API_ENDPOINTS.CONTENT_MODEL_DETAIL(id), data);
      return response.data?.data;
    } catch (error) {
      console.error('更新内容模型失败:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      await client.delete(API_ENDPOINTS.CONTENT_MODEL_DETAIL(id));
    } catch (error) {
      console.error('删除内容模型失败:', error);
      throw error;
    }
  },
}; 