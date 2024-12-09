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
}

interface CategoryListProps {
  onSelect: (category: Category) => void;
}

export function CategoryList({ onSelect }: CategoryListProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await fetch("/api/content/categories");
      if (!response.ok) {
        throw new Error("获取分类列表失败");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast.error("获取分类列表失败");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("确定要删除这个分类吗？")) {
      return;
    }

    try {
      const response = await fetch(`/api/content/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("删除分类失败");
      }

      toast.success("分类已删除");
      fetchCategories();
    } catch (error) {
      toast.error("删除分类失败");
      console.error(error);
    }
  }

  function renderCategory(category: Category, level = 0) {
    return (
      <div key={category.id}>
        <div
          className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100"
          style={{ marginLeft: `${level * 1.5}rem` }}
        >
          <div>
            <div className="font-medium">{category.name}</div>
            <div className="text-sm text-gray-500">{category.slug}</div>
          </div>
          <div className="flex items-center space-x-2">
            {!category.isActive && (
              <span className="text-xs text-gray-500">(已禁用)</span>
            )}
            <button
              onClick={() => onSelect(category)}
              className="text-blue-600 hover:text-blue-500 text-sm"
            >
              编辑
            </button>
            <button
              onClick={() => handleDelete(category.id)}
              className="text-red-600 hover:text-red-500 text-sm"
            >
              删除
            </button>
          </div>
        </div>
        {category.children?.map((child) => renderCategory(child, level + 1))}
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-4">加载中...</div>;
  }

  return (
    <div className="space-y-2">
      {categories.length === 0 ? (
        <div className="text-center py-4 text-gray-500">暂无分类</div>
      ) : (
        categories.map((category) => renderCategory(category))
      )}
    </div>
  );
} 