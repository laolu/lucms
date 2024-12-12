import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// 不需要验证token的路由
const publicRoutes = [
  '/',
  '/auth/login',
  '/auth/register',
  '/list',
  '/detail',
  '/blog',
  '/tutorials',
  '/community',
  '/about',
  '/api/auth/login',
]

// 检查是否是公开路由
const isPublicRoute = (path: string) => {
  return publicRoutes.some(route => path.startsWith(route))
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // 如果是公开路由，直接放行
  if (isPublicRoute(path)) {
    return NextResponse.next()
  }

  const token = request.headers.get('Authorization')?.replace('Bearer ', '')

  // 没有token，重定向到登录页
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  try {
    // 验证token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    await jwtVerify(token, secret)
    
    return NextResponse.next()
  } catch (error) {
    // token无效，重定向到登录页
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}

// 配置需要进行中间件处理的路由
export const config = {
  matcher: [
    '/user/:path*',
    '/admin/:path*',
    '/superVip/:path*',
    '/api/((?!auth/login).*)' // 除了 /api/auth/login 之外的所有 API 路由
  ],
} 