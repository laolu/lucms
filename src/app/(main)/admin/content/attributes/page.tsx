"use client"

import { useState } from "react";
import { AttributeList } from "@/components/admin/content/attribute-list";
import { AttributeForm } from "@/components/admin/content/attribute-form";

interface Attribute {
  id: number;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  sort: number;
}

export default function AttributesPage() {
  const [selectedAttribute, setSelectedAttribute] = useState<Attribute | null>(null);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">文章属性管理</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">属性列表</h2>
          <AttributeList onSelect={setSelectedAttribute} />
        </div>

        <div className="col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            {selectedAttribute ? "编辑属性" : "新建属性"}
          </h2>
          <AttributeForm
            attribute={selectedAttribute}
            onSuccess={() => setSelectedAttribute(null)}
          />
        </div>
      </div>
    </div>
  );
} 