import React from "react"

export default function UserOrders() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">我的订单</h1>
        <div className="flex space-x-4">
          <select className="px-3 py-2 border rounded-md">
            <option value="all">全部订单</option>
            <option value="pending">待付款</option>
            <option value="processing">处理中</option>
            <option value="completed">已完成</option>
            <option value="cancelled">已取消</option>
          </select>
          <input
            type="text"
            placeholder="搜索订单"
            className="px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      {/* 订单列表 */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((order) => (
          <div key={order} className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">
                  订单号：#{order}20231208{order}
                </div>
                <div className="text-sm text-gray-500">
                  下单时间：2023-12-08 14:30:00
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  待付款
                </span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  立即付款
                </button>
              </div>
            </div>

            <div className="border-t border-b py-4 space-y-4">
              {[1, 2].map((item) => (
                <div key={item} className="flex items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded"></div>
                  <div className="ml-4 flex-1">
                    <div className="font-medium">商品名称 {item}</div>
                    <div className="text-sm text-gray-500">规格：默认</div>
                  </div>
                  <div className="text-right">
                    <div>¥199.00</div>
                    <div className="text-sm text-gray-500">x1</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4">
              <div className="space-x-4">
                <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                  取消订单
                </button>
                <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                  查看详情
                </button>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  共2件商品 合计：
                  <span className="text-lg font-bold text-gray-900">
                    ¥398.00
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  (含运费 ¥0.00)
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