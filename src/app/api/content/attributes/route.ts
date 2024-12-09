import { NextResponse } from "next/server";
import { z } from "zod";

const attributeSchema = z.object({
  name: z.string().min(1, "属性名称不能为空"),
  code: z.string().min(1, "属性代码不能为空"),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  sort: z.number().min(0).default(0),
});

export async function GET() {
  try {
    const response = await fetch("http://localhost:3000/api/content-attributes", {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("获取属性列表失败");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "获取属性列表失败" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = attributeSchema.parse(data);

    const response = await fetch("http://localhost:3000/api/content-attributes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      throw new Error("创建属性失败");
    }

    const attribute = await response.json();
    return NextResponse.json(attribute);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "创建属性失败" },
      { status: 500 }
    );
  }
} 