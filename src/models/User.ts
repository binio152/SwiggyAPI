import { Schema, model } from "mongoose";
import { Status, UserRole } from "../schemas";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    verification_token: {
      type: String,
      required: true,
    },
    verification_token_ttl: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },
  },
  {
    timestamps: true,
  },
);

const User = model("User", userSchema);

export default User;
