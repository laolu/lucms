import { NextResponse } from "next/server";
import { z } from "zod";

const attributeSchema = z.object({
  name: z.string().min(1, "属性名称不能为空"),
  code: z.string().min(1, "属性代码不能为空"),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  sort: z.number().min(0).default(0),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/content-attributes/${params.id}`
    );

    if (!response.ok) {
      throw new Error("获取属性失败");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "获取属性失败" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const validatedData = attributeSchema.parse(data);

    const response = await fetch(
      `http://localhost:3000/api/content-attributes/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: request.headers.get("Authorization") || "",
        },
        body: JSON.stringify(validatedData),
      }
    );

    if (!response.ok) {
      throw new Error("更新属性失败");
    }

    const attribute = await response.json();
    return NextResponse.json(attribute);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "更新属性失败" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/content-attributes/${params.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: request.headers.get("Authorization") || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error("删除属性失败");
    }

    return NextResponse.json({ message: "属性已删除" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "删除属性失败" },
      { status: 500 }
    );
  }
} 