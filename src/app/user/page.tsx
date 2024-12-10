import React from "react"

export default function UserDashboard() {
  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">欢迎回来，用户名</h1>
        <p className="text-gray-600">这里是您的个人中心，您可以管理您的账户信息和查看相关数据。</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-blue-600 font-medium mb-1">订单总数</h3>
          <p className="text-2xl font-bold">12</p>
          <p className="text-sm text-blue-600">较上月 +2</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-green-600 font-medium mb-1">收藏数量</h3>
          <p className="text-2xl font-bold">25</p>
          <p className="text-sm text-green-600">较上月 +5</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-purple-600 font-medium mb-1">未读��息</h3>
          <p className="text-2xl font-bold">3</p>
          <p className="text-sm text-purple-600">新消息</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">最近订单</h2>
        <div className="bg-white rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left">订单号</th>
                  <th className="px-4 py-3 text-left">商品</th>
                  <th className="px-4 py-3 text-left">状态</th>
                  <th className="px-4 py-3 text-left">金额</th>
                  <th className="px-4 py-3 text-left">时间</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((item) => (
                  <tr key={item} className="border-t">
                    <td className="px-4 py-3">#{item}2023120{item}</td>
                    <td className="px-4 py-3">商品名称 {item}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        已完成
                      </span>
                    </td>
                    <td className="px-4 py-3">¥{item}99.00</td>
                    <td className="px-4 py-3">2023-12-{item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <h2 className="text-lg font-semibold mb-4">最近动态</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  {item === 1 ? '📦' : item === 2 ? '⭐' : '💬'}
                </div>
                <div>
                  <p className="font-medium">
                    {item === 1 ? '新订单创建' : item === 2 ? '收藏商品' : '收到新消息'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item === 1 ? '您创建了新的订单' : item === 2 ? '您收藏了一个商品' : '您收到了一条新消息'}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2分钟前</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 