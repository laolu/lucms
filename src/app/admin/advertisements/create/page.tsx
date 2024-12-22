'use client'

import { useRouter } from 'next/navigation'
import { AdForm } from '../_components/ad-form'
import { advertisementService, type AdCreateInput } from '@/services/advertisement'
import { toast } from 'sonner'
import { PageHeader } from '@/components/page-header'

export default function CreateAdvertisementPage() {
  const router = useRouter()

  const handleSubmit = async (data: AdCreateInput) => {
    try {
      await advertisementService.create(data)
      toast.success('创建成功')
      router.push('/admin/advertisements')
      router.refresh()
    } catch (error: any) {
      toast.error(error.response?.data?.message || '创建失败')
    }
  }

  return (
    <div className="container space-y-8 py-8">
      <PageHeader
        title="创建广告位"
        description="创建一个新的广告位，支持单图、多图和轮播图广告。"
      />
      <div className="mx-auto max-w-2xl">
        <AdForm
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  )
} 