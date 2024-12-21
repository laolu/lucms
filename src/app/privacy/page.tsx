import { Card } from '@/components/ui/card';
import { pageService } from '@/services/page';
import { useQuery } from '@tanstack/react-query';

export default function PrivacyPage() {
  const { data: config, isLoading } = useQuery({
    queryKey: ['pageConfig', 'privacy'],
    queryFn: pageService.getPrivacyConfig,
  });

  if (isLoading) {
    return <div>加载中...</div>;
  }

  if (!config?.visible) {
    return <div>页面不可见</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">{config.title}</h1>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: config.content }} />
      </Card>
    </div>
  );
} 