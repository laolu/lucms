import React from "react"

export default function UserMessages() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">消息中心</h1>
        <div className="flex items-center space-x-4">
          <button className="text-blue-600 hover:text-blue-700">
            全部已读
          </button>
          <button className="text-blue-600 hover:text-blue-700">
            清空消息
          </button>
        </div>
      </div>

      {/* 消息分类 */}
      <div className="mb-6">
        <nav className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
            全部消息
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
            系统通知
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
            订单消息
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
            互动消息
          </button>
        </nav>
      </div>

      {/* 消息列表 */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((message) => (
          <div
            key={message}
            className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  {message === 1 ? '📢' : message === 2 ? '📦' : '💬'}
                </div>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">
                    {message === 1
                      ? '系统通知'
                      : message === 2
                      ? '订单更新'
                      : '新的评论'}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      2023-12-08 14:30
                    </span>
                    {message === 1 && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                        未读
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mt-1">
                  {message === 1
                    ? '亲爱的用户，您的账户安全等级较低，建议您尽快完善账户信息...'
                    : message === 2
                    ? '您的订单 #202312080001 已发货，请注意查收...'
                    : '有用户在您的评论下回复了消息，点击查看详情...'}
                </p>
                <div className="mt-2 flex items-center space-x-4">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                    查看详情
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 text-sm">
                    删除
                  </button>
                </div>
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
    </div>
  )
} 