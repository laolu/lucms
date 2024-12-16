'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, ArrowUpDown } from "lucide-react"
import { toast } from "sonner"
import { contentService } from '@/services/content'
import { contentCategoryService } from '@/services/content-category'
import { formatDate } from '@/lib/utils'

export default function ContentsPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const [contents, setContents] = React.useState<any>({
    items: [],
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0
  })
  const [categories, setCategories] = React.useState<any[]>([])
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all')
  const [sortBy, setSortBy] = React.useState<string>('createdAt')
  const [sortOrder, setSortOrder] = React.useState<'ASC' | 'DESC'>('DESC')
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [deletingContent, setDeletingContent] = React.useState<any>(null)

  // 加载内容列表
  const loadContents = React.useCallback(async () => {
    try {
      setLoading(true)
      const data = await contentService.getAll({
        search: searchQuery,
        categoryId: selectedCategory === 'all' ? undefined : selectedCategory,
        sortBy,
        sort: sortOrder,
        page: contents.page,
        pageSize: contents.pageSize
      })
      setContents(data)
    } catch (error) {
      toast.error('加载内容列表失败')
    } finally {
      setLoading(false)
    }
  }, [searchQuery, selectedCategory, sortBy, sortOrder, contents.page, contents.pageSize])

  // 加载分类列表
  const loadCategories = React.useCallback(async () => {
    try {
      const data = await contentCategoryService.getTree()
      setCategories(data)
    } catch (error) {
      toast.error('加载分类列表失败')
    }
  }, [])

  React.useEffect(() => {
    loadCategories()
  }, [loadCategories])

  React.useEffect(() => {
    loadContents()
  }, [loadContents])

  // 处理创建内容
  const handleCreate = () => {
    router.push('/admin/contents/create')
  }

  // 处理编辑内容
  const handleEdit = (content: any) => {
    router.push(`/admin/contents/${content.id}/edit`)
  }

  // 处理删除内容
  const handleDelete = (content: any) => {
    setDeletingContent(content)
    setDeleteDialogOpen(true)
  }

  // 确认删除内容
  const handleConfirmDelete = async () => {
    if (!deletingContent) return

    try {
      await contentService.delete(deletingContent.id)
      toast.success('内容已删除')
      loadContents()
    } catch (error) {
      toast.error('删除内容失败')
    } finally {
      setDeleteDialogOpen(false)
      setDeletingContent(null)
    }
  }

  // 处理排序变更
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')
    } else {
      setSortBy(field)
      setSortOrder('DESC')
    }
  }

  // 处理页码变更
  const handlePageChange = (page: number) => {
    setContents(prev => ({ ...prev, page }))
  }

  // 构建分类选项
  const buildCategoryOptions = (items: any[], level = 0): React.ReactNode[] => {
    return items.flatMap((item) => {
      const prefix = '\u00A0'.repeat(level * 4)
      const options = [
        <SelectItem key={item.id} value={item.id.toString()}>
          {prefix + item.name}
        </SelectItem>
      ]
      
      if (item.children?.length) {
        options.push(...buildCategoryOptions(item.children, level + 1))
      }
      
      return options
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">内容管理</h1>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          创建内容
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索内容..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="选择分类" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部分类</SelectItem>
            {buildCategoryOptions(categories)}
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">
                <Button variant="ghost" className="h-8 p-0" onClick={() => handleSort('title')}>
                  标题
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>分类</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>
                <Button variant="ghost" className="h-8 p-0" onClick={() => handleSort('viewCount')}>
                  浏览
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="h-8 p-0" onClick={() => handleSort('commentCount')}>
                  评论
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="h-8 p-0" onClick={() => handleSort('createdAt')}>
                  创建时间
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contents.items.map((content: any) => (
              <TableRow key={content.id}>
                <TableCell className="font-medium">{content.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {content.category.name}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={content.isActive ? "default" : "secondary"}>
                    {content.isActive ? '已发布' : '草稿'}
                  </Badge>
                </TableCell>
                <TableCell>{content.viewCount}</TableCell>
                <TableCell>{content.commentCount}</TableCell>
                <TableCell>{formatDate(content.createdAt)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                        <span className="sr-only">打开菜单</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>操作</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => window.open(`/contents/${content.id}`)}>
                        <Eye className="w-4 h-4 mr-2" />
                        查看
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(content)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        编辑
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(content)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        删除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(contents.page - 1)}
                disabled={contents.page === 1}
              />
            </PaginationItem>
            {Array.from({ length: contents.totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={contents.page === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(contents.page + 1)}
                disabled={contents.page === contents.totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除内容 "{deletingContent?.title}" 吗？此操作不可撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 