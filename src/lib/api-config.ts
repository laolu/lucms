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
  VIP_LEVELS: '/vip-levels',
  VIP_LEVEL_DETAIL: (id: number) => `/vip-levels/${id}`,
  VIP_LEVEL_STATUS: (id: number) => `/vip-levels/${id}/status`,

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

  // Contents
  CONTENTS: '/contents',
  CONTENT_DETAIL: (id: number) => `/contents/${id}`,
  CONTENT_VIEW: (id: number) => `/contents/${id}/view`,
  CONTENT_COMMENTS: (id: number) => `/contents/${id}/comments`,
  CONTENT_COMMENT_CREATE: (id: number) => `/contents/${id}/comments`,
  CONTENT_COMMENT_DELETE: (id: number, commentId: number) => `/contents/${id}/comments/${commentId}`,
  CONTENT_LIKE: (id: number) => `/contents/${id}/like`,
  CONTENT_UNLIKE: (id: number) => `/contents/${id}/unlike`,
  CONTENT_FAVORITE: (id: number) => `/contents/${id}/favorite`,
  CONTENT_UNFAVORITE: (id: number) => `/contents/${id}/unfavorite`,
  CONTENT_SHARE: (id: number) => `/contents/${id}/share`,
  CONTENT_REPORT: (id: number) => `/contents/${id}/report`,
  UPLOAD_IMAGE: '/api/resources/upload/image',

  // Users
  USERS: '/users',
  USER_DETAIL: (id: number) => `/users/${id}`,
  USER_STATUS: (id: number) => `/users/${id}/status`,
  USER_ROLE: (id: number) => `/users/${id}/role`,
  USER_RESET_PASSWORD: (id: number) => `/users/${id}/reset-password`,

  // Configs
  CONFIGS: '/configs',
  CONFIGS_BASIC: '/configs/basic',
  CONFIGS_EMAIL: '/configs/email',
  CONFIGS_EMAIL_TEST: '/configs/email/test',
  CONFIGS_STORAGE: '/configs/storage',
  CONFIGS_SMS: '/configs/sms',
  CONFIGS_PAYMENT: '/configs/payment',
  CONFIGS_OAUTH: '/configs/oauth',
  CONFIGS_SECURITY: '/configs/security',
  CONFIGS_CACHE: '/configs/cache',
  CONFIGS_REFRESH: '/configs/refresh',

  // Advertisements
  ADVERTISEMENTS: '/advertisements',
  ADVERTISEMENT_DETAIL: (id: number) => `/advertisements/${id}`,
  ADVERTISEMENT_STATUS: (id: number) => `/advertisements/${id}/status`,
  ADVERTISEMENT_ORDER: (id: number) => `/advertisements/${id}/order`,

  // Menus
  MENUS: '/menus',
  MENUS_TREE: '/menus/tree',
  MENU_DETAIL: (id: number) => `/menus/${id}`,
  MENU_STATUS: (id: number) => `/menus/${id}/status`,
  MENU_SORT: (id: number) => `/menus/${id}/sort`,
} as const; 