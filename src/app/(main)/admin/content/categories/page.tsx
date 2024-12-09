"use client"

import { useState } from "react";
import { CategoryList } from "@/components/admin/content/category-list";
import { CategoryForm } from "@/components/admin/content/category-form";

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

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">文章分类管理</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">分类列表</h2>
          <CategoryList onSelect={setSelectedCategory} />
        </div>

        <div className="col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            {selectedCategory ? "编辑分类" : "新建分类"}
          </h2>
          <CategoryForm
            category={selectedCategory}
            onSuccess={() => setSelectedCategory(null)}
          />
        </div>
      </div>
    </div>
  );
} 