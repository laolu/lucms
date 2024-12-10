import React from "react"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <Link href="/" className="text-xl font-bold">
            网站管理系统
          </Link>
        </div>
        <nav className="mt-8">
          <div className="px-4 mb-2 text-xs uppercase text-gray-400">主要功能</div>
          <ul className="space-y-1">
            <li>
              <Link href="/admin" className="flex items-center px-4 py-2 hover:bg-gray-700">
                <span className="mr-3">📊</span>
                控制台
              </Link>
            </li>
            <li>
              <Link href="/admin/posts" className="flex items-center px-4 py-2 hover:bg-gray-700">
                <span className="mr-3">📝</span>
                文章管理
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="flex items-center px-4 py-2 hover:bg-gray-700">
                <span className="mr-3">👥</span>
                用户管理
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className="flex items-center px-4 py-2 hover:bg-gray-700">
                <span className="mr-3">⚙️</span>
                系统设置
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-semibold">管理后台</h1>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <span className="mr-2">🔔</span>
                通知
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <span className="mr-2">👤</span>
                管理员
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 