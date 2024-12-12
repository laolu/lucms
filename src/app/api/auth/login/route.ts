import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { identifier, password } = body

    // 这里应该是实际的数据库验证
    // 示例中使用硬编码的用户数据
    if (identifier === 'admin@example.com' && password === 'admin123') {
      const user = {
        id: 1,
        name: '张三',
        email: 'admin@example.com',
        avatar: '/demo/avatar1.png',
        isAdmin: true
      }

      // 生成JWT token
      const token = jwt.sign(
        { 
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin 
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      )

      return NextResponse.json({
        token,
        user
      })
    }

    // 登录失败
    return NextResponse.json(
      { message: '账号或密码错误' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: '服务器错误' },
      { status: 500 }
    )
  }
} 