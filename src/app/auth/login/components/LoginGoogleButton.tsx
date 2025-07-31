import React from "react";
import { config } from "@/config/config";

const LoginGoogleButton = () => {

    const apiUrl = config.BACKEND_URL

  const handleLogin = () => {
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Iniciar sesión con Google
    </button>
  );
};

export default LoginGoogleButton;