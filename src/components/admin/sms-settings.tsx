"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const smsConfigSchema = z.object({
  provider: z.enum(["aliyun", "tencent"], {
    required_error: "请选择短信服务提供商",
  }),
  accessKeyId: z.string().min(1, "AccessKey ID不能为空"),
  accessKeySecret: z.string().min(1, "AccessKey Secret不能为空"),
  signName: z.string().min(1, "短信签名不能为空"),
  templateCode: z.string().min(1, "模板代码不能为空"),
});

type SmsConfigFormData = z.infer<typeof smsConfigSchema>;

export function SmsSettings() {
  const [loading, setLoading] = useState(false);

  const form = useForm<SmsConfigFormData>({
    resolver: zodResolver(smsConfigSchema),
    defaultValues: {
      provider: "aliyun",
      accessKeyId: "",
      accessKeySecret: "",
      signName: "",
      templateCode: "",
    },
  });

  async function onSubmit(data: SmsConfigFormData) {
    try {
      setLoading(true);
      const response = await fetch("/api/config/sms", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("更新配置失败");
      }

      toast.success("短信配置已更新");
    } catch (error) {
      toast.error("更新配置失败");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">服务提供商</label>
          <select
            {...form.register("provider")}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="aliyun">阿里云</option>
            <option value="tencent">腾讯云</option>
          </select>
          {form.formState.errors.provider && (
            <p className="text-sm text-red-500">
              {form.formState.errors.provider.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">AccessKey ID</label>
          <input
            {...form.register("accessKeyId")}
            type="text"
            className="w-full px-3 py-2 border rounded-md"
          />
          {form.formState.errors.accessKeyId && (
            <p className="text-sm text-red-500">
              {form.formState.errors.accessKeyId.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">AccessKey Secret</label>
          <input
            {...form.register("accessKeySecret")}
            type="password"
            className="w-full px-3 py-2 border rounded-md"
          />
          {form.formState.errors.accessKeySecret && (
            <p className="text-sm text-red-500">
              {form.formState.errors.accessKeySecret.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">短信签名</label>
          <input
            {...form.register("signName")}
            type="text"
            className="w-full px-3 py-2 border rounded-md"
          />
          {form.formState.errors.signName && (
            <p className="text-sm text-red-500">
              {form.formState.errors.signName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">模板代码</label>
          <input
            {...form.register("templateCode")}
            type="text"
            className="w-full px-3 py-2 border rounded-md"
          />
          {form.formState.errors.templateCode && (
            <p className="text-sm text-red-500">
              {form.formState.errors.templateCode.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "保存中..." : "保存配置"}
        </button>
      </div>
    </form>
  );
} 