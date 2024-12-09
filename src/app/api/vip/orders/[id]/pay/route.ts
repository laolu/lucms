import { NextResponse } from "next/server";
import { z } from "zod";

const paymentSchema = z.object({
  paymentMethod: z.string(),
});

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const validatedData = paymentSchema.parse(data);

    const response = await fetch(
      `http://localhost:3000/api/vip/orders/${params.id}/pay`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: request.headers.get("Authorization") || "",
        },
        body: JSON.stringify(validatedData),
      }
    );

    if (!response.ok) {
      throw new Error("支付失败");
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "支付失败" },
      { status: 500 }
    );
  }
} 