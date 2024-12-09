"use client"

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Attribute {
  id: number;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  sort: number;
}

interface AttributeListProps {
  onSelect: (attribute: Attribute) => void;
}

export function AttributeList({ onSelect }: AttributeListProps) {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("确定要删除这个属性吗？")) {
      return;
    }

    try {
      const response = await fetch(`/api/content/attributes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("删除属性失败");
      }

      toast.success("属性已删除");
      fetchAttributes();
    } catch (error) {
      toast.error("删除属性失败");
      console.error(error);
    }
  }

  if (loading) {
    return <div className="text-center py-4">加载中...</div>;
  }

  return (
    <div className="space-y-2">
      {attributes.length === 0 ? (
        <div className="text-center py-4 text-gray-500">暂无属性</div>
      ) : (
        attributes.map((attribute) => (
          <div
            key={attribute.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100"
          >
            <div>
              <div className="font-medium">{attribute.name}</div>
              <div className="text-sm text-gray-500">{attribute.code}</div>
            </div>
            <div className="flex items-center space-x-2">
              {!attribute.isActive && (
                <span className="text-xs text-gray-500">(已禁用)</span>
              )}
              <button
                onClick={() => onSelect(attribute)}
                className="text-blue-600 hover:text-blue-500 text-sm"
              >
                编辑
              </button>
              <button
                onClick={() => handleDelete(attribute.id)}
                className="text-red-600 hover:text-red-500 text-sm"
              >
                删除
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
} 