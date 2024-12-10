import React from "react"

export default function UserSettings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">账号设置</h1>

      <div className="max-w-2xl space-y-6">
        {/* 安全设置 */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">安全设置</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h3 className="font-medium">登录密码</h3>
                <p className="text-sm text-gray-500">
                  定期更换密码可以保护账号安全
                </p>
              </div>
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md">
                修改
              </button>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h3 className="font-medium">手机绑定</h3>
                <p className="text-sm text-gray-500">
                  已绑定���138****8888
                </p>
              </div>
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md">
                更换
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="font-medium">邮箱绑定</h3>
                <p className="text-sm text-gray-500">
                  用于接收重要通知和找回密码
                </p>
              </div>
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md">
                绑定
              </button>
            </div>
          </div>
        </div>

        {/* 通知设置 */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">通知设置</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h3 className="font-medium">系统通知</h3>
                <p className="text-sm text-gray-500">
                  接收系统更新、维护等通知
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h3 className="font-medium">订单通知</h3>
                <p className="text-sm text-gray-500">
                  接收订单状态变更通知
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="font-medium">营销通知</h3>
                <p className="text-sm text-gray-500">
                  接收优惠、活动等营销信息
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* 隐私设置 */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">隐私设置</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h3 className="font-medium">个人信息可见性</h3>
                <p className="text-sm text-gray-500">
                  设置个人资料的公开范围
                </p>
              </div>
              <select className="px-3 py-2 border rounded-md">
                <option value="public">公开</option>
                <option value="friends">仅好友可见</option>
                <option value="private">私密</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="font-medium">搜索设置</h3>
                <p className="text-sm text-gray-500">
                  是否允许其他用户通过手机号或邮箱找到我
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* 账号注销 */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">账号注销</h2>
          <p className="text-gray-500 mb-4">
            注销账号后，您的所有数据将被永久删除且无法恢复
          </p>
          <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md">
            注销账号
          </button>
        </div>
      </div>
    </div>
  )
} 