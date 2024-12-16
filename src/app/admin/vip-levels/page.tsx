'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { useToast } from '@/components/ui/use-toast'
import { vipLevelService, type VipLevel } from '@/services/vip-level.service'
import { usePagination } from '@/hooks/use-pagination'
import { Switch } from '@/components/ui/switch'
import { formatDateTime } from '@/lib/format'

export default function VipLevelsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const pagination = usePagination()

  const columns = [
    {
      accessorKey: 'name',
      header: '等级名称'
    },
    {
      accessorKey: 'price',
      header: '价格'
    },
    {
      accessorKey: 'duration',
      header: '时长(天)'
    },
    {
      accessorKey: 'benefits',
      header: '权益',
      cell: ({ row }: { row: { original: VipLevel } }) => (
        <div>{row.original.benefits.join(', ')}</div>
      )
    },
    {
      accessorKey: 'isActive',
      header: '状态',
      cell: ({ row }: { row: { original: VipLevel } }) => (
        <Switch
          checked={row.original.isActive}
          onCheckedChange={async (checked) => {
            try {
              await vipLevelService.update(row.original.id, { isActive: checked })
              toast({
                description: '更新成功'
              })
              pagination.refresh()
            } catch (error) {
              console.error('更新失败:', error)
              toast({
                variant: 'destructive',
                description: '更新失败'
              })
            }
          }}
        />
      )
    },
    {
      accessorKey: 'sort',
      header: '排序'
    },
    {
      accessorKey: 'createdAt',
      header: '创建时间',
      cell: ({ row }: { row: { original: VipLevel } }) => (
        <div>{formatDateTime(row.original.createdAt)}</div>
      )
    },
    {
      id: 'actions',
      cell: ({ row }: { row: { original: VipLevel } }) => {
        const handleDelete = async () => {
          if (!confirm('确定要删除吗？')) return
          try {
            await vipLevelService.delete(row.original.id)
            toast({
              description: '删除成功'
            })
            pagination.refresh()
          } catch (error) {
            console.error('删除失败:', error)
            toast({
              variant: 'destructive',
              description: '删除失败'
            })
          }
        }

        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/admin/vip-levels/${row.original.id}/edit`)}
            >
              编辑
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
            >
              删除
            </Button>
          </div>
        )
      }
    }
  ]

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">VIP等级管理</h1>
        <Button onClick={() => router.push('/admin/vip-levels/create')}>
          新建
        </Button>
      </div>

      <DataTable
        columns={columns}
        queryKey={['vip-levels']}
        queryFn={({ pageIndex, pageSize }) =>
          vipLevelService.getAll({
            page: pageIndex + 1,
            pageSize
          })
        }
        onPaginationChange={pagination.setPagination}
        state={{
          pagination: {
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize
          }
        }}
      />
    </div>
  )
} 