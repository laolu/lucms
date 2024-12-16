'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { advertisementService } from '@/services/advertisement'
import { AdForm } from '../_components/ad-form'

export default function CreateAdvertisementPage() {
  const router = useRouter()
  const [saving, setSaving] = React.useState(false)

  const handleSubmit = async (formData: any) => {
    try {
      setSaving(true)
      await advertisementService.create(formData)
      toast.success('广告位已创建')
      router.push('/admin/advertisements')
    } catch (error) {
      toast.error('创建广告位失败')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">创建广告位</h1>
        <Button variant="outline" onClick={() => router.push('/admin/advertisements')}>
          返回列表
        </Button>
      </div>

      <AdForm
        onSubmit={handleSubmit}
        submitText="创建"
        saving={saving}
        onCancel={() => router.push('/admin/advertisements')}
      />
    </div>
  )
} 