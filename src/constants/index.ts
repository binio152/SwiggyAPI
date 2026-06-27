export const EmailTypes = {
  VERIFICATION: "verification",
  RESET_PASSWORD: "reset_password",
} as const;

export const JwtAudience = {
  ACCESS: "access",
  VERIFY_EMAIL: "verify_email",
  RESET_PASSWORD: "reset_password",
} as const;

export enum FoodCategory {
  MAIN_COURSE = "main_course",
  DESSERTS = "desserts",
  BEVERAGES = "beverages",
  COMBO = "combo",
}

export enum UserRole {
  USER = "user",
  RESTAURANT_OWNER = "restaurant_owner",
  ADMIN = "admin",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum RestaurantStatus {
  OPENING = "opening",
  CLOSED = "closed",
}

export enum OrderStatus {
  PENDING = "pending",
  PREPARING = "preparing",
  DELIVERING = "delivering",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum PaymentMethod {
  COD = "cod",
  BANKING = "banking",
}
