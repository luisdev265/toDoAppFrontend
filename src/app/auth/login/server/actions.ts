"use server";

import type { genericResponse } from "@/types/res";
import { redirect } from "next/navigation";
import { config } from "@/config/config";
import { cookies } from "next/headers";
import Jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { Payload } from "@/types/users";

interface DecodedUser extends Payload, JwtPayload {}

/**
 *  Handles login request to api and set cookies in fonrtend.
 * Fetch returns a token
 * Compare token with secret
 * @returns void it login request was succssesgull or string with the error.
 */
export const loginAction = async (
  formData: FormData
): Promise<void | string> => {
  const secret = config.secret;
  if (!secret) {
    throw new Error("Error Logining");
  }
  try {
    const token = await getTokenForLogin(formData);

    const decoded = Jwt.verify(token, secret) as DecodedUser;

    const cookiesToSet = [
      {name: "userId", value: decoded.id},
      {name: "userName", value: decoded.name},
      {name: "authToken", value: token},
    ]
  
    await setCookies(cookiesToSet);
    
  } catch (err) {
    return "Credentials are incorrect";
  }
  redirect("/");
};

const getTokenForLogin = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email && !password) {
    throw new Error("Fields are required");
  }

  const res = await fetch(`${config.BACKEND_URL}/users/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data: genericResponse<{ token: string }> = await res.json();

  if (!res.ok || !data.success || !data.data) {
    throw new Error(data.message || "Error Longin in");
  }

  const { token } = data.data;

  return token;
};

const setCookies = async (cookiesToSet: { name: string; value: string | number }[]) => {

  if(cookiesToSet.length === 0) {
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
