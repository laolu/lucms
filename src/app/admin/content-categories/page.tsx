'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  Plus,
  Search,
  Pencil,
  FolderPlus,
  Trash2
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CategoryDialog } from './category-dialog'
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
import { toast } from "sonner"

export default function ContentCategoriesPage() {
  // 模拟分类数据
  const [categories, setCategories] = React.useState([
    {
      id: 1,
      name: '游戏美术',
      description: '游戏美术相关资源',
      parentId: null,
      isActive: true,
      sort: 0,
      createdAt: '2024-01-01',
      children: [
        {
          id: 3,
          name: '角色设计',
          description: '游戏角色设计资源',
          parentId: 1,
          isActive: true,
          sort: 0,
          createdAt: '2024-01-01',
          children: [
            {
              id: 5,
              name: '人物角色',
              description: '人物角色设计资源',
              parentId: 3,
              isActive: true,
              sort: 0,
              createdAt: '2024-01-01',
            },
            {
              id: 6,
              name: '怪物角色',
              description: '怪物角色设计资源',
              parentId: 3,
              isActive: false,
              sort: 1,
              createdAt: '2024-01-01',
            }
          ]
        },
        {
          id: 4,
          name: '场景设计',
          description: '游戏场景设计资源',
          parentId: 1,
          isActive: true,
          sort: 1,
          createdAt: '2024-01-01',
        }
      ]
    },
    {
      id: 2,
      name: '动画制作',
      description: '动画制作相关资源',
      parentId: null,
      isActive: true,
      sort: 1,
      createdAt: '2024-01-01',
      children: []
    }
  ])

  const [expandedIds, setExpandedIds] = React.useState<number[]>([])
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [dialogTitle, setDialogTitle] = React.useState('')
  const [editingCategory, setEditingCategory] = React.useState<any>(null)
  const [parentId, setParentId] = React.useState<number | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [deletingCategory, setDeletingCategory] = React.useState<any>(null)

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  const handleAddCategory = () => {
    setDialogTitle('添加分类')
    setEditingCategory(null)
    setParentId(null)
    setDialogOpen(true)
  }

  const handleAddSubCategory = (parentCategory: any) => {
    setDialogTitle('添加子分类')
    setEditingCategory(null)
    setParentId(parentCategory.id)
    setDialogOpen(true)
  }

  const handleEditCategory = (category: any) => {
    setDialogTitle('编辑分类')
    setEditingCategory(category)
    setParentId(category.parentId)
    setDialogOpen(true)
  }

  const handleDeleteCategory = (category: any) => {
    setDeletingCategory(category)
    setDeleteDialogOpen(true)
  }

  const updateCategoryInTree = (categories: any[], newCategory: any): any[] => {
    return categories.map(category => {
      if (category.id === newCategory.id) {
        return { ...category, ...newCategory }
      }
      if (category.children) {
        return {
          ...category,
          children: updateCategoryInTree(category.children, newCategory)
        }
      }
      return category
    })
  }

  const addCategoryToTree = (categories: any[], newCategory: any, parentId: number | null): any[] => {
    if (parentId === null) {
      return [...categories, { ...newCategory, children: [] }]
    }

    return categories.map(category => {
      if (category.id === parentId) {
        return {
          ...category,
          children: [...(category.children || []), newCategory]
        }
      }
      if (category.children) {
        return {
          ...category,
          children: addCategoryToTree(category.children, newCategory, parentId)
        }
      }
      return category
    })
  }

  const deleteCategoryFromTree = (categories: any[], categoryId: number): any[] => {
    return categories.filter(category => {
      if (category.id === categoryId) {
        return false
      }
      if (category.children) {
        category.children = deleteCategoryFromTree(category.children, categoryId)
      }
      return true
    })
  }

  const handleSubmit = (data: any) => {
    if (editingCategory) {
      // 编辑现有分类
      const updatedCategory = {
        ...editingCategory,
        ...data,
      }
      setCategories(prev => updateCategoryInTree(prev, updatedCategory))
      toast.success('分类已更新')
    } else {
      // 添加新分类
      const newCategory = {
        ...data,
        id: Math.max(...categories.map(c => c.id)) + 1,
        createdAt: new Date().toISOString().split('T')[0],
      }
      setCategories(prev => addCategoryToTree(prev, newCategory, data.parentId))
      toast.success('分类已添加')
    }
    setDialogOpen(false)
  }

  const handleConfirmDelete = () => {
    if (deletingCategory) {
      setCategories(prev => deleteCategoryFromTree(prev, deletingCategory.id))
      toast.success('分类已删除')
      setDeleteDialogOpen(false)
    }
  }

  const renderCategoryTree = (categories: any[], level = 0) => {
    return categories.map((category) => (
      <div key={category.id}>
        <div 
          className={cn(
            "group flex items-center gap-4 py-2 px-4 hover:bg-accent/50 rounded-lg transition-colors",
            level > 0 && "ml-6"
          )}
        >
          <div className="flex items-center gap-2 min-w-[200px]">
            {category.children?.length > 0 ? (
              <Button 
                variant="ghost" 
                size="icon"
                className="w-8 h-8 p-0"
                onClick={() => toggleExpand(category.id)}
              >
                {expandedIds.includes(category.id) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
            ) : (
              <div className="w-8" />
            )}
            <span className="font-medium">{category.name}</span>
          </div>
          
          <div className="flex items-center flex-1 gap-4 text-sm text-muted-foreground">
            <span className="w-[200px] truncate">{category.description}</span>
            <span className="w-[100px]">排序: {category.sort}</span>
            <Badge variant={category.isActive ? "default" : "secondary"}>
              {category.isActive ? '启用' : '禁用'}
            </Badge>
            <span className="flex-1">{category.createdAt}</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="w-8 h-8 p-0 transition-opacity opacity-0 group-hover:opacity-100"
              >
                <MoreHorizontal className="w-4 h-4" />
                <span className="sr-only">操作菜单</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>操作</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                <Pencil className="w-4 h-4 mr-2" />
                编辑分类
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAddSubCategory(category)}>
                <FolderPlus className="w-4 h-4 mr-2" />
                添加子分类
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600"
                onClick={() => handleDeleteCategory(category)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                删除分类
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {expandedIds.includes(category.id) && category.children && (
          <div className="mt-0.5">
            {renderCategoryTree(category.children, level + 1)}
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">内容分类管理</h1>
        <Button onClick={handleAddCategory}>
          <Plus className="w-4 h-4 mr-2" />
          添加分类
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索分类..." className="pl-8" />
        </div>
      </div>

      <Card>
        <CardHeader className="py-4">
          <div className="flex items-center gap-4 px-4 text-sm text-muted-foreground">
            <div className="min-w-[200px]">分类名称</div>
            <div className="w-[200px]">描述</div>
            <div className="w-[100px]">排序</div>
            <div className="w-[60px]">状态</div>
            <div className="flex-1">创建时间</div>
            <div className="w-8" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {renderCategoryTree(categories)}
        </CardContent>
      </Card>

      <CategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={dialogTitle}
        initialData={editingCategory}
        parentId={parentId}
        onSubmit={handleSubmit}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除分类 "{deletingCategory?.name}" 吗？此操作不可撤销。
              {deletingCategory?.children?.length > 0 && (
                <p className="mt-2 text-red-500">
                  警告：该分类包含子分类，删除后子分类也将被删除。
                </p>
              )}
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