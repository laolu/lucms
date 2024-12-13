export const API_BASE_URL = 'http://localhost:8080'

export const API_ENDPOINTS = {
  // 用户相关
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  USER_INFO: '/api/user/info',
  USER_UPDATE: '/api/user/update',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESET_PASSWORD: '/api/auth/reset-password',
  SOCIAL_LOGIN: '/api/auth/social-login',
  SOCIAL_LOGIN_CALLBACK: '/api/auth/social-login/callback',

  // 资源相关
  RESOURCES: '/api/resources',
  RESOURCE_DETAIL: (id: string | number) => `/api/resources/${id}`,
  RESOURCE_CREATE: '/api/resources/create',
  RESOURCE_UPDATE: (id: string | number) => `/api/resources/${id}/update`,
  RESOURCE_DELETE: (id: string | number) => `/api/resources/${id}/delete`,
  RESOURCE_LIKE: (id: string | number) => `/api/resources/${id}/like`,
  RESOURCE_DOWNLOAD: (id: string | number) => `/api/resources/${id}/download`,

  // 分类相关
  CATEGORIES: '/api/categories',
  CATEGORY_RESOURCES: (id: string | number) => `/api/categories/${id}/resources`,

  // 评论相关
  COMMENTS: '/api/comments',
  RESOURCE_COMMENTS: (id: string | number) => `/api/resources/${id}/comments`,
  COMMENT_CREATE: '/api/comments/create',
  COMMENT_DELETE: (id: string | number) => `/api/comments/${id}/delete`,

  // 会员相关
  VIP_PLANS: '/api/vip/plans',
  VIP_PURCHASE: '/api/vip/purchase',
  VIP_STATUS: '/api/vip/status',

  // 支付相关
  PAYMENT_CREATE: '/api/payments/create',
  PAYMENT_STATUS: (id: string | number) => `/api/payments/${id}/status`,
  PAYMENT_CALLBACK: '/api/payments/callback',

  // 搜索相关
  SEARCH: '/api/search',
  
  // 统计相关
  STATS_OVERVIEW: '/api/stats/overview',
  STATS_DOWNLOADS: '/api/stats/downloads',
  STATS_USERS: '/api/stats/users'
} 