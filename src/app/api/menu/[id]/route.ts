import { NextResponse } from "next/server";
import { z } from "zod";

const menuSchema = z.object({
  name: z.string().min(1, "菜单名称不能为空"),
  icon: z.string().optional(),
  path: z.string().optional(),
  visible: z.boolean(),
  sort: z.number().min(0),
  parentId: z.number().nullable(),
  roles: z.array(z.string()).optional(),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`http://localhost:3000/api/menu/${params.id}`, {
      headers: {
        Authorization: request.headers.get("Authorization") || "",
      },
    });

    if (!response.ok) {
      throw new Error("获取菜单失败");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "获取菜单失败" },
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
    const validatedData = menuSchema.parse(data);

    const response = await fetch(`http://localhost:3000/api/menu/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      throw new Error("更新菜单失败");
    }

    const menu = await response.json();
    return NextResponse.json(menu);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "更新菜单失败" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`http://localhost:3000/api/menu/${params.id}`, {
      method: "DELETE",
      headers: {
        Authorization: request.headers.get("Authorization") || "",
      },
    });

    if (!response.ok) {
      throw new Error("删除菜单失败");
    }

    return NextResponse.json({ message: "菜单已删除" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "删除菜单失败" },
      { status: 500 }
    );
  }
} 