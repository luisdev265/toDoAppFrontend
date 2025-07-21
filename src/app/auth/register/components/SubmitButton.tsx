"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      id="form-button"
      type="submit"
      disabled={pending}
      className="bg-gray-200 w-full h-auto text-black flex items-center justify-center py-1 rounded-lg hover:cursor-pointer hover:bg-gray-400 transition-colors ease-in-out duration-200"
    >
      {pending ? (
        <LoaderCircle size={24} className="animate-spin" />
      ) : (
        "LogIn"
      )}
    </button>
  );
}
