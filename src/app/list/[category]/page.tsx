import React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, MessageSquare } from "lucide-react"

interface CategoryPageProps {
  params: {
    category: string
  }
}

const categoryTitles: { [key: string]: string } = {
  news: "新闻资讯",
  products: "产品展示",
  cases: "案例展示"
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryTitle = categoryTitles[params.category] || "列表"

  return (
    <div className="container py-8 space-y-8">
      {/* 面包屑导航 */}
      <nav className="flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          首页
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/list" className="hover:text-foreground">
          列表
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground">{categoryTitle}</span>
      </nav>

      {/* 分类标题 */}
      <div>
        <h1 className="text-2xl font-bold">{categoryTitle}</h1>
        <p className="mt-2 text-muted-foreground">
          展示所有{categoryTitle}相关的内容
        </p>
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
              <Input 
                type="search" 
                placeholder={`搜索${categoryTitle}...`} 
                className="max-w-sm ml-auto" 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 列表内容 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} className="group">
            <div className="aspect-video bg-muted relative group-hover:opacity-90 transition-opacity">
              <Badge 
                variant="secondary" 
                className="absolute top-2 right-2"
              >
                {categoryTitle}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-base">
                <Link 
                  href={`/detail/${params.category}/${item}`} 
                  className="hover:text-primary"
                >
                  {categoryTitle}标题 {item}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                这里是{categoryTitle}项目的简短描述，介绍主要内容和特点...
              </p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>2023-12-08</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    1234
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    56
                  </span>
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