"use client"

import { useState } from "react";
import { MenuList } from "@/components/admin/menu-list";
import { MenuForm } from "@/components/admin/menu-form";

export default function MenuPage() {
  const [selectedMenu, setSelectedMenu] = useState<any>(null);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">菜单管理</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">菜单列表</h2>
          <MenuList onSelect={setSelectedMenu} />
        </div>

        <div className="col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            {selectedMenu ? "编辑菜单" : "新建菜单"}
          </h2>
          <MenuForm menu={selectedMenu} onSuccess={() => setSelectedMenu(null)} />
        </div>
      </div>
    </div>
  );
} 