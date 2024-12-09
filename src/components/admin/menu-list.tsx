"use client"

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Menu {
  id: number;
  name: string;
  icon?: string;
  path?: string;
  visible: boolean;
  sort: number;
  parentId?: number;
  roles?: string[];
  children?: Menu[];
}

interface MenuListProps {
  onSelect: (menu: Menu) => void;
}

export function MenuList({ onSelect }: MenuListProps) {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenus();
  }, []);

  async function fetchMenus() {
    try {
      const response = await fetch("/api/menu/all");
      if (!response.ok) {
        throw new Error("获取菜单失败");
      }
      const data = await response.json();
      setMenus(data);
    } catch (error) {
      toast.error("获取菜单失败");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("确定要删除这个菜单吗？")) {
      return;
    }

    try {
      const response = await fetch(`/api/menu/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("删除菜单失败");
      }

      toast.success("菜单已删除");
      fetchMenus();
    } catch (error) {
      toast.error("删除菜单失败");
      console.error(error);
    }
  }

  function renderMenu(menu: Menu, level = 0) {
    return (
      <div key={menu.id}>
        <div
          className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 cursor-pointer"
          style={{ paddingLeft: `${level * 1.5 + 0.75}rem` }}
        >
          <div className="flex items-center space-x-2">
            {menu.icon && <span className="text-gray-400">{menu.icon}</span>}
            <span>{menu.name}</span>
            {!menu.visible && (
              <span className="text-xs text-gray-400">(隐藏)</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onSelect(menu)}
              className="text-blue-600 hover:text-blue-500"
            >
              编辑
            </button>
            <button
              onClick={() => handleDelete(menu.id)}
              className="text-red-600 hover:text-red-500"
            >
              删除
            </button>
          </div>
        </div>
        {menu.children?.map((child) => renderMenu(child, level + 1))}
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-4">加载中...</div>;
  }

  return (
    <div className="border rounded-md">
      {menus.length === 0 ? (
        <div className="text-center py-4 text-gray-500">暂无菜单</div>
      ) : (
        menus.map((menu) => renderMenu(menu))
      )}
    </div>
  );
} 