import { z } from "zod";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const signUpSchema = z.object(
  {
    name: z
      .string("Name is required")
      .min(3, "Name must be at least 3 charecters"),
    username: z
      .string("Username is required")
      .min(5, "Username must be at least 5 charecters"),
    email: z.string("Email is required").email("Email is invalid"),
    password: z
      .string("Password is required")
      .min(6, "Password must be at least 6 charecters"),
    phone: z.string().optional(),
    type: z.enum(UserRole).default(UserRole.USER),
    status: z.enum(Status).default(Status.INACTIVE),
  },
  {
    message: "All fields ( name, username, email, password ) are requried.",
  },
);

export const verificationTokenSchema = z.object(
  {
    email: z.string("Email is required").email(),
    verification_token: z.string("Verification token is required"),
  },
  {
    error: "No fields provided",
  },
);

export const resendVerificationTokenSchema = z.object(
  {
    email: z.string("Email is required").email(),
  },
  {
    error: "No fields provided",
  },
);

export type SignUpInput = z.infer<typeof signUpSchema>;
export type VerificationToken = z.infer<typeof verificationTokenSchema>;
export type ResendVerificationToken = z.infer<
  typeof resendVerificationTokenSchema
>;
