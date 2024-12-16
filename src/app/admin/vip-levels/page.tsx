'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { vipLevelService, type VipLevel } from '@/services/vip-level'
import { Switch } from '@/components/ui/switch'
import { formatDateTime } from '@/lib/format'
import { AdminLayout } from '@/components/ui/admin-layout'

export default function VipLevelsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [vipLevels, setVipLevels] = React.useState<VipLevel[]>([])
  const [loading, setLoading] = React.useState(false)

  const fetchVipLevels = React.useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await vipLevelService.getAll()
      setVipLevels(data?.items || [])
    } catch (error) {
      console.error('获取VIP等级列表失败:', error)
      toast({
        variant: 'destructive',
        description: '获取VIP等级列表失败'
      })
      setVipLevels([])
    } finally {
      setLoading(false)
    }
  }, [toast])

  React.useEffect(() => {
    fetchVipLevels()
  }, [fetchVipLevels])

  return (
    <AdminLayout title="VIP等级管理">
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button onClick={() => router.push('/admin/vip-levels/create')}>
            创建VIP等级
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>等级名称</TableHead>
              <TableHead>等级图标</TableHead>
              <TableHead>价格</TableHead>
              <TableHead>有效期(天)</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  加载中...
                </TableCell>
              </TableRow>
            ) : vipLevels.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              vipLevels.map((vipLevel) => (
                <TableRow key={vipLevel.id}>
                  <TableCell>{vipLevel.name}</TableCell>
                  <TableCell>
                    {vipLevel.icon && (
                      <img
                        src={vipLevel.icon}
                        alt={vipLevel.name}
                        className="w-8 h-8"
                      />
                    )}
                  </TableCell>
                  <TableCell>{vipLevel.price}</TableCell>
                  <TableCell>{vipLevel.duration}</TableCell>
                  <TableCell>
                    <Switch
                      checked={vipLevel.isActive}
                      onCheckedChange={async (checked) => {
                        try {
                          await vipLevelService.update(vipLevel.id, { isActive: checked })
                          toast({
                            description: '更新成功'
                          })
                          fetchVipLevels()
                        } catch (error) {
                          console.error('更新失败:', error)
                          toast({
                            variant: 'destructive',
                            description: '更新失败'
                          })
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{formatDateTime(vipLevel.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/admin/vip-levels/${vipLevel.id}/edit`)}
                      >
                        编辑
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={async () => {
                          if (!confirm('确定要删除吗？')) return
                          try {
                            await vipLevelService.delete(vipLevel.id)
                            toast({
                              description: '删除成功'
                            })
                            fetchVipLevels()
                          } catch (error) {
                            console.error('删除失败:', error)
                            toast({
                              variant: 'destructive',
                              description: '删除失败'
                            })
                          }
                        }}
                      >
                        删除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  )
} 