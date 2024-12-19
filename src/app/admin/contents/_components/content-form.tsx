'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Editor } from '@/components/editor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { contentService } from '@/services/content';
import { contentCategoryService } from '@/services/content-category';
import { contentAttributeService } from '@/services/content-attribute';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function ContentForm() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [attributes, setAttributes] = React.useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<any>(null);
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    categoryId: '',
    content: '',
    isActive: true,
    sort: 0,
    thumbnail: '',
    images: [] as string[],
    coverImage: '',
    bannerImage: '',
    price: 0,
    originalPrice: 0,
    isFree: false,
    isVipFree: false,
    vipPrice: 0,
    downloadUrl: '',
    downloadPassword: '',
    extractPassword: '',
    tags: [] as string[],
    meta: {} as Record<string, any>,
    source: '',
    author: '',
    publishedAt: '',
    attributeValues: [] as Array<{ attributeId: number, valueId: number }>
  });

  // 加载分类列表
  const loadCategories = React.useCallback(async () => {
      try {
        const data = await contentCategoryService.getTree();
        setCategories(data);
      } catch (error) {
      toast.error('加载分类列表失败');
      }
  }, []);

  // 加载分类详情
  const loadCategory = React.useCallback(async (categoryId: string) => {
    try {
      const category = await contentCategoryService.getById(parseInt(categoryId));
      setSelectedCategory(category);
      
      // 如果分类有关联的模型和属性，初始化属性值
      if (category.model?.attributes) {
        setFormData(prev => ({
          ...prev,
          attributeValues: category.model.attributes.map(modelAttr => ({
            attributeId: modelAttr.attributeId,
            valueId: modelAttr.attribute.values[0]?.id || 0
          }))
        }));
      }
    } catch (error) {
      toast.error('加载分类详情失败');
    }
  }, []);

  // 加载属性列表
  const loadAttributes = React.useCallback(async () => {
    if (!formData.categoryId) return;
    try {
      const data = await contentAttributeService.getByCategoryId(parseInt(formData.categoryId));
      setAttributes(data);
      // 如果是首次加载分类的属性，初始化属性值
      if (!formData.attributeValues.length) {
        setFormData(prev => ({
      ...prev,
          attributeValues: data.map((attr: any) => ({
            attributeId: attr.id,
            valueId: attr.values[0]?.id || 0
          }))
        }));
      }
    } catch (error) {
      toast.error('加载属性列表失败');
    }
  }, [formData.categoryId, formData.attributeValues.length]);

  React.useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  React.useEffect(() => {
    if (formData.categoryId) {
      loadCategory(formData.categoryId);
      loadAttributes();
    }
  }, [formData.categoryId, loadCategory, loadAttributes]);

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('请输入标题');
      return;
    }
    if (!formData.categoryId) {
      toast.error('请选择分类');
      return;
    }
    if (!formData.content.trim()) {
      toast.error('请输入内容');
      return;
    }

    try {
      setLoading(true);
      await contentService.create({
        ...formData,
        categoryId: parseInt(formData.categoryId),
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        vipPrice: Number(formData.vipPrice),
        publishedAt: formData.publishedAt ? new Date(formData.publishedAt).toISOString() : null
      });
      toast.success('创建成功');
      router.push('/admin/contents');
    } catch (error) {
      toast.error('创建失败');
    } finally {
      setLoading(false);
    }
  };

  // 处理标签输入
  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags }));
  };

  // 处理图片数组输入
  const handleImagesChange = (value: string) => {
    const images = value.split('\n').map(url => url.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, images }));
  };

  // 构建分类选项
  const buildCategoryOptions = (items: any[], level = 0): React.ReactNode[] => {
    return items.flatMap((item) => {
      const prefix = '\u00A0'.repeat(level * 4);
      const options = [
        <SelectItem key={item.id} value={item.id.toString()}>
          {prefix + item.name}
        </SelectItem>
      ];
      
      if (item.children?.length) {
        options.push(...buildCategoryOptions(item.children, level + 1));
      }
      
      return options;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            取消
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={loading}>
                {loading ? '创建中...' : '创建'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>确认创建</AlertDialogTitle>
                <AlertDialogDescription>
                  确定要创建这个内容吗？创建后可以在列表中查看和编辑。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction onClick={handleSubmit}>
                  确认
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">基本信息</TabsTrigger>
          <TabsTrigger value="content">内容详情</TabsTrigger>
          <TabsTrigger value="images">图片管理</TabsTrigger>
          <TabsTrigger value="price">价格设置</TabsTrigger>
          <TabsTrigger value="download">下载设置</TabsTrigger>
          <TabsTrigger value="advanced">高级设置</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
            <CardDescription>设置内容的基本信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <Label htmlFor="description">描述</Label>
              <Textarea
                id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="请输入描述"
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
                {selectedCategory?.model && (
                  <div className="p-4 mt-4 space-y-4 rounded-lg border bg-muted/50">
                    <div className="flex gap-2 items-center">
                      <Badge variant="outline" className="bg-primary/5">
                        {selectedCategory.model.name}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {selectedCategory.model.description || '暂无描述'}
                      </span>
                    </div>
                    
                    <div className="grid gap-4">
                      {selectedCategory.model.attributes?.map((attr) => (
                        <div key={attr.attributeId} className="space-y-2">
                          <div className="flex gap-2 items-center">
                            <Label>{attr.name}</Label>
                            <span className="text-xs text-muted-foreground">
                              ({attr.type === 'SINGLE' ? '单选' : '多选'})
                            </span>
                          </div>
                          <Select
                            value={formData.attributeValues.find(av => av.attributeId === attr.attributeId)?.attributeValueId?.toString()}
                            onValueChange={(value) => {
                              setFormData(prev => ({
                                ...prev,
                                attributeValues: prev.attributeValues.map(av => 
                                  av.attributeId === attr.attributeId 
                                    ? { ...av, attributeValueId: parseInt(value) }
                                    : av
                                )
                              }));
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={`请选择${attr.name}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {attr.values?.map((value) => (
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
            </div>

            <div className="grid gap-2">
                <Label htmlFor="author">作者</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="请输入作者"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="source">来源</Label>
                <Input
                  id="source"
                  value={formData.source}
                  onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
                  placeholder="请输入来源"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="publishedAt">发布时间</Label>
              <Input
                  id="publishedAt"
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) => setFormData(prev => ({ ...prev, publishedAt: e.target.value }))}
              />
            </div>

            <div className="flex gap-2 items-center">
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
          </CardContent>
        </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>内容详情</CardTitle>
              <CardDescription>编辑内容详情</CardDescription>
            </CardHeader>
            <CardContent>
              <Editor
                value={formData.content}
                onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>图片管理</CardTitle>
              <CardDescription>管理内容相关的图片</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="thumbnail">缩略图</Label>
                <Input
                  id="thumbnail"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
                  placeholder="请输入缩略图URL"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="coverImage">封面图</Label>
                <Input
                  id="coverImage"
                  value={formData.coverImage}
                  onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                  placeholder="请输入封面图URL"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bannerImage">横幅图</Label>
                <Input
                  id="bannerImage"
                  value={formData.bannerImage}
                  onChange={(e) => setFormData(prev => ({ ...prev, bannerImage: e.target.value }))}
                  placeholder="请输入横幅图URL"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="images">图片集</Label>
                <Textarea
                  id="images"
                  value={formData.images.join('\n')}
                  onChange={(e) => handleImagesChange(e.target.value)}
                  placeholder="请输入图片URL，每行一个"
                />
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="price" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>价格设置</CardTitle>
              <CardDescription>设置内容的价格信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 items-center">
                <Switch
                  id="isFree"
                  checked={formData.isFree}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFree: checked }))}
                />
                <Label htmlFor="isFree">免费内容</Label>
              </div>

              {!formData.isFree && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="price">价格</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="originalPrice">原价</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="flex gap-2 items-center">
                    <Switch
                      id="isVipFree"
                      checked={formData.isVipFree}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isVipFree: checked }))}
                    />
                    <Label htmlFor="isVipFree">VIP免费</Label>
                  </div>

                  {!formData.isVipFree && (
                    <div className="grid gap-2">
                      <Label htmlFor="vipPrice">VIP价格</Label>
                      <Input
                        id="vipPrice"
                        type="number"
                        step="0.01"
                        value={formData.vipPrice}
                        onChange={(e) => setFormData(prev => ({ ...prev, vipPrice: parseFloat(e.target.value) || 0 }))}
                      />
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="download" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>下载设置</CardTitle>
              <CardDescription>设置内容的下载信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="downloadUrl">下载链接</Label>
                <Input
                  id="downloadUrl"
                  value={formData.downloadUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, downloadUrl: e.target.value }))}
                  placeholder="请输入下载链接"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="downloadPassword">下载密码</Label>
                <Input
                  id="downloadPassword"
                  value={formData.downloadPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, downloadPassword: e.target.value }))}
                  placeholder="请输入下载密码"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="extractPassword">解压密码</Label>
                <Input
                  id="extractPassword"
                  value={formData.extractPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, extractPassword: e.target.value }))}
                  placeholder="请输入解压密码"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>高级设置</CardTitle>
              <CardDescription>设置内容的高级信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="tags">标签</Label>
                <Input
                  id="tags"
                  value={formData.tags.join(',')}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="请输入标签，用逗号分隔"
                />
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
                            }));
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 