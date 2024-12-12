import React from "react"

export default function ListLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* 白色背景区域 */}
      <div className="pb-8 bg-white">
        {/* 主要内容 */}
        <main>
          {children}
        </main>
      </div>
    </div>
  )
} 