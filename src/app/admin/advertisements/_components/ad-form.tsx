'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { type AdPosition, type AdContent, type AdCreateInput, type AdUpdateInput } from '@/services/advertisement'
import { FileUpload } from "@/components/ui/file-upload"
import { toast } from "sonner"
import client from '@/lib/api-client'
import { API_ENDPOINTS } from '@/lib/api-config'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { Icons } from '@/components/icons'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { zhCN } from 'date-fns/locale'

export const AD_POSITIONS: { label: string; value: AdPosition }[] = [
  { label: '首页横幅', value: 'HOME_BANNER' },
  { label: '侧边栏', value: 'SIDEBAR' },
  { label: '内容顶部', value: 'CONTENT_TOP' },
  { label: '内容底部', value: 'CONTENT_BOTTOM' },
  { label: '弹窗广告', value: 'POPUP' },
]

export const AD_TYPES = [
  { label: '单图广告', value: 'single' },
  { label: '多图广告', value: 'multiple' },
  { label: '轮播广告', value: 'carousel' },
] as const

export type AdType = typeof AD_TYPES[number]['value']

interface AdFormData extends Omit<AdCreateInput, 'position'> {
  position: AdPosition | ''
}

interface AdFormProps {
  initialData?: AdFormData
  onSubmit: (data: AdCreateInput | AdUpdateInput) => Promise<void>
  submitText?: string
  saving?: boolean
  onCancel: () => void
}

export function AdForm({
  initialData = {
    title: '',
    type: 'single',
    contents: [],
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
  const router = useRouter()
  const [formData, setFormData] = React.useState<AdFormData>(initialData)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.contents.length === 0) {
      toast.error('请至少上传一张图片')
      return
    }
    if (formData.type === 'single' && formData.contents.length > 1) {
      toast.error('单图广告只能上传一张图片')
      return
    }
    if (!formData.position) {
      toast.error('请选择广告位置')
      return
    }
    await onSubmit(formData as AdCreateInput)
  }

  const handleImageUpload = async (file: File) => {
    try {
      const token = localStorage.getItem('access_token')
      if (!token) {
        toast.error('请先登录')
        router.push('/auth/login?redirectUrl=' + encodeURIComponent(window.location.pathname))
        return
      }

      const formData = new FormData()
      formData.append('file', file)
      
      const response = await client.post(API_ENDPOINTS.UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      })
      
      if (!response.data?.data?.url) {
        throw new Error('上传失败')
      }
      
      setFormData(prev => ({
        ...prev,
        contents: [...prev.contents, { 
          imageUrl: response.data.data.url,
          order: prev.contents.length
        }]
      }))
      toast.success('图片上传成功')
    } catch (error: any) {
      console.error('上传失败:', error)
      if (error.response?.status === 401) {
        toast.error('登录已过期，请重新登录')
        router.push('/auth/login?redirectUrl=' + encodeURIComponent(window.location.pathname))
      } else {
        toast.error(error.response?.data?.message || '图片上传失败')
      }
    }
  }

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      contents: prev.contents.filter((_, i) => i !== index)
    }))
  }

  const handleContentChange = (index: number, field: keyof AdContent, value: string) => {
    setFormData(prev => ({
      ...prev,
      contents: prev.contents.map((content, i) => 
        i === index ? { ...content, [field]: value } : content
      )
    }))
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(formData.contents)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // 更新排序
    const reorderedItems = items.map((item, index) => ({
      ...item,
      order: index
    }))

    setFormData(prev => ({ ...prev, contents: reorderedItems }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 基本信息 */}
      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
          <CardDescription>设置广告位的基本信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">
                标题
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="请输入广告标题"
              />
            </div>

            <div className="grid gap-2">
              <Label>
                广告类型
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <RadioGroup
                value={formData.type}
                onValueChange={(value: AdType) => setFormData({ ...formData, type: value })}
                className="grid grid-cols-3 gap-4"
              >
                {AD_TYPES.map(type => (
                  <div key={type.value}>
                    <RadioGroupItem
                      value={type.value}
                      id={`type-${type.value}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`type-${type.value}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span className="text-sm font-medium">{type.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="position">
                位置
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Select
                value={formData.position}
                onValueChange={(value) => setFormData({ ...formData, position: value as AdPosition })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择广告位置" />
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
                min={0}
                placeholder="数字越小越靠前"
              />
              <p className="text-sm text-muted-foreground">
                用于控制同一位置多个广告的显示顺序
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 广告内容 */}
      <Card>
        <CardHeader>
          <CardTitle>广告内容</CardTitle>
          <CardDescription>上传和管理广告图片及相关信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>
                上传图片
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <FileUpload
                value={formData.contents.map(content => content.imageUrl)}
                onChange={(files) => files[0] && handleImageUpload(files[0])}
                onRemove={handleImageRemove}
                accept="image/*"
                maxSize={5 * 1024 * 1024}
                maxFiles={formData.type === 'single' ? 1 : undefined}
              />
              <p className="text-sm text-muted-foreground">
                {formData.type === 'single' ? '只能上传1张图片' : '可以上传多张图片，拖拽调整顺序'}
              </p>
            </div>
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="contents">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {formData.contents.map((content, index) => (
                      <Draggable
                        key={content.imageUrl}
                        draggableId={content.imageUrl}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="relative"
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="absolute top-2 right-2 p-1 cursor-move hover:bg-accent rounded"
                            >
                              <Icons.move className="h-4 w-4" />
                            </div>
                            <CardContent className="p-4 space-y-4">
                              <div className="flex gap-4">
                                <img
                                  src={content.imageUrl}
                                  alt={content.title || '广告图片'}
                                  className="w-32 h-20 object-cover rounded"
                                />
                                <div className="flex-1 space-y-2">
                                  <Input
                                    placeholder="图片标题"
                                    value={content.title || ''}
                                    onChange={(e) => handleContentChange(index, 'title', e.target.value)}
                                  />
                                  <Textarea
                                    placeholder="图片描述"
                                    value={content.description || ''}
                                    onChange={(e) => handleContentChange(index, 'description', e.target.value)}
                                    rows={2}
                                  />
                                  <Input
                                    placeholder="跳转链接"
                                    value={content.link || ''}
                                    onChange={(e) => handleContentChange(index, 'link', e.target.value)}
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleImageRemove(index)}
                                >
                                  <Icons.close className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </CardContent>
      </Card>

      {/* 展示设置 */}
      <Card>
        <CardHeader>
          <CardTitle>展示设置</CardTitle>
          <CardDescription>设置广告的展示时间和状态</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>有效期</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">开始时间</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.startDate && "text-muted-foreground"
                        )}
                      >
                        {formData.startDate ? (
                          format(new Date(formData.startDate), "PPP HH:mm", { locale: zhCN })
                        ) : (
                          <span>选择开始时间</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.startDate ? new Date(formData.startDate) : undefined}
                        onSelect={(date) => setFormData({ ...formData, startDate: date?.toISOString() || '' })}
                        initialFocus
                        locale={zhCN}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">结束时间</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.endDate && "text-muted-foreground"
                        )}
                      >
                        {formData.endDate ? (
                          format(new Date(formData.endDate), "PPP HH:mm", { locale: zhCN })
                        ) : (
                          <span>选择结束时间</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.endDate ? new Date(formData.endDate) : undefined}
                        onSelect={(date) => setFormData({ ...formData, endDate: date?.toISOString() || '' })}
                        initialFocus
                        locale={zhCN}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                不设置则表示永久有效
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">启用广告</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button type="submit" disabled={saving}>
          {saving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {submitText}
        </Button>
      </div>
    </form>
  )
} 