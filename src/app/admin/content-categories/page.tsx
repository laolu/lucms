'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronRight, ChevronDown, MoreHorizontal, Plus, Search, Pencil, FolderPlus, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { CategoryDialog } from './category-dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { contentCategoryService, type ContentCategory } from '@/services/content-category'
import { cn } from "@/lib/utils"

export default function ContentCategoriesPage() {
  const [categories, setCategories] = React.useState<ContentCategory[]>([]);
  const [expandedIds, setExpandedIds] = React.useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState('');
  const [editingCategory, setEditingCategory] = React.useState<ContentCategory | null>(null);
  const [parentId, setParentId] = React.useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [deletingCategory, setDeletingCategory] = React.useState<ContentCategory | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [draggedCategory, setDraggedCategory] = React.useState<ContentCategory | null>(null);
  const [dragOverCategory, setDragOverCategory] = React.useState<ContentCategory | null>(null);

  // 加载分类数据
  const loadCategories = React.useCallback(async () => {
    try {
      const data = await contentCategoryService.getTree();
      setCategories(data);
    } catch (error) {
      toast.error('加载分类失败');
    }
  }, []);

  React.useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const handleAddCategory = () => {
    setDialogTitle('添加分类');
    setEditingCategory(null);
    setParentId(0);
    setDialogOpen(true);
  };

  const handleAddSubCategory = (category: ContentCategory) => {
    setDialogTitle(`添加 ${category.name} 的子分类`);
    setEditingCategory(null);
    setParentId(category.id);
    setDialogOpen(true);
  };

  const handleEditCategory = (category: ContentCategory) => {
    setDialogTitle('编辑分类');
    setEditingCategory(category);
    setParentId(category.parentId || 0);
    setDialogOpen(true);
  };

  const handleDeleteCategory = (category: ContentCategory) => {
    setDeletingCategory(category);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingCategory) {
        await contentCategoryService.update(editingCategory.id, data);
        toast.success('分类已更新');
      } else {
        await contentCategoryService.create(data);
        toast.success('分类已添加');
      }
      loadCategories();
      setDialogOpen(false);
    } catch (error) {
      toast.error(editingCategory ? '更新分类失败' : '添加分类失败');
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingCategory) {
      try {
        await contentCategoryService.delete(deletingCategory.id);
        toast.success('分类已删除');
        loadCategories();
        setDeleteDialogOpen(false);
      } catch (error) {
        toast.error('删除分类失败');
      }
    }
  };

  const filteredCategories = React.useMemo(() => {
    if (!Array.isArray(categories)) {
      console.warn('categories is not an array in filteredCategories:', categories);
      return [];
    }
    
    if (!searchQuery) return categories;
    
    const filterByQuery = (items: ContentCategory[]): ContentCategory[] => {
      return items.reduce((acc: ContentCategory[], item) => {
        if (
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          acc.push({
            ...item,
            children: item.children ? filterByQuery(item.children) : []
          });
        } else if (item.children) {
          const filteredChildren = filterByQuery(item.children);
          if (filteredChildren.length) {
            acc.push({ ...item, children: filteredChildren });
          }
        }
        return acc;
      }, []);
    };
    
    return filterByQuery(categories);
  }, [categories, searchQuery]);

  // 处理拖拽开始
  const handleDragStart = (category: ContentCategory) => {
    setDraggedCategory(category);
  };

  // 处理拖拽结束
  const handleDragEnd = async () => {
    if (!draggedCategory || !dragOverCategory || draggedCategory.id === dragOverCategory.id) {
      setDraggedCategory(null);
      setDragOverCategory(null);
      return;
    }

    try {
      // 检查是否为同级分类
      const isSameLevel = draggedCategory.parentId === dragOverCategory.parentId;
      
      if (isSameLevel) {
        // 同级分类之间的排序调整
        console.log('更新排序:', {
          draggedId: draggedCategory.id,
          draggedSort: draggedCategory.sort,
          targetSort: dragOverCategory.sort
        });
        await contentCategoryService.updateSort(draggedCategory.id, dragOverCategory.sort);
        toast.success('排序已更新');
      } else {
        // 跨级分类的移动
        console.log('移动分类:', {
          draggedId: draggedCategory.id,
          targetId: dragOverCategory.id
        });
        await contentCategoryService.move(draggedCategory.id, dragOverCategory.id);
        toast.success('分类已移动');
      }
      loadCategories();
    } catch (error) {
      console.error('更新失败:', error);
      toast.error('更新失败');
    }

    setDraggedCategory(null);
    setDragOverCategory(null);
  };

  // 处理拖拽悬停
  const handleDragOver = (e: React.DragEvent, category: ContentCategory) => {
    e.preventDefault();
    if (draggedCategory?.id !== category.id) {
      setDragOverCategory(category);
    }
  };

  const renderCategoryTree = (categories: ContentCategory[], level = 0) => {
    if (!Array.isArray(categories)) {
      console.warn('categories is not an array:', categories);
      return null;
    }
    return categories.map((category) => (
      <div key={category.id}>
        <div 
          className={cn(
            "group flex items-center gap-4 py-2 px-4 rounded-lg transition-colors",
            level > 0 && "ml-6",
            dragOverCategory?.id === category.id ? "bg-accent" : "hover:bg-accent/50",
            "cursor-move"
          )}
          draggable
          onDragStart={() => handleDragStart(category)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, category)}
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
          <Input 
            placeholder="搜索分类..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
          {renderCategoryTree(filteredCategories)}
        </CardContent>
      </Card>

      <CategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={dialogTitle}
        initialData={editingCategory}
        parentId={parentId}
        categories={categories}
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
  );
} 