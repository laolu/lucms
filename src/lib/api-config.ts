export const API_BASE_URL = 'http://localhost:8080'

export const API_ENDPOINTS = {
  // 用户相关
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  USER_INFO: '/user/info',
  USER_UPDATE: '/user/update',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  SOCIAL_LOGIN: '/auth/social-login',
  SOCIAL_LOGIN_CALLBACK: '/auth/social-login/callback',

  // 资源相关
  RESOURCES: '/resources',
  RESOURCE_DETAIL: (id: string | number) => `/resources/${id}`,
  RESOURCE_CREATE: '/resources/create',
  RESOURCE_UPDATE: (id: string | number) => `/resources/${id}/update`,
  RESOURCE_DELETE: (id: string | number) => `/resources/${id}/delete`,
  RESOURCE_LIKE: (id: string | number) => `/resources/${id}/like`,
  RESOURCE_DOWNLOAD: (id: string | number) => `/resources/${id}/download`,

  // 分类相关
  CATEGORIES: '/categories',
  CATEGORY_RESOURCES: (id: string | number) => `/categories/${id}/resources`,

  // 评论相关
  COMMENTS: '/comments',
  RESOURCE_COMMENTS: (id: string | number) => `/resources/${id}/comments`,
  COMMENT_CREATE: '/comments/create',
  COMMENT_DELETE: (id: string | number) => `/comments/${id}/delete`,

  // 会员相关
  VIP_PLANS: '/vip/plans',
  VIP_PURCHASE: '/vip/purchase',
  VIP_STATUS: '/vip/status',

  // 支付相关
  PAYMENT_CREATE: '/payments/create',
  PAYMENT_STATUS: (id: string | number) => `/payments/${id}/status`,
  PAYMENT_CALLBACK: '/payments/callback',

  // 搜索相关
  SEARCH: '/search',
  
  // 统计相关
  STATS_OVERVIEW: '/stats/overview',
  STATS_DOWNLOADS: '/stats/downloads',
  STATS_USERS: '/stats/users'
} 