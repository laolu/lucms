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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { contentModelService } from '@/services/content-model';
import { contentAttributeService } from '@/services/content-attribute';
import type { ContentModel, ContentAttribute } from '@/services/content-model';
import { ChevronDown, ChevronRight, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(1, '请输入名称'),
  description: z.string().optional(),
  attributeIds: z.array(z.number()),
  attributeValues: z.array(z.object({
    attributeValueId: z.number(),
    isEnabled: z.boolean().optional(),
    sort: z.number().optional()
  })),
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
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData | null>(null);
  const [attributes, setAttributes] = React.useState<ContentAttribute[]>([]);
  const [selectedAttributeIds, setSelectedAttributeIds] = React.useState<number[]>(
    model?.attributes?.map(attr => attr.id) || []
  );
  const [selectedValueIds, setSelectedValueIds] = React.useState<number[]>(
    model?.attributeValues?.map(value => value.id) || []
  );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: model?.name || '',
      description: model?.description || '',
      attributeIds: model?.attributes?.map(attr => attr.id) || [],
      attributeValues: model?.attributeValues?.map(value => ({
        attributeValueId: value.id,
        isEnabled: true,
        sort: value.sort
      })) || [],
      sort: model?.sort || 0,
      isActive: model?.isActive ?? true,
    },
  });

  // 加载所有属性
  const loadAttributes = React.useCallback(async () => {
    try {
      const data = await contentAttributeService.getAll();
      setAttributes(data);

      // 如果是编辑模式，使用现有的选择
      if (model) {
        return;
      }

      // 如果是创建模式，默认全选所有属性和属性值
      const allAttributeIds = data.map(attr => attr.id);
      const allValueIds = data.flatMap(attr => attr.values.map(value => value.id));
      const allAttributeValues = data.flatMap(attr => 
        attr.values.map((value, index) => ({
          attributeValueId: value.id,
          isEnabled: true,
          sort: index
        }))
      );

      setSelectedAttributeIds(allAttributeIds);
      setSelectedValueIds(allValueIds);
      form.setValue('attributeIds', allAttributeIds);
      form.setValue('attributeValues', allAttributeValues);
    } catch (error) {
      toast.error('加载属性列表失败');
    }
  }, [form, model]);

  React.useEffect(() => {
    loadAttributes();
  }, [loadAttributes]);

  const handleSubmit = async (data: FormData) => {
    // 无论是创建还是编辑都显示确认对话框
    setFormData(data);
    setShowConfirmDialog(true);
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      // 确保数据格式正确
      const formattedData = {
        id: model?.id,
        name: data.name,
        description: data.description || '',
        attributeIds: data.attributeIds || [],
        attributeValues: data.attributeValues.map(value => ({
          attributeValueId: value.attributeValueId,
          isEnabled: value.isEnabled ?? true,
          sort: value.sort ?? 0
        })),
        sort: data.sort || 0,
        isActive: data.isActive ?? true
      };

      console.log('提交的数据:', formattedData); // 调试用

      if (model) {
        await contentModelService.update(model.id, formattedData);
        toast.success('更新成功');
        router.push('/admin/content-models');
        router.refresh();
      } else {
        const { id, ...createData } = formattedData;
        await contentModelService.create(createData);
        toast.success('创建成功');
        router.push('/admin/content-models');
        router.refresh();
      }
    } catch (error: any) {
      console.error('操作失败:', error);
      // 显示详细的错误信息
      const errorMessage = error.response?.data?.message || error.message || (model ? '更新失败' : '创建失败');
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setShowConfirmDialog(false);
    }
  };

  const handleAttributeChange = (attributeId: number, checked: boolean) => {
    const attribute = attributes.find(attr => attr.id === attributeId);
    if (!attribute) return;

    let newSelectedIds = [...selectedAttributeIds];
    let newValueIds = [...selectedValueIds];
    let newAttributeValues = form.getValues('attributeValues');

    if (checked) {
      // 选中属性
      newSelectedIds = [...newSelectedIds, attributeId];
      // 选中所有属性值
      const attributeValueIds = attribute.values.map(value => value.id);
      newValueIds = [...newValueIds, ...attributeValueIds];
      // 添加属性值到表单
      const newValues = attribute.values.map((value, index) => ({
        attributeValueId: value.id,
        isEnabled: true,
        sort: newAttributeValues.length + index
      }));
      newAttributeValues = [...newAttributeValues, ...newValues];
    } else {
      // 取消选中属性
      newSelectedIds = newSelectedIds.filter(id => id !== attributeId);
      // 取消选中所有属性值
      newValueIds = newValueIds.filter(id => 
        !attribute.values.some(value => value.id === id)
      );
      // 从表单中移除属性值
      newAttributeValues = newAttributeValues.filter(v => 
        !attribute.values.some(value => value.id === v.attributeValueId)
      );
    }

    setSelectedAttributeIds(newSelectedIds);
    setSelectedValueIds(newValueIds);
    form.setValue('attributeIds', newSelectedIds);
    form.setValue('attributeValues', newAttributeValues);
  };

  const handleAttributeValueChange = (attributeId: number, valueId: number, checked: boolean) => {
    const attribute = attributes.find(attr => attr.id === attributeId);
    if (!attribute) return;

    let newSelectedIds = [...selectedAttributeIds];
    let newValueIds = [...selectedValueIds];
    let newAttributeValues = form.getValues('attributeValues');

    if (checked) {
      // 选中属性值
      if (!newSelectedIds.includes(attributeId)) {
        newSelectedIds = [...newSelectedIds, attributeId];
      }
      newValueIds = [...newValueIds, valueId];
      // 添加到表单
      if (!newAttributeValues.some(v => v.attributeValueId === valueId)) {
        newAttributeValues = [
          ...newAttributeValues,
          {
            attributeValueId: valueId,
            isEnabled: true,
            sort: newAttributeValues.length
          }
        ];
      }
    } else {
      // 取消选中属性值
      newValueIds = newValueIds.filter(id => id !== valueId);
      // 从表单中移除
      newAttributeValues = newAttributeValues.filter(v => v.attributeValueId !== valueId);
      // 如果该属性没有任何选中的值，也取消选择该属性
      const hasOtherValues = newValueIds.some(id => 
        attribute.values.some(value => value.id === id)
      );
      if (!hasOtherValues) {
        newSelectedIds = newSelectedIds.filter(id => id !== attributeId);
      }
    }

    setSelectedAttributeIds(newSelectedIds);
    setSelectedValueIds(newValueIds);
    form.setValue('attributeIds', newSelectedIds);
    form.setValue('attributeValues', newAttributeValues);
  };

  const handleAttributeAllValues = (attributeId: number, checked: boolean) => {
    const attribute = attributes.find(attr => attr.id === attributeId);
    if (!attribute) return;

    let newSelectedIds = [...selectedAttributeIds];
    let newValueIds = [...selectedValueIds];
    let newAttributeValues = form.getValues('attributeValues');

    if (checked) {
      // 选中所有属性值
      if (!newSelectedIds.includes(attributeId)) {
        newSelectedIds = [...newSelectedIds, attributeId];
      }
      const attributeValueIds = attribute.values.map(value => value.id);
      newValueIds = [
        ...newValueIds.filter(id => !attributeValueIds.includes(id)),
        ...attributeValueIds
      ];
      // 添加到表单
      newAttributeValues = [
        ...newAttributeValues.filter(v => !attributeValueIds.includes(v.attributeValueId)),
        ...attribute.values.map((value, index) => ({
          attributeValueId: value.id,
          isEnabled: true,
          sort: newAttributeValues.length + index
        }))
      ];
    } else {
      // 取消选中所有属性值
      newValueIds = newValueIds.filter(id => 
        !attribute.values.some(value => value.id === id)
      );
      // 从表单中移除
      newAttributeValues = newAttributeValues.filter(v => 
        !attribute.values.some(value => value.id === v.attributeValueId)
      );
      // 取消选择属性
      newSelectedIds = newSelectedIds.filter(id => id !== attributeId);
    }

    setSelectedAttributeIds(newSelectedIds);
    setSelectedValueIds(newValueIds);
    form.setValue('attributeIds', newSelectedIds);
    form.setValue('attributeValues', newAttributeValues);
  };

  const handleAllAttributes = (checked: boolean) => {
    if (checked) {
      const allAttributeIds = attributes.map(attr => attr.id);
      const allValueIds = attributes.flatMap(attr => attr.values.map(value => value.id));
      const allAttributeValues = attributes.flatMap(attr => 
        attr.values.map((value, index) => ({
          attributeValueId: value.id,
          isEnabled: true,
          sort: index
        }))
      );

      setSelectedAttributeIds(allAttributeIds);
      setSelectedValueIds(allValueIds);
      form.setValue('attributeIds', allAttributeIds);
      form.setValue('attributeValues', allAttributeValues);
    } else {
      setSelectedAttributeIds([]);
      setSelectedValueIds([]);
      form.setValue('attributeIds', []);
      form.setValue('attributeValues', []);
    }
  };

  const isAttributeValueSelected = (valueId: number) => {
    return selectedValueIds.includes(valueId);
  };

  return (
    <>
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
                    {new Date(model.createdAt).toLocaleString('zh-CN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false
                    })}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label className="text-muted-foreground">更新时间</Label>
                  <div className="text-sm">
                    {new Date(model.updatedAt).toLocaleString('zh-CN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false
                    })}
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
            <div className="space-y-6">
              <div className="flex gap-2 items-center mb-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAllAttributes(true)}
                >
                  全选
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAllAttributes(false)}
                >
                  清空
                </Button>
              </div>

              {attributes.map((attribute) => (
                <div 
                  key={attribute.id} 
                  className={cn(
                    "rounded-lg border p-4 transition-colors",
                    selectedAttributeIds.includes(attribute.id) && "bg-accent/50"
                  )}
                >
                  <div className="flex gap-4 items-center">
                    <div className="flex flex-1 gap-2 items-center">
                      <Checkbox
                        id={`attribute-${attribute.id}`}
                        checked={selectedAttributeIds.includes(attribute.id)}
                        onCheckedChange={(checked) => handleAttributeChange(attribute.id, checked as boolean)}
                      />
                      <Label htmlFor={`attribute-${attribute.id}`} className="font-medium">
                        {attribute.name}
                      </Label>
                      <Badge variant="secondary">
                        {attribute.type === 'SINGLE' ? '单选' : '多选'}
                      </Badge>
                    </div>
                    {selectedAttributeIds.includes(attribute.id) && (
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleAttributeAllValues(attribute.id, true)}
                        >
                          全选
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleAttributeAllValues(attribute.id, false)}
                        >
                          清空
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {selectedAttributeIds.includes(attribute.id) && (
                    <div className="mt-4 ml-8">
                      <div className="mb-2 text-sm text-muted-foreground">可用的属性值：</div>
                      <div className="flex flex-wrap gap-2">
                        {attribute.values.map((value) => {
                          const selected = isAttributeValueSelected(value.id);
                          return (
                            <Badge
                              key={value.id}
                              variant={selected ? "default" : "outline"}
                              className="transition-colors cursor-pointer hover:opacity-80"
                              onClick={() => handleAttributeValueChange(
                                attribute.id,
                                value.id,
                                !selected
                              )}
                            >
                              {value.value}
                              {selected && (
                                <X className="ml-1 w-3 h-3" />
                              )}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
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

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {model ? '确认更新内容模型' : '确认创建内容模型'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {model 
                ? '您确定要更新这个内容模型吗？更新后将立即生效。'
                : '您确定要创建这个内容模型吗？创建后将立即生效。'
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirmDialog(false)}>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => formData && onSubmit(formData)}
              disabled={loading}
            >
              {loading 
                ? (model ? '更新中...' : '创建中...') 
                : (model ? '确认更新' : '确认创建')
              }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
} 