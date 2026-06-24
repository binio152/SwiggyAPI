declare global {
  type TokenPurpose =
    | "access"
    | "verify-email"
    | "reset_password"
    | "change-password";

  interface JwtPayloadBase {
    userId?: string;
    role?: String;
    purposes: TokenPurpose[];
  }
}

export {};
