import { NextResponse } from "next/server";
import { z } from "zod";

const createOrderSchema = z.object({
  vipLevelId: z.number(),
});

export async function GET(request: Request) {
  try {
    const response = await fetch("http://localhost:3000/api/vip/orders", {
      headers: {
        Authorization: request.headers.get("Authorization") || "",
      },
    });

    if (!response.ok) {
      throw new Error("获取订单失败");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "获取订单失败" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = createOrderSchema.parse(data);

    const response = await fetch("http://localhost:3000/api/vip/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      throw new Error("创建订单失败");
    }

    const order = await response.json();
    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "创建订单失败" },
      { status: 500 }
    );
  }
} 