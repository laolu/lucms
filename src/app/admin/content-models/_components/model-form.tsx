'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { contentModelService } from '@/services/content-model';
import type { ContentModel, ContentAttribute, UpdateContentModelDto } from '@/services/content-model';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(1, '请输入名称'),
  description: z.string().optional(),
  sort: z.number().min(0).default(0),
  isActive: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

interface ModelFormProps {
  model?: ContentModel;
}

export function ModelForm({ model }: ModelFormProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [attributes, setAttributes] = React.useState<ContentAttribute[]>([]);
  const [selectedAttributeIds, setSelectedAttributeIds] = React.useState<number[]>([]);
  const [selectedValues, setSelectedValues] = React.useState<Map<number, number[]>>(new Map());
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: model?.name || '',
      description: model?.description || '',
      sort: model?.sort || 0,
      isActive: model?.isActive ?? true,
    },
  });

  // 加载数据
  const loadData = React.useCallback(async () => {
    if (!model) return;

    try {
      // 1. 获取所有属性和属性值（从 findOne 获取）
      const modelData = await contentModelService.getById(model.id);
      console.log('modelData:', modelData);
      
      // 2. 获取属性的选中状态
      const attributesData = await contentModelService.getModelAttributes(model.id);
      console.log('attributesData:', attributesData);
      
      // 3. 获取属性值的选中状态
      const attributeValuesData = await contentModelService.getModelAttributeValues(model.id);
      console.log('attributeValuesData:', attributeValuesData);
      
      // 4. 合并数据
      console.log('开始合并数据');
      console.log('modelData.attributes:', modelData?.attributes);
      console.log('attributesData:', attributesData);
      console.log('attributeValuesData:', attributeValuesData);

      if (!modelData?.attributes) {
        console.error('modelData.attributes 不存在');
        return;
      }

      const mergedAttributes = modelData.attributes.map(attr => {
        console.log('处理属性:', attr);
        const attributeData = attributesData.find(a => a.id === attr.attributeId);
        const merged = {
          id: attr.attributeId,
          attributeId: attr.attributeId,
          attributeName: attr.attributeName,
          type: attr.attributeType as 'single' | 'multiple',
          isSelected: attributeData?.isSelected || false,
          values: attr.values.map(value => {
            const valueData = attributeValuesData.find(v => v.id === value.id);
            return {
              id: value.id,
              value: value.value,
              isSelected: valueData?.isSelected || false
            };
          })
        };
        console.log('合并后的属性:', merged);
        return merged;
      });
      
      console.log('最终合并的属性:', mergedAttributes);
      setAttributes(mergedAttributes);
      
      // 设置已选择的属性和属性值
      const selectedAttrIds = attributesData
        .filter(attr => attr.isSelected)
        .map(attr => attr.id);
      setSelectedAttributeIds(selectedAttrIds);
      
      const valuesMap = new Map<number, number[]>();
      attributeValuesData
        .filter(v => v.isSelected)
        .forEach(v => {
          const attr = modelData.attributes.find(a => 
            a.values.some(av => av.id === v.id)
          );
          if (attr) {
            const current = valuesMap.get(attr.attributeId) || [];
            valuesMap.set(attr.attributeId, [...current, v.id]);
          }
        });
      setSelectedValues(valuesMap);
    } catch (error) {
      console.error('加载数据失败:', error);
      toast.error('加载数据失败');
    }
  }, [model]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleBack = () => {
    if (loading) return;
    router.back();
  };

  const onSubmit = async (data: FormData) => {
    try {
      console.log('onSubmit 函数被调用');
      console.log('表单数据:', data);
      
      setFormData(data);
      setShowConfirmDialog(true);
      console.log('状态已更新:', {
        formData: data,
        showConfirmDialog: true
      });
    } catch (error) {
      console.error('onSubmit 处理出错:', error);
    }
  };

  const handleConfirm = async () => {
    console.log('确认按钮点击，当前状态:', {
      showConfirmDialog,
      formData,
      loading,
      selectedAttributeIds,
      selectedValues
    });
    if (!model || !formData) return;

    try {
      setLoading(true);
      
      // 只处理选中的属性的属性值
      const attributeValues = Array.from(selectedValues.entries())
        .filter(([attributeId]) => selectedAttributeIds.includes(attributeId))
        .flatMap(([attributeId, valueIds]) => 
          valueIds.map(valueId => ({
            attributeId: Number(attributeId),
            attributeValueId: Number(valueId)
          }))
        );

      console.log('处理后的属性值:', attributeValues);

      // 构建完整的更新数据
      const updateData = {
        name: formData.name,
        description: formData.description || '',
        sort: Number(formData.sort) || 0,
        isActive: Boolean(formData.isActive),
        attributeIds: selectedAttributeIds.map(Number),
        attributeValues: attributeValues
      };

      console.log('提交更新数据:', updateData);
      await contentModelService.update(model.id, updateData);
      
      toast.success('更新成功');
      setShowConfirmDialog(false);
      setFormData(null);
      setLoading(false);
      
      router.replace('/admin/content-models');
      router.refresh();
    } catch (error) {
      console.error('更新失败:', error);
      toast.error('更新失败');
      setLoading(false);
      setShowConfirmDialog(false);
    }
  };

  const handleCancel = () => {
    console.log('取消按钮点击，当前确认框状态:', showConfirmDialog);
    setShowConfirmDialog(false);
    setFormData(null);
    console.log('重置后的状态:', { showConfirmDialog: false, formData: null });
  };

  const toggleAttribute = (attributeId: number, checked: boolean) => {
    console.log('切换属性状态:', { attributeId, checked });
    
    // 更新选中的属性ID列表
    if (checked) {
      setSelectedAttributeIds(prev => [...prev, attributeId]);
      // 对于单选属性，默认选中第一个值
      const attribute = attributes.find(a => a.attributeId === attributeId);
      if (attribute && attribute.values.length > 0) {
        if (attribute.type === 'single') {
          setSelectedValues(prev => {
            const newMap = new Map(prev);
            newMap.set(attributeId, [attribute.values[0].id]);
            return newMap;
          });
        }
      }
    } else {
      // 取消选择时，清除所有相关数据
      setSelectedAttributeIds(prev => prev.filter(id => id !== attributeId));
      setSelectedValues(prev => {
        const newMap = new Map(prev);
        newMap.delete(attributeId);
        return newMap;
      });
    }

    // 更新属性的选中状态
    setAttributes(prev => prev.map(attr => {
      if (attr.attributeId === attributeId) {
        return {
          ...attr,
          isSelected: checked,
          // 如果取消选择，同时清除所有值的选中状态
          values: attr.values.map(v => ({
            ...v,
            isSelected: checked ? v.isSelected : false
          }))
        };
      }
      return attr;
    }));
    
    console.log('更新后的状态:', {
      selectedAttributeIds: selectedAttributeIds.filter(id => id !== attributeId),
      selectedValues: new Map([...selectedValues].filter(([key]) => key !== attributeId))
    });
  };

  const toggleAttributeValue = (attributeId: number, valueId: number, checked: boolean) => {
    const attribute = attributes.find(a => a.attributeId === attributeId);
    if (!attribute) return;

    setSelectedValues(prev => {
      const newMap = new Map(prev);
      const currentValues = prev.get(attributeId) || [];

      if (checked) {
        if (attribute.type === 'single') {
          // 单选：替换现有值
          newMap.set(attributeId, [valueId]);
        } else {
          // 多选：添加新值
          newMap.set(attributeId, [...currentValues, valueId]);
        }
      } else {
        // 取消选中：移除值
        const newValues = currentValues.filter(id => id !== valueId);
        if (newValues.length === 0) {
          newMap.delete(attributeId);
          // 如果没有选中的值，也取消选择属性
          setSelectedAttributeIds(prev => prev.filter(id => id !== attributeId));
        } else {
          newMap.set(attributeId, newValues);
        }
      }

      return newMap;
    });

    // 更新属性的选中状态
    setAttributes(prev => prev.map(attr => {
      if (attr.attributeId === attributeId) {
        return {
          ...attr,
          values: attr.values.map(value => ({
            ...value,
            isSelected: value.id === valueId ? checked : value.isSelected
          }))
        };
      }
      return attr;
    }));
  };

  return (
    <>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          console.log('表单提交事件触发');
          const formData = form.getValues();
          console.log('表单数据:', formData);
          onSubmit(formData);
        }} 
        className="space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
            <CardDescription>设置内容模型的基本信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">名称</Label>
              <Input
                id="name"
                {...form.register('name')}
                placeholder="请输入模型名称"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">描述</Label>
              <Textarea
                id="description"
                {...form.register('description')}
                placeholder="请输入模型描述"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sort">排序</Label>
              <Input
                id="sort"
                type="number"
                {...form.register('sort', { valueAsNumber: true })}
              />
            </div>

            <div className="flex gap-2 items-center">
              <Switch
                id="isActive"
                checked={form.watch('isActive')}
                onCheckedChange={(checked) => form.setValue('isActive', checked)}
              />
              <Label htmlFor="isActive">启用</Label>
            </div>

            {model && (
              <div className="grid gap-4 pt-4 border-t">
                <div className="grid gap-2">
                  <Label className="text-muted-foreground">创建时间</Label>
                  <div className="text-sm">
                    {new Date(model.createdAt).toLocaleString('zh-CN')}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label className="text-muted-foreground">更新时间</Label>
                  <div className="text-sm">
                    {new Date(model.updatedAt).toLocaleString('zh-CN')}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>属性设置</CardTitle>
            <CardDescription>选择并配置模型包含的属性</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attributes.map((attribute) => {
                console.log('渲染属性:', attribute);
                const isAttributeSelected = attribute.isSelected;
                const selectedValueIds = selectedValues.get(attribute.attributeId) || [];
                
                return (
                  <div 
                    key={attribute.attributeId}
                    className={cn(
                      "rounded-lg border p-4 transition-colors",
                      isAttributeSelected && "bg-accent/50"
                    )}
                  >
                    <div className="flex gap-2 items-center">
                      <Switch
                        checked={isAttributeSelected}
                        onCheckedChange={(checked) => toggleAttribute(attribute.attributeId, checked)}
                      />
                      <span className="font-medium">
                        {attribute.attributeName || '未知属性'}
                      </span>
                      <Badge variant="secondary">
                        {attribute.type === 'single' ? '单选' : '多选'}
                      </Badge>
                    </div>

                    {isAttributeSelected && (
                      <div className="mt-4 ml-8">
                        <div className="mb-2 text-sm text-muted-foreground">
                          可选值：{attribute.type === 'single' ? '（单选）' : '（可多选）'}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {attribute.values.map((value) => {
                            const isSelected = value.isSelected;
                            
                            return (
                              <Badge
                                key={value.id}
                                variant={isSelected ? "default" : "outline"}
                                className="cursor-pointer hover:opacity-80"
                                onClick={() => toggleAttributeValue(attribute.attributeId, value.id, !isSelected)}
                              >
                                {value.value}
                                {isSelected && <X className="ml-1 w-3 h-3" />}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={loading}
          >
            取消
          </Button>
          <Button 
            type="submit" 
            disabled={loading}
          >
            {loading ? '提交中...' : (model ? '更新' : '创建')}
          </Button>
        </div>
      </form>

      <AlertDialog 
        open={showConfirmDialog} 
        onOpenChange={(open) => {
          console.log('AlertDialog onOpenChange:', { open, showConfirmDialog });
          if (!open) {
            handleCancel();
          }
        }}
      >
        <AlertDialogContent className="sm:max-w-[500px]">
          <AlertDialogHeader>
            <AlertDialogTitle>确认{model ? '更新' : '创建'}</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                您确定要{model ? '更新' : '创建'}这个内容模型吗？
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => {
                console.log('取消按钮点击');
                handleCancel();
              }} 
              disabled={loading}
            >
              取消
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                console.log('确认按钮点击');
                handleConfirm();
              }} 
              disabled={loading}
              className={cn(
                "ml-3",
                loading && "opacity-50 cursor-not-allowed"
              )}
            >
              {loading ? '处理中...' : '确认'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
} 