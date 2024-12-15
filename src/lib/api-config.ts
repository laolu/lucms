export const API_CONFIG = {
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  SOCIAL_LOGIN: '/auth/social',
  SOCIAL_LOGIN_CALLBACK: '/auth/social/callback',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // User
  USER_INFO: '/user/info',
  USER_UPDATE: '/user/update',

  // VIP
  VIP_PLANS: '/vip/plans',
  VIP_PURCHASE: '/vip/purchase',
  VIP_STATUS: '/vip/status',

  // Payment
  PAYMENT_CREATE: '/payments',
  PAYMENT_STATUS: (id: string) => `/payments/${id}/status`,
  PAYMENT_CALLBACK: '/payments/callback',

  // Resources
  RESOURCES: '/resources',
  RESOURCE_DETAIL: (id: number) => `/resources/${id}`,
  CATEGORY_RESOURCES: (categoryId: number) => `/categories/${categoryId}/resources`,
  RESOURCE_LIKE: (id: number) => `/resources/${id}/like`,
  RESOURCE_DOWNLOAD: (id: number) => `/resources/${id}/download`,
  RESOURCE_COMMENTS: (id: number) => `/resources/${id}/comments`,
  COMMENT_CREATE: '/comments',
  COMMENT_DELETE: (id: number) => `/comments/${id}`,
  SEARCH: '/search',

  // Content Categories
  CONTENT_CATEGORIES: '/content-categories',
  CONTENT_CATEGORIES_TREE: '/content-categories/tree',
  CONTENT_CATEGORY_DETAIL: (id: number) => `/content-categories/${id}`,
  CONTENT_CATEGORY_SORT: (id: number) => `/content-categories/${id}/sort`,
  CONTENT_CATEGORY_STATUS: (id: number) => `/content-categories/${id}/status`,
  CONTENT_CATEGORY_MOVE: (id: number) => `/content-categories/${id}/move`,
  CONTENT_CATEGORY_ATTRIBUTES: (id: number) => `/content-categories/${id}/attributes`,
  CONTENT_CATEGORY_ATTRIBUTE_VALUES: (id: number) => `/content-categories/${id}/attribute-values`,

  // Content Attributes
  CONTENT_ATTRIBUTES: '/content-attributes',
  CONTENT_ATTRIBUTE_DETAIL: (id: number) => `/content-attributes/${id}`,
  CONTENT_ATTRIBUTE_VALUES: (id: number) => `/content-attributes/${id}/values`,
  CONTENT_ATTRIBUTE_STATUS: (id: number) => `/content-attributes/${id}/status`,
}; 