'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { contentModelService } from '@/services/content-model';
import { contentAttributeService } from '@/services/content-attribute';
import type { ContentModel } from '@/services/content-model';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(1, '请输入名称'),
  description: z.string().optional(),
  attributeValues: z.array(z.object({
    attributeId: z.number(),
    valueIds: z.array(z.number())
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
  const [attributes, setAttributes] = React.useState<any[]>([]);
  const [expandedAttributes, setExpandedAttributes] = React.useState<number[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: model?.name || '',
      description: model?.description || '',
      attributeValues: model?.attributes?.map(attr => ({
        attributeId: attr.id,
        valueIds: attr.values.map(v => v.id)
      })) || [],
      sort: model?.sort || 0,
      isActive: model?.isActive ?? true,
    },
  });

  // 加载属性列表
  React.useEffect(() => {
    const loadAttributes = async () => {
      try {
        const data = await contentAttributeService.getAll();
        setAttributes(data);
        // 如果是编辑模式，默认展开已选择的属性
        if (model) {
          setExpandedAttributes(model.attributes.map(attr => attr.id));
        }
      } catch (error) {
        toast.error('加载属性列表失败');
      }
    };
    loadAttributes();
  }, [model]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      if (model) {
        await contentModelService.update(model.id, data);
        toast.success('更新成功');
      } else {
        await contentModelService.create(data);
        toast.success('创建成功');
      }
      router.push('/admin/content-models');
      router.refresh();
    } catch (error) {
      toast.error(model ? '更新失败' : '创建失败');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (attributeId: number) => {
    setExpandedAttributes(prev =>
      prev.includes(attributeId)
        ? prev.filter(id => id !== attributeId)
        : [...prev, attributeId]
    );
  };

  const handleToggleAttribute = (attribute: any) => {
    const currentValues = form.watch('attributeValues');
    const attributeIndex = currentValues.findIndex(v => v.attributeId === attribute.id);
    
    if (attributeIndex === -1) {
      // 添加属性
      form.setValue('attributeValues', [
        ...currentValues,
        {
          attributeId: attribute.id,
          valueIds: attribute.values.map((v: any) => v.id) // 默认选中所有值
        }
      ]);
    } else {
      // 移除属性
      form.setValue('attributeValues', 
        currentValues.filter(v => v.attributeId !== attribute.id)
      );
    }
  };

  const handleToggleValue = (attributeId: number, valueId: number) => {
    const currentValues = form.watch('attributeValues');
    const attributeIndex = currentValues.findIndex(v => v.attributeId === attributeId);
    
    if (attributeIndex === -1) {
      // 如果属性不存在，添加属性和值
      form.setValue('attributeValues', [
        ...currentValues,
        {
          attributeId,
          valueIds: [valueId]
        }
      ]);
    } else {
      // 如果属性存在，切换值的选中状态
      const attribute = currentValues[attributeIndex];
      const valueIds = attribute.valueIds.includes(valueId)
        ? attribute.valueIds.filter(id => id !== valueId)
        : [...attribute.valueIds, valueId];
      
      // 如果没有选中任何值，移除整个属性
      if (valueIds.length === 0) {
        form.setValue('attributeValues', 
          currentValues.filter(v => v.attributeId !== attributeId)
        );
      } else {
        const newValues = [...currentValues];
        newValues[attributeIndex] = {
          ...attribute,
          valueIds
        };
        form.setValue('attributeValues', newValues);
      }
    }
  };

  const isAttributeSelected = (attributeId: number) => {
    return form.watch('attributeValues').some(v => v.attributeId === attributeId);
  };

  const isValueSelected = (attributeId: number, valueId: number) => {
    const attribute = form.watch('attributeValues').find(v => v.attributeId === attributeId);
    return attribute?.valueIds.includes(valueId) || false;
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">名称</Label>
            <Input
              id="name"
              placeholder="请输入模型名称"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">描述</Label>
            <Textarea
              id="description"
              placeholder="请输入模型描述"
              {...form.register('description')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sort">排序</Label>
            <Input
              id="sort"
              type="number"
              min={0}
              {...form.register('sort', { valueAsNumber: true })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={form.watch('isActive')}
              onCheckedChange={(checked) => form.setValue('isActive', checked)}
            />
            <Label htmlFor="isActive">启用</Label>
          </div>
        </div>

        <div className="space-y-4">
          <Label>属性</Label>
          <ScrollArea className="h-[400px] border rounded-md p-4">
            <div className="space-y-4">
              {attributes.map((attribute) => (
                <div key={attribute.id} className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id={`attribute-${attribute.id}`}
                      checked={isAttributeSelected(attribute.id)}
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
                            className="w-5 h-5"
                            onClick={() => toggleExpand(attribute.id)}
                          >
                            {expandedAttributes.includes(attribute.id) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
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
                    <div className="pl-4 ml-10 space-y-2 border-l">
                      {attribute.values.map((value: any) => (
                        <div key={value.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`value-${value.id}`}
                            checked={isValueSelected(attribute.id, value.id)}
                            onCheckedChange={() => handleToggleValue(attribute.id, value.id)}
                            disabled={!isAttributeSelected(attribute.id)}
                          />
                          <Label
                            htmlFor={`value-${value.id}`}
                            className={cn(
                              "text-sm",
                              !isAttributeSelected(attribute.id) && "text-muted-foreground"
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
          </ScrollArea>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          取消
        </Button>
        <Button type="submit" disabled={loading}>
          {model ? '更新' : '创建'}
        </Button>
      </div>
    </form>
  );
} 