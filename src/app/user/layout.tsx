import React from "react"
import Link from "next/link"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold">
              返回首页
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/user/profile" className="text-gray-600 hover:text-gray-900">
                个人资料
              </Link>
              <button className="text-gray-600 hover:text-gray-900">
                退出
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-medium">用户名</div>
                    <div className="text-sm text-gray-500">普通会员</div>
                  </div>
                </div>
              </div>
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <Link 
                      href="/user" 
                      className="flex items-center px-3 py-2 text-gray-600 rounded-md hover:bg-gray-100"
                    >
                      <span className="mr-3">🏠</span>
                      用户中心
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/user/profile" 
                      className="flex items-center px-3 py-2 text-gray-600 rounded-md hover:bg-gray-100"
                    >
                      <span className="mr-3">👤</span>
                      个人资料
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/user/orders" 
                      className="flex items-center px-3 py-2 text-gray-600 rounded-md hover:bg-gray-100"
                    >
                      <span className="mr-3">📦</span>
                      我的订单
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/user/favorites" 
                      className="flex items-center px-3 py-2 text-gray-600 rounded-md hover:bg-gray-100"
                    >
                      <span className="mr-3">⭐</span>
                      我的收藏
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/user/messages" 
                      className="flex items-center px-3 py-2 text-gray-600 rounded-md hover:bg-gray-100"
                    >
                      <span className="mr-3">💬</span>
                      消息中心
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/user/settings" 
                      className="flex items-center px-3 py-2 text-gray-600 rounded-md hover:bg-gray-100"
                    >
                      <span className="mr-3">⚙️</span>
                      账号设置
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 