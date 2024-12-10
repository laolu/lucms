import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, MessageSquare, ThumbsUp } from "lucide-react"

export default function ListPage() {
  return (
    <div className="container py-8 space-y-8">
      {/* 分类导航 */}
      <div className="flex flex-wrap gap-4">
        <Button variant="default">全部</Button>
        <Button variant="ghost">新闻资讯</Button>
        <Button variant="ghost">产品展示</Button>
        <Button variant="ghost">案例展示</Button>
      </div>

      {/* 筛选工具栏 */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">排序：</span>
              <Select defaultValue="latest">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="选择排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">最新发布</SelectItem>
                  <SelectItem value="popular">最多浏览</SelectItem>
                  <SelectItem value="recommended">推荐优先</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">时间：</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="选择时间范围" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部时间</SelectItem>
                  <SelectItem value="today">今天</SelectItem>
                  <SelectItem value="week">本周</SelectItem>
                  <SelectItem value="month">本月</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Input type="search" placeholder="搜索..." className="max-w-sm ml-auto" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 列表内容 */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <Card key={item}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="w-48 h-32 bg-muted rounded-md"></div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/detail/${item}`}
                      className="text-lg font-medium hover:text-primary"
                    >
                      标题内容 {item}
                    </Link>
                    <span className="text-sm text-muted-foreground">2023-12-08</span>
                  </div>
                  <p className="text-muted-foreground">
                    这里是列表项的简短描述，介绍主要内容和特点...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        1234
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        56
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        78
                      </span>
                    </div>
                    <Badge variant="secondary">分类标签</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 分页 */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          <Button variant="outline">上一页</Button>
          <Button variant="default">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">下一页</Button>
        </div>
      </div>
    </div>
  )
} 