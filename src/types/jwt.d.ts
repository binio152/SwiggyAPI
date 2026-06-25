import jwt from "jsonwebtoken";

declare global {
  type TokenPurpose =
    | "access"
    | "verify-email"
    | "reset_password"
    | "change-password";

  interface JwtPayloadBase {
    userId: string;
    role: "admin" | "user" | "moderator";
    email?: string;
    iss: string;
    aud: string;
  }

  interface SignTokenOptions extends Omit<jwt.SignOptions, "algorithm"> {
    expiresIn: string | number;
  }
}

export {};
