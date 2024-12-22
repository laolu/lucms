'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AdForm } from '../../_components/ad-form'
import { advertisementService, type Advertisement, type AdUpdateInput, type AdCreateInput } from '@/services/advertisement'
import { toast } from 'sonner'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

interface EditAdvertisementPageProps {
  params: {
    id: string
  }
}

export default function EditAdvertisementPage({ params }: EditAdvertisementPageProps) {
  const router = useRouter()
  const [ad, setAd] = useState<Advertisement | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const data = await advertisementService.getById(parseInt(params.id))
        setAd(data)
        setError(null)
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || '获取广告位信息失败'
        setError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchAd()
  }, [params.id])

  const handleSubmit = async (data: AdCreateInput | AdUpdateInput) => {
    try {
      const updateData: AdUpdateInput = {
        ...data,
        id: parseInt(params.id)
      }
      await advertisementService.update(updateData)
      toast.success('更新成功')
      router.push('/admin/advertisements')
      router.refresh()
    } catch (error: any) {
      toast.error(error.response?.data?.message || '更新失败')
    }
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">加载失败</h2>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Button onClick={() => router.back()}>返回</Button>
        </div>
      </div>
    )
  }

  if (!ad) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">广告位不存在</h2>
          <p className="text-muted-foreground mb-8">找不到该广告位信息</p>
          <Button onClick={() => router.back()}>返回</Button>
        </div>
      </div>
    )
  }

  // 转换数据格式以匹配表单需求
  const formData = {
    ...ad,
    startDate: ad.startDate ? new Date(ad.startDate).toISOString().slice(0, 16) : '',
    endDate: ad.endDate ? new Date(ad.endDate).toISOString().slice(0, 16) : '',
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="编辑广告位"
        description="编辑广告位信息，支持修改图片、链接和其他设置。"
      />
      <AdForm
        initialData={formData}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        submitText="更新"
      />
    </div>
  )
} 