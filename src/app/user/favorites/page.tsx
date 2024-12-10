import React from "react"

export default function UserFavorites() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">我的收藏</h1>
        <div className="flex space-x-4">
          <select className="px-3 py-2 border rounded-md">
            <option value="all">全部收藏</option>
            <option value="products">商品</option>
            <option value="articles">文章</option>
          </select>
          <input
            type="text"
            placeholder="搜索收藏"
            className="px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      {/* 收藏列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white rounded-lg border group">
            <div className="aspect-video bg-gray-100 rounded-t-lg relative group-hover:opacity-75">
              <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                ❤️
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2">收藏项目 {item}</h3>
              <p className="text-sm text-gray-500 mb-4">
                这是收藏项目的简短描述，可以是商品描述或文章摘要...
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  收藏于：2023-12-08
                </span>
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  查看详情
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 分页 */}
      <div className="flex justify-center mt-6">
        <nav className="flex items-center space-x-2">
          <button className="px-3 py-2 border rounded-md hover:bg-gray-50">
            上一页
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-md">
            1
          </button>
          <button className="px-3 py-2 border rounded-md hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-2 border rounded-md hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-2 border rounded-md hover:bg-gray-50">
            下一页
          </button>
        </nav>
      </div>

      {/* 批量操作 */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-white rounded-full shadow-lg px-6 py-3 flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <span>✓</span>
            <span>全选</span>
          </button>
          <div className="w-px h-4 bg-gray-200"></div>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <span>🗑️</span>
            <span>取消收藏</span>
          </button>
          <div className="w-px h-4 bg-gray-200"></div>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <span>📁</span>
            <span>移动到</span>
          </button>
        </div>
      </div>
    </div>
  )
} 