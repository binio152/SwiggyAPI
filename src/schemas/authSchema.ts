import { z } from "zod";
import { Status, UserRole } from "../constants";

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
    role: z.enum(UserRole).default(UserRole.USER),
    status: z.enum(Status).default(Status.INACTIVE),
  },
  {
    message: "All fields ( name, username, email, password ) are requried.",
  },
);

export const signInSchema = z.object(
  {
    login: z
      .string("Email or Username is required")
      .min(3, "Email must be at least 3 charecters"),
    password: z
      .string("Password is required")
      .min(6, "Password must be at least 6 charecters"),
  },
  {
    message: "All fields ( Username / Email, Password ) are requried.",
  },
);

export const forgotPasswordSchema = z.object({
  login: z
    .string("Email or Username is required")
    .min(3, "Email must be at least 3 charecters"),
});

export const resetPasswordSchema = z.object({
  login: z
    .string("Email or Username is required")
    .min(3, "Email must be at least 3 charecters"),
  reset_password_token: z.string("Reset Password Token is required").min(1),
  new_password: z.string().min(6, "New Password must be at least 6 charecters"),
});

export const changePasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 charecters"),
    new_password: z
      .string()
      .min(6, "New Password must be at least 6 charecters"),
    new_password_confirmation: z
      .string()
      .min(6, "Password Confirmation must be at least 6 charecters"),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Your Password Confirmation is not match",
    path: ["new_password_confirmation"],
  });

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
export type SignInInput = z.infer<typeof signInSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type VerificationToken = z.infer<typeof verificationTokenSchema>;
export type ResendVerificationToken = z.infer<
  typeof resendVerificationTokenSchema
>;
