"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

type LoginState = {
  success: boolean;
  statusCode?: number;
  message: string;
  role?: string;
};


export type RegisterState = {
  success: boolean;
  statusCode?: number;
  message: string;
};

export async function loginAction(
  redirectTo: string,
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await fetch(
      "https://rentnest-nine.vercel.app/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: result.statusCode,
        message: result.message || "Invalid email or password",
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    const decoded = jwt.decode(result.data.accessToken) as JwtPayload;

    return {
      success: true,
      statusCode: result.statusCode,
      message: result.message || "Login Successful",
      role: decoded.role,
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function registerAction(
  prevState: RegisterState | null,
  formData: FormData
): Promise<RegisterState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  try {
    const res = await fetch(
      "https://rentnest-nine.vercel.app/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: result.statusCode,
        message: result.message || "Registration failed",
      };
    }

    return {
      success: true,
      statusCode: result.statusCode,
      message: result.message || "Registration successful",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}