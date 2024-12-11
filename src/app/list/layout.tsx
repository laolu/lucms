import React from "react"
export default function ListLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* 主要内容 */}
      <main>
        {children}
      </main>
    </div>
  )
} 