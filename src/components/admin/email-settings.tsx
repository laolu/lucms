"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const emailConfigSchema = z.object({
  host: z.string().min(1, "SMTP服务器地址不能为空"),
  port: z.number().min(1).max(65535),
  secure: z.boolean(),
  auth: z.object({
    user: z.string().min(1, "用户名不能为空"),
    pass: z.string().min(1, "密码不能为空"),
  }),
  from: z.string().email("发件人地址格式不正确"),
});

type EmailConfigFormData = z.infer<typeof emailConfigSchema>;

export function EmailSettings() {
  const [loading, setLoading] = useState(false);

  const form = useForm<EmailConfigFormData>({
    resolver: zodResolver(emailConfigSchema),
    defaultValues: {
      host: "",
      port: 587,
      secure: true,
      auth: {
        user: "",
        pass: "",
      },
      from: "",
    },
  });

  async function onSubmit(data: EmailConfigFormData) {
    try {
      setLoading(true);
      const response = await fetch("/api/config/email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("更新配置失败");
      }

      toast.success("邮件配置已更新");
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
          <label className="text-sm font-medium">SMTP服务器地址</label>
          <input
            {...form.register("host")}
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="smtp.example.com"
          />
          {form.formState.errors.host && (
            <p className="text-sm text-red-500">
              {form.formState.errors.host.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">端口</label>
          <input
            {...form.register("port", { valueAsNumber: true })}
            type="number"
            className="w-full px-3 py-2 border rounded-md"
          />
          {form.formState.errors.port && (
            <p className="text-sm text-red-500">
              {form.formState.errors.port.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">用户名</label>
          <input
            {...form.register("auth.user")}
            type="text"
            className="w-full px-3 py-2 border rounded-md"
          />
          {form.formState.errors.auth?.user && (
            <p className="text-sm text-red-500">
              {form.formState.errors.auth.user.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">密码</label>
          <input
            {...form.register("auth.pass")}
            type="password"
            className="w-full px-3 py-2 border rounded-md"
          />
          {form.formState.errors.auth?.pass && (
            <p className="text-sm text-red-500">
              {form.formState.errors.auth.pass.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">发件人地址</label>
          <input
            {...form.register("from")}
            type="email"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="noreply@example.com"
          />
          {form.formState.errors.from && (
            <p className="text-sm text-red-500">
              {form.formState.errors.from.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">使用SSL/TLS</label>
          <div className="flex items-center space-x-2">
            <input
              {...form.register("secure")}
              type="checkbox"
              className="w-4 h-4"
            />
            <span className="text-sm">启用安全连接</span>
          </div>
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