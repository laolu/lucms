import { NextResponse } from "next/server";
import { z } from "zod";

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

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const validatedData = securityConfigSchema.parse(data);

    const response = await fetch("http://localhost:3000/api/config/security", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      throw new Error("更新配置失败");
    }

    return NextResponse.json({ message: "安全配置已更新" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "更新配置失败" },
      { status: 500 }
    );
  }
} 