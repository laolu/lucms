import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  identifier: z.string().min(1, "请输入邮箱或手机号"),
  password: z.string().min(1, "请输入密码"),
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = loginSchema.parse(data);

    // 判断identifier是邮箱还是手机号
    const isEmail = validatedData.identifier.includes('@');
    const loginData = {
      password: validatedData.password,
      ...(isEmail 
        ? { email: validatedData.identifier }
        : { phone: validatedData.identifier }
      )
    };

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: error.message || "登录失败" },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: error.message || "登录失败" },
      { status: 500 }
    );
  }
} 