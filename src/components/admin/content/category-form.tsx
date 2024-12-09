"use client"

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parentId?: number;
  children?: Category[];
  isActive: boolean;
  sort: number;
  attributes?: Attribute[];
}

interface Attribute {
  id: number;
  name: string;
  type: string;
  required: boolean;
}

interface CategoryFormProps {
  category?: Category | null;
  onSuccess: () => void;
}

export function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [selectedAttributeIds, setSelectedAttributeIds] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    parentId: null as number | null,
    isActive: true,
    sort: 0,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || "",
        parentId: category.parentId || null,
        isActive: category.isActive,
        sort: category.sort,
      });
      setSelectedAttributeIds(category.attributes?.map(attr => attr.id) || []);
    }
  }, [category]);

  useEffect(() => {
    fetchAttributes();
  }, []);

  async function fetchAttributes() {
    try {
      const response = await fetch("/api/content/attributes");
      if (!response.ok) {
        throw new Error("获取属性列表失败");
      }
      const data = await response.json();
      setAttributes(data);
    } catch (error) {
      toast.error("获取属性列表失败");
      console.error(error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const url = category
        ? `/api/content/categories/${category.id}`
        : "/api/content/categories";
      const method = category ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          attributeIds: selectedAttributeIds,
        }),
      });

      if (!response.ok) {
        throw new Error(category ? "更新分类失败" : "创建分类失败");
      }

      toast.success(category ? "分类已更新" : "分类已创建");
      onSuccess();
      if (!category) {
        setFormData({
          name: "",
          slug: "",
          description: "",
          parentId: null,
          isActive: true,
          sort: 0,
        });
        setSelectedAttributeIds([]);
      }
    } catch (error) {
      toast.error(category ? "更新分类失败" : "创建分类失败");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">分类名称</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">分类标识</label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, slug: e.target.value }))
          }
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">描述</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="w-full px-3 py-2 border rounded-md"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">排序</label>
        <input
          type="number"
          value={formData.sort}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, sort: parseInt(e.target.value) }))
          }
          className="w-full px-3 py-2 border rounded-md"
          min={0}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">关联属性</label>
        <div className="space-y-2 max-h-40 overflow-y-auto border rounded-md p-3">
          {attributes.map((attr) => (
            <label key={attr.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedAttributeIds.includes(attr.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedAttributeIds((prev) => [...prev, attr.id]);
                  } else {
                    setSelectedAttributeIds((prev) =>
                      prev.filter((id) => id !== attr.id)
                    );
                  }
                }}
                className="rounded"
              />
              <span>
                {attr.name}
                <span className="text-sm text-gray-500 ml-1">
                  ({attr.type}
                  {attr.required ? ", 必填" : ""})
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
            }
            className="rounded"
          />
          <span>启用分类</span>
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "保存中..." : category ? "更新分类" : "创建分类"}
        </button>
      </div>
    </form>
  );
} 