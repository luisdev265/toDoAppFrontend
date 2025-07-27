import Jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { config } from "@/config/config";
import { redirect } from "next/navigation";

/**
 * Handles functions:
 *  - Compare token
 *  - Check User rol
 */
export class sessionManager {
  private secret = config.secret;
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  public async validateToken() {
    if (!this.token) {
      throw new Error("Token no proporcionado");
    }

    if (!this.secret) {
      throw new Error("Secret de configuración no encontrado");
    }

    try {
      Jwt.verify(this.token, this.secret);
    } catch (error) {
      if (error instanceof Jwt.JsonWebTokenError) {
        throw new Error("Token inválido");
      }
      if (error instanceof Jwt.TokenExpiredError) {
        throw new Error("Token expirado");
      }
      throw new Error("Error validando token");
    }
  }
}
