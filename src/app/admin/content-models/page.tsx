'use client';

import * as React from 'react';
import Link from 'next/link';
import { Plus, FileEdit, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { contentModelService } from '@/services/content-model';
import type { ContentModel } from '@/services/content-model';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function ContentModelsPage() {
  const [models, setModels] = React.useState<ContentModel[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [deletingModel, setDeletingModel] = React.useState<ContentModel | null>(null);

  // 加载数据
  const loadData = React.useCallback(async () => {
    try {
      setLoading(true);
      console.log('开始加载内容模型数据');
      const data = await contentModelService.getAll();
      console.log('获取到的内容模型数据:', data);
      setModels(data);
    } catch (error) {
      console.error('加载内容模型数据失败:', error);
      toast.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  // 删除模型
  const handleDelete = async (model: ContentModel) => {
    setDeletingModel(model);
    setDeleteDialogOpen(true);
  };

  // 确认删除
  const handleConfirmDelete = async () => {
    if (!deletingModel) return;
    
    try {
      await contentModelService.delete(deletingModel.id);
      toast.success('删除成功');
      loadData();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('删除内容模型失败:', error);
      toast.error('删除失败');
    }
  };

  // 更新状态
  const handleStatusChange = async (id: number, isActive: boolean) => {
    try {
      await contentModelService.update(id, { isActive });
      toast.success('更新成功');
      loadData();
    } catch (error) {
      console.error('更新内容模型状态失败:', error);
      toast.error('更新失败');
    }
  };

  // 过滤数据
  const filteredModels = React.useMemo(() => {
    if (!searchQuery) return models;
    
    return models.filter(model => 
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [models, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">内容模型管理</h2>
        <Button asChild>
          <Link href="/admin/content-models/create">
            <Plus className="mr-2 w-4 h-4" />
            新建模型
          </Link>
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="搜索模型..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader className="py-4">
          <div className="flex items-center gap-4 px-4 text-sm text-muted-foreground">
            <div className="w-[200px]">名称</div>
            <div className="flex-1">描述</div>
            <div className="w-[100px] text-center">属性数量</div>
            <div className="w-[80px] text-center">排序</div>
            <div className="w-[80px] text-center">状态</div>
            <div className="w-[160px] text-center">创建时间</div>
            <div className="w-[120px] text-center">操作</div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="py-8 text-center text-muted-foreground">加载中...</div>
          ) : filteredModels.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">暂无数据</div>
          ) : (
            filteredModels.map((model) => (
              <div
                key={model.id}
                className="group flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-accent/50"
              >
                <div className="w-[200px] font-medium">
                  {model.name}
                </div>
                <div className="flex-1 text-sm text-muted-foreground">
                  {model.description || '-'}
                </div>
                <div className="w-[100px] text-center">
                  <Badge variant="secondary">
                    {model.attributes?.length || 0}
                  </Badge>
                </div>
                <div className="w-[80px] text-center text-sm">
                  {model.sort}
                </div>
                <div className="w-[80px] text-center">
                  <Switch
                    checked={model.isActive}
                    onCheckedChange={(checked) => handleStatusChange(model.id, checked)}
                  />
                </div>
                <div className="w-[160px] text-center text-sm text-muted-foreground">
                  {new Date(model.createdAt).toLocaleString()}
                </div>
                <div className="flex gap-1 items-center w-[120px] justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    title="编辑模型"
                    asChild
                  >
                    <Link href={`/admin/content-models/${model.id}/edit`}>
                      <FileEdit className="w-4 h-4" />
                      <span className="sr-only">编辑</span>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(model)}
                    className="w-8 h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    title="删除模型"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only">删除</span>
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除模型 "{deletingModel?.name}" 吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleConfirmDelete}
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 