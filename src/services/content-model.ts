import client from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-config';

export interface ContentAttributeValue {
  id: number;
  value: string;
  sort: number;
  isActive: boolean;
}

export interface ContentAttribute {
  id: number;
  name: string;
  type: string;
  values: ContentAttributeValue[];
}

export interface ContentModel {
  id: number;
  name: string;
  description: string;
  attributes: ContentAttribute[];
  attributeValues: ContentAttributeValue[];
  sort: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContentModelDto {
  name: string;
  description?: string;
  attributeIds: number[];
  attributeValues: Array<{
    attributeValueId: number;
    isEnabled?: boolean;
    sort?: number;
  }>;
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
      console.log('开始获取内容模型列表');
      const response = await client.get<ApiResponse<ContentModel[]>>(API_ENDPOINTS.CONTENT_MODELS);
      console.log('获取到的内容模型数据:', response.data);
      return response.data?.data || [];
    } catch (error) {
      console.error('获取内容模型列表失败:', error);
      return [];
    }
  },

  // 获取单个内容模型
  getById: async (id: number) => {
    try {
      const response = await client.get<ApiResponse<ContentModel>>(API_ENDPOINTS.CONTENT_MODEL_DETAIL(id));
      return response.data?.data;
    } catch (error) {
      console.error('获取内容模型详情失败:', error);
      throw error;
    }
  },

  // 创建内容模型
  create: async (dto: CreateContentModelDto) => {
    try {
      const response = await client.post<ApiResponse<ContentModel>>(API_ENDPOINTS.CONTENT_MODELS, dto);
      return response.data?.data;
    } catch (error) {
      console.error('创建内容模型失败:', error);
      throw error;
    }
  },

  // 更新内容模型
  update: async (id: number, dto: Partial<CreateContentModelDto>) => {
    try {
      const response = await client.put<ApiResponse<ContentModel>>(API_ENDPOINTS.CONTENT_MODEL_DETAIL(id), dto);
      return response.data?.data;
    } catch (error) {
      console.error('更新内容模型失败:', error);
      throw error;
    }
  },

  // 删除内容模型
  delete: async (id: number) => {
    try {
      await client.delete(API_ENDPOINTS.CONTENT_MODEL_DETAIL(id));
    } catch (error) {
      console.error('删除内容模型失败:', error);
      throw error;
    }
  },

  // 获取内容模型的属性
  getModelAttributes: async (id: number) => {
    try {
      const response = await client.get<ApiResponse<ContentAttribute[]>>(API_ENDPOINTS.CONTENT_MODEL_ATTRIBUTES(id));
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
  },

  // 获取内容模型的属性值
  getModelAttributeValues: async (id: number) => {
    try {
      const response = await client.get<ApiResponse<ContentAttributeValue[]>>(
        API_ENDPOINTS.CONTENT_MODEL_DETAIL(id) + '/attribute-values'
      );
      return response.data?.data || [];
    } catch (error) {
      console.error('获取内容模型属性值失败:', error);
      return [];
    }
  },

  // 更新内容模型的属性值
  updateModelAttributeValues: async (id: number, attributeValues: Array<{attributeValueId: number; isEnabled?: boolean; sort?: number}>) => {
    try {
      const response = await client.put<ApiResponse<ContentModel>>(
        API_ENDPOINTS.CONTENT_MODEL_DETAIL(id) + '/attribute-values',
        attributeValues
      );
      return response.data?.data;
    } catch (error) {
      console.error('更新内容模型属性值失败:', error);
      throw error;
    }
  }
}; 