import { NextResponse } from "next/server";
import { z } from "zod";

const vipLevelSchema = z.object({
  name: z.string().min(1, "会员等级名称不能为空"),
  description: z.string().min(1, "会员等级描述不能为空"),
  price: z.number().min(0, "价格不能小于0"),
  duration: z.number().min(1, "会员时长不能小于1天"),
  benefits: z.array(z.string()),
  isActive: z.boolean().optional(),
  sort: z.number().optional(),
});

export async function GET() {
  try {
    const response = await fetch("http://localhost:3000/api/vip/levels", {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("获取会员等级失败");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "获取会员等级失败" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = vipLevelSchema.parse(data);

    const response = await fetch("http://localhost:3000/api/vip/levels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      throw new Error("创建会员等级失败");
    }

    const vipLevel = await response.json();
    return NextResponse.json(vipLevel);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "创建会员等级失败" },
      { status: 500 }
    );
  }
} 