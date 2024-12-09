import { NextResponse } from "next/server";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "分类名称不能为空"),
  slug: z.string().min(1, "分类标识不能为空"),
  description: z.string().optional(),
  parentId: z.number().nullable(),
  isActive: z.boolean().default(true),
  sort: z.number().min(0).default(0),
});

export async function GET() {
  try {
    const response = await fetch("http://localhost:3000/api/content-categories", {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("获取分类列表失败");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "获取分类列表失败" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = categorySchema.parse(data);

    const response = await fetch("http://localhost:3000/api/content-categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      throw new Error("创建分类失败");
    }

    const category = await response.json();
    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "创建分类失败" },
      { status: 500 }
    );
  }
} 