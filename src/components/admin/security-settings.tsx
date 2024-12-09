"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const securityConfigSchema = z.object({
  passwordMinLength: z.number().min(6, "密码最小长度不能小于6位"),
  passwordRequireNumbers: z.boolean(),
  passwordRequireUppercase: z.boolean(),
  passwordRequireSpecialChars: z.boolean(),
  maxLoginAttempts: z.number().min(1, "最大登录尝试次数不能小于1"),
  loginLockDuration: z.number().min(1, "锁定时长不能小于1分钟"),
  maxVerificationAttempts: z.number().min(1, "最大验证尝试次数不能小于1"),
  verificationCodeExpiry: z.number().min(1, "验证码有效期不能小于1分钟"),
  resetPasswordTokenExpiry: z.number().min(1, "重置密码令牌有效期不能小于1分钟"),
});

type SecurityConfigFormData = z.infer<typeof securityConfigSchema>;

export function SecuritySettings() {
  const [loading, setLoading] = useState(false);

  const form = useForm<SecurityConfigFormData>({
    resolver: zodResolver(securityConfigSchema),
    defaultValues: {
      passwordMinLength: 8,
      passwordRequireNumbers: true,
      passwordRequireUppercase: true,
      passwordRequireSpecialChars: true,
      maxLoginAttempts: 5,
      loginLockDuration: 30,
      maxVerificationAttempts: 3,
      verificationCodeExpiry: 10,
      resetPasswordTokenExpiry: 60,
    },
  });

  async function onSubmit(data: SecurityConfigFormData) {
    try {
      setLoading(true);
      const response = await fetch("/api/config/security", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("更新配置失败");
      }

      toast.success("安全配置已更新");
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
          <label className="text-sm font-medium">密码最小长度</label>
          <input
            {...form.register("passwordMinLength", { valueAsNumber: true })}
            type="number"
            className="w-full px-3 py-2 border rounded-md"
          />
          {form.formState.errors.passwordMinLength && (
            <p className="text-sm text-red-500">
              {form.formState.errors.passwordMinLength.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">密码要求</label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                {...form.register("passwordRequireNumbers")}
                type="checkbox"
                className="w-4 h-4"
              />
              <span className="text-sm">必须包含数字</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                {...form.register("passwordRequireUppercase")}
                type="checkbox"
                className="w-4 h-4"
              />
              <span className="text-sm">必须包含大写字母</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                {...form.register("passwordRequireSpecialChars")}
                type="checkbox"
                className="w-4 h-4"
              />
              <span className="text-sm">必须包含特殊字符</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">最大登录尝试次数</label>
          <input
            {...form.register("maxLoginAttempts", { valueAsNumber: true })}
            type="number"
            className="w-full px-3 py-2 border rounded-md"
          />
          {form.formState.errors.maxLoginAttempts && (
            <p className="text-sm text-red-500">
              {form.formState.errors.maxLoginAttempts.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">账号锁定时长（分钟）</label>
          <input
            {...form.register("loginLockDuration", { valueAsNumber: true })}
            type="number"
            className="w-full px-3 py-2 border rounded-md"
          />
          {form.formState.errors.loginLockDuration && (
            <p className="text-sm text-red-500">
              {form.formState.errors.loginLockDuration.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">最大验证尝试次数</label>
          <input
            {...form.register("maxVerificationAttempts", { valueAsNumber: true })}
            type="number"
            className="w-full px-3 py-2 border rounded-md"
          />
          {form.formState.errors.maxVerificationAttempts && (
            <p className="text-sm text-red-500">
              {form.formState.errors.maxVerificationAttempts.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">验证码有效期（分钟）</label>
          <input
            {...form.register("verificationCodeExpiry", { valueAsNumber: true })}
            type="number"
            className="w-full px-3 py-2 border rounded-md"
          />
          {form.formState.errors.verificationCodeExpiry && (
            <p className="text-sm text-red-500">
              {form.formState.errors.verificationCodeExpiry.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            重置密码令牌有效期（分钟）
          </label>
          <input
            {...form.register("resetPasswordTokenExpiry", { valueAsNumber: true })}
            type="number"
            className="w-full px-3 py-2 border rounded-md"
          />
          {form.formState.errors.resetPasswordTokenExpiry && (
            <p className="text-sm text-red-500">
              {form.formState.errors.resetPasswordTokenExpiry.message}
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