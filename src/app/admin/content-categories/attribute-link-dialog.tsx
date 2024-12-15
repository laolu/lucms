import * as React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { contentCategoryService, type ContentCategory } from '@/services/content-category'
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface AttributeValue {
  id: number
  value: string
  sort: number
  isActive: boolean
}

interface Attribute {
  id: number
  name: string
  description?: string
  type: string
  values: AttributeValue[]
}

interface AttributeLinkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: ContentCategory | null
}

export function AttributeLinkDialog({
  open,
  onOpenChange,
  category
}: AttributeLinkDialogProps) {
  const [attributes, setAttributes] = React.useState<Attribute[]>([])
  const [selectedAttributes, setSelectedAttributes] = React.useState<number[]>([])
  const [selectedValues, setSelectedValues] = React.useState<Record<number, number[]>>({})
  const [expandedAttributes, setExpandedAttributes] = React.useState<number[]>([])
  const [loading, setLoading] = React.useState(false)

  // 加载属性列表和已关联的属性
  React.useEffect(() => {
    if (open && category) {
      loadAttributes()
    } else {
      // 重置状态
      setAttributes([])
      setSelectedAttributes([])
      setSelectedValues({})
      setExpandedAttributes([])
    }
  }, [open, category])

  const loadAttributes = async () => {
    try {
      setLoading(true)
      // 获取所有属性
      const allAttributes = await contentCategoryService.getAllAttributes()
      setAttributes(allAttributes)

      // 获取当前分类已关联的属性和值
      if (category) {
        const linkedData = await contentCategoryService.getCategoryAttributes(category.id)
        const linkedAttributes = linkedData.map((item: any) => item.attributeId)
        setSelectedAttributes(linkedAttributes)
        
        // 设置已选择的属性值
        const valueMap: Record<number, number[]> = {}
        linkedData.forEach((item: any) => {
          valueMap[item.attributeId] = item.values.map((v: any) => v.id)
        })
        setSelectedValues(valueMap)
        
        // 默认展开已选择的属性
        setExpandedAttributes(linkedAttributes)
      }
    } catch (error) {
      toast.error('加载属性失败')
    } finally {
      setLoading(false)
    }
  }

  const toggleExpand = (attributeId: number) => {
    setExpandedAttributes(prev =>
      prev.includes(attributeId)
        ? prev.filter(id => id !== attributeId)
        : [...prev, attributeId]
    )
  }

  const handleToggleAttribute = (attribute: Attribute) => {
    setSelectedAttributes(prev => {
      const newSelected = prev.includes(attribute.id)
        ? prev.filter(id => id !== attribute.id)
        : [...prev, attribute.id]
      
      // 如果取消选择属性，清除相关的值选择
      if (!newSelected.includes(attribute.id)) {
        setSelectedValues(prev => {
          const newValues = { ...prev }
          delete newValues[attribute.id]
          return newValues
        })
      } else {
        // 如果选择属性，默认选中所有属性值
        setSelectedValues(prev => ({
          ...prev,
          [attribute.id]: attribute.values.map(v => v.id)
        }))
      }
      
      return newSelected
    })
  }

  const handleToggleValue = (attributeId: number, valueId: number) => {
    setSelectedValues(prev => {
      const currentValues = prev[attributeId] || []
      const newValues = currentValues.includes(valueId)
        ? currentValues.filter(id => id !== valueId)
        : [...currentValues, valueId]
      
      return {
        ...prev,
        [attributeId]: newValues
      }
    })
  }

  const handleSave = async () => {
    if (!category) return

    try {
      setLoading(true)
      // 只发送选中的属性和其对应的值
      await contentCategoryService.updateCategoryAttributes(category.id, {
        attributes: selectedAttributes
          .filter(attributeId => {
            // 确保属性有选中的值
            const values = selectedValues[attributeId] || []
            return values.length > 0
          })
          .map(attributeId => ({
            attributeId,
            valueIds: selectedValues[attributeId] || []
          }))
      })
      toast.success('属性关联已更新')
      onOpenChange(false)
    } catch (error) {
      toast.error('更新属性关联失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>关联属性 - {category?.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <ScrollArea className="h-[400px] pr-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                加载中...
              </div>
            ) : attributes.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                暂无可用属性
              </div>
            ) : (
              <div className="space-y-4">
                {attributes.map((attribute) => (
                  <div key={attribute.id} className="space-y-2">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={`attribute-${attribute.id}`}
                        checked={selectedAttributes.includes(attribute.id)}
                        onCheckedChange={() => handleToggleAttribute(attribute)}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Label
                            htmlFor={`attribute-${attribute.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {attribute.name}
                          </Label>
                          {attribute.values.length > 0 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5"
                              onClick={() => toggleExpand(attribute.id)}
                            >
                              {expandedAttributes.includes(attribute.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                          <span className="text-xs text-muted-foreground">
                            ({attribute.type === 'SINGLE' ? '单选' : '多选'})
                          </span>
                        </div>
                        {attribute.description && (
                          <p className="text-sm text-muted-foreground">
                            {attribute.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* 属性值列表 */}
                    {expandedAttributes.includes(attribute.id) && attribute.values.length > 0 && (
                      <div className="ml-10 pl-4 border-l space-y-2">
                        {attribute.values.map((value) => (
                          <div key={value.id} className="flex items-center space-x-3">
                            <Checkbox
                              id={`value-${value.id}`}
                              checked={selectedValues[attribute.id]?.includes(value.id) || false}
                              onCheckedChange={() => handleToggleValue(attribute.id, value.id)}
                              disabled={!selectedAttributes.includes(attribute.id)}
                            />
                            <Label
                              htmlFor={`value-${value.id}`}
                              className={cn(
                                "text-sm",
                                !selectedAttributes.includes(attribute.id) && "text-muted-foreground"
                              )}
                            >
                              {value.value}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
          <Separator />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              取消
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading}
            >
              保存
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 