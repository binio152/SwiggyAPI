import { Schema, model } from "mongoose";
import { UserStatus, UserRole } from "../constants";

const userSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    verified_email: { type: Boolean, default: false },
    verification_token: { type: String },
    verification_token_ttl: { type: Date },
    password: { type: String, required: true, minLength: 6 },
    reset_password_token: { type: String },
    reset_password_token_ttl: { type: Date },
    phone: { type: String },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.INACTIVE,
    },
  },
  {
    timestamps: true,
  },
);

const User = model("User", userSchema);

export default User;
