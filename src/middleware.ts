import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 需要认证的路由
const authRoutes = [
  '/user',
  '/admin',
]

// 认证页面路由
const authPages = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
]

// 公开路由
const publicRoutes = [
  '/',
  '/list',
  '/course',
  '/detail',
  '/superVip',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  // 检查是否是公开路由
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // 检查是否是需要认证的路由
  const isAuthRequired = authRoutes.some(route => pathname.startsWith(route))
  // 检查是否是认证页面
  const isAuthPage = authPages.some(page => pathname.startsWith(page))

  // 如果是需要认证的路由但没有token
  if (isAuthRequired && !token) {
    const url = new URL('/auth/login', request.url)
    url.searchParams.set('redirectUrl', pathname)
    return NextResponse.redirect(url)
  }

  // 如果已登录但访问认证页面，重定向到首页
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// 配置需要进行中间件处理的路由
export const config = {
  matcher: [
    /*
     * 匹配所有需要处理的路由:
     * - 需要认证的路由 (/user/*, /admin/*, /superVip/*)
     * - 认证页面 (/auth/*)
     */
    '/user/:path*',
    '/admin/:path*',
    '/superVip/:path*',
    '/auth/:path*',
  ],
} 