export interface User {
  id: number
  name: string
  email: string
  avatar: string
  isAdmin: boolean
}

export interface LoginResponse {
  token: string
  user: User
}

export async function login(identifier: string, password: string): Promise<LoginResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifier, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || '登录失败')
  }

  const data = await response.json()
  
  // 保存token到localStorage
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(data.user))
  
  return data
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/auth/login'
}

export function getToken(): string | null {
  return localStorage.getItem('token')
}

export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
}

// 请求拦截器添加token
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getToken()
  
  const headers = {
    ...options.headers,
    'Authorization': token ? `Bearer ${token}` : '',
  }

  const response = await fetch(url, { ...options, headers })
  
  if (response.status === 401) {
    // token过期或无效，登出处理
    logout()
    return
  }

  return response
} 