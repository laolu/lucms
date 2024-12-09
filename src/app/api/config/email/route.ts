import { NextResponse } from "next/server";
import { z } from "zod";

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

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const validatedData = emailConfigSchema.parse(data);

    const response = await fetch("http://localhost:3000/api/config/email", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 从请求中获取认证令牌并传递给后端
        Authorization: request.headers.get("Authorization") || "",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      throw new Error("更新配置失败");
    }

    return NextResponse.json({ message: "邮件配置已更新" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "更新配置失败" },
      { status: 500 }
    );
  }
} 