"use client"

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const menuSchema = z.object({
  name: z.string().min(1, "菜单名称不能为空"),
  icon: z.string().optional(),
  path: z.string().optional(),
  visible: z.boolean(),
  sort: z.number().min(0),
  parentId: z.number().nullable(),
  roles: z.array(z.string()).optional(),
});

type MenuFormData = z.infer<typeof menuSchema>;

interface MenuFormProps {
  menu?: MenuFormData & { id?: number };
  onSuccess: () => void;
}

export function MenuForm({ menu, onSuccess }: MenuFormProps) {
  const form = useForm<MenuFormData>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: "",
      icon: "",
      path: "",
      visible: true,
      sort: 0,
      parentId: null,
      roles: [],
      ...menu,
    },
  });

  useEffect(() => {
    if (menu) {
      form.reset(menu);
    }
  }, [menu, form]);

  async function onSubmit(data: MenuFormData) {
    try {
      const url = menu?.id ? `/api/menu/${menu.id}` : "/api/menu";
      const method = menu?.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("保存菜单失败");
      }

      toast.success("菜单已保存");
      form.reset();
      onSuccess();
    } catch (error) {
      toast.error("保存菜单失败");
      console.error(error);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">菜单名称</label>
          <input
            {...form.register("name")}
            type="text"
            className="w-full px-3 py-2 border rounded-md"
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">图标</label>
          <input
            {...form.register("icon")}
            type="text"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">路径</label>
          <input
            {...form.register("path")}
            type="text"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">排序</label>
          <input
            {...form.register("sort", { valueAsNumber: true })}
            type="number"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">父级菜单</label>
          <select
            {...form.register("parentId", { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">无</option>
            {/* TODO: 添加父级菜单选项 */}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">角色</label>
          <select
            multiple
            {...form.register("roles")}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="admin">管理员</option>
            <option value="member">会员</option>
            <option value="user">普通用户</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="flex items-center space-x-2">
            <input {...form.register("visible")} type="checkbox" />
            <span className="text-sm font-medium">显示菜单</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => {
            form.reset();
            onSuccess();
          }}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          取消
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500"
        >
          保存
        </button>
      </div>
    </form>
  );
} 