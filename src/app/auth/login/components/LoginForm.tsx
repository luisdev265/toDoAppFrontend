"use client";

import Link from "next/link";
import PasswordInput from "@/app/auth/login/components/PasswordInput";
import React from "react";
import SubmitButton from "./SubmitButton";
import { loginAction } from "../server/actions";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (formData: FormData) => {
    const err = await loginAction(formData);

    if (err) {
      setError(err);
    }
  };

  return (
    <form
      className="border p-4 border-gray-300/20 rounded-xl shadow-md shadow-gray-300/25 w-[85%] sm:w-auto max-w-128 sm:min-w-88 min-h-auto gap-4 flex flex-col m-auto"
      action={handleLogin}
    >
      <h1 className="w-full text-center text-3xl inline-block h-auto">Login</h1>
      <div>
        <p className="text-base mb-2 ml-2">Email</p>
        <input
          type="email"
          name="email"
          required
          autoComplete="off"
          className="w-full border border-gray-300/30 rounded-lg px-2 py-1 text-sm"
        />
      </div>
      <PasswordInput></PasswordInput>
      <div className="flex w-full">
        <Link href="/auth/register">
          <span className="text-sm ml-2 hover:cursor-pointer hover:text-gray-300/70">
            No tiene cuenta?
          </span>
        </Link>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
      <SubmitButton />
    </form>
  );
}
