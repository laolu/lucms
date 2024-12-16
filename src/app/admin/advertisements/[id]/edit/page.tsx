'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { advertisementService } from '@/services/advertisement'
import { AdForm } from '../../_components/ad-form'

export default function EditAdvertisementPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [initialData, setInitialData] = React.useState<any>(null)

  // 加载广告位数据
  React.useEffect(() => {
    const loadAd = async () => {
      try {
        setLoading(true)
        const data = await advertisementService.getById(parseInt(params.id))
        setInitialData(data)
      } catch (error) {
        toast.error('加载广告位数据失败')
        router.push('/admin/advertisements')
      } finally {
        setLoading(false)
      }
    }

    loadAd()
  }, [params.id, router])

  const handleSubmit = async (formData: any) => {
    try {
      setSaving(true)
      await advertisementService.update({
        id: parseInt(params.id),
        ...formData
      })
      toast.success('广告位已更新')
      router.push('/admin/advertisements')
    } catch (error) {
      toast.error('更新广告位失败')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-6">加载中...</div>
  }

  if (!initialData) {
    return <div className="p-6">广告位不存在</div>
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">编辑广告位</h1>
        <Button variant="outline" onClick={() => router.push('/admin/advertisements')}>
          返回列表
        </Button>
      </div>

      <AdForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitText="保存"
        saving={saving}
        onCancel={() => router.push('/admin/advertisements')}
      />
    </div>
  )
} 