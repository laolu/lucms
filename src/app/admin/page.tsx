import React from "react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-500 text-sm font-medium">总访问量</h3>
          <p className="text-2xl font-semibold mt-2">12,345</p>
          <span className="text-green-600 text-sm">↑ 12% 较上周</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-500 text-sm font-medium">文章数量</h3>
          <p className="text-2xl font-semibold mt-2">48</p>
          <span className="text-green-600 text-sm">↑ 4 篇本周</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-500 text-sm font-medium">用户数量</h3>
          <p className="text-2xl font-semibold mt-2">860</p>
          <span className="text-green-600 text-sm">↑ 24 本月</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-500 text-sm font-medium">评论数量</h3>
          <p className="text-2xl font-semibold mt-2">238</p>
          <span className="text-red-600 text-sm">↓ 4% 较上周</span>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">最近活动</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center space-x-4">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    👤
                  </span>
                  <div>
                    <p className="font-medium">用户注册</p>
                    <p className="text-sm text-gray-500">新用户 user{item} 完成注册</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2分钟前</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">快捷操作</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <span className="block text-2xl mb-2">📝</span>
              发布文章
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <span className="block text-2xl mb-2">👥</span>
              添加用户
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <span className="block text-2xl mb-2">📊</span>
              数据统计
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <span className="block text-2xl mb-2">⚙️</span>
              系统设置
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 