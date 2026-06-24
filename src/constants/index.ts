export const EmailTypes = {
  VERIFICATION: "verification",
  RESET_PASSWORD: "reset_password",
} as const;

export const JWTPurposes = {
  ACCESS: "access",
  VERIFY_EMAIL: "verify-email",
  RESET_PASSWORD: "reset_password",
  CHANGE_PASSWORD: "change-password"
} as const;
