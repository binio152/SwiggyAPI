export const EmailTypes = {
  VERIFICATION: "verification",
  RESET_PASSWORD: "reset_password",
} as const;

export const JwtAudience = {
  ACCESS: "access",
  VERIFY_EMAIL: "verify-email",
  RESET_PASSWORD: "reset_password",
} as const;

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum RestaurantStatus {
  OPENNING = "openning",
  CLOSED = "closed",
}

export enum OrderStatus {
  PENDING = "pending",
  PREPARING = "preparing",
  DELIVERING = "delivering",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}
