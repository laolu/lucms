'use client'

import * as React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { type AdPosition } from '@/services/advertisement'

export const AD_POSITIONS: { label: string; value: AdPosition }[] = [
  { label: '首页横幅', value: 'HOME_BANNER' },
  { label: '侧边栏', value: 'SIDEBAR' },
  { label: '内容顶部', value: 'CONTENT_TOP' },
  { label: '内容底部', value: 'CONTENT_BOTTOM' },
  { label: '弹窗广告', value: 'POPUP' },
]

interface AdFormData {
  title: string
  imageUrl: string
  linkUrl: string
  position: AdPosition | ''
  isActive: boolean
  startDate: string
  endDate: string
  order: number
}

interface AdFormProps {
  initialData?: AdFormData
  onSubmit: (data: AdFormData) => Promise<void>
  submitText?: string
  saving?: boolean
  onCancel: () => void
}

export function AdForm({
  initialData = {
    title: '',
    imageUrl: '',
    linkUrl: '',
    position: '',
    isActive: true,
    startDate: '',
    endDate: '',
    order: 0
  },
  onSubmit,
  submitText = '保存',
  saving = false,
  onCancel
}: AdFormProps) {
  const [formData, setFormData] = React.useState<AdFormData>(initialData)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">标题</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="imageUrl">图片链接</Label>
          <Input
            id="imageUrl"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="linkUrl">跳转链接</Label>
          <Input
            id="linkUrl"
            value={formData.linkUrl}
            onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="position">位置</Label>
          <Select
            value={formData.position}
            onValueChange={(value) => setFormData({ ...formData, position: value as AdPosition })}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择位置" />
            </SelectTrigger>
            <SelectContent>
              {AD_POSITIONS.map(position => (
                <SelectItem key={position.value} value={position.value}>
                  {position.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="order">排序</Label>
          <Input
            id="order"
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="startDate">开始时间</Label>
          <Input
            id="startDate"
            type="datetime-local"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="endDate">结束时间</Label>
          <Input
            id="endDate"
            type="datetime-local"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
          />
          <Label htmlFor="isActive">启用</Label>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={saving}>
          {saving ? '保存中...' : submitText}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          取消
        </Button>
      </div>
    </form>
  )
} 