"use server";

import { config } from "@/config/config";
import type { genericResponse } from "@/types/res";
import { cookies } from "next/headers";
import type { JwtPayload } from "jsonwebtoken";
import Jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface DecodedUser extends JwtPayload {
  id: string;
  name: string;
  email: string;
}

const registerNewUser = async (fonrmData: FormData) => {
  const name = fonrmData.get("name");
  const email = fonrmData.get("email");
  const password = fonrmData.get("password");

  if (!name && !email && !password) {
    throw new Error("Fields are required");
  }

  try {
    const res = await fetch(`${config.api}/users/register`, {
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

    const data: genericResponse<{ user: UserData; token: string }> =
      await res.json();

    if (!res.ok || !data.success || !data.data) {
      throw new Error(data.message || "Error Longin in");
    }

    return data.data;
  } catch (err) {
    throw new Error("Error registering user");
  }
};

const setCookies = async (cookiesToSet: { name: string; value: string }[]) => {
  if (cookiesToSet.length === 0) {
    throw new Error("No cookies to set");
  }

  const cookieStore = await cookies();
  cookiesToSet.forEach(({ name, value }) => {
    cookieStore.set({
      name,
      value,
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
      { name: "id", value: decoded.id },
      { name: "userName", value: decoded.name },
      { name: "token", value: token.token },
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
