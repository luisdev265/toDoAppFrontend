"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput() {
  const [ isHiddenPass, setIsHiddenPass ] = useState<boolean>(true);
  const handleHideShowPass = () => {
    setIsHiddenPass(!isHiddenPass);
  }

  return (
    <div>
      <p className="text-base mb-2 ml-2">Password</p>
      <div className="relative">
        <input
          type={isHiddenPass ? "password" : "text"}
          name="password"
          required
          autoComplete="off"
          className="w-full border border-gray-300/30 rounded-lg px-2 py-1 text-sm pr-9"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 hover:cursor-pointer transition-colors duration-300" onClick={handleHideShowPass} tabIndex={-1} type="button">
        {isHiddenPass ?
        <Eye />
        :
        <EyeOff />
        }
        </button>
      </div>
    </div>
  );
}
