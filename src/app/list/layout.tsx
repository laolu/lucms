import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ListLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* 顶部横幅 */}
      <div className="bg-primary text-primary-foreground">
        <div className="container">
          <div className="h-40 flex items-center justify-center">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">内容列表</h1>
              <p className="text-primary-foreground/80">
                展示所有分类的内容，包括新闻资讯、产品展示、案例展示等
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <main>
        {children}
      </main>

      {/* 底部推荐 */}
      <div className="container py-12">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">推荐内容</h2>
            <button className="text-sm text-muted-foreground hover:text-primary">
              查看更多
            </button>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item}>
                <div className="aspect-video bg-muted"></div>
                <CardHeader>
                  <CardTitle className="text-base">推荐内容 {item}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    这是一段推荐内容的简短描述...
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 