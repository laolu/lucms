import client from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-config';

export interface ContentModel {
  id: number;
  name: string;
  description: string;
  sort: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  attributes: {
    attribute: {
      id: number;
      name: string;
      description?: string;
      sort: number;
      isActive: boolean;
    };
  }[];
  attributeValues: {
    attribute: {
      id: number;
      name: string;
    };
    attributeValue: {
      id: number;
      name: string;
      sort: number;
      isActive: boolean;
    };
    isEnabled: boolean;
    sort: number;
  }[];
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
      console.error('获取内容模型列表失败:', error);
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
      isEnabled?: boolean;
      sort?: number;
    }[];
  }) => {
    try {
      console.log('发送创建请求数据:', data);
      const response = await client.post<ApiResponse<ContentModel>>(API_ENDPOINTS.CONTENT_MODELS, {
        ...data,
        attributeValues: data.attributeValues.map(value => ({
          ...value,
          isEnabled: value.isEnabled ?? true,
          sort: value.sort ?? 0
        }))
      });
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
      isEnabled?: boolean;
      sort?: number;
    }[];
  }) => {
    try {
      console.log('更新内容模型请求数据:', { id, data });
      const updateData = {
        id,
        ...data,
        attributeValues: data.attributeValues.map(value => ({
          modelId: id,
          attributeId: value.attributeId,
          attributeValueId: value.attributeValueId,
          isEnabled: value.isEnabled ?? true,
          sort: value.sort ?? 0
        }))
      };
      const response = await client.put<ApiResponse<ContentModel>>(API_ENDPOINTS.CONTENT_MODEL_DETAIL(id), updateData);
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