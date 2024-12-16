'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
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
import { Editor } from '@/components/editor'
import { toast } from "sonner"
import { contentService } from '@/services/content'
import { contentCategoryService } from '@/services/content-category'
import { contentAttributeService } from '@/services/content-attribute'

export default function CreateContentPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [categories, setCategories] = React.useState<any[]>([])
  const [attributes, setAttributes] = React.useState<any[]>([])
  const [formData, setFormData] = React.useState({
    title: '',
    categoryId: '',
    content: '',
    isActive: true,
    sort: 0,
    attributeValues: [] as Array<{ attributeId: number, valueId: number }>
  })

  // 加载分类列表
  const loadCategories = React.useCallback(async () => {
    try {
      const data = await contentCategoryService.getTree()
      setCategories(data)
    } catch (error) {
      toast.error('加载分类列表失败')
    }
  }, [])

  // 加载属性列表
  const loadAttributes = React.useCallback(async () => {
    if (!formData.categoryId) return
    try {
      const data = await contentAttributeService.getByCategoryId(parseInt(formData.categoryId))
      setAttributes(data)
      // 初始化属性值
      setFormData(prev => ({
        ...prev,
        attributeValues: data.map((attr: any) => ({
          attributeId: attr.id,
          valueId: attr.values[0]?.id || 0
        }))
      }))
    } catch (error) {
      toast.error('加载属性列表失败')
    }
  }, [formData.categoryId])

  React.useEffect(() => {
    loadCategories()
  }, [loadCategories])

  React.useEffect(() => {
    loadAttributes()
  }, [loadAttributes])

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      toast.error('请输入标题')
      return
    }
    if (!formData.categoryId) {
      toast.error('请选择分类')
      return
    }
    if (!formData.content.trim()) {
      toast.error('请输入内容')
      return
    }

    try {
      setLoading(true)
      await contentService.create({
        ...formData,
        categoryId: parseInt(formData.categoryId)
      })
      toast.success('创建成功')
      router.push('/admin/contents')
    } catch (error) {
      toast.error('创建失败')
    } finally {
      setLoading(false)
    }
  }

  // 构建分类选项
  const buildCategoryOptions = (items: any[], level = 0): React.ReactNode[] => {
    return items.flatMap((item) => {
      const prefix = '\u00A0'.repeat(level * 4)
      const options = [
        <SelectItem key={item.id} value={item.id.toString()}>
          {prefix + item.name}
        </SelectItem>
      ]
      
      if (item.children?.length) {
        options.push(...buildCategoryOptions(item.children, level + 1))
      }
      
      return options
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">创建内容</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">标题</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="请输入标题"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">分类</Label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                {buildCategoryOptions(categories)}
              </SelectContent>
            </Select>
          </div>

          {attributes.length > 0 && (
            <div className="grid gap-4">
              <Label>属性</Label>
              <div className="grid gap-4">
                {attributes.map((attr: any) => (
                  <div key={attr.id} className="grid gap-2">
                    <Label>{attr.name}</Label>
                    <Select
                      value={formData.attributeValues.find(v => v.attributeId === attr.id)?.valueId.toString()}
                      onValueChange={(value) => {
                        setFormData(prev => ({
                          ...prev,
                          attributeValues: prev.attributeValues.map(v => 
                            v.attributeId === attr.id
                              ? { ...v, valueId: parseInt(value) }
                              : v
                          )
                        }))
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`选择${attr.name}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {attr.values.map((value: any) => (
                          <SelectItem key={value.id} value={value.id.toString()}>
                            {value.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="content">内容</Label>
            <Editor
              value={formData.content}
              onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
            />
            <Label htmlFor="isActive">立即发布</Label>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="sort">排序</Label>
            <Input
              id="sort"
              type="number"
              value={formData.sort}
              onChange={(e) => setFormData(prev => ({ ...prev, sort: parseInt(e.target.value) || 0 }))}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? '创建中...' : '创建'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/contents')}
          >
            取消
          </Button>
        </div>
      </form>
    </div>
  )
} 