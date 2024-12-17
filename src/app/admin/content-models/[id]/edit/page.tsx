'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { ModelForm } from '../../_components/model-form';
import { contentModelService } from '@/services/content-model';
import type { ContentModel } from '@/services/content-model';

export default function EditModelPage() {
  const params = useParams();
  const [model, setModel] = useState<ContentModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const data = await contentModelService.getById(Number(params.id));
        setModel(data);
      } catch (error) {
        toast.error('加载数据失败');
      } finally {
        setLoading(false);
      }
    };
    loadModel();
  }, [params.id]);

  if (loading) {
    return <div className="p-8">加载中...</div>;
  }

  if (!model) {
    return <div className="p-8">未找到数据</div>;
  }

  return (
    <div className="space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">编辑内容模型</h2>
      <ModelForm model={model} />
    </div>
  );
} 