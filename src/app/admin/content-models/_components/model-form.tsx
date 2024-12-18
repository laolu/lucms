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
import { contentAttributeService } from '@/services/content-attribute';
import type { ContentModel, ContentAttribute } from '@/services/content-model';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(1, '请输入名称'),
  description: z.string().optional(),
  sort: z.number().min(0).default(0),
  isActive: z.boolean().default(true),
  attributeIds: z.array(z.number()),
  attributeValues: z.array(z.object({
    attributeId: z.number(),
    attributeValueId: z.number(),
  })),
});

type FormData = z.infer<typeof formSchema>;

interface ModelFormProps {
  model?: ContentModel;
}

export function ModelForm({ model }: ModelFormProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [attributes, setAttributes] = React.useState<ContentAttribute[]>([]);
  const [selectedAttributeIds, setSelectedAttributeIds] = React.useState<number[]>([]);
  const [selectedValues, setSelectedValues] = React.useState<Map<number, number[]>>(new Map());

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: model?.name || '',
      description: model?.description || '',
      sort: model?.sort || 0,
      isActive: model?.isActive ?? true,
      attributeIds: [],
      attributeValues: [],
    },
  });

  // 加载所有属性
  const loadAttributes = React.useCallback(async () => {
    try {
      const data = await contentAttributeService.getAll();
      console.log('加载的属性数据:', data);
      setAttributes(data);

      if (model) {
        console.log('编辑模式，现有模型:', model);
        // 设置已选择的属性
        const attrIds = model.attributes.map(attr => attr.attributeId);
        setSelectedAttributeIds(attrIds);

        // 设置已选择的属性值
        const valuesMap = new Map<number, number[]>();
        model.attributes.forEach(attr => {
          // 获取已选中的值
          const checkedValues = attr.values
            .filter(v => v.isChecked)
            .map(v => v.id);
          if (checkedValues.length > 0) {
            valuesMap.set(attr.attributeId, checkedValues);
          }
        });
        setSelectedValues(valuesMap);

        // 更新表单数据
        form.setValue('attributeIds', attrIds);
        form.setValue('attributeValues', model.attributes.flatMap(attr => 
          attr.values
            .filter(v => v.isChecked)
            .map(v => ({
              attributeId: attr.attributeId,
              attributeValueId: v.id,
            }))
        ));

        console.log('已选择的属性:', attrIds);
        console.log('已选择的属性值:', Array.from(valuesMap.entries()));
      }
    } catch (error) {
      console.error('加载属性列表失败:', error);
      toast.error('加载属性列表失败');
    }
  }, [form, model]);

  React.useEffect(() => {
    loadAttributes();
  }, [loadAttributes]);

  // 添加一个新的 useEffect 来监听 model 的变化
  React.useEffect(() => {
    if (model) {
      // 设置已选择的属性
      const attrIds = model.attributes.map(attr => attr.attributeId);
      setSelectedAttributeIds(attrIds);

      // 设置已选择的属性值
      const valuesMap = new Map<number, number[]>();
      model.attributes.forEach(attr => {
        const checkedValues = attr.values
          .filter(v => v.isChecked)
          .map(v => v.id);
        valuesMap.set(attr.attributeId, checkedValues);
      });
      setSelectedValues(valuesMap);

      // 更新表单数据
      form.setValue('attributeIds', attrIds);
      const attributeValues = model.attributes.flatMap(attr => 
        attr.values
          .filter(v => v.isChecked)
          .map(v => ({
            attributeId: attr.attributeId,
            attributeValueId: v.id,
          }))
      );
      form.setValue('attributeValues', attributeValues);
    }
  }, [model, form]);

  const handleSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      // 准备提交数据
      const submitData = {
        ...(model ? { id: model.id } : {}),
        name: data.name,
        description: data.description || '',
        sort: data.sort || 0,
        isActive: form.getValues('isActive'),
        attributeIds: selectedAttributeIds,
        attributeValues: Array.from(selectedValues.entries()).flatMap(([attributeId, valueIds]) => 
          valueIds.map(valueId => ({
            attributeId,
            attributeValueId: valueId,
            isChecked: true,
          }))
        ),
      };

      console.log('提交数据:', submitData);

      if (model) {
        await contentModelService.update(model.id, submitData);
        toast.success('更新成功');
      } else {
        await contentModelService.create(submitData);
        toast.success('创建成功');
      }

      router.push('/admin/content-models');
      router.refresh();
    } catch (error: any) {
      console.error('操作失败:', error);
      toast.error(error.response?.data?.message || error.message || (model ? '更新失败' : '创建失败'));
    } finally {
      setLoading(false);
    }
  };

  const toggleAttribute = (attributeId: number, checked: boolean) => {
    if (checked) {
      setSelectedAttributeIds(prev => [...prev, attributeId]);
      // 对于单选属性，默认选中第一个值
      const attribute = attributes.find(a => a.id === attributeId);
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
      setSelectedAttributeIds(prev => prev.filter(id => id !== attributeId));
      setSelectedValues(prev => {
        const newMap = new Map(prev);
        newMap.delete(attributeId);
        return newMap;
      });
    }
  };

  const toggleAttributeValue = (attributeId: number, valueId: number, checked: boolean) => {
    const attribute = attributes.find(a => a.id === attributeId);
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
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
              const modelAttribute = model?.attributes.find(attr => attr.attributeId === attribute.id);
              const isAttributeSelected = selectedAttributeIds.includes(attribute.id);
              const selectedValueIds = selectedValues.get(attribute.id) || [];
              
              return (
                <div 
                  key={attribute.id}
                  className={cn(
                    "rounded-lg border p-4 transition-colors",
                    isAttributeSelected && "bg-accent/50"
                  )}
                >
                  <div className="flex gap-2 items-center">
                    <Switch
                      checked={isAttributeSelected}
                      onCheckedChange={(checked) => toggleAttribute(attribute.id, checked)}
                    />
                    <span className="font-medium">{attribute.name}</span>
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
                          const isSelected = selectedValueIds.includes(value.id);
                          
                          return (
                            <Badge
                              key={value.id}
                              variant={isSelected ? "default" : "outline"}
                              className="cursor-pointer hover:opacity-80"
                              onClick={() => toggleAttributeValue(attribute.id, value.id, !isSelected)}
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
          onClick={() => router.back()}
          disabled={loading}
        >
          取消
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? '提交中...' : (model ? '更新' : '创建')}
        </Button>
      </div>
    </form>
  );
} 