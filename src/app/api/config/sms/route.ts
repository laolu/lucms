import { NextResponse } from "next/server";
import { z } from "zod";

const smsConfigSchema = z.object({
  provider: z.enum(["aliyun", "tencent"], {
    required_error: "请选择短信服务提供商",
  }),
  accessKeyId: z.string().min(1, "AccessKey ID不能为空"),
  accessKeySecret: z.string().min(1, "AccessKey Secret不能为空"),
  signName: z.string().min(1, "短信签名不能为空"),
  templateCode: z.string().min(1, "模板代码不能为空"),
});

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const validatedData = smsConfigSchema.parse(data);

    const response = await fetch("http://localhost:3000/api/config/sms", {
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

    return NextResponse.json({ message: "短信配置已更新" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "更新配置失败" },
      { status: 500 }
    );
  }
} 