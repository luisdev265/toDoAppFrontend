"use server";

import { config } from "@/config/config";
import type { genericResponse } from "@/types/res";
import { cookies } from "next/headers";
import type { JwtPayload } from "jsonwebtoken";
import Jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import type { Payload } from "@/types/users";
import { decode } from "punycode";

interface DecodedUser extends Payload, JwtPayload {}

const registerNewUser = async (formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name && !email && !password) {
    throw new Error("Fields are required");
  }

  try {
    const res = await fetch(`${config.BACKEND_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });

    const data: genericResponse<{ user: Payload; token: string }> =
      await res.json();

    if (!res.ok || !data.success || !data.data) {
      throw new Error(data.message || "Error Register in");
    }

    return data.data;
  } catch (err) {
    throw new Error("Error registering user");
  }
};

const setCookies = async (
  cookiesToSet: { name: string; value: string | number }[]
) => {
  if (cookiesToSet.length === 0) {
    throw new Error("No cookies to set");
  }

  const cookieStore = await cookies();
  cookiesToSet.forEach(({ name, value }) => {
    let newValue;

    if (typeof value === "number") {
      newValue = value.toString();
    } else {
      newValue = value;
    }

    cookieStore.set({
      name,
      value: newValue,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    });
  });
};

export const registerAction = async (formData: FormData) => {
  const secret = config.secret;
  if (!secret) {
    throw new Error("Error Logining");
  }

  try {
    const token = await registerNewUser(formData);

    const decoded = Jwt.verify(token.token, secret) as DecodedUser;

    const cookiesToSet = [
      { name: "userId", value: decoded.id },
      { name: "userName", value: decoded.name },
      { name: "authToken", value: token.token },
    ];

    await setCookies(cookiesToSet);
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    } else {
      return "Credentials are incorrect";
    }
  }
  redirect("/");
};
