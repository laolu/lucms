'use client';

import * as React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Switch } from '@/components/ui/switch';
import { contentModelService } from '@/services/content-model';
import type { ContentModel } from '@/services/content-model';

export default function ContentModelsPage() {
  const [models, setModels] = React.useState<ContentModel[]>([]);
  const [loading, setLoading] = React.useState(true);

  // 加载数据
  const loadData = async () => {
    try {
      setLoading(true);
      const data = await contentModelService.getAll();
      setModels(data);
    } catch (error) {
      toast.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  // 删除模型
  const handleDelete = async (id: number) => {
    try {
      await contentModelService.delete(id);
      toast.success('删除成功');
      loadData();
    } catch (error) {
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
      toast.error('更新失败');
    }
  };

  const columns = [
    {
      accessorKey: 'name',
      header: '名称',
    },
    {
      accessorKey: 'description',
      header: '描述',
    },
    {
      accessorKey: 'attributes',
      header: '属性数量',
      cell: ({ row }) => row.original.attributes?.length || 0,
    },
    {
      accessorKey: 'sort',
      header: '排序',
    },
    {
      accessorKey: 'isActive',
      header: '状态',
      cell: ({ row }) => (
        <Switch
          checked={row.original.isActive}
          onCheckedChange={(checked) => handleStatusChange(row.original.id, checked)}
        />
      ),
    },
    {
      accessorKey: 'createdAt',
      header: '创建时间',
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
    },
    {
      id: 'actions',
      header: '操作',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
          >
            <Link href={`/admin/content-models/${row.original.id}/edit`}>
              编辑
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (confirm('确定要删除吗？')) {
                handleDelete(row.original.id);
              }
            }}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">内容模型管理</h2>
        <Button asChild>
          <Link href="/admin/content-models/create">
            <Plus className="mr-2 h-4 w-4" />
            新建模型
          </Link>
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={models}
        loading={loading}
      />
    </div>
  );
} 