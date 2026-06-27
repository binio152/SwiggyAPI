import jwt from "jsonwebtoken";

declare global {
  type TokenPurpose =
    | "access"
    | "verify_email"
    | "reset_password"
    | "change_password";

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
