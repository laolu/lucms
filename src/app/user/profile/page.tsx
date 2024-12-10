import React from "react"

export default function UserProfile() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">个人资料</h1>
      
      <div className="max-w-2xl">
        {/* 基本信息 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">基本信息</h2>
          <div className="bg-white p-6 rounded-lg border space-y-6">
            <div className="flex items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mr-6"></div>
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                更换头像
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  用户名
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value="username"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  昵称
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="请输入昵称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  手机号码
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="请输入手机号码"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  电子邮箱
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="请输入电子邮箱"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 详细信息 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">详细信息</h2>
          <div className="bg-white p-6 rounded-lg border space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                个人简介
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-md h-24"
                placeholder="请输入个人简介"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  性别
                </label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option value="">请选择</option>
                  <option value="male">男</option>
                  <option value="female">女</option>
                  <option value="other">其他</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  生日
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  所在地
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="请输入所在地"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  个人网站
                </label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="请输入个人网站"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 保存按钮 */}
        <div className="flex justify-end space-x-4">
          <button className="px-6 py-2 border rounded-md hover:bg-gray-50">
            取消
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            保存修改
          </button>
        </div>
      </div>
    </div>
  )
} 