export const EmailTypes = {
  VERIFICATION: "verification",
  RESET_PASSWORD: "reset_password",
} as const;

export const JWTPurposes = {
  ACCESS: "access",
  VERIFY_EMAIL: "verify-email",
  RESET_PASSWORD: "reset_password",
  CHANGE_PASSWORD: "change-password",
} as const;

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

