"use client"

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const attributeSchema = z.object({
  name: z.string().min(1, "属性名称不能为空"),
  code: z.string().min(1, "属性代码不能为空"),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  sort: z.number().min(0).default(0),
});

type AttributeFormData = z.infer<typeof attributeSchema>;

interface Attribute {
  id: number;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  sort: number;
}

interface AttributeFormProps {
  attribute?: Attribute | null;
  onSuccess: () => void;
}

export function AttributeForm({ attribute, onSuccess }: AttributeFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AttributeFormData>({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      isActive: true,
      sort: 0,
    },
  });

  useEffect(() => {
    if (attribute) {
      reset(attribute);
    }
  }, [attribute, reset]);

  async function onSubmit(data: AttributeFormData) {
    try {
      const url = attribute
        ? `/api/content/attributes/${attribute.id}`
        : "/api/content/attributes";
      const method = attribute ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("保存属性失败");
      }

      toast.success(attribute ? "属性已更新" : "属性已创建");
      reset();
      onSuccess();
    } catch (error) {
      toast.error("保存属性失败");
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          属性名称
        </label>
        <input
          type="text"
          {...register("name")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          属性代码
        </label>
        <input
          type="text"
          {...register("code")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.code && (
          <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          属性描述
        </label>
        <textarea
          {...register("description")}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">排序</label>
        <input
          type="number"
          {...register("sort", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.sort && (
          <p className="mt-1 text-sm text-red-600">{errors.sort.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          {...register("isActive")}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label className="ml-2 block text-sm text-gray-700">启用</label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          重置
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isSubmitting ? "保存中..." : "保存"}
        </button>
      </div>
    </form>
  );
} 